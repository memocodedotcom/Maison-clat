# Maison Éclat Production Implementation Plan

## Implementation status

Phase 1 stabilization began on 2026-09-04. Completed in the first implementation slice:

- truthful global demo labelling and booking-specific simulation notices;
- five-step booking flow with treatment-specific options and aligned demo pricing;
- generated clinic dates with correct weekday labels;
- accessible selection buttons, labelled form controls, inline validation, and keyboard focus styling;
- working `.ics` calendar download;
- correct “appointments today” handling for future bookings;
- typed route validation and a not-found page;
- mobile admin navigation;
- Vite build-tool upgrade with zero reported dependency vulnerabilities;
- ESLint, TypeScript, Vitest, a unified quality command, and GitHub Actions CI;
- automated coverage for booking catalogue rules, dates, validation, calendar generation, and routes.

Still open in Phase 1: systematic accessibility review of the remaining dashboard components, replacement of remaining alert-only actions, complete loading/empty/error states, and staging environment configuration.

Phase 2 foundation began on 2026-09-04. Completed in the initial backend slice:

- explicit demo and production environment modes;
- fail-closed production configuration handling;
- lazy-loaded Supabase authentication and protected admin portal;
- production sign-in and sign-out controls without public signup;
- managed PostgreSQL migration for organizations, roles, locations, services, rooms, availability, clients, leads, appointments, packages, consent, and audit events;
- row-level security policies based on active organization membership and least-privilege roles;
- database-level prevention of overlapping practitioner and room appointments;
- backend setup, bootstrap, verification, and secret-handling guidance.

Still open in Phase 2: apply and validate the migration in a selected development project, generate database types, implement repositories, add role-aware navigation, test policies against real Supabase sessions, and rehearse backup restoration.

Public UI constraint confirmed on 2026-09-05: preserve the existing homepage layout, content, sections, and interactions. Premium refinement may improve surfaces, depth, color, typography rendering, imagery treatment, shadows, and motion without replacing the established experience. Any additional conversion or trust section should be appended separately and reviewed before release.

## 1. Goal

Turn the existing high-fidelity prototype into a secure, reliable, sellable clinic operating system for a real business.

The first commercial release must support one complete workflow reliably:

1. A customer selects an eligible treatment and real available time.
2. The system reserves the slot without conflicts.
3. The clinic receives the appointment and linked customer/lead record.
4. The customer receives a real confirmation.
5. Authorized staff can update attendance, treatment, package, and follow-up status.
6. Every important change is persistent and auditable.

Features outside this workflow should remain visibly marked as preview or demo until connected end to end.

## 2. Product principles

- Never claim an integration or action is live when it is simulated.
- Protect client information by default and expose only what each role needs.
- Treat appointments, prices, consent, packages, and revenue as server-owned data.
- Prefer a smaller reliable MVP over a large dashboard of incomplete features.
- Make all important actions reversible or auditable.
- Validate workflows with clinic staff throughout development.

## 3. Recommended production architecture

Retain React and TypeScript for the web application. Replace the in-memory store with a server-backed system.

Recommended components:

- Frontend: React, TypeScript, Vite, React Router, TanStack Query, React Hook Form, and a schema validator such as Zod.
- API: a TypeScript server layer or managed server functions. Business rules must not live only in the browser.
- Database: managed PostgreSQL with migrations, automated backups, row-level access controls, and separate development/staging/production environments.
- Authentication: managed authentication with invitation-based staff onboarding, secure sessions, password reset, and optional MFA for privileged roles.
- Messaging: official Meta WhatsApp Business Cloud API through a server-side integration with delivery-status webhooks.
- Calendar: standards-based `.ics` downloads first; Google/Microsoft account integration can follow when there is a validated business need.
- Files: private object storage using short-lived signed URLs for client and treatment media.
- Operations: error monitoring, structured logs, uptime checks, audit events, dependency scanning, and automated CI/CD.

Final vendors should be selected after confirming budget, data-location requirements, current clinic software, WhatsApp ownership, expected volume, and local professional advice on privacy and medical-record obligations.

## 4. Delivery phases

### Phase 0 — Discovery, scope, and truthful demo (Week 1)

Deliverables:

- Interview the owner, receptionist, practitioner, and sales/marketing operator.
- Document the existing booking, confirmation, no-show, package, payment, and follow-up processes.
- Define the source of truth for customers, availability, prices, appointments, packages, and revenue.
- Identify required languages, branches, rooms, equipment, working hours, cancellation rules, deposits, and taxes.
- Mark all simulated actions and metrics as `Demo` or disable them.
- Replace unverified staff/client/before-and-after imagery and review all public claims.
- Agree on MVP scope, success metrics, pilot clinic, budget, and named decision owner.

