# Pi Skill Frontmatter Conventions

## Required Fields

- `name`
- `description`

## Allowed Fields

Use additional fields only when the current Pi package tooling or repo conventions actually consume them.

Common examples:
- `license` (optional)
- package- or tool-specific metadata fields when documented locally

## Naming Rules

- 1-64 characters
- lowercase alphanumeric with single hyphen separators
- should match the directory name when the skill lives in its own directory
- regex: `^[a-z0-9]+(-[a-z0-9]+)*$`

## Description Rules

- 1-1024 characters
- specific enough to choose the skill
- concise enough to act as routing metadata rather than a full prompt body
