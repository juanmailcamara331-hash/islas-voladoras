#!/usr/bin/env python3
"""Garage Zero local runner v0.1.

Small, reversible queue runner:
SENSE -> DEDUPE -> GATE -> ADAPTER -> VERIFY -> RETURN -> AUDIT.

No network calls. No shell execution. External engines are intentionally adapters
to be connected later (for example through n8n) without changing the queue contract.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import shutil
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable

RUNNER_VERSION = "garage-runner-v0.1"


@dataclass(frozen=True)
class Task:
    task_id: str
    adapter: str
    payload: Any
    human_gate: bool = False

    @classmethod
    def from_dict(cls, raw: dict[str, Any]) -> "Task":
        task_id = str(raw.get("id", "")).strip()
        adapter = str(raw.get("adapter", "")).strip()
        if not task_id:
            raise ValueError("task.id is required")
        if not adapter:
            raise ValueError("task.adapter is required")
        return cls(
            task_id=task_id,
            adapter=adapter,
            payload=raw.get("payload"),
            human_gate=bool(raw.get("human_gate", False)),
        )


def canonical_hash(raw: dict[str, Any]) -> str:
    data = json.dumps(raw, sort_keys=True, separators=(",", ":"), ensure_ascii=False)
    return hashlib.sha256(data.encode("utf-8")).hexdigest()


def adapter_echo(payload: Any) -> Any:
    return payload


def adapter_text_normalize(payload: Any) -> dict[str, Any]:
    if isinstance(payload, dict):
        text = str(payload.get("text", ""))
    else:
        text = str(payload if payload is not None else "")
    normalized = " ".join(text.split())
    return {"text": normalized, "chars": len(normalized)}


def adapter_json_verify(payload: Any) -> dict[str, Any]:
    if isinstance(payload, (dict, list)):
        return {"valid": True, "value": payload}
    if not isinstance(payload, str):
        raise ValueError("json.verify expects a JSON string, object or array")
    return {"valid": True, "value": json.loads(payload)}


ADAPTERS: dict[str, Callable[[Any], Any]] = {
    "local.echo": adapter_echo,
    "local.text.normalize": adapter_text_normalize,
    "local.json.verify": adapter_json_verify,
}


class GarageRunner:
    def __init__(self, root: Path):
        self.root = root
        self.inbox = root / "inbox"
        self.running = root / "running"
        self.outbox = root / "outbox"
        self.failed = root / "failed"
        self.gated = root / "gated"
        self.audit = root / "audit.jsonl"
        self.state_file = root / "state.json"
        self.lock_file = root / ".runner.lock"
        for p in (self.inbox, self.running, self.outbox, self.failed, self.gated):
            p.mkdir(parents=True, exist_ok=True)

    def _load_state(self) -> dict[str, str]:
        if not self.state_file.exists():
            return {}
        try:
            return json.loads(self.state_file.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            return {}

    def _save_state(self, state: dict[str, str]) -> None:
        tmp = self.state_file.with_suffix(".tmp")
        tmp.write_text(json.dumps(state, indent=2, sort_keys=True), encoding="utf-8")
        tmp.replace(self.state_file)

    def _audit(self, event: dict[str, Any]) -> None:
        row = {
            "ts": int(time.time()),
            "runner": RUNNER_VERSION,
            **event,
        }
        with self.audit.open("a", encoding="utf-8") as fh:
            fh.write(json.dumps(row, ensure_ascii=False, sort_keys=True) + "\n")

    def _return_packet(
        self,
        task: Task,
        digest: str,
        status: str,
        *,
        result: Any = None,
        error: str | None = None,
    ) -> dict[str, Any]:
        packet = {
            "task_id": task.task_id,
            "task_hash": digest,
            "adapter": task.adapter,
            "status": status,
            "runner": RUNNER_VERSION,
            "result": result,
        }
        if error:
            packet["error"] = error
        return packet

    def process_one(self, path: Path) -> str:
        raw = json.loads(path.read_text(encoding="utf-8"))
        task = Task.from_dict(raw)
        digest = canonical_hash(raw)
        state = self._load_state()

        if state.get(task.task_id) == digest:
            path.unlink(missing_ok=True)
            self._audit({"event": "dedupe", "task_id": task.task_id, "hash": digest})
            return "DEDUPED"

        claimed = self.running / path.name
        shutil.move(str(path), str(claimed))

        if task.human_gate:
            packet = self._return_packet(task, digest, "HUMAN_GATE_REQUIRED")
            target = self.gated / f"{task.task_id}.return.json"
            target.write_text(json.dumps(packet, indent=2, ensure_ascii=False), encoding="utf-8")
            claimed.unlink(missing_ok=True)
            self._audit({"event": "gated", "task_id": task.task_id, "hash": digest})
            return "GATED"

        adapter = ADAPTERS.get(task.adapter)
        if adapter is None:
            packet = self._return_packet(
                task,
                digest,
                "ADAPTER_UNAVAILABLE",
                error=f"adapter not registered: {task.adapter}",
            )
            target = self.failed / f"{task.task_id}.return.json"
            target.write_text(json.dumps(packet, indent=2, ensure_ascii=False), encoding="utf-8")
            claimed.unlink(missing_ok=True)
            self._audit({"event": "adapter_unavailable", "task_id": task.task_id, "adapter": task.adapter})
            return "FAILED"

        try:
            result = adapter(task.payload)
            packet = self._return_packet(task, digest, "PASS", result=result)
            target = self.outbox / f"{task.task_id}.return.json"
            target.write_text(json.dumps(packet, indent=2, ensure_ascii=False), encoding="utf-8")
            state[task.task_id] = digest
            self._save_state(state)
            claimed.unlink(missing_ok=True)
            self._audit({"event": "pass", "task_id": task.task_id, "hash": digest, "adapter": task.adapter})
            return "PASS"
        except Exception as exc:  # runner boundary: convert adapter failure into trace
            packet = self._return_packet(task, digest, "FAIL", error=f"{type(exc).__name__}: {exc}")
            target = self.failed / f"{task.task_id}.return.json"
            target.write_text(json.dumps(packet, indent=2, ensure_ascii=False), encoding="utf-8")
            claimed.unlink(missing_ok=True)
            self._audit({"event": "fail", "task_id": task.task_id, "hash": digest, "error": str(exc)})
            return "FAILED"

    def run_once(self) -> dict[str, int]:
        counts = {"PASS": 0, "FAILED": 0, "GATED": 0, "DEDUPED": 0}
        for path in sorted(self.inbox.glob("*.json")):
            try:
                status = self.process_one(path)
            except Exception as exc:
                counts["FAILED"] += 1
                self._audit({"event": "invalid_task", "file": path.name, "error": f"{type(exc).__name__}: {exc}"})
                bad = self.failed / path.name
                if path.exists():
                    shutil.move(str(path), str(bad))
                continue
            counts[status] += 1
        return counts

    def acquire_lock(self) -> int:
        try:
            return os.open(self.lock_file, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
        except FileExistsError as exc:
            raise RuntimeError("runner already active") from exc

    def release_lock(self, fd: int) -> None:
        os.close(fd)
        self.lock_file.unlink(missing_ok=True)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", default=".garage", help="Garage queue directory")
    parser.add_argument("--once", action="store_true", help="Process current inbox once (default)")
    args = parser.parse_args()

    runner = GarageRunner(Path(args.root))
    try:
        fd = runner.acquire_lock()
    except RuntimeError as exc:
        print(f"RUNNER FAIL: {exc}", file=sys.stderr)
        return 2

    try:
        counts = runner.run_once()
    finally:
        runner.release_lock(fd)

    print(
        "RUNNER PASS "
        + " ".join(f"{k}={v}" for k, v in counts.items())
    )
    return 0 if counts["FAILED"] == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