Exit criteria:

- Signed MVP scope and workflow map.
- Written list of integrations and account owners.
- Approved data and consent requirements.
- No screen presents a simulation as an operational feature.

### Phase 1 — Stabilize the prototype (Weeks 1–2)

Deliverables:

- Replace hash parsing and unsafe route casting with typed routing and a not-found screen.
- Add working mobile navigation for the admin area.
- Correct booking steps, dynamic treatment questions, dates, weekday labels, prices, and required fields.
- Implement accessible controls, form labels, keyboard navigation, dialog focus handling, and inline errors.
- Add loading, empty, success, and failure states.
- Upgrade vulnerable tooling and add linting, formatting, unit tests, and CI checks.
- Add environment configuration and development/staging separation.

Critical booking corrections:

- Generate dates from the current clinic timezone rather than hard-coding them.
- Fetch availability for the chosen treatment, practitioner, room, and equipment.
- Validate phone numbers and email addresses on client and server.
- Derive duration and price from versioned service records.
- Do not increment “today” metrics for future appointments.
- Call the completion handler only after the server confirms the booking.

Exit criteria:

- All CI checks pass.
- Core pages work at mobile and desktop sizes.
- Booking rules have automated tests.
- No high-severity dependency findings remain without a documented exception.

### Phase 2 — Data model, authentication, and permissions (Weeks 2–4)

Core entities:

- organizations and locations;
- users, roles, staff profiles, and invitations;
- clients, leads, contact methods, tags, notes, and consent records;
- services, service variants, prices, durations, rooms, equipment, and staff eligibility;
- availability rules, exceptions, appointments, and appointment status history;
- packages, purchases, sessions, usage, refunds, and expiry;
- conversations, messages, templates, delivery events, and opt-outs;
- files, before/after cases, consent scope, and revocation;
- payments and revenue events when payments enter MVP scope;
- audit events.

Initial roles:

- Owner: full business configuration and reporting.
- Manager: daily operations, team, customer, and reporting access.
- Receptionist/CRM: leads, clients, messages, and appointments.
- Practitioner: assigned schedule and permitted client/treatment information.
- Marketing: campaigns and approved media, without unrestricted clinical information.

Implementation requirements:

- Server-enforced authorization for every read and write.
- No sensitive records embedded in the public JavaScript bundle.
- Append-only audit events for access, consent, appointment, package, and configuration changes.
- Database migrations and seed data that is clearly fictional.
- Automated backups plus a tested restoration procedure.

Exit criteria:

- Users can sign in and access only authorized data.
- Data survives refresh, logout, and deployment.
- Permission tests cover every role and sensitive resource.
- Backup restoration succeeds in staging.

### Phase 3 — Real booking and clinic operations (Weeks 4–6)

Deliverables:

- Configurable catalogue, prices, durations, prerequisites, rooms, and equipment.
- Staff schedules, breaks, holidays, location hours, and manual exceptions.
- Atomic availability checks and booking creation to prevent double booking.
- Reschedule, cancellation, late cancellation, no-show, arrival, treatment, and completion workflows.
- Customer deduplication by normalized contact details.
- Appointment history and internal notes with role restrictions.
- Package purchase, session consumption, remaining balance, expiry, and renewal workflow.
- Calendar `.ics` file containing correct timezone and appointment information.

Exit criteria:

- Concurrent attempts cannot reserve the same resource.
- Staff can complete a full working day in staging without spreadsheet workarounds.
- Prices, appointment status, package balance, and operational reports reconcile.

### Phase 4 — Messaging and automations (Weeks 6–8)

Deliverables:

- Official WhatsApp Business integration using approved templates.
- Inbound and outbound webhook handling with signature verification and idempotency.
- Confirmation, reminder, reschedule, cancellation, follow-up, review, and package-renewal templates.
- Delivery, failure, response, and opt-out status.
- Staff handoff and assignment.
- Automation safety controls: preview, approval, audience estimate, rate limits, pause, and audit log.
- Retry and dead-letter handling for failed asynchronous jobs.

Exit criteria:

- A real test customer completes booking-to-confirmation and reminder flows.
- Messages are never marked delivered before provider confirmation.
- Opt-out and template rules are enforced.
- Failed messages are visible and recoverable.

### Phase 5 — Reporting and responsible AI (Weeks 8–10)

Deliverables:

- Define every metric, its source event, timezone, attribution window, and exclusions.
- Compute revenue, lead conversion, show-up, rebooking, package usage, and campaign results from stored events.
- Reconciliation view for incomplete or inconsistent records.
- Export of operational and financial summaries.
- Introduce AI only for a narrow, measurable use case, initially message drafting or daily summarization.
- Require staff review before customer-facing AI messages are sent.
- Record AI model/version, prompt category, source records, output, reviewer, and outcome without exposing unnecessary client data.

