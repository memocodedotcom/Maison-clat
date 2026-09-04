# ADR 0001: Supabase for the initial production foundation

- Status: Accepted for development validation
- Date: 2026-09-04

## Context

The prototype needs managed PostgreSQL, authentication, organization isolation, row-level authorization, migrations, and a path to server-side functions without building all infrastructure before validating the first clinic.

## Decision

Use Supabase as the initial managed PostgreSQL and authentication platform. Keep domain rules and repository interfaces inside the application rather than coupling UI components directly to vendor calls. Load the browser SDK only in production mode.

The public anon key may be used by the browser together with row-level security. Service-role credentials must remain restricted to trusted server or administrative environments and must never enter the browser bundle.

## Consequences

Benefits:

- faster delivery of authentication, PostgreSQL, migrations, and row-level security;
- development, staging, and production can be isolated;
- database constraints remain portable PostgreSQL concepts;
- the demo application continues to work without external accounts.

Costs and risks:

- data location, retention, backup, recovery, and contractual terms require business review;
- row-level policies become security-critical and require integration tests with real accounts;
- anonymous booking needs a carefully designed server-side function rather than direct unrestricted table writes;
- replacing the provider later requires adapting authentication and repository implementations.

## Validation conditions

This decision should be reconsidered before production if the business identifies incompatible data-location, contractual, integration, scale, or regulatory requirements. It is not approval to store real client data before security, privacy, policy, and recovery testing are complete.

