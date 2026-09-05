# Claude Code Backend Implementation Plan

## Objective

Connect Maison Éclat to Supabase without changing the approved user interface. Deliver one trustworthy vertical workflow first:

1. A visitor requests real availability.
2. The visitor submits a validated booking.
3. The server derives the authoritative duration and price.
4. The database creates or matches the client and reserves the appointment atomically.
5. Authorized staff see the booking in the existing admin screens.
6. Important changes are persistent, organization-scoped, and auditable.

The current application is a truthful demo. Supabase authentication and a schema foundation exist, but the dashboards and booking completion still use `src/services/store.ts` and fictional data.

## Current implementation boundary

Already present:

- React 18, TypeScript, Vite, and an explicit demo/production environment switch.
- Lazy Supabase client creation in `src/lib/supabase.ts`.
- Production admin authentication gate with no public staff signup.
- Core schema migration in `supabase/migrations/202609040001_core.sql`.
- Organization membership, roles, RLS, appointment overlap constraints, consent, and audit foundations.
- Unit tests, linting, type checking, production build, and GitHub Actions.

Not yet live:

- No connected Supabase project has been verified in repository documentation.
- No generated database TypeScript types are committed.
- Public service catalogue and availability still come from frontend constants.
- Booking writes only to the in-memory demo store.
- Admin dashboards read mock records rather than Supabase.
- No server-side public booking endpoint, rate limiting, CAPTCHA, idempotency, or notification provider exists.
- No staging backup restoration or role-policy test evidence exists.

## Phase 0 — Establish a safe Supabase workspace

Claude Code must use its Supabase access to inspect before modifying.

Tasks:

1. Confirm the intended Supabase project name, reference ID, region, and environment. It must be development or staging, not production.
2. Confirm the current Git branch and clean working tree.
3. Inspect remote migrations, tables, functions, policies, authentication settings, and extensions.
4. Compare remote state with `supabase/migrations/202609040001_core.sql`.
5. Record whether the foundation migration is unapplied, fully applied, or divergent.
6. Export a schema-only snapshot or create a recoverable database branch before applying changes.
7. Confirm that email/password staff login is configured and public self-signup is disabled or operationally restricted.

Safety rules:

- Do not run `db reset`, drop schemas, delete a project, or repair migration history without explicit confirmation of the exact development target.
- Never paste secret values into repository files or command output saved in documentation.
- If remote state diverges, create a reconciliation plan. Do not force the local migration history over the remote project.

Exit evidence:

- Project reference and environment recorded without secrets.
- Migration comparison recorded.
- Recovery method confirmed.
- No production project modified.

Suggested commit: `docs: record Supabase development baseline`

## Phase 1 — Validate and harden the database foundation

Review the current migration before applying it. Create follow-up migrations for corrections; do not edit a migration already applied remotely.

Required review:

- Verify `btree_gist` support and both appointment exclusion constraints.
- Verify every foreign key includes the correct organization boundary.
- Test all RLS policies as unauthenticated, owner, manager, receptionist, practitioner, marketing, suspended, and cross-organization users.
- Confirm practitioners can only read assigned appointments and permitted client fields.
- Confirm marketing cannot read clinical notes, unrestricted clients, appointments, or internal-photo consent.
- Confirm `audit_events` cannot be inserted, updated, or deleted by normal authenticated users.
- Confirm security-definer functions have fixed `search_path`, minimal grants, and no privilege escalation.
- Confirm suspended membership immediately removes access.
- Decide retention rules for audit, consent evidence, appointment notes, and archived clients with the business.

Additions expected in a new migration:

- availability exceptions for holidays, closures, practitioner absence, and one-off opening hours;
- service-to-practitioner eligibility;
- optional resource/equipment requirements where a room alone is insufficient;
- an idempotency record for public booking attempts;
- appointment status history rather than relying only on the current status;
- database functions required for atomic availability calculation and booking creation;
- indexes found necessary by query plans;
- audit coverage for permission, appointment-status, package-session, and consent changes.

Do not add fields merely because they may be useful later. Each new field must support the first booking-to-admin workflow.

Exit evidence:

- Migration applies from empty local state.
- Migration applies to the isolated remote development project.
- SQL policy tests prove allowed and denied operations.
- Two concurrent attempts cannot reserve the same practitioner or room.

Suggested commit: `feat(db): harden scheduling and authorization model`

## Phase 2 — Generate types and introduce repository boundaries

Generate TypeScript definitions from the verified remote schema and commit them in a stable location such as `src/types/database.generated.ts`.

Add these interfaces behind the current UI:

- `ServiceRepository`
- `AvailabilityRepository`
- `ClientRepository`
- `AppointmentRepository`
- `LeadRepository`

Provide two implementations:

- demo repositories backed by the existing fictional store;
- Supabase repositories used only when `VITE_DEMO_MODE=false` and configuration is valid.

