---
description: Add or update a Codecks review for a completed card, then safely merge the current Plastic branch to a target branch
argument-hint: "<card-code> [target-branch]"
---
Close out completed work for Codecks card `$1` and merge the current Plastic branch into `${2:-/dev}`.

This command is explicit user intent to write a Codecks review/update and perform the merge/checkin workflow. Be smart and conservative: inspect current state, avoid duplicate review threads, validate before merging, and stop on ambiguity.

## Inputs

- Card: `$1` required. If missing, infer from the current branch name or recent checkin messages only if unambiguous; otherwise ask.
- Target branch: `${2:-/dev}`.

## Workflow

1. Load the `using-codecks` and `using-plastic` skills if available.
2. Inspect the current Plastic branch and status.
   - If tracked pending changes exist, do not merge yet. Summarize what needs checkin/validation first.
   - If current branch already equals the target branch, ask for the source branch unless it is explicit in arguments/context.
3. Inspect the card with `codecks_card_get`.
4. Gather implementation/validation evidence from the current chat context, recent test logs, `plastic_status`, and recent checkins. Do not invent validation.
5. Review-thread handling:
   - Call `codecks_card_list_resolvables(cardId, contexts=["review"], includeClosed=false)`.
   - If exactly one open review exists, reply to it with `codecks_card_reply_resolvable` instead of opening a new review.
   - If no open review exists, open one with `codecks_card_add_review`.
   - If multiple open reviews exist, stop and ask which thread to use.
6. Merge workflow:
   - Prefer `plastic_mergeToBranch(source=<current-branch>, target=<target>, cardRef=<card>, format="json")` when available.
   - If unavailable, use the safe manual sequence: `plastic_switchBranch(target, pendingChanges="cancel")`, `plastic_update`, `plastic_merge(source)`, inspect `plastic_status`, then `plastic_checkin` the merge result.
   - Never use interactive `cm merge` or `cm diff`.
7. After merge/checkin, report:
   - review action taken,
   - source and target branches,
   - merge/checkin result,
   - remaining pending status,
   - any follow-up risks.

## Review message template

Use a compact evidence-based review body:

```text
Implementation ready for review.

Summary:
- ...

Validation:
- ...

Branch/checkins:
- ...
```

If validation is incomplete, say so plainly and do not overstate readiness.
