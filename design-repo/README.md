# Design-repo: CRM marketing-site clone (fictional brand)

AI-ready design system extracted from a design-faithful clone of a live commercial CRM marketing
website. The clone renders an invented brand, invented copy and original SVG/CSS artwork; no raster
assets. This repo tells a generator **what can be used, how it combines, and how it behaves**:
tokens, primitives, components, semantic section contracts, page templates, a compatibility graph, a
closed Draft-07 PageSpec schema, a semantic validator and adversarial/drift proofs.

Status: `design-review-pending`, `productionApproved: false`. Version 1.1.0.

**Review status, stated plainly:** nothing in this repo has been reviewed or signed off by a human. The wrapper-gate
whitelist entries and the pinned patterns (asset availability, retrieval pins, generated-mode source-identity
patterns) were written and checked by an extraction agent; every `reviewedBy` is an *agent attestation, not a human
sign-off*, and a human should review the pins before this is relied on.

## Counts (recomputed from disk; checked by `extraction/verify_all.py`)

<!-- counts:start -->
| item | count |
|---|---|
| tokens | 351 |
| primitives | 19 |
| components | 30 |
| sections | 67 |
| retrievableSections | 64 |
| templates | 12 |
| mountedRoutes | 19 |
| pendingRoutes | 12 |
| assetRoles | 29 |
| motionPatterns | 31 |
| examplePageSpecs | 13 |
<!-- counts:end -->

## Layout

```
registry.manifest.json      status, versions, counts, entryPoints (all inside this folder)
tokens/00-foundation/       color, typography, radius, elevation, spacing, breakpoint, gradient, motion, motion-patterns
tokens/10-semantic/         semantic colour roles (light/dark refs)
tokens/20-component/        component-scoped token application
tokens/30-layout/           container, grid, header geometry, section rhythm
tokens/themes/              light.json, dark.json (every semantic token resolved)
tokens/llm/                 token-catalog.json, token-policy.json, component-allowlist.json
assets/asset-roles.json     closed asset-role vocabulary with pinned availability + licensing rules
primitives/ components/     building blocks with source citations
sections/                   67 semantic section contracts (source/semantic split, retrievalEligible)
templates/                  templates.json, routes.json (mounted), pending-routes.json (not mounted)
compatibility/graph.json    rhythm/position rules (ids mirrored in the validator)
schema/                     pagespec.schema.json, section-contract.schema.json, example.pagespec.json (reference, home),
                            examples/ (12 generation-safe PageSpecs, one per template), semantic_validate.py,
                            source-brand.json, reference-copy-corpus.json, tests/adversarial_test.py
extraction/                 measured-values.json, verify_all.py, wrapper_gate.py, prove_drift.py, measure_sections.mjs
```

## Use

```bash
python3 extraction/verify_all.py                      # everything (schema, semantic, parity, citations, pins, gate; runs the adversarial suite)
python3 extraction/verify_all.py --write-counts       # rewrite manifest + README counts from disk, then verify
python3 schema/semantic_validate.py my.pagespec.json  # Draft-07 layer + semantic layer for one PageSpec
python3 schema/tests/adversarial_test.py              # every mutation rejected, every control passes
python3 extraction/prove_drift.py [--scratch DIR]     # scratch-copy drift injections are all caught (does not run inside verify_all: it would recurse)
python3 extraction/wrapper_gate.py                    # R9 measured wrapper-height gate
```
Requires Python 3.9+ and `jsonschema` (Draft-07 layer). `node` is used only for the optional token
drift check against the sibling source and for the optional re-measure tool. Citation, token-vs-source and route-table
checks need the clone's `src/`, `tailwind.config.cjs` and `package.json` next to this folder (the repo root); on a
standalone copy they degrade to WARN, never to a silent pass.

## PageSpec modes

