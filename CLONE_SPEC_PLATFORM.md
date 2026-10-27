Source: https://attio.com/platform/

# Attio `/platform/*` pages: design clone spec (React 18 + Vite + Tailwind v3)

Companion to `CLONE_SPEC.md` (homepage). Everything in that file (fonts, palette, semantic tokens, type utilities, radii, shadows `attio-1..7`, easing tokens, `.container`, buttons, eyebrow pill, animated underline, `SiteHeader`, `SiteFooter`, `LogoGrid`, final-CTA falling streaks M16) is **reused by name here and not re-measured**. This file only records what is new or different.

Measured live on 2026-10-27 with an isolated headless Chromium (Playwright 1.63) at **1440x900** (primary), **1280x800**, **768x1024** and **390x844**. Colors were read from computed styles (site authors in `lab()`/`oklch()`) and converted to sRGB hex through canvas. All y values are document-absolute at 1440x900 unless noted. Block numbers `B#` in this file refer to the order of non-empty children of `<main>` (zero-height divider wrappers are skipped).

Routes covered: `/platform/ask`, `/call-intelligence`, `/custom-agents`, `/data`, `/developers`, `/enrichment`, `/mcp`, `/reporting`, `/sequences`, `/universal-context`, `/web-agent`, `/workflows`.

**Content rule (same as homepage).** Do not reuse Attio copy, logos, customer logos, product screenshots, illustrations, videos, or the dithered portraits. Each text node is listed by role and `c` (characters) / `w` (words) / `L` (lines at 1440); see Appendix A. Every media box is given as geometry so it can be filled with original artwork. Nearly all product imagery on these pages is raster from Storyblok (`a.storyblok.com/f/234930/...`, served through `/_next/image`, WebP/PNG). None of it should be copied.

---

## 0. What is shared vs new

