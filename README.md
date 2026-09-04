# Maison Éclat Revenue OS

Maison Éclat is currently a high-fidelity React prototype for an aesthetic-clinic customer experience and internal revenue operating system.

The repository demonstrates the intended product and workflows, but it does **not** yet contain production authentication, persistent storage, real-time scheduling, WhatsApp delivery, calendar integration, or AI services. Demo data and simulated actions must not be represented as live capabilities.

## Current status

- Customer website and treatment pages
- Seven-step booking prototype
- Owner and team dashboard
- Leads, pipeline, messages, appointments, clients, packages, automations, reviews, analytics, staff, and AI-brief mockups
- Shared in-memory state for cross-screen demonstrations
- Successful TypeScript and Vite production build

## Project documents

- [Production implementation plan](docs/IMPLEMENTATION_PLAN.md)
- [Persistent project context and recovery guide](docs/CODEX_CONTEXT.md)

## Local development

```bash
npm ci
npm run dev
```

Quality check:

```bash
npm run build
```

## Safety baseline

The immutable Git tag `codex-baseline-2026-09-04` identifies the original prototype before production-readiness work began. See the recovery guide before changing history.

