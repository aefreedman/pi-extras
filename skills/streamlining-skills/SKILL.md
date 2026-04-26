---
name: streamlining-skills
description: Reduce skill context cost by moving heavy guidance into references, standardizing sections, and keeping skill frontmatter consistent
---
# Streamlining Skills

Purpose: refactor skills to minimize context while keeping workflows clear.

## When to Use

- After adding or expanding skills.
- When SKILL.md files become long or repetitive.
- When multiple skills duplicate the same guidance.

## External File Loading

CRITICAL: Use relative path references and load files only when needed for the current step.

- Do NOT preemptively load all reference files.
- Treat loaded references as mandatory instructions for the active task scope.
- Follow nested `@...` references recursively only when relevant.
- For long files, use Read with `offset`/`limit` to load only needed sections.

## Workflow

1. Inventory skills under ../*/SKILL.md.
2. Identify heavy content to move into references/assets.
3. Keep SKILL.md as a thin spine with steps and references.
4. Normalize headings and remove redundant sections.
5. Standardize attribution byline text.
6. Validate frontmatter against the package's Pi-facing frontmatter conventions.

## Reference Files (Load On Demand)

1. Checklist -> ../streamlining-skills/references/checklist.md
2. Frontmatter rules -> ../streamlining-skills/references/frontmatter.md
3. Splitting guidance -> ../streamlining-skills/references/ref-splitting.md
4. Section normalization -> ../streamlining-skills/references/section-normalization.md
5. Attribution guidance -> ../streamlining-skills/references/attribution.md
6. Artifact path contract -> ../_shared/references/artifact-path-contract.md
