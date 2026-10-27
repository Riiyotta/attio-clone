Source: https://attio.com/

# Attio secondary pages: design clone spec (React 18 + Vite + Tailwind v3)

Companion to `CLONE_SPEC.md`, which covers the homepage. **Read that file first.** This file only documents what is NEW or DIFFERENT. Tokens, fonts, buttons, header (`SiteHeader`), footer (`SiteFooter`), easing tokens, shadows (`attio-N`), the container, and the 24/12-column grid all come from `CLONE_SPEC.md` §0–§1 and §12, and are referenced here by name.

Measured live with an isolated headless Chromium (Playwright 1.64) on 2026-10-27. Widths: **1440x900** (primary), **1280x800**, **768x1024**, **390x844**. Colors are computed values converted from `lab()`/`oklch()` to sRGB hex through canvas. y values are document-absolute at 1440 unless noted. Raw dumps: `/private/tmp/claude-504/-Users-riyaghosh-V3-attio/0386083d-2cc0-4882-aa5c-406445033676/scratchpad/pages/raw/*.json`.

**Content rule (same as homepage).** Copy is recorded only as role + `c` (characters) / `w` (words) / `l` (lines at 1440). Plan prices, names, titles, quotes, and logos are not transcribed. Every logo, avatar, photo, screenshot, video, or illustration is a **media box**: fill it with original or neutral artwork at the stated size, aspect, radius, border, shadow, and background.

Routes covered: `/pricing /customers /startups /architecture /contact/sales /apps /apps/chatgpt /apps/claude /apps/slack /partners/app-partners /partners/creator-partners /partners/expert-partners /blog /engineering/blog /changelog /careers /help /help/academy /help/reference/attio-101`. `/platform/*` is out of scope.

---

## 0. New global tokens and primitives

### 0.1 Extra color tokens (not in `CLONE_SPEC.md`)

| token | hex | use |
|---|---|---|
| weak-stroke | `#edeff3` | FAQ item dividers, hero badge border, comparison sub-row dividers, thumbnail idle border |
| muted-strong-background | `#d3d8df` | dot-pattern dots, pricing corner "+" marks, careers square grid |
| surface (= white-400) | `#edeff3` | select option highlight |
| red-600 (error text) | `#f65351` | form error message |
| error border | `#ff5b59` | invalid input border (same as traffic-light red) |
| green-600 | `#0db472` | "official app" verified badge |
| link-blue | `#266df0` (blue-500) | inline links in FAQ and article body |
| hover-row | `#f5f6f8` | help sidebar link hover |
| help-sidebar-text | `#717a88` | help sidebar link text (literal `#717A88` on site) |
| lightbox overlay | `rgba(202,207,217,.40)` + `backdrop-filter: blur(4px)` | app gallery lightbox |
| dialog overlay | `rgba(110,120,135,.40)` + `blur(4px)`, opacity transition 200ms `cubic-bezier(.45,.05,.55,.95)` | search dialogs (cmdk) |
| ring-focus | `#94b9ff` (blue-300) 3px | input focus ring |

### 0.2 Extra type roles (1440)

| role | family | size / lh | wt | ls | color |
|---|---|---|---|---|---|
| Page hero H2 (all marketing heroes) | interDisplay | 56 / 60 | 600 | -0.84 | #1c1d1f. **40/44, ls -0.4 below 992** (768 and 390) |
| Hero eyebrow (`h1` inside the badge pill) | inter | 13 / 18.2 | 500 | -0.16 | #232529 |
| Hero lead | inter | 20 / 26 | 500 | -0.2 | #232529. 18/24 below 992 |
| Section two-tone heading (small) | interDisplay | 32 / 36 | lead 600 #1c1d1f + continuation 500 #8f99a8, inline in one block | -0.32 | 28/34 (ls -0.28) below 992 |
| FAQ / directory H2 | interDisplay | 40 / 44 | 600 | -0.4 | #232529 (FAQ) or #1c1d1f. 32/36 below 992 |
| Card H3 two-tone (partner cross-links) | interDisplay | 28 / 34 | 600 + 500 #8f99a8 | -0.28 | |
| Customer-story title (two-tone) | interDisplay | 32 / 36 | 600 / 500 #8f99a8 | -0.32 | 28/34 below 992 |
| Overline (meta, dates, tags) | interDisplay | 12 / 14 | 600 | 0.72 uppercase | #a4adba (default), #8f99a8 (story meta), #6f7988 (directory heads), #1c1d1f (active/current) |
| Serif quote (word-reveal) | tiemposText → Source Serif 4 | 28 / 36.4 | 500 | -0.42 | #1c1d1f. 24/31.2 below 992 |
| Serif testimonial (small) | serif | 20 / 26 | 500 | -0.2 | #1c1d1f (careers, expert hero), 16/22 (contact form side) |
| Serif CTA second line | serif | 40 / 44 | 400 | -0.6 | #1c1d1f |
| Pricing plan price | interDisplay | 40 / 44 | 600 | -0.4 | #1c1d1f |
| Form label | inter | 12 / 18 | 500 | 0 | #6f7988 |
| Form input text | inter | 16 / 24 | 500 | -0.16 | #232529. Placeholder **14px** #6f7988 |
| Form error | inter | 12 / 18 | 400 | 0 | #f65351 |
| FAQ question | inter | 16 / 22 | 600 | -0.16 | #232529 |
| FAQ answer / long body | inter | 16 / 22 | **400** | -0.16 | #505967 |
| Article body (app detail) | inter | 16 / 26 | 400 | -0.16 | #232529 |
| Mono label | JetBrains Mono | 12 / 15.6 | 500 | 0.6 uppercase | #1c1d1f (architecture, eng blog H1 14/20 #fff) |

### 0.3 Shared section shell (used by almost every marketing section)

Every section is `container` (from §0.7) → inner box with `border-x 1px #e4e7ec` (x 24..1416 at 1440). Inside it, a **12-column grid**: cols 115.83 at 1440, 102.5 at 1280, 47.83 at 768, 28.33 at 390. Content sits in `col 2 / -2`:

| width | content x | content width |
|---|---|---|
| 1440 | 140.8 | 1158.3 |
| 1280 | 127.5 | 1025 |
| 768 | 144.8 | 478.3 |
| 390 | 53.3 | 283.3 |

