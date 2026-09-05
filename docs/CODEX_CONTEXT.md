# Persistent Project Context

Last updated: 2026-09-05

This file is the concise restart point for future contributors and Codex sessions. Read it before making changes, then read `IMPLEMENTATION_PLAN.md` for the full roadmap. Update this file whenever a milestone or binding decision changes.

## Mission

Convert Maison Éclat from a high-fidelity clinic Revenue OS prototype into a secure, reliable, sellable product for a real business. Build one complete booking-to-clinic-to-confirmation workflow before expanding the feature surface.

## Immutable starting point

- Baseline commit: `1ea4c870fd0f880165daa22ab7a3c4523079b810`
- Baseline tag: `codex-baseline-2026-09-04`
- Planning branch: `codex/production-readiness-plan`
- Baseline meaning: original prototype before production-readiness planning or implementation.

Do not move or delete the baseline tag.

Safe inspection:

```bash
git show codex-baseline-2026-09-04
git diff codex-baseline-2026-09-04..HEAD
```

Safe recovery without changing an existing branch:

```bash
git switch -c recovery/from-original codex-baseline-2026-09-04
```

## Current verified state

- Stack: React 18, TypeScript, Vite 8, Tailwind CSS, Three.js with React Three Fiber, and an optional Supabase client.
- `npm run check` passes: TypeScript, ESLint, 14 unit tests, and the production build.
- `npm audit` reports zero known vulnerabilities after the Vite/toolchain upgrade on 2026-09-04.
- A Supabase/PostgreSQL backend foundation and production authentication gate exist in the repository, but no live Supabase project is connected yet.
- There is no real availability, messaging provider, external calendar synchronization, or AI service.
- Application data is imported from `src/data/mockData.ts` and held in memory by `src/services/store.ts`.
- Refreshing the browser discards user-created changes.
- The admin interface is directly accessible through `#/admin/*` only in explicit demo mode; production mode fails closed without a valid Supabase session.
- Many actions are alerts or simulated state changes.
- Vitest coverage and GitHub Actions CI are active for the current branch.

## Important known defects

- No backend is deployed or connected yet; no real persistent clinic data is used by the application.
- A Supabase/PostgreSQL schema and production authentication gate now exist in the repository, but the migration has not been applied to a real development project and dashboard data still comes from the demo store.
- Availability, WhatsApp, automation, analytics, and numerous admin actions remain simulated.
- Remaining dashboard alerts need real workflows or explicit per-action demo treatment.
- Accessibility remediation has begun in booking but has not yet been completed across all dashboard components.
- Stock imagery and public medical/performance claims still require business, licensing, consent, and professional review.

## Decisions already made

- Preserve the existing React/TypeScript prototype as the presentation layer.
- Move authoritative business rules and data to a server-backed system.
- Use managed PostgreSQL unless discovery identifies a firm constraint.
- Use official provider APIs for messaging.
- Add AI only after the underlying operational data is real and measurable.
- Clearly label demo functionality until its integration is complete.
- Keep the original prototype recoverable through the baseline tag.

## Next recommended action

Apply the migration to an isolated Supabase development project, validate all row-level policies with test accounts, and generate TypeScript database types. Then implement service, availability, client, and appointment repositories before enabling real public booking.

Do not connect real client data until the Phase 2 authentication, authorization, storage, consent, audit, and backup foundations are complete.

## Resume checklist

1. Confirm the active branch and clean working tree.
2. Read this file and `docs/IMPLEMENTATION_PLAN.md`.
3. Compare current work with `codex-baseline-2026-09-04`.
4. Review the latest commit and any open implementation milestone.
5. Run install, build, tests, and dependency audit before changes.
6. Implement one roadmap slice with acceptance criteria and rollback notes.
7. Update this file when verified state or decisions change.

## Milestone log

- 2026-09-04: original prototype preserved at `codex-baseline-2026-09-04`.
- 2026-09-04: production-readiness roadmap and persistent context created.
- 2026-09-04: first stabilization slice implemented: booking correctness, demo labelling, typed routing, mobile admin navigation, accessibility foundations, tests, CI, Vite 8, and zero reported dependency vulnerabilities.
- 2026-09-04: Supabase production foundation added: environment modes, fail-closed admin authentication, organization/role schema, row-level security, scheduling conflict constraints, consent, audit metadata, and backend setup guide.
- 2026-09-05: public homepage redesigned as a premium dark/glass experience with a lazy Three.js signature visual, treatment discovery, concern-based guidance, trust architecture, evidence-first results placeholders, FAQ, and stronger conversion paths. Unverified testimonials, performance figures, and stock before/after claims remain intentionally excluded.