### 0.1 Header and footer: same components, confirmed
- `SiteHeader`: identical markup and classes on all 12 routes (`border-subtle-stroke border-b bg-primary-background/95 transition-colors duration-250 dark:bg-primary-background`). Height 116 at ≥lg and 100 below lg, same as the homepage. The dark-section swap behaves the same way. The only difference is on **/platform/developers**, where the whole page wrapper is `.dark`. The header is dark from first paint there (bg #101010, border #2e3238) and never switches to light.
- `SiteFooter`: identical (`footer.dark`, 685 tall at ≥1280, 1038 at 768, 1072 at 390).
- `LogoGrid` (customer logos, 5x2 cells of 277x96 at 1440, 1px #e4e7ec gaps, `border-x`): same component as homepage section 3. Measured 193 tall here (homepage 194 includes a trailing hairline). At 390 it switches to a separate `md:hidden` 2-column, 3-row grid (290 tall, cells 195x96).
- Section dividers: same as homepage `section-divider`. Each `<main>` child is separated by a zero-height `display:contents` wrapper that holds a full-width 1440x1 `<svg><line stroke=currentColor stroke-linecap=round>` in `subtle-stroke` #e4e7ec.

### 0.2 New tokens (add to `tailwind.config`)
Semantic tokens that the homepage did not need. Values were read from `--color-*` on a light page (web-agent) and on the dark page (developers):

| token | light | dark (`.dark`, developers page) |
|---|---|---|
| weak-stroke | #edeff3 | #232529 |
| subtle-stroke | #e4e7ec (same) | #2e3238 (same) |
| default-stroke | #d3d8df | **#6f7988** |
| strong-stroke | #cad0d9 | #8f99a8 |
| surface | #edeff3 | #2e3238 |
| secondary-background | #fafafb | **#1c1d1f** (the homepage note says #101010 in the footer bar; on the dark page the token is #1c1d1f) |
| disabled-foreground | #d3d8df | #6f7988 |
| muted-strong-background (dot-pattern dots) | #d3d8df | n/a |
| caption/accent/tertiary/secondary/primary-fg | as homepage | #505967 / #8f99a8 / #b5bdc9 / #edeff3 / #ffffff |

One-off colors: status "Completed" pill bg #ddf9e4, border #c7f4d3, text #0b935d. Agent icon tiles (24x24, radius 7, 1px border) use pastel pairs: blue bg #e5eeff / border #d6e5ff, cyan #ddf7ff / #d0eff7, yellow #fff3cc / #ffe59e. Marquee card text: title #242629, desc rgba(0,0,0,.40), footer label #505155. Domain chips (web-agent hero): text rgba(80,89,104,.55), border rgba(227,231,235,.50). Inline-link blue in mocks: #538bf3.

### 0.3 New type roles (computed at 1440)

| role | family | size / lh | weight | ls | color | <lg |
|---|---|---|---|---|---|---|
| Platform display (hero H1/H2, CTA H2, UC band H2) | interDisplay | 56 / 60 | **600** | -0.84 | #1c1d1f (dark #fff) | **40/44, ls -0.4** at 768 and 390 |
| Eyebrow tag (hero `h1`, inside pill) | inter | 13 / 18.2 | 500 | -0.16 | #232529 | same |
| Hero subhead | inter | 20 / 26 | 500 | -0.2 | #232529 | 18/24 (`text-lg lg:text-xl`) |
| v2 section H2, two-tone (`text-heading-responsive-md`) | interDisplay | 40 / **46** (split/grid/quad) or 40 / **44** (centered/stat/columns) | 500 | -0.4 | lead #1c1d1f, continuation `p` #6f7988 | **32 / 36.8, ls -0.32** |
| Legacy section H2, two-tone (`text-heading-responsive-sm`) | interDisplay | 32 / 36 | **600** lead, 500 continuation | -0.32 | lead #1c1d1f, continuation #8f99a8 | **28 / 34, ls -0.28** |
| Legacy stacked H2 (`text-heading-responsive-md`, centered "plugs in", "Cue the agents") | interDisplay | 40 / 44 | 600 | -0.4 | #1c1d1f | 32/36 |
| Legacy stacked sub (`text-xl`) | inter | 20 / 26 | 500 | -0.2 | #1c1d1f | 18/24 |
| Strip heading ("Ready where you are" type) | inter | 20 / 26 | 600 | -0.2 | #1c1d1f + p #6f7988 | same |
| Card H3, v2 | inter | 18 / 24 | 500 | -0.18 | #232529 | 16/22 |
| Card H3, legacy | inter | 18 / 24 | **600** | -0.18 | #232529 | 18/24 at 768, 16/22 at 390 |
| Card body | inter | 16 / 22 | 500 | -0.16 | #8f99a8 (v2 grid cards) or #6f7988 (legacy cards, quad, columns) | 14/20 on some (`max-md:text-sm`) |
| Overline `[ 01 ]` / `[ SALES ]` | interDisplay | 12 / 14 | 600 | +0.72, uppercase, tabular | #a4adba (light) / #505967 (dark) | same |
| Big serif quote (scroll reveal) | tiemposText → Source Serif 4 | 40 / 44 | 400 | -0.6 | unrevealed #a4adba, revealed #1c1d1f | **32 / 36, ls -0.48** |
| Inline serif quote (inside card grids) | tiemposText → Source Serif 4 | 28 / 36.4 | 500 | -0.42 | #1c1d1f | 24 / 31.2, ls -0.36 |
| Quote name / role | inter | 14 / 20 | 600 / 500 | -0.07 | #232529 | same |
| Stat number | interDisplay | `clamp(56px, 19cqw, 100px)`, lh 1 | 500 | -0.01em | #232529 | 98.85 at 1440, 87.45 at 1280, 100 at 768, 74.1 at 390 (container-query width) |
| Stat label | inter | 18 / 24 | 500 | -0.18 | #6f7988 | |
| Split-accordion item title | inter | 18 / 24 | 500 | -0.18 | active #232529, idle #a4adba | same |
| Split-accordion item desc | inter | 16 / 22 | 500 | -0.16 | active #6f7988, idle #b5bdc9 | 14/20 |
| Tab-panel title (legacy tabs) | interDisplay | 24 / 30 | 600 | -0.24 | #1c1d1f | |
| Mono chips / labels | JetBrains Mono | 11 / 15.4 (web-agent chips), 12 / 18 uppercase (developers) | 500 | -0.16 / 0 | see 0.2 | |
| Developers quote | interDisplay | 28 / 34 | 500 | -0.28 | words #6f7988 → #edeff3 (opening mark already #edeff3), inline strip #b5bdc9 | |

### 0.4 Page-shell primitives (used by all section types)
- **P1 Block shell (v2).** `.container` (px 24, max-w 1440), then a div with `border-x 1px #e4e7ec` (box x 24..1416). Inside: **top spacer 128px** (`h-16 lg:h-32`, so 64 below lg), then a **1px hairline** (svg, 1390 wide, #e4e7ec), then content. The last v2 block before the CTA also ends with hairline + 128 spacer. Below lg the container becomes `display:contents`, so v2 blocks go **full-bleed with no side borders**. Content padding is then 32px (`px-8`).
- **P2 Block shell (legacy).** Same container + `border-x`. There is no 128 spacer. Instead, each block opens with a header `pt-40 pb-20` (160/80; 100/60 below xl/lg). Content uses a 12-col grid (115.8px columns at 1440) and sits at **col 2/-2 (x 141..1299)**, not at the 4.167% inset (x 83) used by v2. At 768 the legacy container stays bordered (576 wide); at 390 it is 342.
- **P3 Dashed guide row** (`div.grid.h-40.grid-cols-12`, aria-hidden). 160 tall (`max-xl:h-30` 120, `max-lg:h-25` 100). Holds two vertical dashed 1px lines at the col-2 and col-(-2) edges: `stroke #e4e7ec, stroke-dasharray "4 6", stroke-linecap round`. Legacy blocks end with one, and card frames have a 20px stub of it above.
- **P4 Dashed horizontal rule**: `svg 1px`, same dasharray `4 6`, #e4e7ec, across the full 1390 box at the top and bottom of every legacy card frame. Solid (non-dashed) hairlines are used elsewhere.
- **P5 Dot pattern**: `<svg><pattern width=10 height=10 userSpaceOnUse><rect x=5.5 y=5.5 w=1 h=1 fill=currentColor>` in `muted-strong-background` #d3d8df. Fills legacy media wells, quote sections, and inline-quote rows.
- **P6 Hatch gutters**: `repeating-linear-gradient(125deg, transparent 0 6px, #f3f4f6 6px 7px)`. Fills the full frame behind legacy card grids, so it is visible only in the col-1 and col-12 gutters.
- **P7 Vertical-stripe field**: `linear-gradient(to right, transparent calc(50% - .5px), C calc(50% - .5px) calc(50% + .5px), transparent calc(50% + .5px))`, `background-size: 8px 100%`, centered. C = #edeff3 (centered-media sections, custom-agents marquee) or rgba(228,231,235,.45) (UC hero). Masked with `mask-t-from-0% mask-t-to-100%`, which is transparent at the top and opaque at the bottom.
- **P8 Corner markers** (developers, UC band): 4x4 squares in `default-stroke`, centered on card corners. The ask tabs frame uses 40x40 "+" crosshairs instead (two 1px svg lines in #e4e7ec, centered on each corner of the panel).

---

## 1. Templates

The pages are assembled from one shared section library (Storyblok blocks). Three page shells:

| template | routes | identifiers |
|---|---|---|
| **T1 "Platform v2"** | web-agent, custom-agents, universal-context, mcp, enrichment, reporting (reporting mixes in two legacy blocks) | P1 shells, H2 40/46 w500, x-inset 57.9 (4.167%), 128 spacers, full-bleed below lg |
| **T2 "Platform v1 / legacy"** | sequences, call-intelligence, data, workflows, ask | P2 shells, H2 32/36 w600, col 2/-2 inset (x 141), dashed guides P3/P4, hatch P6, dot wells P5 |
| **T3 "Developer blueprint"** (dark) | developers | whole page `.dark`, 24/48-col blueprint grid lines, corner squares, mono labels |

Every route ends with **S-CTA** (platform final CTA) followed by `SiteFooter`, except developers, which has its own closing CTA.

---

## 2. Route → section map (1440; heights at 1440 / 1280)

`S-` IDs are specified in section 3. `(v2)`/`(L)` marks the variant used.

| route | sections in order (B#: type, h1440/h1280) | doc height 1440 / 1280 / 768 / 390 |
|---|---|---|
| **ask** | B0 H-ASK hero + strip 983/983 · B1 S-TABS (ask variant) 1104/1038 · B2 S-UCBAND 1016/989 · B3 S-ASK-INTEL 1880/1836 · B4 S-MARQUEE (L header) 968/968 · B5 S-QUOTE 630/630 · B6 S-CTA 450 | 7838 / 7700 / 8847 / 8425 |
| **call-intelligence** | B0 H-SPLIT-L (table mock) 821/881 · B1 S-GRID-L3 985/970 · B2 S-QUOTE 558/542 · B3 S-SPLIT-L 750/750 · B4 S-STRIP 356/356 · B5 S-TABS (L) 1046/989 · B6 S-GRID-L2Q 1949/1882 · B7 S-LINKS (L) 689/689 · B8 S-CTA 450 | 8412 / 8317 / 10573 / 10716 |
| **custom-agents** | B0 H-CENTER (agent canvas) 784/684 · B1 LogoGrid 193 · B2 S-SPLIT 769 · B4 S-MARQUEE (v2 header) 838 · B5 S-STAT 593 · B6 S-CENTER-MEDIA 1182/1102 · B7 S-ICON-ROW 801 · B8 S-CTA 450 | 6416 / 6236 / 6984 / 6734 |
| **data** | B0 H-DATA (hero + perspective mock + sticky tab bar) 1510/1510 · B1 S-GRID-L2Q 2007/1940 · B3 S-GRID-L3 (text+icon variant) 640 · B5 S-GRID-L3 1043/1030 · B7 S-SPLIT-L 750 · B9 S-TABS (L) 1082/1025 · B10 S-LINKS (L) 689 · B11 S-CTA 450 | 8977 / 8840 / 10490 / 11094 |
| **developers** | T3, see section 4: B0 D-HERO 695/615 · B1 D-SECTION (3 cards) 991/924 · B2 D-TESTIMONIAL 579/512 · B3 D-SECTION (3+strip+3) 1592/1452 · B4 D-SECTION (2+3) 1662/1552 · B5 D-HEATMAP 781/735 · B6 D-TESTIMONIAL 579/512 · B7 D-APPS 1027/960 · B8 D-CTA 753/666 | 9470 / 8739 / 14431 / 10564 |
| **enrichment** | B0 H-CENTER (kanban board) 784/684 · B1 S-GRID3 912/891 · B2 S-SPLIT 769 · B3 S-CENTER-MEDIA (vertically centered image) 1041 · B4 S-QUOTE (v2) 800 · B5 S-COLUMNS (4) 821 · B6 S-LINKS (v2) 805 · B7 S-CTA 450 | 7188 / 7068 / 8110 / 8341 |
| **mcp** | B0 H-MCP (tile grid + prompt box) 811/820 · B1 S-STRIP 356 · B2 S-SPLIT-ICONS 754/776 · B3 S-CENTER-MEDIA 1205/1128 · B4 S-GRID3 890/868 · B5 S-STAT 593 · B6 LogoGrid 193 · B7 S-STEPS 648 · B8 S-NEWS 305 · B9 S-CTA 450 | 7013 / 6947 / 7582 / 7901 |
| **reporting** | B0 H-RADAR 720/720 · B1 LogoGrid 193 · B2 S-BENTO (legacy header) 1264/1286 · B3 S-SPLIT 769 · B4 S-GRID3 (6 cards) 1419/1357 · B5 S-CTA 450 | 5621 / 5581 / 7742 / 8467 |
| **sequences** | B0 H-SEQ (mock above copy) 820 · B1 S-SHOWCASE-L (full product image) 1192/1109 · B2 S-GRID-L3 985/948 · B3 S-QUOTE 558/498 · B4 S-SPLIT-L 750 · B5 S-GRID-L2Q (no quote) 1513/1446 · B6 S-LINKS (L) 689 · B7 S-CTA 450 | 7764 / 7517 / 9518 / 9559 |
| **universal-context** | B0 H-HORIZON 831/778 · B1 LogoGrid 193 · B2 S-SPLIT 769 · B3 S-CENTER-MEDIA 1180/1105 · B4 S-GRID3 890/847 · B5 S-COLUMNS (5) 733 · B6 S-QUAD 896 · B7 S-CTA 450 (2-line H2) | 6750 / 6580 / 7942 / 7722 |
| **web-agent** | B0 H-CENTER (line grid + domain chips) 784/684 · B1 LogoGrid 193 · B2 S-SPLIT 769 · B4 S-GRID3 912/869 · B6 S-ORBIT 842/864 · B8 S-QUAD 896 · B9 S-CTA 450 | 5651 / 5531 / 7284 / 7355 |
| **workflows** | B0 H-SPLIT-L (flow diagram) 790 · B1 LogoGrid 193 · B2 S-MARQUEE (L header) 924 · B4 S-COLUMNS-L ("Hire") 764 · B6 S-QUOTE 586 · B7 S-SPLIT-L 750 · B8 S-UCBAND 1016/989 · B9 S-GRID-L3 949/912 · B11 S-GRID-L3 (text+icon variant) 604/628 · B12 S-CTA 450 | 7833 / 7793 / 9622 / 10056 |

Heights marked `svh` depend on viewport height. These are the heroes at `h-[calc(100svh-var(--site-header-height))]` (784 at 900 tall, 684 at 800 tall), S-UCBAND (`min-h-svh`), S-QUOTE (`min-h-[62svh]`) and the ask hero.

---

## 3. Section types (spec once each)

Unless stated, measurements are at 1440. **1280 shift**: the container is 1232 wide (box 1230). Every grid scales proportionally: 12-col = 102.5px columns, 4.167% inset = 51.25px, legacy col-2 x = 126.5. Font sizes are unchanged at 1280. Heights change only where noted in section 2.

### 3.1 Heroes

**Shared hero copy stack (`HeroCopy`)**, used by every light hero. `header.flex.flex-col.items-center` (or `items-start` for split heroes):
1. Eyebrow tag pill: `inline-block rounded-[13px] border 1px weak-stroke #edeff3 bg #fff px-12 py-6`, 32 tall, **mb 24**. Holds the page name as `h1` (13/18.2 w500 #232529). On UC, web-agent and ask the display line is the `h1` and there is no pill, or the pill is a div.
2. Display headline: 56/60 w600 -0.84 #1c1d1f, centered, `max-w-[15em]` (840), `text-balance`.
3. Subhead `p`: **mt 16**, 20/26 w500 #232529, `max-w-xl` (576), balance.
4. CTA row: **mt 24**, flex gap 10 (row-gap 8), centered (flex-start in split heroes). Primary "Start for free" (homepage Primary button, 110.5x36) and Outline "Talk to sales" (107.8x36). Below md the row stacks (`max-md:flex-col`) and buttons become h-46, radius 12, 16px text (`max-lg:h-11.5 rounded-xl px-3.5 text-base`).

Entrance motion for this stack is **M-P1** (section 5).

| hero ID | routes | box / layout | background & artwork boxes (fill with original art) |
|---|---|---|---|
| **H-CENTER** | web-agent, custom-agents, enrichment | P1 container, `h = 100svh - 116` (784). Copy centered: web-agent copy column center at y≈480 (abs. flex center, pb 72). Custom-agents copy pt 120 (x 420..1020). Enrichment `header pt-30 pb-16` (120/64), then the board. | **web-agent**: full-box svg grid of 40px squares (`path M40 0H0V40`, stroke #e4e7ec, viewBox 1280x480, `xMidYMid slice`) with radial reveal mask (white 55% → black 100%). 10 domain chips scattered at fixed offsets: `button` 25.4 tall, pad 4/6/4/4, gap 6, 1px border rgba(227,231,235,.5), bg #fff, square corners, JetBrains Mono 11/15.4 rgba(80,89,104,.55), 14px grayscale favicon. Hover: border #94b9ff, text #245bc2, shadow attio-1, 200ms ease (.4,0,.2,1). **custom-agents**: dot field `radial-gradient(circle, #d3d8df .8px, transparent .8px)` 16x16 at 8px 8px. Four agent cards **264x80**: outer `rounded-xl bg-surface #edeff3 shadow-xs (0 1px 2px rgba(0,0,0,.05))` with 1px "border" made by an inset inner `rounded-[11px] bg #fff pad 13/13/11`. Row 1: icon tile 24 (radius 7, pastel) + title 14/20 #1c1d1f, gap 8, pb 7. Row 2: 13/22 #8f99a8 truncate. Positions at 1440: (275,218), (998,272), (129,624), (1026,718). Connected by svg routing lines (green #0fc27b-ish stroke drawn by `custom-agents-border-draw`). Status pills sit 28px above each card's right edge (see M-H2). Cards are draggable (sr-only hint c147). **enrichment**: 4 kanban columns (`max-w-75` 300, gap 16, px 32) each `rounded-t-[12px] bg #fafafb px-6 pt-6`. Column header h-36: 10px color dot + 13/18 w600 -0.26 label + count chip (11/14, radius 5). Then record cards. Box 1440x356 from y 544, with a 96px bottom fade overlay. Background: blue-tinted line field (`enrichment-hero-lines`, masked). |
| **H-HORIZON** | universal-context | P1 shell, overflow hidden. Copy header `pt 120 pb 60` in col 2/-2. Below it a `aspect-3/1` box 1390x463 (y 484) | P7 stripe field (45% #e4e7ec) masked from top across the whole hero. Horizon: an svg arc of concentric circles (≈1546px group, center below the fold) with a gradient glow. Animated by `universal-context-horizon-*` (M-H4). |
| **H-RADAR** | reporting | `reporting-hero` 720 tall, pb 96. Copy `pt 280` max-w 640 centered, 12 cols of 120 | Radar in a 1392x680 box at top 16: 12 concentric rings (largest 1364px, centered on copy, 1px #e4e7ec circles, inset step), a rotating conic "beam" arm (394x558) and wake. Blue-tinted dots ping on rings. Motion M-H3. |
| **H-MCP** | mcp | 811 tall. A 12x7 grid of **115.8px squares** (lines #e4e7ec) fills the box, with copy in a content region (col 2/-2, rows 2..4, pad 32/24). | 5 logo cells 116x116 at (141,116), (604,116), (1068,116), (141,579), (1183,579), each holding a centered AI-client mark (use generic glyphs). Prompt box 895x84 at col 3/-3 (x 273, y 711) with pad 16 wrapper: radius **32 (2rem)**, 1px border, bg #fff, shadow `0 2px 8px rgba(0,0,0,.05)`. It cross-fades between themed surface skins (warm off-white variants) for different AI clients. Placeholder text 20.96/29.34 inter, typed character by character, with a round send button. |
| **H-SEQ** | sequences | P1-like container. Grid 12: row 1 = mock area col 2/-2 (1158x400, borders x, overflow hidden, dashed top and bottom P4 lines at y 467/565), row 2 = copy `pt 48 pb 128` | Stacked email-step mock centered (max-w 512). Step cards with "After 2 business days" chip (26 tall, 12/18) between them, ending in a pill "Booked meeting with …" (342x58, rounded-full, double ring border, 16-18/24 text, avatar pair 72x40). The whole stack translates upward on load. Copy appears only after it finishes (enter delay 4.1s, M-P1). |
| **H-DATA** | data | Full-bleed (no container border), 1510 tall. Copy col 2/-2 (12x120 grid) pt 120. | Perspective block (`perspective 3000px`, entrance `fade-in -spin-in-x-6 slide-in-from-bottom-6` 1.25s (0,0,0,1)). A wireframe of 118-col x 11.3px-row grid diagrams (1392x345, schema chips 14/15.5 w600) above a product window **1152x582** (max-w-6xl), then a **sticky tab bar** `ul` 591x52: `rounded-[15px] bg #fff p-10 shadow-xl sticky bottom-5 mt-37/52`, gap 8. Tab buttons: `rounded-10 border 1px #e4e7ec py5 pr11 pl9 text-sm #505967` + 18px icon. Hover bg #fafafb 200ms ease-out. Bottom: a 100-tall P3 guide row. |
| **H-SPLIT-L** | call-intelligence, workflows | **call-int**: grid 12 with `pt 116`. Copy col 2/7 (x 141, w 579), `pt 48 pb 128`, left-aligned, CTA row flex-start. **workflows**: `py-25` (100/100), grid 12 of 94px + gap 24. Copy col 2/span 4 (x 142, w 448, H2 3 lines), mt 18. | **call-int**: a 6-col CRM table mock (1154x255 at x 143, rows 40/42, 1px #e4e7ec gaps, highlighted row ring, `mask-composite: intersect` fade), plus a floating call-recording card **424x627** (radius 16 outer, 12 inner, at x 923 y 182). Inside it: header 47, **video box 404x227 (mp4)**, tabs, summary. **workflows**: flow diagram in a 684x590 box (16-col subgrid) with 5 node cards **281x80**, the same card component as custom-agents (`workflows-hero-card`), joined by dashed svg connectors and "Trigger" tab labels (73x49, 12/18). |
| **H-ASK** | ask | Section `min-h-[calc(100svh-116px)]` 983: a 838-tall stage plus a 144 strip under a full-width hairline | Stage: full-bleed `<canvas>` 1441x838 (animated wave/bar field, **canvas, not measurable**). Copy `pt 120 pb 60`, then a chat widget box 448x362 (`max-w-md`), then a 120-tall 12x100 guide row. **Strip** (container, col 2/-2, `py 48`, flex justify-between): left `p` 18/24 #232529 max-w 448 (c76/w10/2L). Right: outline + primary buttons gap 10. Below md it stacks centered and hides the outline button. |

### 3.2 S-SPLIT: v2 split accordion ("trilogy"), 769 tall
Routes: web-agent B2, custom-agents B2, UC B2, enrichment B2, reporting B3.
- P1 shell: 128 spacer + hairline + `grid lg:h-160 lg:grid-cols-2` (**640 tall**, 695 + 695).
- Left cell: `flex-col justify-between gap-24`, **pad 56 / 57.9**.
  - Heading (lg only, max-w 480): two-tone v2 H2 40/46 (lead 1–2 lines, continuation 2–3 lines).
  - Item list: flex-col **gap 24**. Each item is a `button` (max-w 364, `aria-pressed`):
    - title 18/24 w500, color active #232529 / idle #a4adba;
    - desc 16/22 w500 (14/20 below lg), active #6f7988 / idle #b5bdc9. Desc transitions with delay 75ms.
    - progress track: **mt 12** (mt 8 below lg), **h 2**, bg #e4e7ec, `transition opacity,scale 500ms ease-out delay 150ms`. Fill `bg #6f7988 origin-left scaleX(p)`.
    - Item box is 82 tall at 1440.
  - Color transitions: 300ms `cubic-bezier(0,0,0,1)`.
- Right cell: media panel 695x640, `bg #f3f4f6` (white-300), `border-l 1px #e4e7ec`, overflow hidden. Three stacked `img`s (one per item, `object-contain`, 694x640, source aspect 720x883) cross-fade (M-S1).
- **<lg (768/390)**: full-bleed. Heading moves above the grid into its own block (`px-8 py-12`, H2 32/36.8). The grid becomes 1 column: list (pad 24/32/40, gap 12, items 54 tall at 768, 74 at 390) then a square media panel (768x768 / 390x390, image max-w 560 centered). The panel gets `border-t` instead of `border-l`.

### 3.3 S-SPLIT-L: legacy split accordion, 750 tall
Routes: sequences B4, call-int B3, data B7, workflows B7.
- `py 40`. Hairlines (solid) at top (y+40) and bottom. Centre: `grid h-135 grid-cols-12` (**540 tall**).
- Left col 2/6 (x 141, w 463), `pb 320`: legacy two-tone H2 32/36 (2–3 lines). Items are absolutely positioned at the bottom of the column (area 463x230). Each item `pt 28`:
  - h3 18/24 w600 #232529 (idle items get hover underline `attio-group-hover-underline`);
  - expanded content: desc 16/22 #6f7988 **mt 8**, and progress bar **mt 20**, h 2, `rounded-full bg #e4e7ec`, fill `#6f7988 translateX(-100%→0)`.
  - Expanded item 126 tall, collapsed 52.
- Right col 7/-1 (x 720, **695x540**): `border-y 1px #e4e7ec`, P5 dot well, image centered `max 560x560 object-contain` with pad 24 (image box 560x490).
- Centre seam: a 20px-wide absolute column at x 700 with 1px tick marks top/bottom (20x1 svg).
- **<lg**: header block (P2 header pt 100 pb 60, H2 28/34). Then the media becomes a full-width square (574 at 768 / 340 at 390) with mt 32, then the item stack (`h-48` 192 area, col 2/-2). Total 1142/942.

### 3.4 S-GRID3: v2 three-up media cards
Routes: web-agent B4 (912), UC B4 (890), mcp B4 (890), enrichment B1 (912), reporting B4 (1419, 6 cards in 2 rows).
- P1 shell. Header `px 57.9 pt 120 pb 40` (80/32/40 below lg), two-tone H2 40/46 max-w 768 (2–4 lines).
- Grid `lg:grid-cols-3` (463.3 each), `border-t #e4e7ec`. Articles have `border-l` (first has none) and `border-t` between rows below lg.
- Article: `flex-col gap 32 pad 32`. Media `aspect-[400/316]` **399x315** (`max-w 400` centered below lg; 400x316 at 768, 326x258 at 390), `object-contain`, no radius, no border, transparent bg (artwork carries its own UI cards). Text block: h3 18/24 w500 #232529, `p mt 4` 16/22 #8f99a8.
- Article heights 461–484 depending on 1- or 2-line body.

### 3.5 S-GRID-L3: legacy three-up cards in a frame
Routes: sequences B2, call-int B1, data B5, workflows B9. Text-only variants: data B3 (640) and workflows B11 (604).
- P2 header `pt 160 pb 80`, col 2/-2, H2 max-w 640 (`max-w-[20em]`).
- Frame: grid 12 across the 1390 box with a P3 20px stub above, P4 dashed rules at top and bottom, and P6 hatch fill. Inner `col-[2/-2]` (1158): `grid grid-cols-3 gap-px bg #e4e7ec p-px`, so cells are 384.7 wide with 1px lines.
- Card: `bg #fff`, inner grid 12 (32px cols), content col 2/-2 (321 wide) `py 28`:
  - Media well: **square 321x321**, `mb 24`, P5 dot pattern behind, artwork centered. The artwork is often a small floating UI card: `rounded-xl bg #fff` with shadow `0 0 2px rgba(28,40,64,.22), 0 1px 3px rgba(24,41,75,.04), 0 2px 4px -2px rgba(24,39,75,.02), 0 4px 4px -2px rgba(24,39,75,.04)`. Some wells are masked `linear-gradient(transparent 0 10%, #000 55% 70%, transparent 90%)`. `md:max-lg:aspect-golden`.
  - h3 18/24 w600 #232529, `p mt 6` 16/22 #6f7988 (14/20 between lg and xl).
- **Text + icon variant** (data B3, workflows B11): no media. Card is 130 tall: row with a 20px icon + h3 (gap 8), then the p. Frame height 132.
- Block ends with a P3 guide row (160).
- **<lg**: cards stack 1-col (476 wide at 768 → 399 tall; 281 wide at 390). The frame stays bordered and the guide rows shrink to 100.

### 3.6 S-GRID-L2Q: legacy 2x2 cards with inline quote
Routes: sequences B5 (no quote, 1513), call-int B6 (1949), data B1 (2007).
- `section.container` with `border-x`. P2 header, then the frame as in 3.5 but `grid-cols-2` (577.6 each).
- Card 578 wide, inner grid 12 (48.1 cols), content col 2/-2 (481) `py 40`: overline `[01]` (#a4adba) → media `aspect-[5/3]` **481x289**, `mt 32 mb 36`, object-contain, transparent → h3 18/24 w600 → p `mt 4 max-w 384` 16/22 #6f7988. Card height 501 (523 when the body is 2 lines).
- Inline quote row (order 3, full span, 1156x449): P5 dot field, centred column `py 128`. Quote `p` tiempos 28/36.4 w500 -0.42 #1c1d1f `max-w-[20em]` (560), c95–110, 3L. Name `mt 40` 14/20 w600, role `mt 4` 14/20.
- **<lg**: 1 col, cards 476x450 (768) / 281x369 (390). The quote row is reordered to position 6 (end).

### 3.7 S-CENTER-MEDIA: v2 centered header + large product image
Routes: custom-agents B6 (1182), UC B3 (1180), mcp B3 (1205), enrichment B3 (1041, vertically centered image variant).
- P1 shell. Header grid 12 `pt 120 pb 64` (`max-xl:pt-30 pb-16`), text col 2/-2 centered, max-w 816, `mix-blend-multiply`. Two-tone H2 **40/44**: lead 1 line + continuation 2–3 lines, centered.
- Media area: `px 8.333% (115.8) pt 32 pb 56`, relative, overflow hidden. Background is P7 stripes (#edeff3, 8px) masked to fade in from the top. Image `w-full` **1158 wide**: 693 tall (custom-agents, source 1152x689), 647 (UC), 672 (mcp), 461 (enrichment, `flex items-center`, pad 32 all sides, media box 640 tall). No radius or shadow on the img element; the screenshot artwork includes its own window chrome.

### 3.8 S-MARQUEE: two-row card band (scroll-linked)
Routes: custom-agents B4 (v2 centered header, 838), workflows B2 (legacy stacked header, 924), ask B4 (legacy stacked header, 968).
- Background: 120 vertical 1px lines in weak-stroke #edeff3 (`flex justify-around items-end`, about 11.6px apart), masked `mask-t-to-80%`. Custom-agents uses the P7 stripe field instead.
- Header: v2 = grid 12 `pt 120 pb 96`, centered H2 40/44 (max 768). Legacy = `pt 160 pb 80`, `flex-col gap 16 max-w-lg (512)` centered, H2 40/44 w600 + `p` 20/26.
- Band: `flex-col items-center overflow-hidden`, pb 120 (v2) or `py 64` (legacy). Two rows (`gap-y 20`), each a flex row with **gap 24** of cards. Total width 2776 (custom-agents, 10/row) or 4456 (workflows/ask, 16/row). Below lg the band is `scale-80`.
- **Card 256x132**: `w-64 rounded-xl border 1px rgba(28,29,31,.05) backdrop-blur-xs`. Inner `rounded-[11px] bg #fff shadow-attio-4`. Top `p 12 gap 8`: 20px icon (original art), then title 14/20 w500 #242629 -0.14 truncate and desc 12/16 rgba(0,0,0,.4) `line-clamp-2` (block h 52, pr 36). Footer `px 12 pb 10`: 16px avatar (`rounded-[30%]`, 1px rgba(0,0,0,.05) border) + label 12/16 #505155, gap 6.
- Motion M-S3 (scroll parallax, rows in opposite directions). There is no time-based loop.

### 3.9 S-STAT: v2 headline + big number, 593
Routes: custom-agents B5, mcp B5.
- P1 shell, then `grid grid-cols-24` (57.9 cols).
- Text cell col 2/15 (x 83, w 753), `flex items-center py 80` (`py-16` 64 below lg), two-tone H2 40/44, max-w 524.
- Stat cell col 16/-1 (x 894, w 521, `@container`), `border-l` (border-t below lg). Content `flex-col center gap 16 px 32 py 64`, `min-h 464` (`lg:min-h-116`). Number then label (18/24 #6f7988, c23–46).

### 3.10 S-ICON-ROW and S-SPLIT-ICONS: v2 icon + text cards
- **S-ICON-ROW** (custom-agents B7, 801): header grid `pad 56/57.9`, H2 40/44 max 520 (row 208). Then `grid-cols-3 border-y`. Cells `min-h 222 flex-col gap 64 pad 32`: 24px icon (original), then h3 18/24 + p `max-w 320` 16/22 #6f7988. Ends with a 128 spacer.
- **S-SPLIT-ICONS** (mcp B2, 754): `grid lg:grid-cols-[13fr_11fr]` (752.9 / 637). Left cell pad 58/57.9, H2 40/46 max 672. Right cell `border-l`, three stacked articles `flex-col gap 64 pad 32` (222 / 201 / 201 tall) with icon 24, h3, p `mt 2`. Ends with a hairline.

### 3.11 S-QUAD: v2 heading + 2x2 tagged cards, 896
Routes: web-agent B8, UC B6.
- P1 shell. `grid lg:grid-cols-[13fr_11fr]`. Left: `pt 58 pb 58 px 57.9` (`pt-25 pb-15` 100/60 below lg), H2 40/46 max 520.
- Right (x 778, 637x638): `grid md:grid-cols-2`, `border-l`. Cells **318x319** (`lg:min-h-79.75`) with `pad 32` (24 between lg and xl), `border-l/border-t` between. Content `flex-col justify-between gap 48`: overline `[ SALES ]` style (12/14 w600 #a4adba, c9–20) at top; at the bottom (`mt-auto`, gap 4) h3 18/24 #1c1d1f and p 16/22 #6f7988 (2L).
- Ends with hairline + 128 spacer. **768**: heading full width on top (col 2/-2), cards 384x256. **390**: cards stack.

### 3.12 S-COLUMNS: v2 text columns with ruler foot
Routes: UC B5 (5 cols, 733), enrichment B5 (4 cols, 821). Variant **S-STEPS** for mcp B7 (3 numbered, 648).
- P1 shell. Header `grid-cols-24 pt 120 pb 128` (`max-lg:pt-25`). Text at col 2/-2 inside a `flex justify-between items-end` row, H2 40/44, max 768. S-STEPS: `pt 160 pb 80`, max 880 (`22em`), plus a "Read the docs" outline button (135x40, h-40 variant, gap 24 under the heading).
- Row: horizontal `snap-x snap-mandatory overflow-x-auto scrollbar-none`. Inner `grid w-max min-w-full auto-cols-[280px] grid-flow-col px 57.9` (equal fill at 1440: 254.8 per col for 5, 318.5 for 4, 424.7 for 3).
- Article: `flex-col border-l #e4e7ec`. Body `min-h 236 px 16 pb 48` (S-STEPS: `min-h 200 px 24 pb 48 gap 16`, overline `01` #6f7988 first). h3 18/24 #232529 + p `mt 4` 16/22 #6f7988. Foot ruler: `flex h-32 justify-evenly` of about 9 vertical 1px solid #e4e7ec lines (S-STEPS: h-56, `max-xl:h-48 max-lg:h-40`).

### 3.13 S-COLUMNS-L: legacy "agents" columns (workflows B4, 764)
- P2 header. Then a scroll-snap row (`min-w 1340`), grid 12, inner col 2/-2 with `--cols-fill` = 5 x 231.6. Each column `border-l #e4e7ec pr 24 pl 16`, 256 tall. A **1px x 1lh dark marker** (`bg #232529`, absolute top 0, left -1) overlays the border beside the title. h3 18/24 w600, p `mt 8 max-w 22em` 14/20 #6f7988.
- Below: a 160 ruler (`h-40 justify-evenly`). Edge fades: 116px-wide absolute overlays at left and right (gradient from bg).

### 3.14 S-ORBIT: centered illustration + 3 text cols (web-agent B6, 842)
- P1 shell, `py 64`. Illustration row: centered img **400x263** (`w-60 lg:w-100`, max 80%) over a full-width horizontal hairline at its vertical middle.
- `grid grid-cols-12 gap-y 64 pt 96` (pt 64 below lg). Centered two-tone heading (col 2/-2, max 696, `leading-[1.15]`; the H2 is `block` here, so the lead and continuation sit on separate lines). Then `col 3/-3 grid lg:grid-cols-3 gap 24` (292.8 each): h3 18/24 + p `mt 2` 16/22 #8f99a8. Below lg: 1 col, gap 32.

### 3.15 S-LINKS: "plugs in" platform link grid
- **Legacy** (call-int B7, data B10, sequences B6; 689): stacked centered header (`pt 160 pb 80`, max-w 512, gap 16; H2 40/44 w600 1L, p 20/26 1L). Frame: P3 stub, dashed P4 top and bottom, a full-box svg (guides), then `col 2/-2 grid grid-cols-4 gap-px p-px bg #e4e7ec`: **8 cells 288.3x120**, `p 20`, bg #fff. Ends with a 120 guide row. Grid is `max-xl:grid-cols-2 max-md:grid-cols-1`, cells `max-md:h-24`.
- **v2** (enrichment B6; 805): `grid lg:grid-cols-[13fr_11fr]`. Left pad 58/57.9, H2 40/44 (max 520). Right `grid grid-cols-2 gap-px bg #e4e7ec` (border-l), **8 cells 317.5x136**, `p 32` (`p-6` below lg), `max-md:h-30`.
- Cell content (both): `flex-col justify-between`. Overline `[01]`…`[08]` (#a4adba) on top. Bottom row: h3 16/22 w500 #1c1d1f (c2–19) and a 14px arrow-up-right icon (#a4adba).
- Hover: overlay `bg #fafafb` from opacity 0 to **.8**, 300ms ease-in-out (`cubic-bezier(.2,0,0,1)`), entering in 50ms; active opacity 1. The arrow goes from opacity 0 / translateX(-1px) to 1 / 0, 400ms (150ms on hover-in, 50ms on active).

### 3.16 S-QUOTE: big serif testimonial (scroll reveal)
Routes: sequences B3 (558), call-int B2 (558), workflows B6 (586), ask B5 (630), enrichment B4 (800, v2).
- `min-h-[62svh]`, flex-col centered. P5 dot field (full box). Top and bottom 160 rows: P3 guides in legacy; enrichment has plain 160 rows.
- Centre col 2/-2 `items-center`. Quote `p` `max-w-[20em]` (800) centered, tiempos 40/44 w400 -0.6. Each word is a `span` (`transition-colors duration-600 ease-in-out` = 600ms `cubic-bezier(.2,0,0,1)`), unrevealed class `text-caption-foreground` #a4adba, revealed #1c1d1f. Quote length c77–181 (2–5 lines). Name `mt 48` 14/20 w600 #232529, role `mt 2` 14/20.
- Motion M-S4. <lg: 32/36 at 768 and 390, rows shrink to 100.

### 3.17 S-STRIP: integration arc strip, 356
Routes: mcp B1, call-int B4.
- Box `bg #fafafb`, overflow hidden. Header: nested grid, `pt 80 pb 48` (`lg:pt-20 lg:pb-12`), centered `text-xl`. h2 20/26 w600 #1c1d1f (c20–34, 1L) + p `mt 4` 20/26 #6f7988 (c53–59, 1L).
- Lower 172 area (`pt 12`, `mask-image: linear-gradient(to bottom, black, black 50%, transparent)`): a **1440x1360 svg arc** (large circle outline in #e4e7ec, top at y+12), with app tiles placed along it. Tiles: 64px circles, `border 1px rgba(28,29,31,.05) backdrop-blur-xs`, inner `bg #fff shadow-attio-5`, holding app glyphs (original art). A 160-tall 12-col guide row overlays it.

### 3.18 S-TABS: tabbed showcase
- **Legacy** (call-int B5 1046, data B9 1082): P2 header (H2 is `block`, so lead and continuation sit on separate lines). Tab row col 2/-2 `pb 20`, flex gap 8. Pills are `button-outline` **h32 radius 10 px 10**, 14/20 at lg (12/18 below), border #e4e7ec. Active: `border #cad0d9`, text #232529, `pointer-events-none`. Idle text #232529 at lg (#505967 below lg). Hover bg #fafafb (50ms in, 300ms out). The last item is a ghost link "More" with a chevron (pr 6, gap 4). Panel row `mt 20`, frame with dashed guides: col 2/-2 flex 1158x502. Left `w-3/10` (347) `bg #fff my-px` with a right hairline. Title h3 interDisplay 24/30 w600 at `top 48 left 40`; desc p 16/22 #505967 `mb 12` anchored `inset-x-40 bottom-40`. Title and desc fade (`filter blur(0)`, opacity). Right panel 809x500 `bg #fafafb`, P5 dots, image `object-contain` full size (source 3356x2056). Ends with a P3 guide row. Left panel hidden below lg.
- **Ask variant** (B1 1104): centered H2 (1L, c38). Tabs: 5 text buttons in a `grid-cols-5` (231.6 each, lg only), 14/20, idle #a4adba / active #232529, `pb 16`, 300ms color transition. Under them a **tick ruler**: about 160 1px x 8px ticks (#e4e7ec, gap 12, `min-w-[200vw]`) masked `mask-x-from-96%`. The row is a draggable carousel (`cursor-grab`, framer drag, transform). Panel: col 2/-2, 50/50. Left 578x576 `bg #fff`, h3 24/30 w600 (c48, 2L) at top 48 / left 40, and a p at the bottom. Right 578x578 `bg #fafafb` with dots and a centered mock (346x400, `max-2xl:scale-90`). P8 "+" crosshair markers on the four outer corners.
- No auto-advance on any tab set (sampled 20s with no change); click only.

### 3.19 S-UCBAND: dark "Powered by Universal Context" band
Routes: ask B2, workflows B8. `section.dark min-h-svh` (1016 at 900 tall, 989 at 800), flex-col center, bg #101010.
- Top: `<canvas>` 1440x610 (wireframe/terrain animation, **canvas, not measurable**).
- Header `pt 368`, gap 12: "Powered by" 18/24 #6f7988 (c10) above H2 56/60 w600 #fff (c20 incl. a superscript "TM" at 56px w700 -1.4, rendered small). Centered.
- P3 guide row (160, dark lines).
- Card row: container, grid 12 (116 cols), inner col 2/-2 `grid-cols-5` of **232x232** cells. Each cell has an absolute bg #101010 tile with 1px grid lines in weak-stroke #232529 on all four sides (svg) and P8 4x4 corner squares (#6f7988). Content `flex-col justify-between gap 12 pad 24`: 20px icon (16 below xl), then p 16/22 (14/20 below 2xl) #fff with an inline continuation span #8f99a8 (c≈60, 3L).
- Closing P3 guide row 160. At 768: 1228 tall; at 390: 1372 (cards stack).

### 3.20 S-ASK-INTEL (ask B3, 1880)
- `section.container` border-x. Opens with a P3 guide row, a hairline, and a centered header (grid inside col 2/-2, `pt 160 pb 80`, max 448, H2 32/36 2L).
- Product mock area 1158x704 (col 2/-2, `pt 4`) with the box masked `mask-b-from-50% mask-b-to-85%`, plus dashed guides. The mock window is 1158x640 (titlebar 40 with border #eeeff1), `mb 64`.
- Hairline, then `grid grid-cols-3 gap-px bg #e4e7ec` (462.6 each, 538 tall). Cell `bg #fff p 24`: icon 24 `mb 16`; h3 18/24 w500; p `mt 4 max-w 384` 16/22 #6f7988 (2L); then `flex-1 items-end` media `aspect-6/5` **415x346** `mt 32` with inner `bg #fafafb p 24`, holding floating mini UI cards (`rounded-xl bg #fff px 12 py 10`).
- Hairline + P3 guide row.

### 3.21 S-BENTO (reporting B2, 1264)
- Legacy centered header (`pt 160 pb 80`, H2 32/36 w600 centered, max 640, lead + continuation 2L).
- `grid grid-cols-8 gap-px bg #e4e7ec` (border-y). Row 1: span-5 cell 868 + span-3 cell 521 (**486 tall**). Row 2: span-3 521 + span-5 868 (**464**). Cell `bg #fff lg:p-32`, inner col 2/-2 `flex-col gap 32`. Media `lg:h-79` (**316 tall**; 804 or 457 wide), `aspect-3/2` below lg, object-contain. h3 18/24 **w600**, p `mt 6` 16/22 **#505967** (tertiary).

### 3.22 S-SHOWCASE-L (sequences B1, 1192)
- Legacy header (`pt 160 pb 80`, H2 32/36). Then hairline. Then a scroll box `bg #fafafb` (P6-like `text-surface-subtle` pattern layer) with `pad 80 / 115.8`, holding the full-width product image **1158x719** (source 3840x2384, `max-md:min-w-185`, horizontally scrollable on small screens, `scrollbar-none overflow-scroll`).

### 3.23 S-NEWS (mcp B8, 305)
Same component as the homepage newsletter (section 10). Layout here: `flex justify-between items-center gap 32 pad 56 / 57.9`. Left: two lines interDisplay 24/30 w500 (#1c1d1f + #6f7988). Right: form 400 wide, grid `[1fr auto] gap 8`, input 299x40, button 93x40. Then hairline + 128 spacer.

### 3.24 S-CTA: platform final CTA (differs from homepage `FinalCTA`)
`section.dark relative overflow-hidden border-y 1px #2e3238 bg #101010`, **450 tall** at every width (472 at 390 on UC because of its 2-line H2).
- Background layer: container box with a stripe field `repeating-linear-gradient(to right, rgba(255,255,255,.035) 0 1px, transparent 1px 8px)`. **Masked** `radial-gradient(50% 57.63% at 50% 0%, transparent 55%, #000 100%)`, so the stripes fade out in a dome around the top center. Falling streaks: reuse homepage M16 (6 streaks).
- Content: container `border-x #2e3238`, `flex-col center gap 24 pad 80/24`, `min-h 112`.
  - H2 56/60 w600 -0.84 #fff, `max-w-4xl` (896), balance. It is rendered as 1 line (c29–30) or as 2 `span.block` lines (c15+c14, "Agentic revenue / runs on Attio."-style).
  - Button row gap 8: dark primary (110.5x36) + dark outline (107.8x36).
- Differences from homepage FinalCTA: 450 vs 417 tall, H2 56/60 w600 vs 56/56 w500, gap 24 vs 28, pad 80 vs 120, stripe alpha .035 vs .04, plus the radial mask. <lg: H2 40/44 -0.4; buttons stack below md.

---

## 4. Template T3: /platform/developers (dark blueprint)

Page wrapper is `.dark` (bg #101010, tokens per 0.2). Most blocks are desktop-only (`max-lg:hidden`) with simpler `lg:hidden` mobile twins.

- **Blueprint grid**: each block is a P1-style container with `border-x #2e3238`. Inside, a `grid` of **24 cols (57.9)** with square rows (57.9). Lines are drawn by absolutely positioned 1px svgs in weak-stroke **#232529**: one vertical every column (`justify-evenly`) and one horizontal every row. Section headers use a finer 48-col (28.9) grid.
- **D-HERO** (695/615): copy at col 3/14 (x 141), vertically centered. Overline `[ DEVELOPER PLATFORM ]` 12/14 w600 #8f99a8 (`text-shadow-md`). H2 `mt 24` 56/60 w600 #fff (`text-shadow-lg`). p `mt 16` 18/24 #fff, max 504 (2L). Buttons `mt 24` gap 10: dark primary "View docs" 95x36 + dark outline 112x36. Right: col 15/-1, a 579x579 line-art 3D logo/wireframe svg (original art) starting at the first row line (y 174).
- **D-SECTION header** (412 / 376): 48-col grid, header col 6/-6 (x 170, w 1100) `flex-col gap 28`, `pt 160 pb 80`. Legacy two-tone H2 32/36 (#fff w600 + #8f99a8 w500) max 640, then a dark outline "View docs" 95x36.
- **D-CARD rows**: cards are absolutely placed on the 24-col grid (B1: cols 3/11, 11/17, 17/23, giving 463/348/347 wide). Rows are **405** tall (B4 first row 463 with 2 cards of 579; B4 second row 3 x 386 x 382). Card `bg #101010`, inner grid 16 (or 12), content col 2/-2 `py 28`: overline `[ 01 ]` 12/14 #505967 at top-left; illustration area (dashed-stroke diagrams, stroke #23252a / #383e47, masked `mask-r-from-70% mask-b-from-50% mask-b-to-80%`); p 16/22 #8f99a8 at the bottom (2–3L). The 1px border lines (top, bottom, left, right; #232529) and P8 corner squares (4x4 #6f7988) are drawn per card. The row is wrapped by full-width horizontal row lines.
- **Inline quote strip** (232, inside B3/B4): box col 5/-5 with lines and corners. Quote p 28/34 w500 **#b5bdc9** (c82–88, 2L, max 784, bottom-left). Attribution overline right-aligned (12/14 #505967, 2L "NAME / ROLE").
- **D-TESTIMONIAL** (B2/B6, 579): mono label at col 2/5 row 3 (JetBrains Mono 12/18 uppercase #8f99a8, name + "// ROLE", with a 174x1 underline svg). Portrait: **348x348 `<canvas>`** (dithered halftone portrait, `mix-blend-lighten`, **canvas, not measurable; use your own art**) at col 3/9 rows 3/-3. Quote box col 9/-3 (811x348) with lines and corners. Quote text col 10/-4, 28/34 w500: words #6f7988, opening mark #edeff3. Words are spans and presumably reveal to #edeff3 on scroll like M-S4 (not sampled).
- **D-HEATMAP** (B5, 781): header + "How we build" outline button (115x36). Then a contribution-style grid of 359 small square cells (inline `opacity` per cell, `transition opacity 150ms cubic-bezier(.2,0,0,1)`) in a 1158x232 lined box, with a mono caption at bottom right.
- **D-APPS** (B7, 1027): header (H2 1L + continuation 4L) + "Browse apps" button. Row of 5 app icons (image boxes 59x51, no radius on the img; tile art is in the image) each with a 14/20 label; an inline link row with a 16px GitHub-like glyph + h3 16/22 (c40) + arrow.
- **D-CTA** (B8, 753/666): centered H2 32/36 "Ready to build?" (c15) with a mono command chip (16/22 JetBrains #505967 + highlighted segment; chip length not counted). Surrounded by floating dark mock windows (calendar, terminal, list, buttons) placed on the grid at about 231x231, 289x174 and similar sizes. Cells have `pointer-events-none` overlays that fade (`opacity 0` → hover reveal, 150ms). The page has **no S-CTA**; the footer follows.
- At 768 the page is 14431 tall (mobile twins stack every card full-width). At 390 it is 10564.

---

## 5. Motion

All JS motion is framer-motion (inline styles). CSS animations use the `enter` keyframes from tailwindcss-animate. Respect `prefers-reduced-motion` (`motion-reduce:` variants disable all of these).

**M-P1. Hero copy entrance** (`animate-in fade-in slide-in-from-bottom-1`, `animation-fill-mode: both`). Every element animates from `opacity 0, translateY(4px)` to rest. The CTA row is opacity only (no translate). Easing `cubic-bezier(.2,0,0,1)` throughout. Staggers are 100ms. Durations and base delays per route:

| route | duration | pill | headline | subhead | CTA |
|---|---|---|---|---|---|
| custom-agents | 600ms | 100 | 200 | 300 | 400 |
| enrichment, mcp | 1000ms | 100 | 200 | 300 | 400 |
| ask | 1000ms | n/a | 200 | 300 | n/a |
| web-agent | 1000ms | n/a | 700 | 800 | 900 |
| reporting | 1000ms | 700 | 800 | 900 | 1000 |
| call-intelligence | 1000ms | 1100 | 1200 | 1300 | 1400 |
| universal-context | 1000ms | n/a | 1200 | 1300 | 1400 |
| sequences | 1000ms | 4100 | 4200 | 4300 | 4400 (waits for the email mock to play) |
| data | hero perspective block `enter` 1.25s `cubic-bezier(0,0,0,1)`, from opacity 0, translateY(24px), rotateX(-6deg) | | | | |
| workflows, developers | copy not animated (static at first paint) | | | | |

**M-H2. Agent/flow cards** (custom-agents hero, workflows hero), CSS keyframes:
- `custom-agents-border-draw` 2.5s linear (svg stroke-dashoffset → 0). A green progress outline traces around the card.
- `custom-agents-port-complete` 2.5s ease-in-out (connector port dots → opacity 1).
- Running pill: `custom-agents-status-start` 2.5s ease-in-out. Keyframes: 0% opacity 0 / top 0, 15–85% opacity 1 / top -28, 100% opacity 0 / top 0. Its spinner is `spin 1s linear infinite`.
- Completed pill: `custom-agents-status-finish` 2.5s (0–85% hidden, 100% opacity 1 / top -28), then `custom-agents-completed-exit` 300ms with 3.5s delay (→ opacity 0, translateY(28px)).
- Cards run in sequence along the flow (JS adds `-active` classes). Hero hover/drag: cards are draggable (framer), with no snapping observed.

**M-H3. Reporting radar** (CSS, starts about 1.0–1.4s after load):
- Rings `reporting-radar-fade-in` 450ms ease-out, staggered **35ms** per ring (delays 1.035s → 1.385s). Then `reporting-radar-ring-pulse` 4s linear infinite, staggered **120ms** (1.955s → 3.155s). Pulse keyframes: border-color subtle → `color-mix(blue-500 32%)` at 7% → subtle at 26–100%.
- Beam `reporting-radar-arm` **8s linear infinite**, delay 1.835s, rotating `--reporting-arm` 360deg (register with `@property`).
- Dots `reporting-radar-dot`: 0% opacity 0 scale .4 → 3% opacity 1 scale 2.2 → 9–92% scale 1 → 100% opacity 0.
- Card enter `reporting-radar-enter`: opacity 0, translate(0, 8px), scale .96 → rest.

**M-H4. UC horizon**: wrapper `universal-context-horizon-reveal` 400ms ease-out. Circles `horizon-define` 600ms ease-in-out, delay 400ms (opacity 1 scale 1 → 65% → opacity 0 scale .8), with a matching reveal on the replacement circle. Groups reveal 500ms ease-in-out, delay 1s.

**M-H5. MCP hero**: logo cells `lRYFwa_logo-in` 800ms ease-out from opacity 0 / blur(3px), delays 1.60 / 1.68 / 1.76 / 1.84 / 1.92s (80ms stagger). Grid lines reveal (`gridReveal`, class-toggled). The prompt box reveals (`boxReveal`) and then types placeholder text and cross-fades the client skins (cycle timing not sampled).

**M-H6. Web-agent hero**: line grid and chips drift (`translateY` on wrapper layers, `transform, opacity 700ms cubic-bezier(.65,0,.35,1)`). Chip hover 200ms ease (.4,0,.2,1).

**M-S1. v2 split accordion (S-SPLIT)**:
- Click an item: it becomes active. Colors animate 300ms `cubic-bezier(0,0,0,1)`, desc 75ms later, track `opacity/scale` 500ms with 150ms delay. Images cross-fade (`opacity, scale` 500ms `cubic-bezier(0,0,0,1)`, delay 150ms; inactive opacity 0).
- Auto-advance: the active fill grows linearly at about 0.17–0.18/s, so **≈5.5–6s per item**. When it reaches 1 the next item activates and the bars wrap.
- Observed gating: progress only advanced while the block was in view (grid top between ≈570px and ≈-300px of a 900px viewport) **and the page was being scrolled**. It froze completely when the page sat idle (16s sample with no change), and resumed on any scroll. Implement as a rAF timer that runs while the block is in view and pauses after about 250ms with no scroll events.

**M-S2. Legacy split accordion (S-SPLIT-L)**: pure time-based, starts once the block is in view. Fill `translateX(-100% → 0)`, linear, **≈5.5s per item** (sampled -89.9% at 0.5s, -6.3% at 5.0s). Then the active item collapses and the next expands: `height auto ↔ 0`, `opacity`, `filter blur(1px) ↔ 0`, **≈500ms** (framer). It loops. Clicking an idle title selects it.

**M-S3. Marquee rows (S-MARQUEE)**: **scroll-linked, not time-based**. Row 1 `translateX(-v)`, row 2 `translateX(+v)`. v starts at 0 when the band's top is about 870px below the viewport top and grows **≈0.0985px per px scrolled** (17px after 200px, 115px after 1400px). The measured maximum was 126.7px as the band left the viewport. Framer smooths it (values settled about 1s after each scroll stop), which suggests a spring on `useScroll`.

**M-S4. Serif quote word reveal (S-QUOTE)**: scroll-linked. The first word is revealed when the quote's top reaches about 850px from the viewport top (900 viewport). Words then reveal linearly until all are revealed at about 400px (11 words over 450px, so about 41px per word). Reverses on scroll up. Each word animates its color #a4adba → #1c1d1f over 600ms `cubic-bezier(.2,0,0,1)`.

**M-S5. Hover micro-interactions**: link-grid overlay and arrow (3.15). Tab pills 300ms (50ms on hover). Legacy accordion titles use the homepage animated underline. Hero tab bar (data) bg 200ms ease-out. Domain chips 200ms.

**M-S6. Final CTA**: same falling streaks as homepage M16 (6 inline-transformed streaks, sampled opacity .07–.21). The H2 does not animate.

**M-S7. Ask page**: `ask-hero-rise` (from opacity 0, blur(6px), translateY(16px)) and `ask-hero-fade` (from opacity 0, blur(6px)) on the chat widget. `ask-thinking-sweep` shimmer on "thinking" text (bg-position 200% → -100%). ask-intel mini cards enter from opacity 0, translateY(10px), blur(1px). Durations of the ask widget sequence were not sampled.

There is **no generic fade-up-on-scroll** for v2/legacy section headings; they render static.

---

## 6. Responsive summary (768 / 390)

- Header 100, footer 1038/1072 (unchanged components).
- **v2 (T1)** blocks go full-bleed (no container borders). Spacers shrink to 64. Inset is 32 (`px-8`). H2 32/36.8. h3 16/22. Grids collapse to 1 col, except S-QUAD at 768 (2x2) and S-LINKS v2 (2 cols). Split heading moves above the list (3.2). Columns rows remain horizontally scrollable (`auto-cols-[280px]`, snap).
- **Legacy (T2)** blocks keep the bordered container (576 / 342). Header pads 100/60. H2 28/34. Guide rows 100. Card frames go 1 col.
- Display (hero/CTA/UC band) 40/44 w600 -0.4. Hero subhead 18/24.
- Stat number 100 (768) / 74.1 (390).
- Marquee scaled 0.8 below lg.
- LogoGrid 2 cols x 3 rows at 390 (290 tall).
- S-CTA keeps 450.
- Developers: desktop blueprint blocks are replaced by stacked mobile twins.

---

## 7. Assets and media boxes (replace all with original art)

| kind | where | count / sizes |
|---|---|---|
| Raster screenshots (Storyblok PNG/WebP via next/image) | S-SPLIT panels (720x883 source → 694x640 box, contain), S-GRID3 (1200x948 → 399x315), S-CENTER-MEDIA (≈1152x650 → 1158 wide), S-GRID-L2Q (≈2100x1000 → 481x289), S-SPLIT-L (≈2200 square → 560x490), S-TABS (3356x2056 → 809x500), S-BENTO (804x316 / 457x316), sequences showcase (3840x2384 → 1158x719), data hero window (3840x1906 → 1132x562) | 4–13 per route |
| Icons 20–24px PNG | marquee cards (80x80 source), S-ICON-ROW / S-SPLIT-ICONS / ask cards (24), UC band (72 source → 20) | ~40–70 on marquee pages |
| Inline SVG illustrations | legacy card wells (321 square), developers card diagrams, hero line art | per page |
| `<canvas>` | ask hero waves (1441x838), UC band (1440x610, ask + workflows), developers portraits (348x348 x2) | not measurable |
| `<video>` mp4 | call-intelligence hero recording card (404x227) | 2 sources |
| Customer logos (CSS mask-image SVG/PNG) | LogoGrid | same as homepage, do not reuse |
| Fonts | same 4 families as homepage; JetBrains Mono is now also used in the web-agent chips and on developers | |

---

## 8. Not measured / caveats

- **Canvas content** (ask hero, UC band, developers portraits): only the boxes are recorded.
- Exact framer spring constants for M-S1 gating, M-S3 smoothing and the M-S2 collapse. Values above are sampled timings.
- MCP prompt-box skin cycle period, typing speed, and the ask chat-widget scripted sequence timing were not isolated.
- The developers quote word reveal is inferred from span structure and colors (#6f7988 words, #edeff3 opening mark); not scroll-sampled.
- The custom-agents hero drag interaction (constraints/snap) was not exercised.
- Product-mock interiors (tables, kanban cards, chat windows) are copyrighted UI; only outer boxes and representative card styles are given.
- Heights of `svh` sections depend on viewport height (see section 2).
- Text line counts for inline two-tone headings (lead `h2` + inline `p`) are derived from box height ÷ line-height, so the continuation count can include the shared first line.

---

## Appendix A: copy counts per route (1440)

Roles: `h1`/`h2` headline, `h2-cont` two-tone continuation, `display` CTA/band display spans, `h3`, `p` body (≥16px), `btn` 14px link-buttons, `tab`, `overline`, `quote` (`c` = total characters across word spans, `w` = word count). Mock-interior text is omitted. B# and y match section 2.

**/platform/ask**
- B0 (y116): h1 c10/w2/1L; p c66/w9/2L; strip p c76/w10/2L; btn c13; btn c14
- B1 (y1100): h2 c38/w4/1L; tabs c9, c7, c5, c8, c15; panel h3 c48/w8/2L
- B2 (y2205): "Powered by" c10; h2 c20/w3/1L (incl. TM); 5 cards p ≈c60/3L each
- B3 (y3222): h2 c52/w10/2L; h3 c35 + p c76/2L; h3 c27 + p c92/2L; h3 c41 + p c84/2L
- B4 (y5104): h2 c28/w5/2L; p c64/w9/2L; 32 marquee cards: title ≈c8–20, desc ≈c40–60 (2L)
- B5 (y6073): quote ≈c181/w32 (5L)
- B6 (y6703): display c29/w6/1L; btn c14; btn c13

**/platform/call-intelligence**
- B0 (y116): h1 c17; h2 c23/w4/1L; p c120/w17/3L; btn c14; btn c13
- B1 (y938): h2 c49/w9/2L + cont c58/w8/2L; 3x (h3 c24–26/1L, p c58–81/2L)
- B2 (y1924): quote ≈c95/w17 (3L)
- B3 (y2483): h2 c37/w4/2L + cont c25/w4; items h3 c26/c29/c30; active p c75/w14/2L
- B4 (y3234): h2 c34/w5/1L; p c59/w9/1L
- B5 (y3591): h2 c25/w5/1L + cont c33/w7/1L; tabs c6, c12, c19, "More" c4; panel h3 c6
- B6 (y4638): h2 c27/w3/1L + cont c45/w6/2L; 4x (overline c4, h3 c18–33/1L, p c42–82/1–2L); inline quote c96/3L; name c11; role c19
- B7 (y6588): h2 c29/w6/1L; p c41/w7/1L; 8x (overline c4, h3 c2–19)
- B8 (y7277): display c15 + c14 (2 lines); btn c14; btn c13

**/platform/custom-agents**
- B0 (y116): h1 c13; h2 c29/w6/2L; p c79/w14/2L; btn c14; btn c13; 4 hero cards (title c18–21, desc c29–36)
- B2 (y1095): h2 c25/w5/1L + cont c42/w6/2L; items (title c27/c31/c29, desc c65/c64/c76, 2L)
- B4 (y1865): h2 c52/w10/2L + cont c29/w6/1L; 20 marquee cards
- B5 (y2703): h2 c23/w4/1L + cont c57/w11/2L; stat c4; label c23
- B6 (y3297): h2 c22/w4/1L + cont c69/w13/2L
- B7 (y4480): h2 c29/w4/2L + cont c38/w8/2L; 3x (h3 c15–25/1L, p c49–74/2L)
- B8 (y5281): display c29/w6/1L; btns

**/platform/data**
- B0 (y116): h1 c10; h2 c24/w4/1L; p c87/w17/2L; btns; hero tabs 4 (c10–14)
- B1 (y1627): h2 c35/w4/1L + cont c68/w11/3L; 4x (overline c4, h3 c20–33, p c59–87/2L); inline quote c109/3L
- B3 (y3634): h2 c27/w4/1L + cont c69/w9/3L; 3x (h3 c14–18, p c55–71/2L)
- B5 (y4275): h2 c42/w4/1L + cont c109/w18/3L; 3x (h3 c23–34, p c60–88/2–3L)
- B7 (y5319): h2 c24/w4/1L + cont c92/w15/4L; items h3 c16/c24/c23; active p c90/w16/2L
- B9 (y6070): h2 c34/w5/1L + cont c69/w11/3L; tabs c14, c15, c14, "More" c4; panel h3 c14; p c60/w9/2L
- B10 (y7153): links (as call-int B7)
- B11 (y7842): display c15 + c14; btns

**/platform/developers**
- B0 (y116): overline c22; h2 c18/w3/1L; p c64/w13/2L; btn c9; btn c11
- B1 (y812): h2 c30/w4/1L + cont c70/w13/3L; btn c9; 3 cards (overline c6, p c49–59/2L)
- B2 (y1804): mono name c10 + role c16; quote ≈c180/w32 (4L)
- B3 (y2384): h2 c27/w5/1L + cont c54/w10/2L; btn c9; 6 cards (p c70–97/2–3L); strip quote c82/w16/2L; attribution c23
- B4 (y3978): h2 c27/w5/1L + cont c91/w15/3L; btn c9; 5 cards (p c58–73/1–2L); strip quote c88/w16/2L; attribution c25
- B5 (y5641): h2 c30/w4/1L + cont c44/w10/2L; btn c12
- B6 (y6423): mono name + role; quote ≈c95/w18 (2L)
- B7 (y7004): h2 c35/w6/1L + cont c103/w18/4L; btn c11; 5 app labels c6–8; link h3 c40/w8
- B8 (y8032): h2 c15/w3/1L; command chip (not counted)

**/platform/enrichment**
- B0 (y116): h1 c10; h2 c31/w4/1L; p c87/w16/2L; btns
- B1 (y901): h2 c21/w4/1L + cont c106/w18/3L; 3x (h3 c15–24, p c87–93/2L)
- B2 (y1813): h2 c31/w5/2L + cont c73/w10/3L; items (3)
- B3 (y2582): h2 c24/w6/1L + cont c65/w11/2L
- B4 (y3624): quote ≈c140/w19 (4L); name c13; role c32
- B5 (y4425): h2 c32/w6/1L + cont c100/w16/4L; 4x (h3 c13–27, p c49–69/2L)
- B6 (y5247): h2 c29/w6/1L + cont c41/w7/2L; 8 links (overline c4, h3 c2–19)
- B7 (y6053): display c29; btns

**/platform/mcp**
- B0 (y116): h1 c3; h2 c29/w4/1L; p c58/w11/1L; btns; prompt c≈30 typed
- B1 (y928): h2 c20/w4/1L; p c53/w8/1L
- B2 (y1285): h2 c33/w6/1L + cont c47/w8/2L; 3x (h3 c17–22, p c52–83/1–2L)
- B3 (y2040): h2 c30/w5/1L + cont c58/w9/3L
- B4 (y3246): h2 c37/w5/1L + cont c55/w12/3L; 3x (h3 c10–15, p c45–48/1L)
- B5 (y4136): h2 c28/w5/2L + cont c33/w7/2L; stat c5; label c46
- B7 (y4924): h2 c21/w4/1L + cont c45/w9/2L; btn c13; 3x (overline c2, h3 c8–14, p c56–75/2L)
- B8 (y5573): h2 c16; cont c23; input placeholder c18; button c9
- B9 (y5878): display c29; btns

**/platform/reporting**
- B0 (y116): h1 c9; h2 c35/w6/2L; p c98/w15/2L; btns
- B2 (y1031): h2 c31/w5/1L + cont c40/w8/2L; 4x (h3 c26–33, p c54–74/1–2L)
- B3 (y2296): h2 c16/w3/1L + cont c46/w10/3L; items (3)
- B4 (y3066): h2 c20/w4/1L + cont c103/w15/4L; 6x (h3 c26–30, p c42–63/1–2L)
- B5 (y4486): display c15 + c14; btns

**/platform/sequences**
- B0 (y116): h1 c9; h2 c26/w3/1L; p c92/w15/2L; btns
- B1 (y937): h2 c22/w3/1L + cont c54/w8/2L
- B2 (y2130): h2 c22/w2/1L + cont c68/w10/3L; 3x (h3 c24–27, p c58–71/2L)
- B3 (y3116): quote ≈c77/w11 (2L); name c13; role c36
- B4 (y3675): h2 c19/w2/1L + cont c58/w9/3L; items h3 c30/c10/c14; active p c91/w16/2L
- B5 (y4426): h2 c27/w4/1L + cont c66/w9/3L; 4x (overline c4, h3 c12–18, p c37–51/1L)
- B6 (y5940): links
- B7 (y6629): display c15 + c14; btns

**/platform/universal-context**
- B0 (y116): h1 c18/w2/1L; p c80/w14/2L; btns
- B2 (y1142): h2 c38/w8/2L + cont c66/w8/3L; items (3)
- B3 (y1912): h2 c30/w5/1L + cont c56/w9/3L
- B4 (y3093): h2 c41/w6/1L + cont c66/w10/2L; 3x (h3 c14–16, p c35–40/1L)
- B5 (y3984): h2 c26/w3/1L + cont c47/w9/2L; 5x (h3 c13–22, p c39–48/2L)
- B6 (y4718): h2 c20/w5/1L + cont c62/w9/3L; 4x (overline c9–20, h3 c14–22, p c43–56/2L)
- B7 (y5615): display c18 + c10 (2 lines); btns

**/platform/web-agent**
- B0 (y116): h1 c28/w4/1L; p c79/w15/2L; btns; 10 chips c6–15
- B2 (y1095): h2 c27/w5/2L + cont c36/w6/2L; items (title c20–25, desc c65–76, 2L)
- B4 (y1865): h2 c21/w4/1L + cont c92/w15/3L; 3x (h3 c24–30, p c62–78/2L)
- B6 (y2777): h2 c40/w9/1L; cont c37/w7/1L; 3x (h3 c22–24, p c49–77/2L)
- B8 (y3620): h2 c29/w4/2L + cont c38/w8/2L; 4x (overline c9–20, h3 c16–20, p c49–54/2L)
- B9 (y4516): display c29; btns

**/platform/workflows**
- B0 (y116): h1 c9; h2 c38/w6/3L; p c93/w15/2L; btns; 5 flow cards (title c9–26, desc c≈30)
- B2 (y1101): h2 c15/w3/1L; p c83/w15/2L; 32 marquee cards
- B4 (y2026): h2 c43/w8/1L + cont c50/w9/2L; 5 cols (h3 c9–16, p c≈35/1–2L)
- B6 (y2791): quote ≈c146/w23 (4L); name c9; role c37
- B7 (y3378): h2 c50/w9/2L + cont c43/w9/2L; items h3 c21/c23/c28; active p c67/w11/2L
- B8 (y4128): band (as ask B2)
- B9 (y5144): h2 c23/w5/1L + cont c54/w10/2L; 3x (h3 c22–27, p c49–59/2L)
- B11 (y6094): h2 c17/w3/1L + cont c53/w6/2L; 3x (h3 c25–31, p c56–61/2L)
- B12 (y6698): display c29; btns