Exit criteria:

- Dashboard totals reconcile with underlying records.
- Every metric has an agreed definition.
- AI can be disabled without breaking core operations.
- AI suggestions are labelled and reviewed rather than presented as facts.

### Phase 6 — Pilot, sales readiness, and launch (Weeks 10–12)

Deliverables:

- Structured pilot with one clinic location and a limited staff group.
- Data migration rehearsal and rollback plan.
- User acceptance test scripts for each role.
- Security and privacy review by appropriate professionals.
- Performance, recovery, authorization, and failure-mode tests.
- Staff training, onboarding guide, administrator guide, support process, incident procedure, and service-status communication.
- Product demo environment containing fictional data only.
- Commercial package: scope, pricing, setup fee, recurring fee, support boundaries, uptime target, data ownership, termination/export process, and integration limitations.

Pilot targets to agree with the business:

- booking completion rate;
- response time to new leads;
- appointment confirmation and show-up rate;
- reduction in booking conflicts and manual entry;
- package renewal rate;
- message delivery and failure rate;
- staff time saved;
- support issues per active user.

Exit criteria:

- Business owner signs off on user acceptance testing.
- No unresolved critical security or data-loss issue.
- Recovery procedure has been rehearsed.
- Product claims and sales demonstration match actual capabilities.

## 5. Initial implementation backlog

### P0 — Must complete before any real client data

- Authentication and server-enforced roles.
- Persistent database and migrations.
- Remove public access to the admin area.
- Real availability with double-booking protection.
- Server-side validation and authoritative pricing.
- Consent, audit, backup, and restoration foundations.
- Remove or label every simulated integration and metric.
- Replace misleading stock before/after and staff/client imagery.
- Resolve dependency vulnerabilities and establish CI.

### P1 — Required for a sellable pilot

- Complete appointment lifecycle.
- Customer and lead deduplication.
- Package/session ledger.
- Official WhatsApp confirmation and reminder flow.
- Mobile admin navigation and accessibility baseline.
- Operational reporting from real events.
- Monitoring, error handling, retries, and support tools.
- Onboarding, training, contract scope, and support process.

### P2 — Post-pilot expansion

- Advanced campaigns and segmentation.
- Review-request workflows.
- Multi-location support if validated.
- Payment/deposit integration.
- Google or Microsoft calendar synchronization.
- AI daily brief and next-best-action recommendations.
- Advanced attribution and staff performance analytics.

## 6. Testing strategy

- Unit: prices, durations, date generation, phone normalization, status transitions, package balances, permissions, and metric calculations.
- Integration: database transactions, webhooks, retries, templates, audit events, and storage permissions.
- End to end: booking, conflict handling, confirmation, reschedule, cancellation, check-in, completion, package consumption, and logout/access denial.
- Accessibility: keyboard-only journeys, focus behavior, labels, contrast, zoom, and screen-reader smoke tests.
- Operational: backup restoration, provider outage, delayed webhook, duplicate event, expired session, unavailable practitioner, and partial deployment failure.

No critical workflow is complete until its success, failure, retry, authorization, and audit behavior are tested.

## 7. Commercial readiness checklist

Before selling the system as operational:

- Maintain a feature matrix distinguishing live, beta, preview, and planned functionality.
- Use a fictional, isolated demo environment.
- Provide clear implementation and recurring costs.
- State customer responsibilities for Meta accounts, templates, phone numbers, content, consent, and staff access.
- Define support hours, severity levels, response targets, backups, export, and termination handling.
- Prepare an onboarding checklist and data-import template.
- Demonstrate the real booking-to-confirmation workflow, not alert boxes or mock numbers.
- Obtain professional review of privacy, treatment imagery, marketing claims, and applicable clinic obligations.

## 8. Delivery governance

- Work in short-lived branches and merge only through reviewed pull requests.
- Every pull request must state the user outcome, risk, tests, migration impact, and rollback method.
- Tag each pilot and production release.
- Keep `docs/CODEX_CONTEXT.md` current after every completed milestone or important decision.
- Record architecture decisions in `docs/decisions/` when they become binding.
- Never rewrite or delete the baseline tag.

## 9. Definition of done

A feature is done only when:

- it works for the intended role on mobile and desktop;
- authorization and validation are enforced server-side;
- success and failure behavior are visible to the user;
- automated tests cover its important business rules;
- changes are logged where required;
- monitoring can reveal failures;
- documentation and demo claims are updated;
- a safe rollback or disable path exists.
