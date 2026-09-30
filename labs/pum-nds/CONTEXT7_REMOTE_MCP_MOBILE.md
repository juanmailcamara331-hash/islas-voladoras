# ISL · Context7 Remote MCP Access Plan

Status: TOOLING · NO CANON · MOBILE-FIRST

## Goal
Use Context7 from an Android tablet without requiring a terminal and without depending on the native ChatGPT plugin menu.

## Preferred path A — ChatGPT Web
Use browser, preferably desktop-site mode if mobile UI hides advanced settings.

Context7 remote OAuth endpoint:
https://mcp.context7.com/mcp/oauth

Flow:
1. Open chatgpt.com in browser.
2. Settings -> Apps -> Advanced settings.
3. Enable Developer Mode.
4. Create App.
5. Name: Context7.
6. MCP Server URL: https://mcp.context7.com/mcp/oauth
7. Complete OAuth authorization.
8. Use Context7 from supported chats.

This uses remote HTTP OAuth; no local terminal required.

## Preferred path B — Claude / remote MCP
If the Claude product surface exposes remote MCP/custom connector configuration, use the same remote MCP service rather than local stdio.

Remote non-OAuth endpoint:
https://mcp.context7.com/mcp

Remote OAuth endpoint:
https://mcp.context7.com/mcp/oauth

If the surface does not expose remote MCP configuration, do not force a local Claude Code setup on the tablet.

## Fallback path C — API key through a hosted MCP bridge
If a client does not support OAuth:
- deploy a tiny hosted MCP-compatible bridge/server;
- store Context7 API key server-side as a secret;
- expose only the minimal Context7 tools needed;
- never put the API key in ISL documents, repo, prompts or screenshots.

Possible hosting layers:
- Supabase Edge Functions
- Cloudflare Workers
- small VPS/container
- another trusted remote MCP host

Security rules:
- secret stays server-side;
- allowlist Context7 calls;
- log tool version/source;
- test against non-sensitive data first;
- treat remote MCP output as untrusted external input.

## ISL usage
Context7 is documentation intelligence, not authority.

Pipeline:
QUESTION ABOUT LIBRARY/API
-> Context7 retrieves current docs
-> provenance stored
-> engineering decision
-> tests
-> Human/technical gate

Context7 may improve:
- libnds
- melonDS / emulator integrations
- Unreal Engine APIs
- Supabase
- GitHub Actions
- Android tooling
- sync libraries

It must never silently change game canon or project authority.