- `reference`: faithful reconstruction of the clone (its invented brand, copy and `ref:` artwork allowed as evidence; route must be a mounted route of the template).
- `generated`: a new page for someone else. The validator rejects source identity and content:
  `GENERATED_MODE_BRAND | _CTA | _COPY | _URL | _ASSET | _PERSON | _RATING | _STORE`. Patterns live in one registry
  (`schema/source-brand.json`): the original site's brand/domains/product terms (from the clone specs), the clone's own
  fictional brand, people and companies (extracted from its source), third-party marks found in clone URLs/copy,
  plus a 6-word-shingle check against every rendered string of the clone (`schema/reference-copy-corpus.json`).
  Only `generation-safe` asset roles; links only on `.example` / `.invalid` domains or relative paths; people must be `fictional: true`.

## Licensing / generation guidance

The source is a real company's live site. Its logos, product screenshots, customer logos, people's photos and names,
videos and marketing copy must **never** be reproduced, traced, imitated or paraphrased. Those roles are
`blocked-for-generation` (`brand.source-wordmark`, `logo.source-customer`, `logo.third-party-app`,
`product.source-screenshot`, `person.source-photo`, `media.source-video`, `rating.source-review`, `store.source-badge`).
The clone's own replacements are `reference-only`. Availability is pinned in code in both validators.

## Templates and routes (mounted at extraction)

| route | template |
|---|---|
| `/` | home |
| `/pricing` | pricing |
| `/customers` | customer-hub |
| `/startups` | program-landing |
| `/careers` | careers |
| `/partners/app-partners` | program-landing |
| `/partners/creator-partners` | program-landing |
| `/partners/expert-partners` | program-landing |
| `/contact/sales` | contact-split |
| `/apps` | app-directory |
| `/apps/:slug` | app-detail | measured as /apps/chatgpt, /apps/claude, /apps/slack
| `/blog` | editorial-listing |
| `/engineering/blog` | editorial-listing |
| `/changelog` | changelog-year | measured as /changelog/2026
| `/changelog/:year` | changelog-year | measured as /changelog/2026
| `/help` | help-docs |
| `/help/academy` | help-docs |
| `/help/reference/attio-101` | help-docs |
| `/architecture` | architecture |

Templates: `home`, `pricing`, `customer-hub`, `program-landing`, `careers`, `contact-split`, `app-directory`, `app-detail`, `editorial-listing`, `changelog-year`, `help-docs`, `architecture`. `program-landing` has a `program-body` region (3-8 program blocks in any
order) because the four program pages order their blocks differently; `contact-split` is hero-less by design.

**Pending (not mounted, not modelled):** `/platform/ask`, `/platform/call-intelligence`, `/platform/custom-agents`, `/platform/data`, `/platform/developers`, `/platform/enrichment`, `/platform/mcp`, `/platform/reporting`, `/platform/sequences`, `/platform/universal-context`, `/platform/web-agent`, `/platform/workflows`. See `templates/pending-routes.json`; the cited spec files are future intent only.

## Sections by category

