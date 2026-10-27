# Information architecture (Corvale / attio.com clone)

This covers the IA files only. They document the clone's nav-bar scope: 32 routes in 21 templates, built from 121 sections.

## Files

| file | edit? | what it is |
|---|---|---|
| `ia.json` | **hand-edited, the only source of truth** | categories, sections (each defined once with description + scope, plus `implementedBy` when the component exists), and templates (ordered section ids, routes, `chrome`, `status`) |
| `IA.md` | generated, do not edit | readable doc: template shares, chrome partition, sections by reuse, per-template tables, section reference |
| `matrix.csv` | generated, do not edit | section × template matrix for a spreadsheet |
| `validate.mjs`, `build.mjs` | copied unchanged from the ia-builder skill | checker and generator |

Extra fields in `ia.json` that the scripts ignore:
- `status` on every template: `built` means the route is mounted in `src/App.jsx` ROUTES and renders. `in-progress` means components exist but the route isn't mounted (no template is in this state as of this pass; changelog, architecture and the three help templates went from planned to built). `planned` means it exists only in the spec.
- `spec` and `page` say where the structure came from and which page file renders it.
- `routeSections` appears on the platform templates. It gives the exact section order for each route (see the caveat below).
- `routeNote`, `redirectsTo` and `sectionNote` are notes in prose.

## Re-run

```bash
node validate.mjs   # exit 1 on any hard failure (route sum, template count, undefined/unused ids, unknown category)
node build.mjs      # regenerates IA.md and matrix.csv
```

When routes are mounted or sections get built:
1. Edit `ia.json`: flip `status` and add `implementedBy`.
2. Re-run both scripts.

## Findings (from the validate/build output)

- **The 3 platform templates cover 12 of 32 routes (38%), and every one of them is still planned.** These templates use 43 section ids, and 38 of those appear only on platform pages. None of the 38 is built. Five sections can come from existing code: the site header, its dark-from-load variant, the footer, the bordered logo cell grid and the inline newsletter row.
- **Built vs planned:**
  - Built: 18 of 21 templates, covering 20 of 32 routes (62.5%). 83 of 121 sections are linked to a real component through `implementedBy`.
  - Still planned: 12 routes, namely all 12 platform pages (architecture and the three help pages were mounted after the first pass).
- **Shared vs single-use:** 20 sections are used by more than one template and 101 by only one. That 101 overstates how much is page-local. 13 platform sections belong to only one template but are reused across 2–5 routes inside it, for example the modern split accordion (5 routes), modern three-up media grid (5), legacy three-up card grid (4) and centered media (4). Build these as shared components.
- **Chrome partition:**
  - `full`: 26 routes
  - `full-dark`: 2 routes (engineering blog and developers, where the header is dark from first paint)
  - `reduced`: 1 route (architecture, where the header has no banner)
  - `docs`: 3 routes (help)

  The docs header, docs sidebar and light footer are needed only by the three help routes.

## Caveat: platform route counts are upper bounds

`validate.mjs` and `build.mjs` count a section's routes as the total `routeCount` of every template that lists it. The platform templates list the union of their section library, so for sections used only on platform pages, the "routes" column in `IA.md` and `matrix.csv` is an upper bound. For example, `features.card-marquee` shows 11 but is really on 3 routes, and `proof.logo-cell-grid` shows 12 but is really on 7. The scope prose and `routeSections` give the exact routes. Correct the scope prose against `routeSections`, never against the generated count.

## Other judgment calls

- **Route count:** this IA counts 32 routes. The scope list counts `/changelog` once. `/changelog/2026` is its redirect target, recorded as `redirectsTo`, not as a second route.
- **App detail:** recorded as 3 routes (`/apps/chatgpt`, `/apps/claude`, `/apps/slack`). The live directory has about 272 app pages that all use the same `/apps/:slug` template. They are out of nav scope and not counted.
- **Template granularity:** the spec groups some pages into one template (marketing long-form, the editorial blog pair, the help shell). Those pages are split into one template each here, because their section lists differ. The platform pages stay as the spec's 3 shells.
