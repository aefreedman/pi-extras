# Pi Extras

Small utility prompts and skills for Pi.

## Contents

- extension tool: `pi_analyze_session` - parse Pi session JSONL files for package utilization, tool failures, skill loads, and improvement evidence
- prompt: `/continue` - resume after an interrupted agent run
- prompt: `/analyze-session` - review a Pi session JSONL for package utilization and package-improvement opportunities
- prompt: `/closeout-card` - add/update a Codecks review and safely merge a Plastic branch to a target branch
- skill: `streamlining-skills` - package-maintenance helper for reducing skill context cost

## Install

From GitHub:

```bash
pi install git:git@github.com:aefreedman/pi-extras.git
```

Local development install:

```bash
pi install <path-to-pi-extras>
```

Project-local install:

```bash
pi install -l <path-to-pi-extras>
```

## Notes

This package is intentionally small. Utility prompts, lightweight tools, and maintenance skills can live here when they do not justify a dedicated package.

`pi_analyze_session` accepts a session id/path, a directory, or `session="all"` with `projectFolder` and `days` for aggregate reviews. It also supports `since`/`until`, `includeSessionIds`/`excludeSessionIds`, `filterMode` (`all`, `package-workflow`, or `project-specific`), `knownFixed`, and `excludeThemes` to reduce already-fixed or project-specific noise during package-improvement reviews. Use `reportMode="compact"` for large historical scans, `reportMode="candidates"` when you only need triage themes, and `limitSessions` to cap displayed session rows without changing aggregate counts.

When maintaining Pi package repos from a coordination root, confirm the working directory contains the target package's `package.json` before running `npm install`, `npm test`, `npm version`, or similar package commands. Coordination roots may intentionally contain child package repositories but no root `package.json`.

## License

MIT. See `LICENSE`.
