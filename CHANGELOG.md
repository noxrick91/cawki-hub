# Changelog

Notable user-facing changes to Cawki are recorded here. Implementation details remain in the source history.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions match Git tags.

## [Unreleased]

## [0.2.0] - 2026-09-03

### Breaking

- `cawki serve` now requires a token on loopback as well. Existing automation that called the API with no `Authorization` header receives 401. Pass `--token` / `CAW_SERVE_TOKEN`, read the token printed at startup, or opt out with `--anonymous`.
- Remembered MCP approvals are now keyed on the individual tool rather than the whole server, so grants saved by earlier versions no longer match and each MCP tool asks once more.
- `--allowedTools` no longer overrides plan mode. Writes, shell, MCP, and network stay denied in plan regardless of the flag.
- The Blender and FreeCAD GUI bridges require the token their addon writes at startup. Reinstall the addon (`python mcp/<app>/install_bridge.py`) and restart the application; `*_BRIDGE_HOST` is no longer read.

### Security

- Required a per-machine token on the Blender and FreeCAD GUI bridges, which run arbitrary Python inside those applications. The addon writes the token to `~/.cawki/<app>-bridge.json` (owner-only) on startup, the port is loopback-only and no longer configurable, and a connection whose first line is not JSON is dropped so a web page cannot reach the bridge with a cross-origin request.
- Required an `Authorization: Bearer` token for `cawki serve` on loopback as well; without `--token` a random one is generated and printed at startup, and `--anonymous` is now the explicit way to serve without auth.
- Stopped `cawki serve` from silently widening the permission mode: an HTTP caller now gets the mode the user configured instead of being upgraded to `auto`.
- Rejected session ids that are not a single path segment. A crafted id could previously read, and through `serve` also write, JSON files outside the sessions directory.
- Narrowed MCP approvals from the whole server to the individual tool named on the approval sheet. A server-wide grant is still available as an explicit `mcp:<server>__*` pattern.
- Stopped auto mode from approving arbitrary scripts whose filename merely contains `pytest` or `unittest`, and required every `mvn` / `gradle` goal to be a verify goal.
- Stopped `--allowedTools` from overriding plan mode. Plan can be entered at any moment with Shift+Tab and the model is told it cannot touch the codebase, so a launch flag no longer quietly re-enables writes, shell, MCP, or network there; the flag still applies in every other mode, and `--denyTools` still wins everywhere.
- Made `debug start` always ask for approval. Its grant path is the program to debug, which parses like a command, so debugging `cargo test` or `python -m pytest` was auto-approved in auto and debug modes as though it were the check command — contrary to what debug mode documents.
- Denied tool access to well-known credential files (`~/.ssh`, `~/.aws`, `~/.gnupg`, `~/.kube`, `.netrc`, `.git-credentials`, `.npmrc`, `~/.docker/config.json`, `gh` hosts) and refused the home directory itself as a working directory.
- Wrote API-key files atomically and owner-only from creation, instead of a plain write followed by a permission change.
- Kept the sandbox proxy's Unix sockets in an owner-only directory, masked workspace secret files inside the jail even when absent, and stopped forwarding a GitHub token across redirects during MCP pack installation.
- Told the model that file contents, command output, fetched web pages, and MCP results are data and never instructions.

### Changed

- MCP servers now receive `CAW_EXTRA_DIRS`, so tools accept paths under directories granted with `--add-dir` instead of rejecting work the agent is allowed to do.
- Only MCP tools a server marks `readOnlyHint` run in parallel; anything that may mutate runs serially.
- `tools/list` results are cached and re-fetched only for a server that reported a change, and `cawki serve` connects its MCP pool once instead of per request.
- MCP servers now come online one at a time instead of all at the end, so a slow or unreachable server no longer holds back every other server's tools. Startup shows connection progress.

### Fixed

- Loaded configuration files that are missing whole sections instead of failing to start.
- Counted CJK text at roughly one token per character, so auto-compact fires on time in Chinese and Japanese conversations.
- Capped NDJSON frames from MCP servers, which could previously grow without bound.
- Applied the handshake and discovery timeouts to HTTP and SSE MCP servers. They were dropped on that transport, so a host that accepted the connection and never replied blocked startup for two minutes rather than eight seconds.
- Serialized background permission writes so two quick approvals cannot drop one another.
- Reported "reloading" rather than "not enabled" for MCP calls made while servers reconnect.
- Stopped a vision downgrade or a `stream_options` retry from consuming one of the network retry attempts, and shared one HTTP connection pool across model rebinds.