Rules:

- Components must not contain raw Supabase queries.
- Centralize database-to-view-model mapping.
- Keep currency in minor units and convert only at display boundaries.
- Use ISO timestamps in storage and `Africa/Casablanca` for clinic presentation.
- Preserve existing UI-facing types until each screen can be migrated safely.
- Return explicit loading, empty, authorization, validation, conflict, and infrastructure errors.
- Abort stale requests where relevant and avoid duplicate fetches.

First read-only integration:

1. Load active services and variants.
2. Load appointments for the authorized organization and selected day.
3. Load the minimum client/lead data required by the existing admin views.
4. Keep unsupported dashboards visibly in demo/preview state.

Exit evidence:

- No component imports the Supabase client directly.
- Demo mode still works without network access.
- Production mode reads verified development data after authentication.
- Cross-organization records cannot appear even if a client query is manipulated.

Suggested commit: `feat(data): add typed Supabase repositories`

## Phase 3 — Build the public availability API

The browser must not receive staff-only tables or unrestricted schedules. Implement a narrow server endpoint, preferably a Supabase Edge Function backed by database functions.

Input:

- public location identifier;
- service variant identifier;
- requested date range;
- optional practitioner preference.

Server responsibilities:

- validate identifiers and date-range limits;
- use only active locations, variants, eligible practitioners, rooms, and rules;
- combine recurring availability with exceptions;
- subtract existing blocking appointments;
- calculate using the location timezone;
- return only bookable slot starts and public presentation fields;
- enforce request limits and structured error responses;
- expose no client records, private notes, staff email addresses, or unrestricted calendars.

The frontend may cache a short-lived availability response, but it must revalidate when booking because a displayed slot is not a reservation.

Exit evidence:

- Anonymous users can read only the narrow public response.
- Invalid or oversized date ranges are rejected.
- closed days, exceptions, service duration, practitioner eligibility, room requirements, and existing appointments affect results correctly.
- Response does not expose protected columns.

Suggested commit: `feat(booking): expose safe public availability`

## Phase 4 — Create an atomic public booking command

Implement a server-controlled booking endpoint plus one transactional database function. Do not let anonymous browser code insert directly into `clients`, `leads`, or `appointments`.

Request fields:

- service variant and selected slot;
- practitioner preference if supported;
- first name, last name, normalized phone, optional email;
- treatment-specific answers currently collected by the booking wizard;
- explicit consent fields required for the booking purpose;
- an idempotency key generated once per submission.

Server workflow:

1. Validate schema, field lengths, phone format, email, consent, and payload size.
2. Apply CAPTCHA/bot protection and rate limiting by a privacy-conscious key.
3. Resolve organization and location from server configuration, never from an unrestricted client value.
4. Load the active variant and derive duration and price from the database.
5. Recheck the slot and eligible resources inside the transaction.
6. Match a client using normalized contact rules or create one without producing duplicates.
7. Create/update the lead and appointment.
8. Record status history, consent, audit metadata, and idempotency result.
9. Return a minimal booking reference and confirmed details.
10. If a notification provider is not connected, return `notificationStatus: pending_setup`; never claim a message was sent.

Conflict behavior:

- A database exclusion violation must become a safe `409 SLOT_UNAVAILABLE` response.
- Reusing the same idempotency key and same payload returns the original success.
- Reusing a key with a different payload is rejected.
- Partial client/lead/appointment writes must roll back together.

Exit evidence:

- Concurrent booking test produces one success and one safe conflict.
- Client-supplied price and duration cannot alter stored values.
- Duplicate submission creates only one appointment.
- Invalid, bot-like, or excessive requests are rejected without leaking internal details.
- The existing booking success screen uses the real server result in production mode.

Suggested commit: `feat(booking): create appointments atomically`

## Phase 5 — Connect the existing admin workflow

Migrate one existing screen at a time without redesigning it.

Order:

1. Appointment calendar: real appointments, loading, empty, error, refresh, and authorization states.
2. Client list/detail: identity, contact details, appointment history, and allowed notes.
3. Lead CRM: real lead stage and next action.
4. Appointment status actions: confirm, arrive, begin treatment, complete, no-show, and cancel through validated server commands.
5. Dashboard counters: derive only from stored events with documented definitions.

Keep packages, WhatsApp, reviews, campaigns, AI, and financial analytics in explicit preview/demo state until each has its own verified backend workflow.

Rules:

- Use authenticated organization context; do not hardcode an organization UUID in UI components.
- Enforce allowed status transitions on the server.
- Use optimistic updates only when rollback and error feedback are implemented.
- Refetch or reconcile after writes.
- Do not expose sensitive client fields to marketing or unrelated practitioners.

Exit evidence:

- A public staging booking appears in the current appointment and client screens.
- Refresh and logout/login preserve correct data.
- Unauthorized routes and records remain inaccessible.
- Staff can safely update the appointment lifecycle and audit events appear.

