# Changelog

## 1.1.0

Revision after an independent review found `verify_all` at 16 pass / 4 fail in a fresh clone of the committed repo.
Root causes and fixes:

- **Missing proofs.** The manifest and `verify_all` referenced `schema/tests/adversarial_test.py` and
  `extraction/prove_drift.py`, but neither was in git: the committed tree was an older snapshot, and the later design-repo
  work (including both proofs) lived only in an uncommitted working tree. Both are now committed, re-run and extended:
  the adversarial suite has 125 mutations/controls (generated-mode leakage for brand, CTA, copy, URL, asset, person, rating
  and store marks on the home, program, app-detail, editorial, changelog, help and long-form families; token policy;
  wrapper gate; one synthesized generated control per template), and `prove_drift` runs 50 scratch-copy drift cases
  (`--scratch DIR` selects where). `verify_all` now really runs the adversarial suite (new `adversarial` check); it cannot
  call `prove_drift` (that runs `verify_all` in each scratch copy), so `prove_drift` stays a separate command.
- **Citation check crash.** `check_citations` walked `schema/section-contract.schema.json`, whose `properties` object has
  keys literally named `file`, `tag`, `lines`, and tried to split a schema dict. Fixed at the root: schema files are not
  citation ledgers and are skipped, and a citation-shaped object whose `file/tag/lines` are not strings now FAILs
  (`__MALFORMED__`) instead of crashing or being ignored.
- **Token drift.** The clone's `tailwind.config.cjs` defines a `platform` colour group (16 keys) that the committed
  token files lacked. All are now tokens. Tokens that exist only in unmounted/uncommitted platform sources
  (`color.dev.*`) were removed, and every tailwind evidence line was re-derived against the committed config and is now content-checked
  (one pre-existing token, `color.mock.surface`, cited a comment line). `verify_all` now also requires each token's cited line to hold its source key and value
  and the source config's font-size, radius, shadow and background-image keys to all have tokens. `usageCount` was removed
  (see README, token catalog notes). Catalog: 351 tokens (was 316).
- **Route drift.** The clone mounts 19 route patterns; the committed repo modelled 11. Added the families that were
  missing: `editorial-listing` (/blog, /engineering/blog), `changelog-year` (/changelog redirect, /changelog/:year),
  `help-docs` (/help, /help/academy, /help/reference/attio-101) and `architecture` (/architecture); 17 new section
  contracts (hero.editorial-featured, editorial.article-index, conversion.careers-heatmap, hero.changelog-intro,
  editorial.changelog-entries, navigation.docs-sidebar, hero.help-search, hero.docs-page-header, listing.course-grid,
  listing.lesson-list, hero.scroll-typewriter, content.chapter-header, content.prose-split, content.lit-statement,
  content.scroll-scene, features.launch-showcase, conversion.closing-stage) plus `dark-statement` for the logo wall and a
  `iconMedia` field for resource cards; 4 new motion patterns; graph rule `CHAPTER_OPENS_BODY`; section heights for every
  route measured on the rebuilt clone. Every route is mapped exactly once; `verify_all` now also checks each route's cited
  `src/App.jsx` line holds that route and that no mounted route is also listed as pending. 12 `/platform/*` routes are
  still not mounted and stay in `pending-routes.json`.
- **Generated examples for every template family** (12 of 12; was 3): the 9 new ones are original-copy, fictional-brand
  pages on `.example` URLs. `verify_all` now requires one per template and lists them in the manifest.
- **Validator gap found by the new suite:** generated-mode copy split across sibling fields (e.g. a typewriter headline as
  `line1` + `line2`) slipped past the 6-word source-copy check; the joined text of an object's sibling fields is now
  checked too.
- **Wrapper gate:** four more reviewed whitelist entries (dominant lists on short pages the share rule would skip); all
  `reviewedBy` values say agent attestation, not a human sign-off. `unmountedComponentFilesSeen` removed from
  `pending-routes.json` (those components are mounted); the stale groundwork note "not mounted at extraction" corrected.
- **Root IA** (`ia.json`, `IA.md`, `matrix.csv`, `README-IA.md`): architecture and the three help templates flipped to
  built with `implementedBy`; 20 of 32 routes (18 of 21 templates) mounted; regenerated with `build.mjs`, `validate.mjs` clean.
- Versions: repository, pageSpec, allowlist, token catalog, templates, graph, motion patterns 1.0.0 -> 1.1.0.
- Not done / limits: nothing was reviewed by a human; reference-mode example PageSpecs exist only for the home page;
  pixel parity against the live site was not measured; the homepage geometry-parity table comes from untracked dumps.

## 1.0.0 (initial extraction; superseded where 1.1.0 says so)

- Built from scratch against the clone's current source and the running dev server (1440/768/390 measurements).
- Route table snapshot at start and re-check before packaging: 19 mounted routes
  (/, /pricing, /customers, /startups, /careers, /partners/app-partners, /partners/creator-partners, /partners/expert-partners, /contact/sales, /apps, /apps/:slug, /blog, /engineering/blog, /changelog, /changelog/:year, /help, /help/academy, /help/reference/attio-101, /architecture). The start-of-extraction snapshot had 11; a concurrent build mounted
  blog, engineering blog, changelog (+ year), help x3 and architecture mid-extraction. verify_all's route-drift check caught
  it; those pages rendered complete (document heights within ~20px of the spec), so they were measured and extracted.
  12 spec'd routes are still not mounted (the platform pages) and are recorded as pending, not modelled.
- Tokens: 353 catalogued (foundation colours/type/radius/elevation/spacing/breakpoints/gradients/easing + semantic
  roles), derived from the clone's token file and CSS; shadow stack renamed neutrally (`elevation.layer-N`, sourceKey kept).
- 19 primitives, 30 components, 67 section contracts (64 retrievable,
  3 runtime overlays pinned ineligible), 12 templates, 29 asset roles, 31 motion patterns.
- Purpose-normalised sections: one `testimonial.quote`, `social-proof.logo-wall`, `social-proof.customer-stories`,
  `hero.page-centered`, `features.perks`, `features.step-list` with variants instead of per-page duplicates.
- Decomposed oversized wrappers measured on the clone: pricing comparison (62.8% of the page), app directory (87.7%),
  app detail body (79%), homepage dark curtain group.
- Groundwork checks against src (see `extraction/measured-values.json -> groundworkChecks`): CLONE_SPEC's 3.65s badge
  loop is superseded by the code's re-sampled ~4.0s; stat rule 2px blue-500, 21 changelog ticks, 20px plan radius and
  45% scroll-spy hold; the clone keeps three crawled third-party slugs in `/apps/:slug` URLs (flagged, blocked in generated mode).
- Measurement uses the default motion preference: the long-form page's motion-safe scroll runways shrink under
  reduced motion (hero 4500 -> 3150px, page 23956 -> 20896px), which a reduced-motion measurement would have hidden.
- Concurrent edits to the token file during extraction (new colour groups) were caught by the token-vs-source drift
  check; the catalog was regenerated from the current file before packaging.
- Verification: baseline audit, Draft-07, semantic, adversarial suite, scratch-copy drift proofs, self-containment.
