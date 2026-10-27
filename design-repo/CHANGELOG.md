# Changelog

## 1.0.0 (initial extraction)

- Built from scratch against the clone's current source and the running dev server (1440/768/390 measurements).
- Route table snapshot at start and re-check before packaging: 11 mounted routes
  (/, /pricing, /customers, /startups, /careers, /partners/app-partners, /partners/creator-partners, /partners/expert-partners, /contact/sales, /apps, /apps/:slug); 19 spec'd routes not mounted (blog, engineering blog,
  changelog, architecture, help x3, 12 platform routes) recorded as pending, not modelled.
- Tokens: 316 catalogued (foundation colours/type/radius/elevation/spacing/breakpoints/gradients/easing + semantic
  roles), derived from the clone's token file and CSS; shadow stack renamed neutrally (`elevation.layer-N`, sourceKey kept).
- 19 primitives, 30 components, 50 section contracts (47 retrievable,
  3 runtime overlays pinned ineligible), 8 templates, 29 asset roles, 27 motion patterns.
- Purpose-normalised sections: one `testimonial.quote`, `social-proof.logo-wall`, `social-proof.customer-stories`,
  `hero.page-centered`, `features.perks`, `features.step-list` with variants instead of per-page duplicates.
- Decomposed oversized wrappers measured on the clone: pricing comparison (62.8% of the page), app directory (87.7%),
  app detail body (79%), homepage dark curtain group.
- Groundwork checks against src (see `extraction/measured-values.json -> groundworkChecks`): CLONE_SPEC's 3.65s badge
  loop is superseded by the code's re-sampled ~4.0s; stat rule 2px blue-500, 21 changelog ticks, 20px plan radius and
  45% scroll-spy hold; the clone keeps three crawled third-party slugs in `/apps/:slug` URLs (flagged, blocked in generated mode).
- Verification: baseline audit, Draft-07, semantic, adversarial suite, scratch-copy drift proofs, self-containment.
