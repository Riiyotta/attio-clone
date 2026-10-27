# Design-repo: CRM marketing-site clone (fictional brand)

AI-ready design system extracted from a design-faithful clone of a live commercial CRM marketing
website. The clone renders an invented brand, invented copy and original SVG/CSS artwork; no raster
assets. This repo tells a generator **what can be used, how it combines, and how it behaves**:
tokens, primitives, components, semantic section contracts, page templates, a compatibility graph, a
closed Draft-07 PageSpec schema, a semantic validator and adversarial/drift proofs.

Status: `design-review-pending`, `productionApproved: false`.

## Counts (recomputed from disk; checked by `extraction/verify_all.py`)

<!-- counts:start -->
| item | count |
|---|---|
| tokens | 316 |
| primitives | 19 |
| components | 30 |
| sections | 50 |
| retrievableSections | 47 |
| templates | 8 |
| mountedRoutes | 11 |
| pendingRoutes | 19 |
| assetRoles | 29 |
| motionPatterns | 27 |
| examplePageSpecs | 4 |
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
sections/                   50 semantic section contracts (source/semantic split, retrievalEligible)
templates/                  templates.json, routes.json (mounted), pending-routes.json (not mounted)
compatibility/graph.json    rhythm/position rules (ids mirrored in the validator)
schema/                     pagespec.schema.json, section-contract.schema.json, example.pagespec.json,
                            examples/ (generation-safe), semantic_validate.py, source-brand.json,
                            reference-copy-corpus.json, tests/adversarial_test.py
extraction/                 measured-values.json, verify_all.py, wrapper_gate.py, prove_drift.py, measure_sections.mjs
```

## Use

```bash
python3 extraction/verify_all.py                      # everything (schema, semantic, parity, citations, pins, gate)
python3 schema/semantic_validate.py my.pagespec.json  # Draft-07 layer + semantic layer for one PageSpec
python3 schema/tests/adversarial_test.py              # every mutation rejected, every control passes
python3 extraction/prove_drift.py                     # scratch-copy drift injections are all caught
python3 extraction/wrapper_gate.py                    # R9 measured wrapper-height gate
```
Requires Python 3.9+ and `jsonschema` (Draft-07 layer). `node` is used only for the optional token
drift check against the sibling source and for the optional re-measure tool.

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

Templates: `home`, `pricing`, `customer-hub`, `program-landing`, `careers`, `contact-split`, `app-directory`, `app-detail`. `program-landing` has a `program-body` region (3-8 program blocks in any
order) because the four program pages order their blocks differently; `contact-split` is hero-less by design.

**Pending (not mounted, not modelled):** `/blog`, `/engineering/blog`, `/changelog`, `/architecture`, `/help`, `/help/academy`, `/help/reference/:slug`, `/platform/ask`, `/platform/call-intelligence`, `/platform/custom-agents`, `/platform/data`, `/platform/developers`, `/platform/enrichment`, `/platform/mcp`, `/platform/reporting`, `/platform/sequences`, `/platform/universal-context`, `/platform/web-agent`, `/platform/workflows`. See `templates/pending-routes.json`; the cited spec files are future intent only.

## Sections by category

- **CONTENT**: content.app-meta-sidebar, content.article-chapter, content.audience-profiles, content.resource-cards, content.team-intro, content.values
- **CONVERSION**: conversion.application-form, conversion.application-notice, conversion.avatar-wall-cta, conversion.build-with-us, conversion.demo-request-split, conversion.final-cta, conversion.newsletter-signup
- **EDITORIAL**: editorial.changelog-preview
- **FAQ**: faq.accordion
- **FEATURES**: features.app-store-preview, features.cell-grid, features.context-horizon, features.customizable-workspace, features.developer-platform, features.featured-apps, features.partner-tiers, features.perks (band, grid), features.platform-showcase, features.step-list (tabbed, single)
- **HERO**: hero.app-header, hero.page-centered (plain, logo-strip, app-tiles, creator-carousel, expert-quotes, icon-band, contribution-grid), hero.pricing-intro, hero.product-window
- **LISTING**: listing.directory-category, listing.directory-header, listing.open-positions, listing.related-apps
- **MEDIA**: media.interview-video, media.screenshot-gallery, media.team-photos
- **NAVIGATION**: navigation.breadcrumb-bar, navigation.partner-cross-links
- **PRICING**: pricing.comparison-group, pricing.comparison-header, pricing.plan-cards
- **SHELL**: shell.site-footer, shell.site-header
- **SOCIAL_PROOF**: social-proof.customer-stories (carousel, grid), social-proof.logo-wall (band, grid, headed), social-proof.scale-stats
- **TESTIMONIAL**: testimonial.quote (scroll-curtain, portrait, portrait-features)
- **UTILITY**: overlay.gallery-lightbox, overlay.mobile-nav-drawer, overlay.search-dialog

Long pages are decomposed by real content boundaries: the pricing comparison table into a header + one
section per feature group; the app directory into a header + one section per category; the app overview
article into one section per H2 chapter; the homepage's dark curtain group into its three sections.

## Measured evidence

Section heights at 1440x900 (`extraction/measured-values.json -> sectionHeights`) were measured on the running clone
with a headless browser (`extraction/measure_sections.mjs`); 768/390 document heights are recorded too. No HERO exceeds
1800px and no in-flow section exceeds 50% of its page after decomposition, so the wrapper whitelist is empty.

Clone quality (R12): geometry parity of the homepage's section wrappers, live vs clone at the same viewport, from the
pixel-audit dumps (box heights, not pixels):

| viewport | wrappers | min agreement | average |
|---|---|---|---|
| 1440 | 13 | 99.98% | 100.0% |
| 1280 | 13 | 100.0% | 100.0% |
| 768 | 11 | 97.0% | 99.73% |
| 390 | 11 | 100.0% | 100.0% |

**Pixel parity was not measured** (no live-site screenshots were captured for a pixel compare), so no pixel number is claimed.

## Versioning

`allowlistVersion`, `tokenCatalogVersion` and `pageSpecVersion` are machine-checked by `verify_all.py`;
`repositoryVersion` is documentation-only. The source stack is recorded in the manifest as a documentation-only note.
