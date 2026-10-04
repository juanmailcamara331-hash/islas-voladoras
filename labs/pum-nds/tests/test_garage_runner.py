import json
import tempfile
import unittest
from pathlib import Path
import importlib.util

MODULE_PATH = Path(__file__).resolve().parents[1] / "tools" / "garage_runner.py"
SPEC = importlib.util.spec_from_file_location("garage_runner", MODULE_PATH)
garage_runner = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(garage_runner)
GarageRunner = garage_runner.GarageRunner


class GarageRunnerTests(unittest.TestCase):
    def make_task(self, root: Path, name: str, data: dict):
        inbox = root / "inbox"
        inbox.mkdir(parents=True, exist_ok=True)
        (inbox / name).write_text(json.dumps(data), encoding="utf-8")

    def test_pass_and_return_packet(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            self.make_task(root, "001.json", {
                "id": "T001",
                "adapter": "local.text.normalize",
                "payload": {"text": "  hola   garage  "}
            })
            counts = GarageRunner(root).run_once()
            self.assertEqual(counts["PASS"], 1)
            packet = json.loads((root / "outbox" / "T001.return.json").read_text())
            self.assertEqual(packet["status"], "PASS")
            self.assertEqual(packet["result"]["text"], "hola garage")

    def test_human_gate_blocks_execution(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            self.make_task(root, "002.json", {
                "id": "T002",
                "adapter": "local.echo",
                "payload": {"danger": False},
                "human_gate": True
            })
            counts = GarageRunner(root).run_once()
            self.assertEqual(counts["GATED"], 1)
            packet = json.loads((root / "gated" / "T002.return.json").read_text())
            self.assertEqual(packet["status"], "HUMAN_GATE_REQUIRED")

    def test_dedupe(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            task = {"id": "T003", "adapter": "local.echo", "payload": "x"}
            self.make_task(root, "003a.json", task)
            runner = GarageRunner(root)
            self.assertEqual(runner.run_once()["PASS"], 1)
            self.make_task(root, "003b.json", task)
            self.assertEqual(runner.run_once()["DEDUPED"], 1)


if __name__ == "__main__":
    unittest.main()
