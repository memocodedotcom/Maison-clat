# Premium Public Experience

## Design direction

The public site uses a cinematic luxury-clinical direction: obsidian surfaces, warm ivory type, restrained gold accents, deep green atmospheric light, and translucent glass layers. The 3D sculpture is a brand signature rather than decoration on every section. It is loaded separately so the core page remains usable before the scene arrives.

## Implemented information architecture

1. Hero: clear positioning, diagnostic call to action, WhatsApp, and safety expectations.
2. Trust rail: personalized evaluation, adapted parameters, documented protocols, and location.
3. Treatment discovery: service families, starting prices, durations, and booking routes.
4. Concern concierge: interactive orientation with an explicit non-diagnostic disclaimer.
5. Method: diagnostic, protocol, documented session, and follow-up.
6. Results: standards for comparable imagery and consent, with no fabricated cases.
7. Trust proof: team, equipment, reviews, and policies that must be verified.
8. FAQ: practical questions and consent language.
9. Contact: booking, WhatsApp, and clinic location.

## Commercial content gate

Do not replace the current honest placeholders until the business supplies verifiable material. Required items are:

- original, licensed photography of the clinic and equipment;
- practitioner names, roles, qualifications, and approved portraits;
- confirmed address, hours, phone number, prices, durations, and cancellation rules;
- direct verified review profile and permission to reproduce selected reviews;
- consented before/after cases with consistent lighting, timing, treatment context, and revocation tracking;
- approved privacy, image-consent, terms, and treatment-information pages;
- professional review of clinical wording and jurisdiction-specific obligations.

## Performance and accessibility rules

- Keep Three.js deferred and limited to the hero.
- Respect reduced motion and retain a CSS fallback while the scene loads.
- Never place important meaning exclusively in animation or imagery.
- Preserve visible focus, semantic buttons, labelled navigation, and readable contrast.
- Replace remote ambience photography with optimized local AVIF/WebP assets before launch.
- Test the public booking path on representative mobile hardware before release.

## Rollback

The immutable original is tagged `codex-baseline-2026-09-04`. To inspect or recover it without changing the working branch, create a new branch from that tag. The premium redesign itself can be reverted independently through its implementation commit.