Sections are separated by full-width 1px `<svg>` hairlines (`section-divider`, #e4e7ec), as on the homepage.

**Dashed guide row** (`GuideRow`). This is a decorative spacer, 160 tall at ≥1200, 120 at 992–1199, 100 below 992 (some instances are forced to 56). It is a 12-col grid whose `col 2/-2` is `flex justify-between` with two (or 3/11) vertical 1px SVG lines: `stroke #e4e7ec, stroke-dasharray 4 6, linecap round`. It is hidden below 992 where marked. Horizontal dashed variants use the same dasharray. These rows sit above/below card grids so the dashed column lines "continue" into the grid.

**Hatched gutter** (`Hatch`). `background-image: repeating-linear-gradient(125deg, transparent, transparent 6px, #f3f4f6 6px, #f3f4f6 7px)`. It fills the gutters at col 1 and col 12 beside card grids, the area behind cell grids, and the app-icon band. Dark variant: color #2e3238 (black-400).

**Cell grid** (`CellGrid`). A grid with `gap 1px` on a `#e4e7ec` background (wrapper padding 1px) and white cells. This draws 1px internal hairlines. 2-up cells are 577.7 wide at 1440, 3-up are 384.8, 5-up are 231.7.

**Dot pattern** (`DotPattern`). An SVG pattern tile 10x10 with a 1x1 rect at (5.5, 5.5), fill #d3d8df, covering the whole bordered box. On heroes it carries `mask-image: linear-gradient(to top, #000 0%, transparent 50%)`, so dots are visible at the bottom and fade out by mid-height. Behind the customer-stories grid it is used unmasked.

**Card hover overlay** (`HoverWash`). Used by every clickable card or row. An absolute inset-0 `#fafafb` layer at opacity 0. Hover: opacity .8, 50ms. Leave: 300ms `cubic-bezier(.2,0,0,1)`. Active: opacity 1, 50ms. Trailing 14px arrow: `translate 0 → 2px` (x), 150ms in / 400ms out, same ease.

### 0.4 Shared components (spec once, reuse)

#### C1 `PageHero` (centered marketing hero)
- Header block is a flex column centered in `col 2/-2`. Padding: **top 120 / bottom 128** at ≥1200, 100 / 112 at 992–1199, 80 / 96 below 992.
- Badge pill (`HeroBadge`): inline-block, radius 13, 1px #edeff3, bg #fff, padding 6 12, height 32.2. Text is the eyebrow role (c7–c19). **mb 24.**
- H2: the page hero role, `max-width: 15em` (840), text-balance, centered.
- Lead: mt 16, max-width 576 (xl), text-balance, centered. 1–2 lines.
- Optional CTA row: mt 32, flex gap 8, primary + outline buttons (h36, §0.8 of homepage spec).
- Background: `DotPattern` with the top mask, covering the full bordered box.
- **Entrance (partner pages and apps)**: the CSS `enter` keyframe (`from {opacity: var(--tw-enter-opacity); transform: translate3d(0, var(--tw-enter-translate-y), 0)}`), fill both. Badge: opacity 0, y +4px, **1s `cubic-bezier(.2,0,0,1)` delay 100ms**. H2: same, delay 200ms. Lead: delay 300ms. Dot-pattern SVG: opacity 0 → 1, **1s `cubic-bezier(0,0,0,1)` delay 900ms**. Customers/startups/careers heroes have **no** entrance (static).
- Height at 1440: 466 (no CTA), 582 (with logos row), 661–994 (with media rows).
- Responsive: H2 40/44 and lead 18/24 below 992. Lead wraps to 3–4 lines at 390.

#### C2 `SectionHead` (two-tone heading)
- A 12-col header. The text block is `col 2/-2`, `max-width: 20em`. Padding **top 160 / bottom 80** (≥1200), 120/64 (992–1199), 100/60 (<992).
- The H2 (lead, 600) and P (continuation, 500 #8f99a8) are `display: inline` in one paragraph, so they wrap together. Left-aligned on most sections, centered on some (noted per section). At 1440: c14–c37 lead + c40–c149 continuation, 2–5 lines. Uses `mix-blend-multiply`.
- Variant **centered stack** (directory/FAQ/partner cross-links): H2 40/44 + P 20/26 #1c1d1f, stacked with gap 16, max-width 512 (695 for FAQ), centered.

#### C3 `LogoGrid` (pricing, customers, startups)
- Grid of **6 cols, 12 logos** (2 rows). Each cell 138.4x48 at 1440 (166.4x48 when inside col 2/-2 on startups). `object-fit: contain`. Gap: row 18, col 32. max-width 1280, centered.
- 768: 4 cols, gap 12/20 (cells 104.6). 390: 3 cols, gap 8/16 (cells 83.8).
- Section height 314 (pt 100, pb 100) at ≥992, 344 at 768, 336 at 390. Logos are monochrome placeholders.

#### C4 `FAQ` (pricing, startups, partners ×3)
- Centered column. Width 672 on pricing (x384) and 695 elsewhere (x372.5), at 1440. Section padding ~160 top / ~160 bottom.
- H2 (FAQ role) then 24px to the first item.
- Item: `border-bottom 1px #edeff3`, padding 28 0 (79 tall closed). Trigger: full-width button `margin: -6px -8px; padding: 6px 8px; radius 12`, flex justify-between gap 24, question (FAQ question role, c20–c68, 1 line).
- Icon: a bracketed plus, 19.2x12 SVG with stroke 1.5. Bracket lines are drawn at 0–20% and 80–100%, a horizontal bar runs from x 6 to 13.2, and a vertical bar runs at x 50%. Color #b5bdc9. Hover → #8f99a8 (150ms in, 400ms out). Open → #8f99a8, and the vertical bar goes `scaleY(0)` (origin center, 400ms `cubic-bezier(.2,0,0,1)`), which turns the plus into a minus.
- Panel: Base UI accordion. Height transitions `0 ↔ auto`, **300ms `cubic-bezier(.65,0,.35,1)`**. Content is pt 12, pr 64 (lg), answer role. Paragraph spacing mt 20. Inline links are #266df0 w400, underline, `-mx-px px-px rounded-sm`, color transition 400ms `cubic-bezier(.4,0,.2,1)`.
- Item counts: pricing 12, startups 9, app-partners 3, creator 4, expert 5. Answer lengths c56–c271 (1–4 lines).
- 768/390: H2 32/36. Column becomes col 2/-2 (478/283 wide).

#### C5 `QuoteReveal` (customers, app-partners, creator-partners; startups uses a static variant)
- Row inside col 2/-2 as a 10-col grid (115.6 cols), padding 48 0 (customers) or 60 0 0 (partners). Section height 452–496.
- Left: portrait media box **240x240**, `object-fit: contain`, transparent bg, no radius (source art is 880x972 / 900x1100 PNG cut-outs). Place it at col 1–3, vertically centered.
- Right (x 488.7, width 693.8): an optional overline above (partners: c18–c22, #a4adba). Quote in the serif quote role, with a **hanging open-quote glyph** (12.6 wide, positioned at x−12.6). 2–3 lines, c≈110–170, split into **word spans**. Attribution 28px below: p 14/20 #232529, with the name in a w700 span, then " · " and the role (c26–c48, 1 line).
- Partners variant footer: a 150-tall row with "favorite features" (14/20 600 #8f99a8, c24–26), then 3 chips (18px icon + 14/20 #8f99a8 label), gap 32.
- **Motion**: each word is wrapped in an `overflow:hidden` line. Words start at `opacity 0; translateY(36px)` (one line height) and animate to `opacity 1; translateY(0)`. **Duration ≈500ms, ease ≈ `cubic-bezier(0,0,.58,1)` (`--ease-reveal`), stagger ≈10ms per word** (measured: word 0 starts at 52ms and ends at 536ms, word 18 starts at 219ms and ends at 703ms). Trigger: as soon as the first line enters the viewport (top at ≤95% of vh). It runs once.
- Static variant (startups, inside the cell grid): a centered serif P 28/36.4 (3 lines, width 560), then name 14/20 600 and role 14/20 500, centered, padding 128 0.

#### C6 `CtaAvatarWall` (customers bottom CTA)
- Section height 719 (pb 160). Top: a 160-tall dashed `GuideRow`.
- Avatar wall: **10 rows × 50 tiles**. Tile 24x24 (img 22x22, radius 7) with gap 1, row gap 1, centered. 249 tiles hold avatar images and the rest are gradient placeholders (`linear-gradient(to left top, #a4adba, #e4e7ec)`, radius 7). Fade mask overlay: `linear-gradient(90deg, #fff, transparent 20%, transparent 80%, #fff)`. Wall height 249 (min-h 249 lg, 463 mobile; tiles 28 below 992, 15 per row at 768, 11 at 390).
- Heading: two lines centered. Line 1 interDisplay 40/44 600 (c14). Line 2 serif 40/44 400 -0.6 (c23). Then the CTA row mt 24: primary (c14) + outline (c13), gap 8. Below 768 the buttons stack.
- **Motion** (in-view): tiles go opacity 0 → 1, 300ms `cubic-bezier(0,0,0,1)`, with **pseudo-random delays 0.23–0.83s** (198 distinct values, center-out feel). Heading line 1 wraps a span `translateY(100%) → 0` in an overflow-hidden block, **600ms `cubic-bezier(.22,1,.36,1)` delay 600ms**. Line 2 does the same with **delay 750ms**. Buttons: opacity 0 → 1, **700ms same ease, delay 1000ms**.

#### C7 `ResourceCards` (careers "keep up to date" 4-up; expert "be an expert" 3-up; help landing 3-up)
- Grid gap 12. Card: radius 16, 1px #e4e7ec, padding 22 24 24, flex column gap 16. Height 150 (174 on help).
- Card contents: top row with a 20px icon (44px icon on help) and a 14px arrow (right). Then a title (16/22 600 #232529, c1–c15) and a description (14/20 #505967, 1–2 lines, c33–c82), gap 4. `HoverWash`.
- Widths: 280.6 ×4 / 378.1 ×3 (1440). Single column below 992.

#### C8 `PartnerCrossLinks` ("different ways to partner", all 3 partner pages)
- Centered stack head (H2 40/44 c25–c33 + P 20/26 c84–c92, max-width 512).
- `CellGrid` 2-up, 577.7x340 cells (342 with hairline). Each cell is a link: inner 12-col (48.1), content col 2/-2 (481.4 wide) flex column, pt/pb 56, gap 96. Overline (c12–c16). Two-tone H3 28/34 (c54–c58 in total, 2 lines). Link label 16/22 #1c1d1f (c21–c24) + arrow. Hover: wash #fafafb (opacity .4 transition).
- A `DotPattern` (unmasked) sits behind the grid row. Below 992 there is 1 column.

#### C9 Forms (`LeadForm`: contact/sales and startups)
- Field stack gap 20. Label → control gap 6. Two-col rows: grid 2 × 221.3, column gap 20, row gap 12 (inputs) / 20 (selects). One column below 768.
- **Text input**: h46, padding 10 13, radius 10, 1px #d3d8df, bg #fff, text 16/24 #232529. Placeholder 14px #6f7988 (c5–c22).
  - Hover: shadow `0 1px 4px rgba(56,62,71,.10)`.
  - Focus-visible: border #266df0 + `0 0 0 3px #94b9ff` ring (on top of the hover shadow).
  - Transition `all 300ms cubic-bezier(0,0,0,1)`.
- **Textarea**: same styling, h94 (contact only, placeholder c38).
- **Select** (Radix): a trigger button with the same box, padding 10 12 10 13. Placeholder "Select"-style text c6 at 14/24 #6f7988. Selected value 16/24 #232529. 14px chevron right.
  - Focus: border #266df0 + `0 0 0 3px rgba(36,109,238,.30)`. Transition border/bg/color/shadow 150ms `cubic-bezier(.2,0,0,1)`.
  - **Popup**: same width as the trigger, 4px below, bg #fff, radius 10, **no border**, shadow `0 4px 8px rgba(56,64,72,.25)`. Enter: fade + slide-in-from-bottom 4px, 150ms. Options: h32, inset 4, radius 6, padding 6 0 6 10, 14/20 #6f7988. Highlighted bg #edeff3. Option counts 3–5.
- **Submit**: full width, h46, radius **12**, 16/22, primary colors.
- **Validation** on submit: invalid inputs and selects get border #ff5b59 (`aria-invalid=true`). An error p appears 6px below the control (12/18 w400 #f65351, c27–c31, `fade-in` 300ms ease-out). The layout grows to fit the messages.
- Small print (contact): 12/18 #6f7988, 2 lines, c93 with 2 inline links, mt 24.
- **Inline subscribe form** (changelog hero, careers newsletter): grid `270px 106px` gap 8. Input h40 (same styles). Button h40 radius 12, 16/22 primary (c9). While submitting it shows a 21.6px spinner (`spin 1s linear infinite`, fades in 150ms).

#### C10 `CmdkSearchDialog` (apps search, help search)
- Trigger button: 320x46 (apps) or 265x36 (help sidebar). Radius 12/10, 1px #cad0d9, shadow attio-3. 18px search icon #6f7988, placeholder text (c7–c13, 13–14px #6f7988), and a right "⌘K" hint (12/18 #a4adba ls .6). Keyboard ⌘K opens it.
- Dialog: fixed, 600 wide, **top 180**, centered. Outer frame `radius 16, bg rgba(255,255,255,.6), padding 3, backdrop-blur 4px`. Inner `radius 13, 1px #e4e7ec, bg #fff, shadow attio-5`.
- Body: height `62dvh`, min 256, max 576, width ≤592. Input row padding 14 10 12 16, input 14px, placeholder #6f7988. A "Clear" text button fades in when there is a value. The result list scrolls.
- Overlay: dialog overlay token. Enter: `dialog-scale-in` (opacity 0, scale .96 → 1), **200ms `cubic-bezier(.45,.05,.55,.95)`**. Exit: the reverse.
- I did not capture result-row styling (cmdk items did not render for my query). Use 36px rows, radius 10, selected bg #f3f4f6 as a neutral default.

#### C11 `Tooltip`
- Pricing info tooltips: bg #232529, radius 6, padding 8, max-width 256. Shadow `0 4px 4px -2px rgba(17,34,68,.06), 0 2px 4px -2px rgba(0,51,51,.02), 0 0 2px #e0e0e0`. Placed top-start. Opens after a delay (Radix `delayed-open`), fade 150ms. I did not capture the inner text color; use #edeff3 14/20.
- Trigger: 20x20 button with a 14px info-circle icon #d3d8df → hover #a4adba (150ms in, 400ms out). Hit area 32x32 via `::before`.

#### C12 `ListRow` (blog list, changelog, careers positions)
- Rows sit on a white column, with 1px hairlines between them (the wrapper bg shows through a 1px gap). `HoverWash` and a trailing arrow (14px #a4adba, hover → #232529, x+2px).
- Specific grids per template are below.

---

## 1. Shell matrix (header/footer per route)

| route | header | footer | notes |
|---|---|---|---|
| /pricing, /customers, /startups, /contact/sales, /apps, /apps/*, /partners/*, /blog, /changelog, /careers | `SiteHeader` (116 = banner 48 + nav 68; 100 below 992) | `SiteFooter` dark (685) | identical to the homepage |
| /engineering/blog | `SiteHeader` in **dark state from load**: bg #101010, border #2e3238 (every section is `.dark`) | dark | the whole page is dark (bg #101010) |
| /architecture | `SiteHeader` **without banner**: 68 (52 below 992). The site hides `.site-banner` via `html:has(.architecture-hero)`. The hero is pulled up under the header (`margin-top: -header-height`). | dark | header toggles dark over dark scenes as on the homepage |
| /help, /help/academy, /help/reference/* | `SiteHeader` (116). **Below 992: 163** (an extra 63px docs bar with a 14px #2e3238 breadcrumb/menu row) | **Light footer variant**: bg #fff, group headings 14/20 #a4adba, links 14/20 w400 **#505967**, legal 12/18 #a4adba, bottom bar bg #fafafb. Same geometry as the dark footer (685 tall at 1440). | uses the docs shell (§T9) |

Fixed overlays (cookie toast, Intercom) behave as on the homepage. Skip them.

---

## 2. Templates

| id | template | routes |
|---|---|---|
| T1 | Pricing | /pricing |
| T2 | Marketing long-form (PageHero + SectionHead blocks + CellGrid + Quote + FAQ/CTA) | /customers, /startups, /careers, /partners/app-partners, /partners/creator-partners, /partners/expert-partners |
| T3 | Split hero + form | /contact/sales (and the form block on /startups) |
| T4 | App directory | /apps |
| T5 | App detail | /apps/chatgpt, /apps/claude, /apps/slack (identical template; only content length differs) |
| T6 | Editorial listing (featured + filterable list) | /blog (light), /engineering/blog (dark) |
| T7 | Changelog year listing | /changelog (redirects to /changelog/2026) |
| T8 | Architecture scrollytelling (bespoke) | /architecture |
| T9 | Help docs shell | /help, /help/academy, /help/reference/attio-101 |

---

## T1. Pricing (`/pricing`), docH 8847 (1440), 8907 (1280), 16444 (768), 16674 (390)

### T1.1 `PricingHero` + plan cards, 794 tall (834 at 1280, 1804 at 768)
- Header: flex column centered, pt 116. H1 (hero H2 role, 56/60, **c17 w4 l1**). Lead P 20/26 #232529, max-width 448, c79 l2, mt 16.
- **Billing toggle** (`BillingToggle`), mt 24, centered:
  - Track: 194x40, radius 12, bg #f3f4f6, padding 2. Inner grid `1fr 1fr` gap 2.
  - Two buttons 94x36, padding 8 20, radius 10, 14/20 w500. Active text #2e3238, inactive #6f7988. Color transition 500ms `cubic-bezier(.2,0,0,1)`. The active button is `disabled` (not clickable).
  - Thumb: absolute, `width: calc((100% - 2px)/2)`, radius 10, bg #fff, shadow `0 4px 4px -2px rgba(17,34,68,.06), 0 2px 4px -2px rgba(0,51,51,.02), 0 0 2px #e0e0e0`. It slides with `translate-x` **500ms `cubic-bezier(.2,0,0,1)`**.
  - **Default = Annual** (thumb on the right).
- **Plan cards**: 12-col grid (cols 94, gap 24) → cards area `col 2/-2` as 4 cols (271 each at 1440, 237.7 at 1280), gap 24, **mt 80**. One column below 992 (576 wide at 768).
  - Card: **radius 24**, 1px #e4e7ec, padding 21 23 23, shadow `0 1px 2px -1px rgba(28,40,64,.08), 0 2px 4px rgba(28,40,64,.04)`. Flex column justify-between, height 398.
  - **Featured card (3rd of 4)**: border #94b9ff. Shadow `0 0 0 4px rgba(78,137,245,.10), 0 1px 2px -1px rgba(29,39,69,.10), 0 2px 4px rgba(34,34,68,.06)`.
  - Card contents, top to bottom:
    - Plan name `header` 20/26 #232529 (c3–c10).
    - Price row mt 32 (16 below 992): "$" + digits in the plan-price role (c1–c6). Price digits are stacked old/new spans in an `inline-grid` with overflow hidden.
    - "Save 20%"-style badge (paid plans 2 and 3 only): mt 6, radius 8, 1px #c8dcff, bg #e8f0ff, padding 3 7, 12/18 #538bf3, c8.
    - Billing caption 12/18 #6f7988 (c38), mt 2. The last word crossfades monthly/annually (two stacked spans, opacity 150ms ease-in-out).
    - Description: mt 32, 14/20 **600** #232529, c40–c56, 2 lines.
    - Feature list: mt 10, gap 10, **3 features per card (12 total)**. Each is an 18x18 chip (radius 6, bg #f3f4f6, padding 2, 14px check icon #6f7988) + 14/20 #505967 text (c13–c29), gap 8.
    - CTA mt 32: full-width h36 button. Outline on cards 1, 2, 4; primary on the featured card.
- **Toggle motion**:
  - Price digits roll: the outgoing digit goes `translateY(0) → -100%` with opacity 1 → 0, the incoming goes `100% → 0` with opacity 0 → 1, **500ms `cubic-bezier(0,0,0,1)`**.
  - "Save" badge (monthly → hidden): `opacity 300ms delay 150ms` + `translate 0 → -8px 500ms delay 100ms`, both `cubic-bezier(0,0,0,1)`.
- **Decorative frame lines** (≥992 only):
  - Two horizontal 1px lines, 12px above and below the card row, spanning 1392. `linear-gradient(to left, transparent, #cad0d9 6.52%, #cad0d9 93.22%, transparent)`.
  - Five vertical 1px lines (498 tall, from 50px above the cards) at each card's left edge −12 plus the last right edge. `linear-gradient(to bottom, transparent, #cad0d9 10.87%, #cad0d9 89.55%, transparent)`.
  - Each line carries `mask-image: linear-gradient(to right|bottom, rgba(0,0,0,.35), rgba(0,0,0,.35) var(--start), rgba(0,0,0,.75) var(--end), transparent calc(var(--end)+3%))`. The registered custom properties `--pricing-cards-grid-line-position-start/end` animate to **100% / 130%** via `@keyframes pricing-cards-grid-line-appear`, **1.5s ease-out, fill both**. Delays: top 0, bottom .45s, verticals 0 / .15 / .3 / .45 / .6s. This is a light sweep that draws the lines. Register both properties with `@property` (`<percentage>`).
  - Four 7x7 "+" corner marks (two 1px bars #d3d8df) at the frame corners: `fade-in` **1s, delay 1s**.

### T1.2 `LogoGrid` (C3), 314 tall, mt 64

### T1.3 `ComparisonTable`, 5554 tall at 1440 (11950 at 768)
- Inner width 1116 (x162). Grid `220px repeat(4, 1fr)` with column gap 24 (plan cols 200).
- **Sticky plan header**: `position: sticky; top: var(--site-header-height)` (116), z 2, bg #fff, pt 40, height 199.
  - Left cell (flex column justify-end, gap 16): caption 12/18 #6f7988 (c30, 2 lines) + a compact `BillingToggle` (220 wide, buttons 107x36), synced with the hero toggle.
  - Plan cells: H3 24/30 #232529 (c3–c10). The featured column adds a "Popular" badge (62x28, radius 8, padding 4 8, 12/18 #538bf3 on #e8f0ff with #c8dcff border, gap 8). Price lines are 2 × 12/18 #6f7988. CTA 200x36 mt 16.
- **Groups**: **8 groups**, gap 60, mt 40. Group title H2 18/24 #232529, padding 16 0, border-bottom 1px #e4e7ec, bg #fff. It is **sticky at `top: calc(header + 197px)` = 313**, z 1.
- **Rows**: **50 feature rows** (57 tall) + **33 sub-rows** (45 tall), 83 total.
  - Feature row: grid as above, border-bottom 1px #e4e7ec. Label cell padding 18 0 is flex justify-between gap 12: label 14/20 #505967 (c5–c26) + `Tooltip` trigger (47 rows have one). Value cells are flex centered, padding 18 0, text 14/20 #505967 (c6–c23) inside `px-8`.
  - Sub-row: border-bottom 1px #edeff3, padding 12 0, value 14/20 #232529 (c6–c7).
  - **The featured column's value cells have bg #fafafb** in every row.
- **Below 992**: the table becomes a stacked list.
  - Centered head: H2 40/44 **700** c14, P 16/22 #232529 c84 2 lines, the toggle (mt 20).
  - Then 8 groups (gap 40). Group H3 18/24 with border-bottom, padding 16 0.
  - Each feature is a collapsible, **open by default**. Header row: 53 tall, label + 18x20 chevron button, border-bottom #e4e7ec.
  - Body: 4 sub-rows (one per plan), grid `1fr 1fr` (288/171 cols), padding 10 0, border-bottom #edeff3. Plan name 14/20 #6f7988 | value.

### T1.4 FAQ (C4), 1320 tall, 12 items. Then the footer.

---

## T2. Marketing long-form pages

Every page in this template starts with `PageHero` (C1). The badge text is the page name (c7–c19).

### T2-a `/customers`, docH 5105 (5795 at 768, 6425 at 390)
1. **PageHero**: 466 tall, no CTA. H2 c43 l2, lead c55 l1. Dot background.
2. Hairline.
3. **LogoGrid** (C3).
4. **CustomerStoriesGrid**, 2305 tall:
   - The bordered box has an unmasked `DotPattern` behind it.
   - Rows alternate: **feature card** (full width 1388x460) → **2-up row** (`CellGrid`, 577.7x460) → feature → 2-up → feature. **7 stories total (3 feature + 4 half).** Rows are separated by 1px top/bottom borders.
   - Feature card: 12-col inside (115.7). The left half is the text column (padding 64 56): logo media box (≈124x27 to 324x48, contain, monochrome), then an overline (`P` 12/14 #8f99a8, c22–c42, auto top margin), then a two-tone title (c23–c29 lead + c48–c61 continuation, 2–3 lines total), then "Read case study" 16/22 #1c1d1f (c15) + arrow, mb 16.
   - Feature card right half: centered media frame **579.3x332**, padding 8, bg #fff, 1px #d3d8df, **radius 12**, shadow `0 6px 20px -2px rgba(26,38,64,.08), 0 2px 6px rgba(34,34,68,.06)`. It holds a **561.3x314 image (cover, ~16:9)**. Hover scales the image (transform 400ms `cubic-bezier(.2,0,0,1)`). Two dashed horizontal guide lines (dasharray 4 6, #e4e7ec, `mix-blend-multiply`, masked 12px at the start) run at 64px from the top and bottom across the media half.
   - The side alternates: media right on rows 1 and 5, left on row 3.
   - Half card: same text stack without media. Logo ≈126–143x32–36.
   - All cards: bg #fff + `HoverWash`. Title continuation color transition 400ms. The arrow translates.
   - 768/390: single column, title 28/34.
5. Hairline.
6. **QuoteReveal** (C5), 496 tall, c≈150 quote (19 word spans visible), attribution c48.
7. **CtaAvatarWall** (C6), 719 tall.

### T2-b `/startups`, docH 6356 (7771 at 768, 8525 at 390)
1. **PageHero** + logo strip: 582 tall. Lead c99 l2. Below it, mt 60: **two rows of 4 logos** (115x40 each) at width 576, flex justify-between gap 20.
2. **ApplyBlock** (T3 split layout, 754 tall):
   - Left col (col 2–5, x140.8, w463.3), padding-top 104: H1 interDisplay 40/44 600 (c43, 2 lines). Then 4 bullets (LI 16/22 #232529, gap 20, c23–c92, the last one 2 lines). Bottom: note 14/20 #6f7988 c43.
   - Right half: bg #fafafb, border-left #e4e7ec, 80px top/bottom bands. Form (C9) width 462.7 at x836.7.
   - Field set (in order): row [text, text], text (company email, full), row [select, select], row [select, select], text (full). Then the **Apply** submit (c5). **5 text inputs + 4 selects.**
3. **FeatureCells** (2035 tall):
   - SectionHead (left, c37 + c149, 5 lines).
   - `CellGrid` 2x2 of 577.7x500.8 cells, padding 48. Each cell: overline index "[0N]" (#a4adba, c4), then a media box **481.4x288.8** (contain, transparent; source 1883x536), then H3 18/24 600 #232529 (c17–c27) + P 16/22 #6f7988 (c24–c41, 1 line). The cell grid uses an unmasked DotPattern.
   - Between the two rows: a full-width (1156x449) static quote cell (C5 static variant, c109 l3).
   - Hatch in the side gutters.
4. **ProgramPartners**: 698 tall. Centered SectionHead (c37 + c118, 3 lines). LogoGrid 12 logos at 166.4x48 inside col 2/-2. Note 14/20 #6f7988 c110 l2, centered, max-width 448.
5. **PerksBand** (382 tall, bg #fafafb): H2 inter 20/26 600 #1c1d1f (c66 l1) + P 20/26 #6f7988 (c127 l2), centered col (x237, w965). Behind it: an **orbit illustration** (SVG 1440x1360, overflow visible) with floating circular app-icon tokens. Each token is 64x64 with 1px rgba(20,20,39,.05) ring + `backdrop-blur 4px`, wrapping a 62x62 white circle (shadow attio-5, padding 20) that holds a 22x22 icon. Treat the whole orbit as a decorative media box.
6. **FAQ** (C4): 9 items, 1099 tall.

### T2-c `/careers`, docH 9668 (10603 at 768, 12094 at 390)
1. **CareersHero** (756 tall), **left-aligned** variant of C1:
   - x 142.8, pt ~144. Badge c7. H2 56/60 c57 l2 (max-width 840). Lead c177 l3 (max-width 576).
   - CTA: primary button (c13) + an **avatar stack** of 4 circles (28 outer with 1px colored rings #266df0 / #9162f9 / #fd9038 / #e4e7ec, inner 26 white ring, 24px photos; the last is a "+N" bubble bg #fbfbfb). Overlap pitch 20. The last bubble scales on hover (150ms).
   - Bottom (y740): a **commit-grid** of **268 squares** 22x22 (radius 6, bg #d3d8df, pitch 24), then a caption 14/20 #a4adba (c45) that updates on hover (opacity transition 600ms).
2. **InterviewVideo** (807 tall): media player **1150.3x647**, radius 16, 1px #d3d8df, bg #000. Poster video (mp4). Control bar at the bottom with padding 16, gap 8: play / mute / fullscreen buttons 32x32 radius 8 bg rgba(0,0,0,.12) with white icons, and a time-range 998x32. Controls fade (opacity 250ms).
3. **TeamIntro** (796): centered SectionHead (c24 + c84, 3 lines). Then an **avatar dot-matrix** shape 1158x352: a grid of 25.6px circles at pitch 32 (#d3d8df). 63 of them are photo avatars (inset ring rgba(29,29,29,.1)) and some are enlarged to 26.9–32. Then a centered serif testimonial 20/26 (c126 l2, width 672) + name line 14/20 (c22).
4. **TeamPhotos** (1291): H2 inter 16/22 #232529 (c18) + P 16/22 #6f7988 (c61 l2), max-width 448. Then a 10-col grid (105 cols, gap 12) of **6 photo boxes, 320 tall** (4 at 339.1 wide, 2 at 456.1 wide, cover, no radius). Then an investor caption 14/20 #6f7988 (c32) + **6 logos 127.8x48** (grid 6, gap 24/32). The background has a decorative SVG 1390x950.
5. **Values** (983): SectionHead (c11 + c147, 4 lines).
   - Hatch + `CellGrid` 2x2 of 577.7x208. Each cell is a grid `140.6px 1fr`.
   - Left: a pixel-art illustration cell (#f3f4f6 bg, 4x6 grid of 34.1 squares with 1px gaps). This is decorative, so draw original pixel art.
   - Right: H3 18/24 600 #1c1d1f (c16–c28) + P 16/22 #505967 (c79–c105, 2–3 lines).
6. **OpenPositions** (`#open-positions`, 3188 tall):
   - Centered stack head (H2 40/44 c15, P 20/26 c92 l2).
   - **Filters** (col 4/-4): grid `1fr 1fr 2fr` gap 8. Two select triggers 169.8x42 (C9 select, 14px value text #232529 c9–c13) + a search input 339.5x42 with a 14px search icon at left 13 (padding-left 36). Below 992: 2 cols, search full width.
   - Live region: "N open positions match…" (sr-only p).
   - List frame: hatch outside, a white column with border-x #e4e7ec.
   - **6 department groups.** Group header bar 70 tall, bg #f3f4f6, padding 20 0: H3 interDisplay 24/30 **500** #1c1d1f + count superscript overline "[N]" #6f7988.
   - **30 rows** (`ListRow`), 63 tall, padding 20 0. 10-col grid (xl): index 14/20 #a4adba tabular-nums (c2, centered col 1), title 16/22 #1c1d1f (col 2–6, ellipsis, c16–c33), location 16/22 #6f7988 (col 7/-2, c15–c43), arrow 14px.
   - Filtering is live with no pagination. **Empty state**: centered p 16/22 #505967 (c38) in a 215-tall block.
7. **NewsletterBand** (428, bg #fafafb):
   - Left: SectionHead (c23 + c53) + inline subscribe form (C9) at y8174.
   - Right: an illustration panel 463x362 (bg #edeff3, a grid of 55 #fafafb tiles 91.5x32 + a 230x181 SVG). 33px hairline bands top and bottom.
8. **KeepUpToDate** (612): H2 32/36 (c16) + P 20/26 #232529 (c46), then `ResourceCards` ×4 (C7).

### T2-d `/partners/app-partners`, docH 6041 (6623 at 768, 7240 at 390)
1. **PartnerHero** (661):
   - On top, an **app-tile marquee row**: 11 tiles at 140x141 (8 framed SVG tiles + app icons), gap 40, spanning −78..1518. Tile frames are drawn with 1px hairlines extending −12px, plus horizontal hairlines at the tile row's top and bottom. Static (no motion measured).
   - Below it, C1 (badge c12, H2 c30 l1, lead c75 l2) with the C1 entrance animation.
2. **TwoPaths** (394): `CellGrid` 2-up (461.8 cells, centered col 3/-3 at x256.7) with hatch behind. Each cell: H3 18/24 600 #1c1d1f (c7–c8), P 16/22 #505967 (c68–c76 l2), outline button (c14–c19), gap 20.
3. **StartBuilding** (1213):
   - SectionHead (c15 + c66).
   - A **segmented tab** (217x36 track bg #f3f4f6 radius 12 p2; tabs 105.6x32 radius 10 with a 16px icon + 14/20; active #1c1d1f, inactive #6f7988). The active pill is white, radius 10, shadow `0 0 0 1px rgba(26,26,26,.04), 0 1px 1px -.5px rgba(26,26,26,.04), 0 3px 3px -1.5px rgba(26,26,26,.04)`. **Default = second tab.**
   - **Step list**: hatch + bordered white panel 1158x665. 5 steps, each a 20-col grid row 120 tall with padding 20 0.
     - Step number overline "0N" #1c1d1f with a 1px vertical connector (#e4e7ec) below it, which fills with #1c1d1f (`scaleY`, origin top).
     - Title 18/24 600 (c15–c22), rendered **per character** as `inline-flex` spans (typewriter-capable).
     - "//" overline marker #a4adba at col 11.
     - Description 14/20 #6f7988 (c62–c114, 2–3 lines, x835.6, w320) with an inline underlined link.
   - Footer link row 63 tall (border-top, `HoverWash`): 16/22 #505967 (c28) + arrow.
4. **ExploreApps** (1034): SectionHead (c22 + c46).
   - Bordered frame 1158x562: left text cell 385 wide (padding 32 32 18; P 16/22 #505967 c91 l3; bottom ghost link 154x40 radius 12, "Discover apps" 16/22 #2e3238 + arrow).
   - Right: an **app-store mock illustration** 771x560. White, with category chips (12/14 #1c1d1f + 12.6px icons), 3 small cards 162x61 (radius 12, 1px #e4e7ec, padding 9, with tag pill bg #f4f5f6 1px #eeeff1 radius 8 10/14), and a center 64.8 app tile (radius 12, gradient ring `linear-gradient(#709ff5, #a3ece9)`, shadow `0 0 0 4px rgba(166,179,191,.08), 0 6px 20px -2px rgba(26,38,64,.08), 0 2px 6px rgba(34,34,68,.06)`) connected by SVG lines.
   - Build this as original illustrative UI. All text is placeholder.
5. **QuoteReveal** (C5, partners variant), 452.
6. **FAQ** (C4): 3 items, 625.
7. **PartnerCrossLinks** (C8), 854.

### T2-e `/partners/creator-partners`, docH 6034 (6938 at 768, 7791 at 390)
1. **PartnerHero** (994). C1 (badge c16, H2 c37 l2, lead c102 l2, primary CTA c24) + entrance. Then a **video carousel** (mt 60):
   - Embla auto-scroll, **≈74 px/s leftward**, continuous loop. 7 slides **480x270 (16:9)**, radius 16, spacing 24 (pl 16 + mx 12). Slide shadow `0 0 0 1px rgba(28,29,31,.05), 0 1px 1px -.5px rgba(28,29,31,.05), 0 3px 3px -1.5px rgba(28,29,31,.05), 0 6px 6px -3px rgba(28,29,31,.05), 0 0 0 4px rgba(164,173,186,.08), 0 0 0 8px #fff`.
   - Each slide holds a poster image + a muted background video (Vimeo iframe, autoplay loop, `object-fit contain` on #fafafb), a 56px circular avatar at bottom-left 16 (inset ring rgba(0,0,0,.15)), and a name pill at bottom-right 16 (radius full, bg rgba(228,232,237,.6), `backdrop-blur 16px`, padding 2 8, 12/18 w500 #1c1d1f, c8–c17).
   - At 768/390 the hero uses no container padding (full-bleed).
2. **WhoYouAre** (672): centered SectionHead (c33 + c40). Hatch + `CellGrid` 3-up (384.8 cells, 200 tall, padding 32): label 12/18 600 #8f99a8 uppercase (c11–c15), H3 16/22 600 #232529 (c10–c21), P 16/22 #6f7988 (c74–c86 l2).
3. **Perks** (1157): centered SectionHead (c17 + c98) + outline CTA (c24).
   - Hatch + `CellGrid`. Row 1: 3 cells 384.8x378 (padding 16 24 28; overline "0N /" #a4adba; illustration box **336.8x200**, decorative SVG; H3 **20/26** 600 #1c1d1f c15–c24; P 16/22 #8f99a8 c71–c82 l2).
   - Row 2: 3 cells 384.8x200 (same, without illustration; H3 16/22).
4. **ApplyNotice** (`#creator-partners-form`, 394, bg #fafafb): a dashed GuideRow (56) + a centered h2 18/24 #6f7988 (c50, max-width 448) with padding 128 0. **This is a "closed" notice; no form is rendered.**
5. **QuoteReveal** (partners variant), 452.
6. **FAQ**: 4 items, 704.
7. **PartnerCrossLinks**, 854.

### T2-f `/partners/expert-partners`, docH 7658 (8174 at 768, 8972 at 390)
1. **ExpertHero** (920): C1 (badge c15, H2 c25 l1, lead c88 l2, CTAs primary c24 + outline c14).
   - Then an **avatar cloud** (960x192, mb 32, horizontal mask `linear-gradient(to right, transparent, #fff 10%, #fff 90%, transparent)`): 45 circles 45.9 (#d3d8df), 15 of them photos, and 2 enlarged (50.7 / 54.2).
   - Then **2 crossfading testimonials** stacked in the same place: serif 20/26 (c214–c216, 3 lines, width 672) + attribution 14/20 #232529 with an 18x12 flag icon (radius 2, inset ring).
2. **WhoWereLookingFor** (728): SectionHead (c22 + c42). A 5-col grid (231.7 each, 256 tall): each col has border-left #e4e7ec, padding 0 24 0 16, H3 18/24 600 #232529 (c14–c20) + P 14/20 #6f7988 (c31–c50 l2). Edge fades: 115.8-wide white gradients left and right. Below: a 160-tall decorative bar row (131 thin elements, justify-evenly, min-width 1340). Static.
3. **Tiers** (1134): SectionHead (c23 + c63).
   - **3 tier cards 322x403 (aspect 4:5)**, radius 16, shadow attio-5 + `0 0 0 1px rgba(28,29,31,.05)`, `transform-style: preserve-3d` (JS tilt on hover; resting `transform: none`).
   - Backgrounds: Core #fff, Advanced #f3f4f6, **Elite #232529** (text #fff, list #b5bdc9).
   - Top-right 88px badge emblem (circle 43.5r, 1/2/3 concentric rings in #cad0d9 / #b5bdc9 / #505967 by tier).
   - Upper art area: a pattern (Core: "+" grid mask in #e4e7ec; Advanced: diagonal sheen `linear-gradient(192deg, transparent 23%, rgba(255,255,255,.8) 50%, transparent 82%)` + radial `rgba(7,14,14,.14)`; Elite: dark hatch #2e3238 + `linear-gradient(200deg, rgba(35,37,42,.9) 23%, transparent 60%)`).
   - Bottom: H3 24/30 500 (c4–c8) + LI 14/20 #505967 bullets (5 per card, c14–c29).
   - Footer strip: P 16/22 #6f7988 (c26) / #1c1d1f (c52) + primary CTA (c16), bordered.
4. **PathToDirectory** (1017): SectionHead (c35 + c47) + step list (same component as T2-d.3, **4 steps**).
5. **ApplyForm** (`#expert-partners-form`, 754, bg #fafafb): left SectionHead (c31 + c35); right, a **third-party embedded form iframe 539x600, radius 8**. Do not clone it; use a placeholder box or your own form (C9).
6. **BeAnExpert** (616): H2 40/44 (c27) + P 20/26 (c53), left-aligned, max-width 576. `ResourceCards` ×3 (C7).
7. **FAQ**: 5 items, 783.
8. **PartnerCrossLinks**, 898 (H2 2 lines).

---

## T3. Split hero + form (`/contact/sales`), docH 1651 (2476 at 768, 2766 at 390)

One section, 850 tall, then the footer.
- 12-col bordered box. **Left column** (col 2–5, x140.8, w463.3, flex column justify-between):
  - Top (pt 100, pb 20): badge (C1, c13), H2 56/60 (c20 **l1**), lead 20/26 (c60 l2).
  - Bottom (from y684): a serif testimonial 16/22 500 #1c1d1f (c139 l3, width 384, hanging quote), then the name (14/20 w700) + role (14/20, 2nd line).
- **Right half** (x720, w695): bg #fafafb, border-left #e4e7ec. Top band 160 and bottom band 160 (same bg). Form (C9) is 462.7 wide at x836.7, starting at y280.
  - Field set: row [First name, Last name] (text, placeholders c5/c4), Company email (text, ph c15), row [Region select, team-size select] (3–5 options each), details textarea (h94, ph c38), **Submit** (c6), small print (c93, 2 links).
- 768/390: the columns stack. The form goes full-width inside col 2/-2 and the 2-col field rows become 1 col at 390. Section height 1338 (768) and 1594 (390).

---

## T4. App directory (`/apps`), docH 25378 (24074 at 768, 42157 at 390)

1. **AppsHero** (840): C1 (badge c19, H2 c36 l2, lead c64 l2). CTAs: primary **button** "Browse"-style (c11, scrolls to `#apps`) + outline link (c21).
   - Then an **icon band** 231.7 tall: Hatch across the bordered box, with a 10-col × 2-row grid of **115.8 white square cells** inside col 2/-2 (some empty). 20 app icons 29x29 centered in cells.
   - 768: 6 cols (95.7). 390: 6 cols (56.7), more rows.
2. **FeaturedApps** (1029): SectionHead (c20 + c47).
   - **Chip tabs** (5): h32, radius 10, padding 0 10 0 6, 16px icon + 14/20 label (c5–c9), gap 6, gap between chips 8, pb 20.
     - Active: border #cad0d9, bg #f3f4f6, text #232529, `pointer-events none`.
     - Idle: border #e4e7ec, bg #fff, text #505967, icon opacity .8.
     - Hover: bg #fafafb, 50ms.
     - **No auto-rotation** (verified over 12s).
   - Panel 1158.3x484.6, 1px #e4e7ec. Left white column 462.5: at top-left 40/60, a 32px icon (radius 30%, inset ring rgba(29,29,29,.1)) + H3 interDisplay 24/30 600 (c8), gap 8. At the bottom (absolute, 64 above the end), P 16/22 #505967 (c59 l2, max-width 384) + outline "Learn more" (c10).
   - Right: a link area 693.8x482.6 (padding 34.7) on a dotted SVG, holding a **624x413 media box (contain)**.
   - Tab change: the panel content enters with framer `filter: blur → 0, opacity 0 → 1, transform → none`. Exact durations were not captured; use 300ms `cubic-bezier(.2,0,0,1)`.
   - Below 992 the heading centers and the left text column hides (only media shows).
3. **Directory** (`#apps`, 22267 tall):
   - Head: centered stack (H2 40/44 c14, P 20/26 c87 l2), pt 160 pb 80. Then the `CmdkSearchDialog` trigger (C10, 320x46, centered).
   - Two-column layout below. **Left sticky sidebar** (x53.9, w288.8, `sticky top: header-height`, padding 52 0): overline H3 #6f7988 (c10, pb 32) + **11 category buttons** (ghost, 288.8x36, radius 10, padding 0 12, 14/20 #2e3238, c7–c19, gap 1). Active (scroll-spy / clicked) bg #f3f4f6, text #232529. Hover bg #f3f4f6.
   - Right: **11 category blocks**. Each has an overline H3 (12/14 #6f7988, c7–c19) and a **2-col grid** of 397.4 cards (gap 16).
   - **272 app cards, all rendered (no pagination / load-more / infinite scroll).** Clicking a category scrolls to its anchor (`/apps#calling`) and does not filter.
   - **AppCard**: link, radius 16, 1px #e4e7ec, padding 20, flex column gap 14. Height 118 (1-line description) or 138 (2-line).
     - Top row: 40px icon (radius 30%, bg #fff, inset 1px ring rgba(29,29,29,.10)), gap 10, name 16/22 600 #232529 (c3–c14) + optional verified badge (12–14px check-badge #0db472 at opacity .8 → 1 on hover, base-ui tooltip trigger). Under it, "By …" 14/20 #6f7988 (truncate).
     - Description 14/20 #6f7988 (c33–c90, 1–2 lines).
     - Trailing 14px arrow: opacity 0, `translate-x -1px` → hover opacity 1 / x 0 (150ms in, 400ms out).
     - Border hover → #cad0d9 (150ms in, 400ms out). `HoverWash`.
     - 124 of the 272 cards carry the verified badge.
   - 768: the sidebar becomes a horizontal chip row (flex gap 8), the grid is 2 cols 314. 390: 1 col.
4. **BuildWithUs** (438, bg #fafafb): left SectionHead (c14 + c47) + primary CTA (c21). Right: a 5x3 grid of **92.7 white squares** (some with 20px plus-square icons). Decorative.

---

## T5. App detail (`/apps/chatgpt`, `/apps/claude`, `/apps/slack`)

docH: 3860 / 3621 / 3352 at 1440 (chatgpt 4774 at 768, 5711 at 390). The template is identical across the three; the sections only differ in length.

1. **Breadcrumb bar** (aside, 112 tall, items end, pb 20): overline "APPS / NAME" (link #a4adba hover #6f7988, current #8f99a8) at col 2. A right overline counter at col −2. A dashed vertical guide sits at col −2.
2. **AppHeader** (282 tall, padding 48 0): grid `84px auto` (gap 20, items center).
   - Icon media **84x84, radius 30%**, shadow `0 1px 1px -.5px rgba(34,34,68,.06), 0 2px 2px -1px rgba(26,38,64,.08), 0 4px 4px -2px rgba(34,34,68,.06), 0 8px 8px -4px rgba(34,34,68,.06)` + inset ring.
   - H1 56/60 600 (c5–c7). Subtitle 20/26 #1c1d1f (c33–c45, l1–2). Primary CTA (c11) at y427.
   - Right edge: a hatched/dashed decorative strip 115.8x282 at the last column.
3. Hairline row (48 tall).
4. **Body** (12-col):
   - **Left aside** (col 1–3, 347.5 wide, bg #fafafb, sticky inner at `top: header` padding 88 58):
     - "Official app" pill: 117.6x30, radius 10, 1px #e4e7ec, padding 4 10 4 8, 18px logo + 14/20 #505967.
     - Then 3 meta groups (gap 24): H3 16/22 600 #232529 (c8–c9) + values 14/20 #505967. One value is a category link with an animated arrow; the 3rd group is a list of 3 external links.
     - Outline CTA (c11).
   - **Main column** (x459.4, w868.8, flex column gap 72):
     - **Gallery**: main image button **695x434.4 (≈8:5), radius 16**, bg #fafafb. Shadow `0 1px 1px -.5px rgba(29,39,69,.10), 0 4px 4px -1px rgba(26,38,64,.08), 0 4px 8px -2px rgba(34,34,68,.06), 0 16px 16px -8px rgba(26,38,64,.08)` + inset ring. `cursor: zoom-in`.
     - **3 thumbnails** in a column (x1174.4, gap 16, max-height 434 scrollable): buttons **133.8x83.6 (8:5)**, radius 12, padding 2, 1px #edeff3. Inner radius 10, bg #fafafb.
       - Selected (`aria-pressed=true`): border #cad0d9, inner opacity .7.
       - Hover: border #e4e7ec (50ms). Transitions 100ms.
       - Below 992 the thumbnails sit as a 3-col row under the image.
     - **Lightbox** (on click):
       - Overlay `rgba(202,207,217,.4)` + blur 4px.
       - The image animates from the clicked frame with a framer shared-layout zoom (`translate3d + scale` → identity).
       - Full image **936x584, radius 16** (12 below 992). Max height `100vh − 4rem`.
       - Prev/next: 36px outline icon buttons (48 / radius 12 on mobile) that fade in, grid `auto 1fr auto` gap 16.
     - **Overview sections**: 3 H2 24/30 600 #1c1d1f (c8–c12), each followed by paragraphs 16/26 w400 #232529 (mt 20, c28–c355, 1–5 lines) and bullet lists (7–20 LI 16/22 w400 #1c1d1f, with a bold 600 lead phrase c4–c30, 1–2 lines, list indent 14). Inline links #266df0.
5. **RelatedApps** aside: border-top, padding 80 0. Overline H3 (c23–c25). A **3-col grid** (375.4, gap 16) of **6 AppCards** (T4 card).
6. Footer.

768: the aside stacks above the main column, gallery thumbnails go below, and the related grid is 2 cols. 390: 1 col, H1 40/44.

---

## T6. Editorial listing (`/blog`; `/engineering/blog` = dark variant)

### `/blog`, docH 7317 (9329 at 768, 10025 at 390)
1. **FeaturedPost** (1514 tall, white):
   - Grid 24-col (57.9). The featured link spans the bordered box, padding 32 0 48.
   - Top: an overline row (category / date, #a4adba). Title SPAN interDisplay 56/60 600 (c48, **l2**, width ≈684) with the animated underline (§0.8 `attio-group-hover-underline`). Bottom-right: author name 16/22 #505967 + role 16/22 #a4adba, flex justify-between items-end gap 32.
   - **Hero image 1158.3x651.5 (16:9), no radius** at col 2/-2, mt 35.
   - Then a `CellGrid` row of **3 secondary cards** (462.7x310, gap 1 on #e4e7ec):
     - Each card has padding 44 0 and an inner 8-col grid with content col 2/-2 (347 wide).
     - Top row: overline "[CATEGORY]" + `time` (#a4adba).
     - Title 24/30 600 #1c1d1f (mt 32, c26–c58, 1–2 lines, hover underline).
     - Excerpt 14/20 #6f7988 (mt 16, **line-clamp 2**; 3 below 992).
     - Author lines 14/20 (name #505967 + role #a4adba, c12–c17), mt 20.
     - `HoverWash`.
   - At 992–1199 the 3rd card hides (`lg:max-xl:nth-3:hidden`). Below 992 the cards stack.
2. **LatestArticles** (4839 tall, **bg #fafafb**):
   - H2 32/36 600 (c15) at x82.9, pt 158.
   - 12-col-ish grid. **Left filter column** (x69.9, w405): a vertical list of **7 ghost buttons** (h40, radius 12, padding 0 13, gap 2). Label is **20/26** (active #1c1d1f, idle #6f7988) + superscript count overline "[N]" #a4adba (c3–c4). Hover bg #f3f4f6. The active button is `pointer-events: none`.
   - **Right list** (x488.3, w926.7): **35 rows** on white with 1px separators. Each row is 128 (or 152 when the title wraps) with padding 28 0, and a 12-col baseline grid:
     - Title H3 18/24 **500** #1c1d1f (c19–c58, 1–2 lines) at col 2.
     - Excerpt 14/20 #6f7988 (mt 4, c46–c216, 2–4 lines, width 392).
     - Date overline at col ~10 (x1067) + category overline (x1183).
     - Arrow at x1343 (translate on hover). `HoverWash` (#fafafb on white).
   - **Filtering**: clicking a category sets `?category=<Name>` (client-side, no reload). The list re-renders with an `opacity, filter (blur), background-color` transition of **500ms `cubic-bezier(.2,0,0,1)`** (measured blur ≈0.09px mid-transition). **No pagination or load-more: all posts of the category are listed** (35 in "All").
3. Spacer 160 (100 below 992). Then the footer.
4. 768/390: the filter column becomes a horizontal flex row (gap 2) above the list. List titles are 18/24 at 2–3 lines. Hero title 40/44 (3–4 lines).

### `/engineering/blog`, docH 4179 (5632 at 768, 5988 at 390). Same structure, dark.
- Page and sections bg #101010. Box borders #2e3238. Header in the dark state (see §1).
1. **EngHero** (800):
   - H1 **JetBrains Mono 14/20 500 uppercase #fff** (c22) at x82.9, pt 46.
   - An **ASCII-art panel 1390x395**: canvas plus a monospace text table (Courier New 18.18/18.18, ls −1, #cfd4dc, 22 lines). This is generated art, so recreate it with original ASCII art or a canvas noise field.
   - Then 3 featured cards as in the blog secondary row: 462.7x290, cells bg #101010 with gap 1 on #2e3238, hover wash **#1c1d1f**. Overline #505967, title 24/30 600 **#fff**, excerpt **#8f99a8**, author #b5bdc9 + role #505967.
2. **LatestArticles** (1925): same as the blog version. H2 #fff, filter labels active #fff / idle #8f99a8 (button text #e4e7ec), counts #505967. **13 rows, 6 filters.** Titles #fff, excerpts #8f99a8, overlines #505967. Row bg #101010, hover #1c1d1f.
3. **ContributionHeatmap** (653):
   - Stats line 14/20 #8f99a8 (c44).
   - A **heat-grid of 22.5px squares (radius 30%, pitch 24.5)** in 5 shades: #202124, #505967, #6f7988, #8f99a8, #a4adba. 359 squares in 7 rows (13-col groups at 768). Squares start at `opacity 0` (class `opacity-0`, they reveal in view; timing not captured).
   - Then H2 32/36 #fff (c56 l2) + a ghost link (163x40, radius 12, 16/22 #e4e7ec, c16, arrow).
- 768: the ASCII panel hides and the hero is 1379 tall (cards stacked).

---

## T7. Changelog (`/changelog` → redirects to `/changelog/2026`), docH 7644 (10023 at 768, 10265 at 390)

1. **ChangelogHero** (607):
   - Breadcrumb overline row (h112, pb 20; "Changelog" link #6f7988, then the rest #a4adba).
   - Centered stack, padding 80 0 40: H1 56/60 (c10 l1), lead 20/26 #232529 (c46 l1, mt 16), subscribe form (C9 inline, input 270x40 placeholder c18, button 106x40 c9) at mt 24, width 384.
2. **YearTimeline** (80 tall, y547):
   - **6 years** (2021–2026), labels as overline 12/14, each centered in a 144-wide slot. Idle #a4adba, current #1c1d1f. The strip is 864 wide, centered.
   - The links are invisible 144x80 overlays (`aria-label`, `aria-current=page` on the current year) that navigate to `/changelog/{year}`.
   - Behind them, a **"ruler" of 1200 vertical 1px lines** (#e4e7ec, 48 tall) laid across −92..1532. Their x offsets compress logarithmically from the left edge (10, 30, 48, 66, 82, 98, 113, 128, 142, …, step shrinking from 20px to ~6–7px). This gives a perspective/ruler effect. Static.
   - Hover on a year: no visible change measured (cursor only).
3. **EntriesList** (6075 tall, pb 80): **55 entries for the year, all rendered (no pagination)**, separated by 1px hairlines (each row 108 at ≥992). 12-col row grid:
   - `time` overline (c6, tabular) at col 2–4.
   - Title h2 16/20 **600** #232529 → hover #1c1d1f (150ms), col 4/-5, line-clamp 1 (c11–c30).
   - Excerpt 14/20 #6f7988, line-clamp 2, max-width 28em (c18–c77), rows 2–3.
   - Right col (−5/−2): 1–3 tag lines (14/20 #a4adba, c6–c11, e.g. type and area, each with a 6px-gap leading glyph).
   - Arrow 14px #a4adba → #232529 on hover. `HoverWash`.
4. Spacer 160. Then the footer.
- 768: rows stack (time, title, excerpt, tags) with padding 20 0. Title 16/22.

---

## T8. Architecture (`/architecture`), docH 23972 (22386 at 1280, 25882 at 768, 23353 at 390)

This is a bespoke editorial scrollytelling page. Most of it is canvas-driven and art-directed. Spec the scaffolding and typography exactly, and treat canvases and diagrams as original artwork.

**Fonts on this page**: serif (Tiempos → Source Serif 4), JetBrains Mono for labels, and Inter 600 for "statement" lines.

1. **Hero** (`.architecture-hero`):
   - Height `calc(300svh + 200svh)` (story 150svh with reduced motion), `margin-top: −header-height`, `margin-bottom: −100svh`. Measured section height 4500 at 1440x900.
   - Inside, a **sticky 100svh stage** (bg #fff) with a full-viewport `<canvas>` 1440x900 (mono glyph field; the draw routine is not reproducible, so make your own subtle animated grid/field).
   - Centered **typewriter headline**: serif, `font-size: min(2.75rem, -0.3478rem + 8.6957vw)`; 3.5rem at ≥768; **4rem at ≥992** with ls −0.03em; w400, lh 1.1, `min-height: 2lh`. Total c114, 2 visible lines (c18 + c13 typed progressively as you scroll through the 300svh story).
   - Blinking caret: `architecture-hero-blink 1.06s steps(1,end) infinite`, `--architecture-hero-blink: 530ms`, 2 blinks.
   - Scroll cue: 16x28 pill (radius 999, 1px #cad0d9, bg #fff, padding-top 6) at bottom 32, with a 1x6 "wheel" running `architecture-hero-wheel 1.6s cubic-bezier(.19,1,.22,1) infinite` (0%: opacity 0, y −2; 30%: opacity 1; 100%: opacity 0, y 6). The cue fades in (opacity 400ms) after load.
2. **Chapter header** (×3: "The story" 3600, "The architecture" 9469, "The launch" 16098). Each is a 666.7-tall band:
   - Base color: #e0d9cc / #e4ebe4 / #e3d6c8.
   - Eight drifting **radial-gradient blobs** (`radial-gradient(closest-side, C 0%, C/.92 20%, C/.71 40%, C/.41 60%, …)`, `.architecture-gradient-blob` animated `architecture-gradient-drift 24s ease-in-out infinite`, paused off-screen). Blob colors:
     - Story: rgb(232,225,212), (230,220,203), (215,215,208), (170,168,172), (231,192,159), (226,198,185), (185,165,130), (226,193,159).
     - Architecture: (242,241,223), (241,243,231), (185,218,221), (195,221,220), (241,220,201), (183,214,222), (218,224,236), (205,226,217).
     - Launch: (230,205,201), (236,220,205), (152,160,133), …
   - Plus an SVG fractal-noise overlay (feTurbulence baseFrequency .85, 2 octaves, 180px tile) at **opacity .07, mix-blend multiply**.
   - Center: a mono label (12/15.6 500 ls .6 uppercase, "[…]", c11–c18) + a serif title 58/63.8 400 −1.16, split per word (c≈40–60, 2 lines). gap 12.
   - At 768/390 the title is 28/30.8.
3. **Story body** (white, inner bordered 1392):
   - Two-column grid `579px 579px` gap 116 (row gap 40–80), padding 80 58. Left: mono/inter P 16/22.4 400 #505967 (c12–c352, 1–6 lines), with 8px #101010 square bullets. Right: serif pull text 38/45.6 (c35–c86) or 48/52.8 (H3, c86 l4).
   - Figures with captions (figcaption 16/22 500, c111–c134, visually hidden/1px). Diagrams use mono chips: dark chip 170x69.5 (bg #101010, 1px #fff, radius 4, padding 12, title JetBrains Mono 15/19.5 #fff, sub 12/18 #6f7988) and light chip (bg #edeff3, text #1c1d1f / #505967). Avatars 64 round with 2px white border + the mock floating-card shadow.
   - **"Five reasons" index**: 5 interactive rows 171.7 tall with border-bottom #e4e7ec. Big serif words **119.8/119.8 400 ls −3.59** (c5–c11) + mono index "[0N]". 35 vertical hairlines shift with `translate 500ms cubic-bezier(.23,1,.32,1)` on hover/pointer; word opacity 200ms. A preview card (329x121.5, bg #101010) follows the pointer.
4. **"The problem" dark scene** (900 tall, bg #101010, inner borders #232529):
   - Inter 28/32.2 600 −0.56 words (31 spans) start at **rgba(255,255,255,.2)** and turn **#fff** progressively as the block scrolls from 100% to 50% of the viewport (scroll-linked, each word with a `color 500ms cubic-bezier(0,0,0,1)` transition).
   - Serif 80/80 words also brighten.
5. **Architecture body**:
   - Ring diagram row: 4 columns of 240x240 SVG rings + mono chips (bg #edeff3, radius 4, padding 7 16).
   - **Sticky dark canvas scene** (4950 tall section, sticky 900 stage, bg #101010) with mono 11/16 uppercase tags (bg #101010, 1px rgba(255,255,255,.4), radius 3, padding 2 6) and pulsing dots (`ping 2.8s cubic-bezier(0,0,.2,1) infinite`).
   - Serif statement H3 49.8/22 #fff + three numbered H4 "pillars" serif 96/22 with inter 28 word spans that brighten (300ms).
6. **Launch body**: 4 feature blocks (grid 579/579, padding 96 58). Serif H3 48/52.8 (c10–c15) + mono overline (c41–c46) + P 16/22.4 #505967 (2 per block). SVG diagrams 564x577 / 629x733 / 529x339. A beta block on #fafafb. Then a dark code-art band (680, bg #101010, JetBrains Mono 16/20.8 glyphs in #2e3238 / #383e47 / #505967) with H3 inter 28/32.2 600 #505967 (c56 l2) and **4 customer logos** (148–186 wide, 20–32 tall).
7. **Closing**: a 900 sticky canvas stage. Serif 58/63.8 line (c63), then a **2-card nav** (580x83, 1px #e4e7ec, bg #fff, cells 289x81, mono 12/15.6 labels that shift x on hover 150ms, both linking to /contact/sales). Two 9.3px square corner marks (1px #1c1d1f).
- 768: two-column grids collapse to 1 col (640). Serif sizes roughly halve (58 → 28, 48 → 24, 38 → 20).

---

## T9. Help docs shell (`/help`, `/help/academy`, `/help/reference/attio-101`)

**Shell**: `SiteHeader` + container with a **24-col grid (58px cols at 1440)**. The footer is the light variant (§1).
- **Left sidebar** (col 1–5: x24, w289; `sticky top: header-height; height: calc(100vh − header)`; flex column; pt 40):
  - Search trigger (C10, 265x36, radius 10, shadow attio-3, 13px text, "⌘K" hint), pr 24.
  - Scroll area (`overflow-y: scroll`, `mask-image` fading the top 39px, pt 39, pr 24, pb 32):
    - **2 groups** ("Academy", "Reference"). Each group header is a link row: 14px icon + overline 12/14 #1c1d1f, padding 9 0 9 9, gap 9, radius 10, hover bg #f3f4f6 (80% opacity).
    - Under each header, accordion items (Radix): a row 265x32 = caret button (absolute left, 32x32, inner 24 radius 8 hover bg #e4e7ec, 14px chevron #717a88 that **rotates 90° when open**) + link `padding 6 10 6 32`, radius 10, 14/20 **#717a88**, hover bg #f5f6f8. Group 1 has 5 items and group 2 has 13 (18 total, c4–c28).
    - Active/current item text #232529.
    - Open panel: `slideDown/slideUp` (height from `--radix-collapsible-content-height`), **300ms `cubic-bezier(.65,0,.35,1)`**. The panel has a 1px #edeff3 left guide at x+15.5 and nested links (padding 6 8 6 5, 14/20 **#8f99a8**, hover bg #f3f4f6/80, c12–c60, up to 3 lines) inset pl 18.5.
- **Main column**: x430, width 870 (cols 8–22).
- 768/390: the sidebar hides and the header grows to 163 with a docs bar (breadcrumb/menu trigger, 14/20 #2e3238). The main column is full width (576 / 342).

### T9-a `/help`, docH 2169 (3031 at 768)
Main column flex column centered, pt 76, pb 40:
1. **Announcement pill** link (298.5x30, radius 13, 1px #edeff3). Animated **conic-gradient border**: `conic-gradient(from −80deg at <x> 13px, transparent, #a3ece9 20deg, #709ff5 100deg, transparent 120deg)` on the 1px ring, inner bg #fff radius 13, padding 5 7 5 11, 13/18 #232529 (c42) + arrow.
2. H1 56/60 (c16) and a lead div 20/26 (c51 l2, width 360), centered.
3. Search block (558 wide): a C10 trigger 320x46 ("Search help…" c12) + a "popular" row: label 14/20 #6f7988 (c17) + **3 tag buttons** h28 (radius 10, 1px #cad0d9, bg #fafafb, padding 0 10, 12/18 #6f7988, c7–c12), gap 6.
4. **3 ResourceCards** (C7 with a 44px icon, 276.7x174, gap 20) at y640.
5. **Get-started block** (y1007):
   - Left: a heading of 3 spans interDisplay 40/44 600 (c11 #1c1d1f, then c4 + c10 #727b84) and 4 P 16/22 #505967 lines.
   - Right (x900, w400): a **numbered list of 3** (LI border-bottom #e4e7ec, padding 32 0 31). Each has a 36x36 number badge (radius 12, 1px #edeff3, shadow `0 2px 4px rgba(26,51,77,.04), 0 1px 2px -1px rgba(26,38,64,.08)`, 14/20 #6f7988), a title 16/22 600 #1c1d1f, and a description.
   - "See all"-style link 16/22 #a4adba (c19).

### T9-b `/help/academy`, docH 2513
- Breadcrumb (14/20: link #a4adba, "/" 11px #d3d8df, current #1c1d1f) at pt 48. H1 56/60 (c13) at mt 48. Lead 18/24 #232529 (c140 l2, width 648).
- **Course grid**: 2 cols × 415, gap 60/40, starting at mt 100. **5 course cards.** Each card:
  - Wrapper hover pad (radius 16, bg #fafafb on hover, inset −8).
  - **Media 415x248.6 (5:3), radius 12, 1px #e4e7ec**.
  - Then H3 20/26 600 #232529 (c7–c28, animated underline) + P 14/20 #6f7988 (c53–c131, 1–3 lines) + meta row 14/20 #a4adba (lessons c9–c10, duration c5–c6). gap 20.
- 768: 2 cols × 276. 390: 1 col.

### T9-c `/help/reference/attio-101`, docH 3380 (5668 at 768)
- Breadcrumb (3 levels) + H1 56/60 (c9) + lead 18/24 (c62 l1).
- **Lesson list: 10 rows** (flex gap 24). Each row:
  - 36x36 number badge (as in T9-a).
  - Text column (w349): title 18/24 600 #232529 (c12–c42), description 16/22 #6f7988 (c25–c55, 1–2 lines), "Read more" 16/22 #a4adba.
  - **Media 381x181.5 (≈2.1:1), radius 24, 1px #edeff3**, right column.
  - Row spacing ~221 (padding 20 0, gap 32/40).
- 768: media stacks under the text.

---

## 3. Route → sections map (in order; `—` = 1px divider/guide row)

| route | sections |
|---|---|
| /pricing | PricingHero+PlanCards(4) → LogoGrid(12) → ComparisonTable(8 groups / 50 rows + 33 sub-rows) → FAQ(12) → SiteFooter |
| /customers | PageHero → — → LogoGrid(12) → CustomerStoriesGrid(7: 3 feature + 4 half) → — → QuoteReveal → CtaAvatarWall → SiteFooter |
| /startups | PageHero+LogoStrip(8) → ApplyBlock(form: 5 inputs + 4 selects) → FeatureCells(2x2 + static quote) → ProgramPartners(LogoGrid 12) → PerksBand(orbit) → FAQ(9) → SiteFooter |
| /architecture | Hero(sticky canvas + typewriter) → Chapter "story"(gradient band) → Story body → FiveReasons index → Problem (dark, scroll-lit words) → Chapter "architecture" → Rings + sticky dark canvas → Pillars(3) → Chapter "launch" → 4 feature blocks → Beta block → Dark code band + 4 logos → Closing canvas + 2-card nav → SiteFooter (header without banner) |
| /contact/sales | SplitHero(left copy + testimonial / right LeadForm) → SiteFooter |
| /apps | AppsHero+IconBand → — → FeaturedApps(5 chip tabs) → — → Directory(search + sticky 11 categories + 272 cards) → — → BuildWithUs → SiteFooter |
| /apps/chatgpt, /apps/claude, /apps/slack | Breadcrumb → AppHeader → Body(sticky meta aside + Gallery(1+3 thumbs, lightbox) + 3 Overview sections) → RelatedApps(6) → SiteFooter |
| /partners/app-partners | PartnerHero(tile row) → — → TwoPaths(2) → — → StartBuilding(tabs + 5 steps) → — → ExploreApps(mock) → — → QuoteReveal → — → FAQ(3) → — → PartnerCrossLinks(2) → SiteFooter |
| /partners/creator-partners | PartnerHero+VideoCarousel(7) → — → WhoYouAre(3) → — → Perks(3+3) → — → ApplyNotice → — → QuoteReveal → — → FAQ(4) → — → PartnerCrossLinks → SiteFooter |
| /partners/expert-partners | ExpertHero(avatar cloud + 2 testimonials) → WhoWereLookingFor(5) → Tiers(3 cards) → PathToDirectory(4 steps) → ApplyForm(embed) → BeAnExpert(3 cards) → FAQ(5) → PartnerCrossLinks → SiteFooter |
| /blog | FeaturedPost + 3 secondary → LatestArticles(7 filters, 35 rows, bg #fafafb) → Spacer → SiteFooter |
| /engineering/blog | EngHero(ASCII art + 3 cards) → LatestArticles(6 filters, 13 rows) → ContributionHeatmap + careers CTA → SiteFooter (all dark) |
| /changelog | ChangelogHero(subscribe) → YearTimeline(6) → EntriesList(55) → Spacer → SiteFooter |
| /careers | CareersHero(avatar stack + commit grid) → — → InterviewVideo → — → TeamIntro(dot-matrix + testimonial) → TeamPhotos(6 + 6 logos) → — → Values(2x2) → — → OpenPositions(filters, 6 groups / 30 rows) → — → NewsletterBand → — → KeepUpToDate(4 cards) → SiteFooter |
| /help | DocsShell[sidebar] + HelpLanding(pill, H1, search + 3 tags, 3 cards, get-started list of 3) → LightFooter |
| /help/academy | DocsShell + breadcrumb + H1 + CourseGrid(5) → LightFooter |
| /help/reference/attio-101 | DocsShell + breadcrumb + H1 + LessonList(10) → LightFooter |

---

## 4. Motion summary (new; homepage M1–M* still apply to header/footer/buttons)

| id | element | trigger | from → to | duration / ease / delay |
|---|---|---|---|---|
| P1 | PageHero badge / H2 / lead (partners, apps) | load | opacity 0, y +4px → 0 | 1s `cubic-bezier(.2,0,0,1)`, delays .1 / .2 / .3s, fill both |
| P2 | Hero dot pattern (partners, apps) | load | opacity 0 → 1 | 1s `cubic-bezier(0,0,0,1)`, delay .9s |
| P3 | Pricing frame lines | load | mask stops (custom props) → 100% / 130% | 1.5s ease-out; delays 0 / .15 / .3 / .45 / .6s |
| P4 | Pricing corner "+" marks | load | opacity 0 → 1 | 1s ease, delay 1s |
| P5 | Billing toggle thumb | click | x 0 ↔ 100% | 500ms `cubic-bezier(.2,0,0,1)`; label color 500ms same |
| P6 | Price digit roll | toggle | out: 0 → −100%, opacity 1 → 0; in: 100% → 0, opacity 0 → 1 | 500ms `cubic-bezier(0,0,0,1)` |
| P7 | "Save" badge hide | toggle → monthly | opacity 1 → 0; y 0 → −8px | opacity 300ms delay 150ms; translate 500ms delay 100ms; `cubic-bezier(0,0,0,1)` |
| P8 | Billing word crossfade | toggle | opacity swap | 150ms ease-in-out |
| P9 | FAQ panel | click | height 0 ↔ auto | 300ms `cubic-bezier(.65,0,.35,1)`; icon color 150/400ms, vertical bar scaleY 400ms |
| P10 | QuoteReveal words | in view (top ≤95% vh), once | opacity 0, y 36px → 1, 0 | ≈500ms `cubic-bezier(0,0,.58,1)`, stagger ≈10ms/word |
| P11 | CTA avatar tiles | in view | opacity 0 → 1 | 300ms `cubic-bezier(0,0,0,1)`, random delay .23–.83s |
| P12 | CTA heading lines | in view | translateY(100%) → 0 (overflow hidden) | 600ms `cubic-bezier(.22,1,.36,1)`, delays .6s / .75s |
| P13 | CTA buttons | in view | opacity 0 → 1 | 700ms `cubic-bezier(.22,1,.36,1)`, delay 1s |
| P14 | HoverWash + arrow | hover | wash opacity 0 → .8; arrow x +2px | in 50ms (wash) / 150ms (arrow); out 300ms / 400ms; `cubic-bezier(.2,0,0,1)` |
| P15 | AppCard | hover | border #e4e7ec → #cad0d9; arrow opacity 0 → 1, x −1 → 0 | 150ms in / 400ms out |
| P16 | Select popup | open | opacity 0, y +4px → 0 | 150ms (tailwind `enter`, ease) |
| P17 | Tooltip | hover (delayed) | opacity 0 → 1 | 150ms |
| P18 | Cmdk dialog | open | opacity 0, scale .96 → 1 | 200ms `cubic-bezier(.45,.05,.55,.95)`; overlay opacity 200ms same |
| P19 | Form error | submit | opacity 0 → 1 | 300ms ease-out |
| P20 | Input focus/hover | focus/hover | border/ring/shadow | all 300ms `cubic-bezier(0,0,0,1)` (inputs); 150ms `cubic-bezier(.2,0,0,1)` (selects) |
| P21 | Blog filter re-render | click | list opacity/filter/bg transition | 500ms `cubic-bezier(.2,0,0,1)` |
| P22 | Creator video carousel | always | translateX continuous | ≈74 px/s leftward, loop (Embla auto-scroll); pause on hover is not verified |
| P23 | Gallery thumb select | click | border → #cad0d9, inner opacity → .7 | 100ms `cubic-bezier(.4,0,.2,1)` |
| P24 | Lightbox | click image | shared-layout zoom (translate+scale → identity); overlay fade | framer default spring (not captured) |
| P25 | Docs sidebar accordion | click caret | height via `slideDown/slideUp`; caret rotate 90° | 300ms `cubic-bezier(.65,0,.35,1)` |
| P26 | Architecture headline caret | load / scroll | blink | 1.06s steps(1,end) infinite; typed text progresses with scroll through 300svh |
| P27 | Architecture scroll cue wheel | loop | see T8 | 1.6s `cubic-bezier(.19,1,.22,1)` infinite |
| P28 | Architecture gradient blobs | in view | drift | 24s ease-in-out infinite (paused off-screen) |
| P29 | Architecture "problem" words | scroll | rgba(255,255,255,.2) → #fff word by word as the block moves 100% → 50% vh | per-word color 500ms `cubic-bezier(0,0,0,1)` |
| P30 | Architecture "five reasons" rows | pointer | 35 hairlines translate; preview card follows the pointer | 500ms `cubic-bezier(.23,1,.32,1)`; opacity 200ms `cubic-bezier(0,0,0,1)` |
| P31 | Architecture dark-scene pulses | loop | `ping` scale 2 / opacity 0 | 2.8s `cubic-bezier(0,0,.2,1)` infinite |
| P32 | Help announcement pill | loop (inferred) | conic gradient sweep around the border | `search-shine` keyframe exists; duration not captured |

IntersectionObserver usage seen: `rootMargin 200px` (lazy/prefetch, all pages), threshold 0 / 0.4 / 0.6 (reveals), and `rootMargin 0 0 -20% 0` (architecture). Native scroll everywhere, with 7–9 scroll listeners per page (header state, sticky scenes).

Reduced motion: the site disables `animate-in` (`motion-reduce:animate-none`), shortens the architecture story to 150svh, stops the gradient blobs, and removes FAQ height transitions. Mirror this with `motion-safe:`.

---

## 5. Assets (types only; do not reuse)

- **Fonts**: same files as the homepage (Inter 400/500/600/700, Inter Display 500/600/700, Tiempos Text regular + italic → substitute, JetBrains Mono). The engineering ASCII art uses `Courier New` (a system font).
- **Images** are served via `/_next/image` (AVIF/WebP/PNG) from Storyblok and assets.attio.com. Every one is a media box per the content rule:
  - customer logos (SVG, 172x60 source)
  - app icons (128px PNG)
  - app gallery screenshots (960x599 → displayed 695x434; thumbnails 239x149)
  - portrait cut-outs (880x972, 900x1100)
  - story screenshots (720x432 displayed 561x314)
  - avatars (32–800px)
  - course images (891x532, 1780x1064)
  - lesson images (6080x2880)
  - team photos (portrait JPG)
  - blog hero (3840x2160)
- **Video**: careers interview MP4 (Storyblok), creator Vimeo background iframes (7). Replace with your own media or poster images.
- **Embeds**: expert-partners third-party form iframe (539x600).
- **Decorative SVG/data URIs** that are safe to recreate: the dot pattern (10px tile), the fractal-noise SVG filter (feTurbulence .85 / 2 octaves), hatch gradients, dashed guide lines, and the bracket-plus FAQ icon geometry (§C4).

---

## 6. Not measured / caveats

1. **Canvas content**: the architecture hero glyph field, architecture dark scenes, and closing canvas; the engineering-blog ASCII art. Only the containers, sizes, and colors were measured. The draw logic is proprietary and not reproduced.
2. **App-partners step typewriter**: titles are per-character spans, but in my runs every character was already at opacity 1, both at load and after switching the REST/SDK tab. I captured no timing. Treat it as optional: a per-character fade of about 20ms per character.
3. **Featured-apps tab transition and lightbox zoom** are framer-motion springs. Start and end states were captured, but not durations.
4. **Tooltip inner text color**, **cmdk result rows** (no results rendered in headless), and the **conic "shine" duration** on the help pill were not captured.
5. **Expert tier card tilt**: `preserve-3d` + a JS transform on hover. The tilt magnitude was not measured; use ≤6° rotateX/Y.
6. **Commit/heat grids** (careers hero, engineering blog) reveal from `opacity 0`, but the stagger was not captured. Their per-square data is content; generate it randomly.
7. **Creator form section** currently renders only a "closed" notice. If a form is needed, use C9.
8. **Expert-partners application form** is a third-party embed and is not clonable.
9. Headless runs used `prefers-reduced-motion: no-preference`. Every reveal was measured at deviceScaleFactor 1.
10. `/changelog` redirects to the current year. Other years (2021–2025) were not crawled; they reuse T7.
