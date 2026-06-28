# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows semantic versioning for public package releases.

## [0.3.3] - 2026-06-28

### Changed

- Tuned `pi_analyze_session` correction classification so ambiguous words such as tool, validation, and plan do not by themselves mark a correction as package-workflow.

## [0.3.2] - 2026-06-28

### Changed

- Improved `pi_analyze_session` triage with date/session include-exclude filters, heuristic package-workflow/project-specific correction filtering, failure signature grouping, and candidate theme status labels.

## [0.3.1] - 2026-06-27

### Changed

- Updated `/closeout-card` so the default merge target is the current/source Plastic branch's parent branch instead of `/dev`.

## [0.3.0] - 2026-06-27

### Added

- Added `pi_analyze_session`, a session JSONL analysis tool that reports package/tool utilization, skill/reference loads, failure samples, and user-correction evidence.

## [0.2.0] - 2026-06-27

### Added

- Added `/analyze-session` for reviewing Pi session JSONL files and extracting package-utilization lessons and improvement opportunities.
- Added `/closeout-card` for the common Codecks review plus Plastic merge-to-target closeout workflow.

## [0.1.0] - 2026-04-27

### Added

- Initial Pi Extras package with `/continue` and the `streamlining-skills` package-maintenance skill.
