# Streamlining Checklist

## Audit

- Confirm every skill has required frontmatter.
- Remove unsupported frontmatter fields.
- Find duplicated content across SKILL.md files.
- Locate large blocks (examples, error handling, templates).

## Refactor

- Move heavy content to `references/` or `assets/`.
- Keep SKILL.md as a short spine (steps + references).
- Replace duplicate sections with a single reference.
- The most important information should be at the beginning of the file. These are the instructions the agent will encounter first.
- Keep SKILL.md to 500 lines or less.

## Standardize

- Use `## Reference Files (Load On Demand)` and an `On-demand` list if needed.
- Remove `Integration` sections unless required for behavior.
- Use consistent naming and concise descriptions.

## Verify

- Ensure references are reachable and paths are correct.
- Confirm SKILL.md matches directory name.
- Scan for remaining duplication.
- Verify artifact-path invariants from ../../_shared/references/artifact-path-contract.md are preserved.
