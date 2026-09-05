# Maison Éclat — Claude Code Entry Point

Read these files before changing the backend:

1. `docs/CODEX_CONTEXT.md` — persistent project state, rollback marker, and current constraints.
2. `docs/CLAUDE_BACKEND_HANDOFF.md` — executable Supabase implementation plan.
3. `docs/BACKEND_SETUP.md` — existing environment and bootstrap guidance.
4. `docs/decisions/0001-supabase-foundation.md` — accepted architecture decision.
5. `supabase/migrations/202609040001_core.sql` — current, unapplied-or-unverified foundation migration.

## Non-negotiable rules

- Preserve the existing customer UI, section order, content, and interactions. Backend work must integrate behind the current interface.
- Work against an isolated Supabase development project first. Never test migrations or destructive commands against production.
- Never place a service-role key in browser code, a `VITE_*` variable, Git, logs, screenshots, or chat.
- Treat the database as authoritative for prices, durations, availability, permissions, appointment state, and package balances.
- Do not remove demo mode. Keep it as an isolated sales/demo environment using fictional data.
- Production mode must fail closed if configuration, authentication, or authorization is missing.
- Add new migrations; do not rewrite a migration already recorded by a remote database.
- Apply least privilege and test row-level security with separate users for every role.
- Do not connect real patient/client data until access, consent, audit, backup, and restoration checks pass.
- Keep the immutable rollback tag `codex-baseline-2026-09-04` intact.

## Required working pattern

For each phase in the handoff plan:

1. Inspect the connected project and record assumptions.
2. Make one bounded implementation slice.
3. Run the local quality gate and relevant Supabase tests.
4. Update `docs/CODEX_CONTEXT.md` with verified facts only.
5. Commit the slice independently with its rollback notes.
6. Stop if an account, business rule, or destructive production decision is missing.

Do not claim a provider, notification, booking, or payment workflow is live until it has succeeded end to end in staging.
