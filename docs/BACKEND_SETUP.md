# Production Backend Setup

This repository now supports two explicit modes:

- Demo mode (`VITE_DEMO_MODE=true`): fictional in-memory data and simulated integrations.
- Production mode (`VITE_DEMO_MODE=false`): the admin portal requires a Supabase session. The remaining screens will be migrated from mock data to database repositories in subsequent milestones.

## 1. Create isolated environments

Create separate Supabase projects for development, staging, and production. Do not use real client data in development or in the sales demo.

Before selecting regions or applying the schema, confirm data-location, retention, consent, medical-record, and access requirements with the business and appropriate professionals.

## 2. Apply the schema

Install the Supabase CLI through the official method for the development environment, authenticate, and link the intended project. Review the migration in `supabase/migrations/202609040001_core.sql`, then apply it first to development.

The migration provides:

- organization isolation;
- staff memberships and roles;
- locations, services, variants, rooms, and availability rules;
- clients and leads;
- appointments with practitioner and room conflict protection;
- packages and individual sessions;
- explicit consent records;
- append-only audit metadata;
- row-level security policies.

Do not apply an unreviewed migration directly to production.

## 3. Bootstrap the first owner

Account signup is intentionally absent from the web application. Create the first staff user through an approved administrative process, then insert:

1. a profile;
2. an organization;
3. an active membership with the `owner` role;
4. the initial location.

Do this through a restricted server/admin environment. Never expose the Supabase service-role key in the browser, repository, Vercel variables prefixed with `VITE_`, screenshots, or support messages.

## 4. Configure the web application

Copy `.env.example` to an ignored local environment file and provide the public project URL and public anon key:

```dotenv
VITE_DEMO_MODE=false
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

Production mode fails closed: without both public values, the admin portal displays a configuration error instead of exposing the demo dashboard.

## 5. Verify before connecting real data

- Confirm unauthenticated visitors cannot read any protected table.
- Test every role against every table and operation.
- Confirm suspended memberships lose access.
- Attempt cross-organization reads and writes and verify denial.
- Attempt overlapping practitioner and room bookings and verify rejection.
- Test backup restoration in staging.
- Review audit retention and access.
- Confirm the demo deployment is isolated from production.

## 6. Next implementation slice

The next code milestone should introduce typed repositories for services, availability, clients, and appointments, followed by an authenticated server-side booking function. Anonymous public booking must include server-side validation, rate limiting, idempotency, conflict handling, and minimal data exposure before it replaces the demo booking store.