## [0.1.21] - 2026-08-23

### Changed

- Deferred MCP tool schemas behind compact server summaries and `tool_search`, loading only the tools relevant to the current session.
- Made context-limit failures provider-independent and report the request and endpoint token limits when available.
- Persisted Linux release-runner APT, Cargo, cargo-xwin, Windows SDK, and cross-target caches with explicit cache identity and validation.

### Fixed

- Made session and configuration replacement atomic and ordered across Linux and Windows, and waited for the final save before reporting a resumable exit.
- Made Escape interrupt routing, turn preparation, model requests, and completion races immediately, including when a draft is present or a permission request finishes concurrently.
- Excluded `.cawki` and `.caw-agent` runtime trees from checkpoint Git baselines, preventing recursive checkpoint growth and long uninterruptible scans.
- Avoided retrying deterministic streaming rejections with the same non-stream request.

## [0.1.20] - 2026-08-19

### Changed

- Added visible MCP pack installation phases, duplicate-operation protection, and a persistent custom-source action in the MCP catalog.
- Made MCP dependency installation explicit and on demand instead of silently installing every package's Python requirements.
- Staged and validated MCP pack updates before activation, preserving the previous version when installation or registration fails.
- Restricted automatic bridge setup to official Hub packs and documented which external dependencies and application add-ons remain after uninstall.

### Fixed

- Prevented MCP installs from appearing permanently stuck during hidden dependency setup and bounded official bridge setup with a hard timeout.
- Surfaced post-install warnings in the MCP menu and cleaned temporary download, extraction, and staging directories after failures.

## [0.1.19] - 2026-08-19

### Changed

- Published the complete Cawki distribution under the `cawki` command, package, release-asset, data-directory, and Hub names.
- Serialized Windows ARM64 SDK downloads and added visible heartbeats, hard timeouts, and cache-preserving retries for the China-hosted release runner.

## [0.1.18] - 2026-08-19

### Changed

- Renamed the product, Cargo package, executable, release assets, commands, and local data directories to `cawki` without a legacy compatibility layer.
- Rebranded the public website, documentation, installers, MCP packs, and release workflows as Cawki and moved their repository references to `noxrick91/cawki-hub`.

## [0.1.17] - 2026-08-19

### Changed

- Redesigned the Router menu with Provider and Model pickers for Fast, Default, Strong, and the dedicated classifier model.
- Made Router escalation gradual from Fast to Default to Strong, with working controls for stall and verification-failure escalation.
- Expanded Router decision feedback with classification source, score, confidence, fallback, vision requirements, and routing reasons.
- Clarified when Hybrid and LLM classification can add an extra model request and cost.

### Fixed

- Kept the selected Welcome theme visible when the terminal is too short to show the complete theme list.
- Prevented selecting a Router tier from silently clearing its configured model.
- Warned when a visual request falls back to a model that is not vision-capable.

## [0.1.16] - 2026-08-19

### Added

- Added keyboard selection and detail opening to the Todo list, matching the Agents panel controls.
- Added Plan-style Todo detail sheets with Markdown tables, code blocks, and Mermaid diagrams.

### Fixed

- Reduced intermittent UI stalls during active tasks by making periodic persistence non-blocking and consolidating recovery snapshots.

## [0.1.15] - 2026-08-18

### Fixed

- Fixed `upgrade now` rejecting GitHub releases whose optional notes field is `null`.

## [0.1.14] - 2026-08-18

### Changed

- Improved the contrast of compact header, status, and footer text.
- Presented LLM failures as a distinct error block instead of inline transcript text.

### Fixed

