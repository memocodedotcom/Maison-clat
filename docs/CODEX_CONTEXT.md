# Persistent Project Context

Last updated: 2026-09-04

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

- Stack: React 18, TypeScript, Vite 5, Tailwind CSS.
- Production build succeeds with `npm run build`.
- Two development-tool dependency findings were reported on 2026-09-04: one high and one moderate in the Vite/esbuild chain.
- There is no backend, database, authentication, real availability, real messaging, real calendar integration, or AI service.
- Application data is imported from `src/data/mockData.ts` and held in memory by `src/services/store.ts`.
- Refreshing the browser discards user-created changes.
- The admin interface is directly accessible through `#/admin/*`.
- Many actions are alerts or simulated state changes.
- No automated test suite or CI workflow exists at this baseline.

## Important known defects

- Booking steps 4 and 5 duplicate the same date/time screen.
- Booking dates and weekday labels are hard-coded and inconsistent.
- Treatment-specific questions are not conditional.
- The initial selected area does not match an available option.
- Last name is labelled required but is not enforced.
- Price and potential-value logic do not match the displayed service catalogue.
- Future bookings increment the “appointments today” KPI.
- The booking completion callback is declared but unused.
- Invalid admin tab values can produce an empty content area.
- Admin navigation disappears on smaller screens without a mobile replacement.
- Several card-like controls are not keyboard-accessible.
- Calendar, WhatsApp, automation, and numerous admin actions are simulated.

## Decisions already made

- Preserve the existing React/TypeScript prototype as the presentation layer.
- Move authoritative business rules and data to a server-backed system.
- Use managed PostgreSQL unless discovery identifies a firm constraint.
- Use official provider APIs for messaging.
- Add AI only after the underlying operational data is real and measurable.
- Clearly label demo functionality until its integration is complete.
- Keep the original prototype recoverable through the baseline tag.

## Next recommended action

Run Phase 0 discovery and convert its answers into an agreed MVP scope. In parallel, the first safe engineering milestone is Phase 1 stabilization: tests and CI, routing, booking correctness, mobile navigation, accessibility, dependency upgrade, and visible demo labels.

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

