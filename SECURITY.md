# ISL Security Policy

## Security posture
ISL treats security as a lifecycle gate, not a final checklist. The working model follows Zero Trust, least privilege, secure-by-default configuration, reproducible builds, dependency review, incident response and recovery.

## Reporting a vulnerability
Do **not** publish exploitable details, credentials, private links, unreleased assets, save files containing sensitive data, or proof-of-concept payloads in public issues.

Preferred process:
1. Privately notify the repository owner/project maintainer.
2. Include affected build/commit, impact, reproduction conditions and logs/screenshots with secrets removed.
3. Allow time for triage and remediation before public disclosure.

## Severity
- SEC0 — active compromise / emergency
- SEC1 — critical: auth bypass, credential leak, RCE, malicious build, destructive data loss
- SEC2 — high: meaningful privilege escalation, abuse path, save corruption, sensitive disclosure
- SEC3 — medium: constrained impact or defense-in-depth failure
- SEC4 — low: hardening / polish

## Stop-ship conditions
No release proceeds with known credential leaks, auth bypass, arbitrary admin access, untrusted build provenance, save corruption/data loss, privacy breach, or critical supply-chain compromise.

## Secure-development gates
Threat model → secrets/dependency scan → input validation → access control → rate limiting → regression/security tests → artifact hashes → rollback → incident readiness → backup restore drill.

## Important
Public polls are advisory research instruments, not identity-secure elections. Their results never automatically promote content to production or canon.