Suggested commits: one per screen or workflow, beginning with `feat(admin): connect appointment calendar to Supabase`

## Phase 6 — Authentication and staff operations

Implement invitation-only staff onboarding through a restricted administrative path.

Required behavior:

- owner creates or invites staff without exposing service credentials;
- accepted invitations create the profile and organization membership safely;
- role changes and suspensions are audited;
- password reset and session expiration work;
- privileged operations re-check authorization server-side;
- owner access cannot be removed accidentally without a recovery owner.

MFA for owner/manager accounts should be evaluated before production client data is enabled.

Exit evidence:

- Each role sees only the expected navigation and data.
- RLS remains authoritative even if the frontend is modified.
- suspended users lose access on their next request/session refresh.
- invitation and password recovery have been tested in staging.

Suggested commit: `feat(auth): add invitation-based staff access`

## Phase 7 — Test, observe, and release safely

Automated coverage:

- unit tests for mapping, timezone, phone normalization, validation, and status transitions;
- SQL tests for RLS, cross-organization isolation, appointment conflicts, and audit immutability;
- integration tests for availability and booking functions;
- end-to-end staging test from public booking to admin status update;
- failure tests for expired sessions, provider outage, duplicate submission, and conflicts.

Operational readiness:

- structured server logs without clinical/contact payloads;
- error monitoring with environment and correlation IDs;
- uptime check for the public booking endpoint;
- documented backup schedule and successful staging restore;
- migration deployment and rollback/run-forward procedure;
- data export and deletion procedures agreed with the business;
- Vercel production variables configured only after staging sign-off.

Promotion order:

1. Local Supabase tests.
2. Isolated development project.
3. Staging with fictional test clients.
4. Business acceptance test.
5. Security/privacy review.
6. Production migration and configuration.
7. Small controlled launch with monitoring.

Never point the public production site at the development database.

## Environment and secret placement

Browser-safe variables:

```dotenv
VITE_DEMO_MODE=false
VITE_SUPABASE_URL=https://PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=PUBLIC_ANON_KEY
```

Server-only secrets belong in Supabase Edge Function secrets or another server runtime. They must never use the `VITE_` prefix. The service-role key should be avoided where user-scoped access or a narrowly granted database function is sufficient.

Recommended environment separation:

- local/demo: fictional in-memory data;
- development: isolated Supabase project with seeded fictional data;
- staging: separate Supabase project with acceptance-test data;
- production: separate project, real-data controls, backups, monitoring, and restricted access.

## Business inputs required before production

Claude Code must stop and request these rather than inventing them:

- confirmed locations, timezones, operating hours, closures, rooms, and equipment;
- real services, variants, durations, prices, prerequisites, and practitioner eligibility;
- cancellation, deposit, no-show, reschedule, and refund rules;
- staff identities, roles, and account owners;
- consent text, privacy retention, export/deletion, and image policies approved by appropriate professionals;
- WhatsApp Business ownership and approved templates if messaging enters scope;
- definition and owner of every dashboard metric.

## Quality gate for every backend commit

Run and record:

```bash
npm run check
npm audit --audit-level=high
```

Also run the relevant Supabase database, function, and policy tests. A successful frontend build does not prove the backend is secure.

Each commit or pull request must state:

- user outcome;
- database migration impact;
- authorization impact;
- test evidence;
- deployment order;
- rollback or forward-fix method;
- features that remain simulated.

## Definition of backend MVP done

The backend is ready for a controlled pilot only when:

- public availability is derived from real rules and blocking appointments;
- booking is atomic, idempotent, rate-limited, and server validated;
- staff see the same appointment after refresh and reauthentication;
- every role and cross-organization denial is covered by tests;
- consent and important changes are auditable;
- database backup restoration succeeds in staging;
- no secret appears in the client bundle or repository;
- demo, staging, and production data are isolated;
- unsupported integrations remain labelled as demo/preview;
- business acceptance and professional privacy/security review are complete.

## First Claude Code execution prompt

Use this as the initial task after Claude Code has Supabase access:

> Read `CLAUDE.md`, `docs/CODEX_CONTEXT.md`, `docs/CLAUDE_BACKEND_HANDOFF.md`, `docs/BACKEND_SETUP.md`, `docs/decisions/0001-supabase-foundation.md`, and the complete `supabase/migrations/202609040001_core.sql`. Do not change the user interface. Inspect the connected Supabase project and determine whether it is development, staging, or production. Compare its migrations, schema, functions, policies, authentication configuration, and extensions with the repository. Do not apply or repair anything yet. Create a secret-free backend baseline report containing the project reference, environment, drift, security concerns, required decisions, and a safe next migration plan. Run only read-only checks and stop if the target may contain production data.

After that baseline is reviewed, continue one phase at a time. Do not ask Claude Code to implement all phases in a single unreviewed run.