- **CONTENT**: content.app-meta-sidebar, content.article-chapter, content.audience-profiles, content.chapter-header, content.lit-statement, content.prose-split, content.resource-cards, content.scroll-scene, content.team-intro, content.values
- **CONVERSION**: conversion.application-form, conversion.application-notice, conversion.avatar-wall-cta, conversion.build-with-us, conversion.careers-heatmap, conversion.closing-stage, conversion.demo-request-split, conversion.final-cta, conversion.newsletter-signup
- **EDITORIAL**: editorial.article-index, editorial.changelog-entries, editorial.changelog-preview
- **FAQ**: faq.accordion
- **FEATURES**: features.app-store-preview, features.cell-grid, features.context-horizon, features.customizable-workspace, features.developer-platform, features.featured-apps, features.launch-showcase, features.partner-tiers, features.perks (band, grid), features.platform-showcase, features.step-list (tabbed, single)
- **HERO**: hero.app-header, hero.changelog-intro, hero.docs-page-header, hero.editorial-featured (featured-post, ascii-field), hero.help-search, hero.page-centered (plain, logo-strip, app-tiles, creator-carousel, expert-quotes, icon-band, contribution-grid), hero.pricing-intro, hero.product-window, hero.scroll-typewriter
- **LISTING**: listing.course-grid, listing.directory-category, listing.directory-header, listing.lesson-list (numbered-preview, timeline), listing.open-positions, listing.related-apps
- **MEDIA**: media.interview-video, media.screenshot-gallery, media.team-photos
- **NAVIGATION**: navigation.breadcrumb-bar, navigation.docs-sidebar, navigation.partner-cross-links
- **PRICING**: pricing.comparison-group, pricing.comparison-header, pricing.plan-cards
- **SHELL**: shell.site-footer, shell.site-header
- **SOCIAL_PROOF**: social-proof.customer-stories (carousel, grid), social-proof.logo-wall (band, grid, headed, dark-statement), social-proof.scale-stats
- **TESTIMONIAL**: testimonial.quote (scroll-curtain, portrait, portrait-features)
- **UTILITY**: overlay.gallery-lightbox, overlay.mobile-nav-drawer, overlay.search-dialog

Long pages are decomposed by real content boundaries: the pricing comparison table into a header + one
section per feature group; the app directory into a header + one section per category; the app overview
article into one section per H2 chapter; the homepage's dark curtain group into its three sections.

## Measured evidence

Section heights at 1440x900 (`extraction/measured-values.json -> sectionHeights`) were measured on the running clone
with a headless browser (`extraction/measure_sections.mjs`, default motion preference); 768/390 document heights are
recorded too. For version 1.1.0 the clone was rebuilt from the committed source (`npm ci`, `vite build`, `vite preview`)
and every route re-measured at 1440, 768 and 390: all 20 section-height pages and all 40 responsive document heights
matched the recorded values (maximum delta 0px).

Wrapper gate (R9): after decomposition the architecture page's scroll-typewriter hero is the only hit (4500px = a pinned
one-viewport stage plus scroll runway) and it still warns. Five whitelist entries exist in total, all agent attestation.
Four are the dominant uniform lists of short pages (`/blog` article index 66%, `/changelog/2026` entry list 82%,
`/help/academy` course grid 51%, `/help/reference/...` lesson list 65%): those pages have fewer than three in-flow
sections, so the share rule skips them, and the entries record that decision explicitly. Measuring with reduced motion
changes the long-form page's layout (motion-safe scroll runways), so heights are taken with the default preference.

Clone quality (R12): geometry parity of the homepage's section wrappers, live vs clone at the same viewport, from the
pixel-audit dumps (box heights, not pixels):

| viewport | wrappers | min agreement | average |
|---|---|---|---|
| 1440 | 13 | 99.98% | 100.0% |
| 1280 | 13 | 100.0% | 100.0% |
| 768 | 11 | 97.0% | 99.73% |
| 390 | 11 | 100.0% | 100.0% |

**Pixel parity was not measured** (no live-site screenshots were captured for a pixel compare), so no pixel number is claimed.
The geometry table above was taken from pixel-audit dumps that live under `.playwright-mcp/` (git-ignored, not part of
this repo); it cannot be re-derived from a fresh clone, so treat it as recorded evidence, not a reproducible check.

## Token catalog notes

`usageCount` fields were removed from the token files and catalog in 1.1.0: the numbers could not be reproduced from the
committed source (they came from a working tree that also held unmounted platform pages), and nothing consumed them.
Token membership and values are machine-checked against `tailwind.config.cjs` (every colour, type role, radius, shadow
and background-image key in the source has a token; each token's cited source line must hold its key and value).
Spacing tokens are a usage histogram of the committed clone's spacing utilities (count >= 5 kept).

## Versioning

`allowlistVersion`, `tokenCatalogVersion` and `pageSpecVersion` are machine-checked by `verify_all.py`;
`repositoryVersion` is documentation-only. The source stack is recorded in the manifest as a documentation-only note.