- Fixed stale characters appearing around ambiguous-width punctuation in Chinese Windows Terminal sessions.
- Fixed Windows workspace paths showing Unix separators or leaking the `\\?\` verbatim prefix.
- Kept bottom chrome above ConPTY's partially visible resize row so footer text is not clipped.

## [0.1.13] - 2026-08-18

### Changed

- Added native Windows ARM64 release builds, installers, self-upgrades, and website downloads alongside Linux x86_64/ARM64 and Windows x86_64.
- Removed unavailable macOS binaries from the public download matrix while retaining source-level macOS support.

## [0.1.12] - 2026-08-18

### Changed

- Hardened built-in MCP services with workspace-confined paths, dependency allowlists, and framing-safe stdout handling.
- Added separate prompt-cache write token and pricing accounting.
- Added self-hosted Forgejo release builds for Linux x86_64, Linux ARM64, and Windows x86_64 GNU; macOS prebuilt packages are temporarily unavailable.

### Fixed

- Fixed Anthropic prompt totals, cache-hit percentages, cache-write accounting, context compaction thresholds, and cost estimates.
- Fixed document, image, OCR, and speech MCP smoke tests hanging on Content-Length framing.
- Fixed FreeCAD and Blender status calls failing when their desktop backends are not installed.

## [0.1.11] - 2026-08-18

### Changed

- Improved terminal image previews with full half-block color detail and theme-aware transparent backgrounds.
- Hardened Unix and Windows installers with executable/version verification, strict checksum matching, and automatic rollback.

### Fixed

- Fixed Windows commands that used unavailable `head` or `tail` utilities, including commands inside shell pipelines.
- Fixed the unpainted Windows terminal safety column that could leave a missing background patch at the lower-right edge.
- Fixed completed projects occasionally reopening the Welcome setup after restart or console-window close.
- Fixed model API keys entered for a non-active provider being dispatched as chat messages instead of saved securely.

## [0.1.10] - 2026-08-18

### Changed

- Added Tab-cycled keyboard focus so the composer, tasks, and agents panels can be navigated without fighting the input caret.
- Improved file downloads with live byte and percentage progress.
- Improved install and upgrade guidance: Linux sudo is requested in another terminal, PATH conflicts are explained, and Windows replaces the locked executable after exit.

### Fixed

- Fixed failed background tasks leaving the parent idle instead of recovering.
- Fixed transcript scrolling so code and diagram headers no longer stay pinned while the body moves.
- Fixed markdown tables overflowing a narrow terminal.

## [0.1.9] - 2026-08-18

### Added

- Added dedicated language-server isolation controls and a clear confirmation before a project-defined server starts.
- Added platform-aware dependency installation suggestions with an explicit Install / Cancel prompt.
- Added safer opt-in loading for workspace MCP configuration.

### Changed

- Refined the terminal interface, including larger plan diagrams, more consistent panels, and smoother task, agent, and todo updates.
- Improved background-task handling so interactive and long-running programs are represented more accurately.
- Refined built-in skills, tool guidance, permission prompts, and project safety rules.
- Improved browser, screenshot, build, and debugging workflows across supported platforms.

### Fixed

- Fixed incomplete terminal borders and background painting in several layouts.
- Fixed task lifecycle and timeout edge cases that could report active work as failed.
- Fixed several permission, path, and cross-platform command handling issues.

## [0.1.8] - 2026-08-15

### Changed

- Improved setup, model providers, public documentation, and terminal presentation.

### Fixed

- Fixed provider-key handling and compatibility with third-party OpenAI-compatible gateways.

## [0.1.7] - 2026-08-15

### Added

- Added model routing, local REST/SSE control, broader GitHub and infrastructure tools, and improved task and agent panels.

### Changed

- Expanded help and public usage documentation.

## [0.1.6] - 2026-08-15

### Fixed

- Ollama works without an API key.
- An empty configuration file no longer blocks startup.

## [0.1.5] - 2026-08-15

### Added

- Added Windows ARM64 installation assets and a live Ollama model picker.

## [0.1.4] - 2026-08-14

### Changed

- Improved installer PATH setup and command documentation.

## [0.1.3] - 2026-08-14

### Added

- Added MCP catalog update checks and clearer package status.

### Changed

- Improved rewind coverage for file operations.

## [0.1.2] - 2026-08-14

### Added

- Added official MCP pack installation and public release downloads.

## [0.1.1] - 2026-08-14

### Fixed

- Fixed macOS ScreenCaptureKit build compatibility.

## [0.1.0] - 2026-08-14

### Added

- First public release of the sandboxed terminal coding agent, including permissions, sessions, MCP, GitHub integration, and verified upgrades.
