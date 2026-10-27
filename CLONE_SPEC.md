Source: https://attio.com/

# Attio homepage: design clone spec (React 18 + Vite + Tailwind v3)

Measured live with Playwright on 2026-10-27. Primary measurements are at **1440x900**. A second pass ran at **1280x800**, and layout shifts were sampled at **768x1024** and **390x844**. Colors were read from computed styles. The site authors colors in `lab()`, and every value here has been converted to hex/rgba through canvas, so treat them as exact sRGB. All y-coordinates are document-absolute at 1440x900 unless noted.

**Content rule.** Do not reuse Attio copy, logos, customer logos, product screenshots, or illustrations. Each text node below lists its role, character count (`c`), word count (`w`), and line count at 1440. Write neutral placeholder copy of the same length. Each image, illustration, or product mock is given as a box (size, radius, border, shadow, bg). Fill these boxes with neutral placeholders. Generic UI icons (arrows, chevrons, check marks, close X) can be any generic 12–24px stroke icon.

The site is built on Next.js, Tailwind v4, framer-motion (JS-driven inline `style` transforms), Base UI navigation menu, Embla carousel with auto-scroll, and Radix-style accordions. GSAP and Lenis are **not** used (`window.gsap` is undefined, and there is no lenis class). The page uses native scroll.

---

## 0. Global tokens

### 0.1 Fonts and licensing

| Family (CSS name on site) | Weights loaded | Used for | License | What to use in the clone |
|---|---|---|---|---|
| `inter` (Inter, text cut) | 400, 500, 600, 700 | All UI/body text | **SIL OFL**, free | Google Fonts `Inter` (wght 400;500;600;700), or `@fontsource/inter`. |
| `interDisplay` (Inter Display, the opsz=32 display cut of Inter 4) | 500, 600, 700 | All headings (H1/H2/H3, big numbers, card titles, overline) | **SIL OFL**, free (ships with Inter 4.0) | Load "Inter Display" from https://rsms.me/inter/inter.css (`font-family: InterDisplay`), or use Google Fonts `Inter` with `opsz` 32 (`font-variation-settings: "opsz" 32`). Display is about 6.5% narrower than text Inter at the same size (measured: 64px/600 sample string 2159px vs 2310px), so do **not** substitute plain Inter without opsz or line breaks will shift. |
| `tiemposText` (Klim Type Foundry, Tiempos Text Regular + Italic) | 400 normal/italic | Only the large serif quote in the `quote-reveal` section | **Commercial/proprietary.** Do not self-host. | Closest free substitute: **Source Serif 4** (Google Fonts, opsz text) or **Newsreader**. Tiempos is wide with a tall x-height. Measured at 48px on a 67-char sample: Tiempos width 1650px, ascent 51, x-height 25. Georgia gives width 1571 and x-height 23, so Georgia needs `size-adjust: 105%`. For Source Serif 4, start with `size-adjust: ~106%` and tune by checking that the quote breaks to 3 lines at 1440 (see `quote-reveal`). I could not load Source Serif 4 into the live page because of CSP, so that metric is unmeasured. Site fallback descriptor, for reference: `"tiemposText Fallback": local(Arial); ascent-override 100.46%; descent-override 23.67%; size-adjust 105.61%`. |
| `JetBrains Mono` | 100–800 variable | Terminal mock in hero (inside placeholder area only) | **SIL OFL**, free | Google Fonts `JetBrains Mono`. |

Fallback descriptors the site defines (copy them for CLS parity):
- `inter Fallback`: local(Arial), ascent 89.79%, descent 22.36%, line-gap 0, size-adjust 107.89%.
- `interDisplay Fallback`: local(Arial), ascent 96.48%, descent 24.02%, size-adjust 100.41%.
- `JetBrains Mono Fallback`: local(Arial), ascent 75.79%, descent 22.29%, size-adjust 134.59%.

Body defaults: `font-family: inter`, 16px, weight 500, line-height 22px, letter-spacing -0.16px (-0.01em), color `#1c1d1f`, `-webkit-font-smoothing: antialiased`. Note that the site's **default weight is 500**, not 400.

### 0.2 Color tokens (exact)

Raw palette (CSS vars on `:root`):

| token | hex | | token | hex |
|---|---|---|---|---|
| black-0 | #000000 | | white-100 | #ffffff |
| black-50 | #101010 | | white-200 | #fafafb |
| black-100 | #1c1d1f | | white-300 | #f3f4f6 |
| black-200 | #202124 | | white-400 | #edeff3 |
| black-300 | #232529 | | white-500 | #e4e7ec |
| black-400 | #2e3238 | | white-600 | #dee2e7 |
| black-500 | #383e47 | | white-700 | #d3d8df |
| black-600 | #505967 | | white-800 | #cad0d9 |
| black-700 | #6f7988 | | white-900 | #b5bdc9 |
| black-800 | #8f99a8 | | blue-100 | #e8f0ff |
| black-900 | #a4adba | | blue-200 | #c8dcff |
| blue-300 | #94b9ff | | blue-400 | #709ff5 |
| blue-450 | #538bf3 | | blue-500 | #266df0 |
| blue-600 | #245bc2 | | blue-800 | #1a2233 |

Semantic tokens. Light is the page default. Dark applies inside `.dark` sections (universal-context, sdk, final-cta, footer):

| semantic | light | dark (measured inside dark sections) |
|---|---|---|
| primary-background | #ffffff | #101010 |
| secondary-background | #fafafb | #101010 (footer bottom bar) |
| surface-subtle | #f3f4f6 | #232529 |
| subtle-stroke (all hairlines) | #e4e7ec | #2e3238 |
| default-stroke | #d3d8df | n/a |
| strong-stroke (outline button border) | #cad0d9 | #2e3238 |
| accent-stroke | #709ff5 | n/a |
| primary-foreground (headings) | #1c1d1f | #fafafb |
| secondary-foreground | #232529 | #edeff3 |
| tertiary-foreground | #505967 | #b5bdc9 (footer links) |
| accent-foreground (grey heading continuation, body grey) | #6f7988 | #8f99a8 |
| caption-foreground | #a4adba | #505967 |
| disabled-foreground | #d3d8df | n/a |
| eyebrow pill | text #245bc2 on #e8f0ff | text #c8dcff on #1a2233 |

Other one-off colors: banner bg #000000. Traffic lights #ff5b59 / #f5b900 / #0fc27b. Changelog "New" badge #538bf3. Overscroll color top #000 and bottom #101010 (set on `<html>` bg via data-scrolled).

### 0.3 Type scale (computed, 1440)

| role | family | size / line-height | weight | letter-spacing | color |
|---|---|---|---|---|---|
| Hero H1 | interDisplay | 64 / 60.8 (0.95) | 600 | -1.28px (-0.02em) | #1c1d1f |
| Mega H2 ("brand moment", dark) | interDisplay | 96 / 96 | 600 | -2.304px (-0.024em) | #fafafb; `sup` 38.4px (0.4em) |
| Section H2 (two-tone) | interDisplay | 40 / 44 | 500 | -0.4px | lead #1c1d1f, continuation #6f7988 (dark: #fafafb / #8f99a8) |
| Final CTA H2 | interDisplay | 56 / 56 | 500 | -0.84px | #ffffff |
| Showcase H3 (two-tone) | interDisplay | 24 / 27.6 | 500 | -0.24px | #1c1d1f / #6f7988 |
| Story title (two-tone) | interDisplay | 32 / 36.8 | 500 | -0.8px | #1c1d1f / #6f7988 |
| Stat number | interDisplay | 32 / 32 | 500 | -0.32px | #1c1d1f |
| Newsletter title (two-tone) | interDisplay | 24 / 30 | 500 | -0.24px | #1c1d1f / #6f7988 |
| Overline (uppercase) | interDisplay | 12 / 14 | 600 | 0.72px (0.06em), uppercase, tabular-nums | #6f7988 |
| Hero subhead | inter | 18 / 23.4 | 500 | -0.18px | #6f7988 |
| Card title (h4 / sub-card) | inter | 18 / 22 | 500 | -0.18px | #1c1d1f |
| Changelog card title (h3) | inter | 18 / 24 | 500 | -0.18px | #232529, hover #1c1d1f |
| Body / card description | inter | 16 / 22 | 500 | -0.16px | #8f99a8 (sub-cards) or #6f7988 (changelog) |
| Stat label | inter | 16 / 16 | 500 | -0.16px | #505967 |
| Showcase nav item | inter | 18 / 21.6 | 500 | -0.16px | active #1c1d1f, idle #d3d8df |
| Nav link (header) | inter | 15 / 22 | 500 | -0.16px | #2e3238 |
| Button | inter | 14 / 20 | 500 | -0.07px (-0.005em) | see buttons |
| Eyebrow pill | inter | 14 / 20 | 500 | -0.14px | #245bc2 on #e8f0ff |
| Small button label | inter | 12 / 18 | 500 | 0 | #2e3238 |
| Banner text | inter | 13 / 20 | 500 | -0.16px | #ffffff |
| Hero badge text | inter | 13 / 18 | 500 | -0.16px | #232529 |
| Dropdown item title | inter | 14 / 20 | 500 | -0.07px | #1c1d1f; description 14/20 #6f7988 |
| Dropdown group label | inter | 12 / 18 | 500 | 0 | #6f7988 |
| Footer group heading | inter | 14 / 20 | 500 | -0.07px | #505967 |
| Footer link | inter | 14 / 20 | **400** | -0.07px | #b5bdc9 |
| Footer legal | inter | 12 / 18 | 400 | 0 | #505967 |
| Changelog date (`time`) | interDisplay | 12 / 14 | 500 | 0 | #6f7988 |
| Quote (serif) | tiemposText → substitute | 48 / 52 | 400 | -0.72px | unrevealed #a4adba, revealed #1c1d1f |
| Quote attribution | inter | 14 / 20 | 600 (name), 500 (role) | -0.07px | #232529 |

Site text utilities (Tailwind theme on the site, useful for `tailwind.config.js` `fontSize`): xs 12/18 w500 ls 0 · sm 14/20 w500 -0.005em · base 16/22 w500 -0.01em · lg 18/24 w500 -0.01em · xl 20/26 · 2xl 24/30. The heading-* tokens exist but are not used on the homepage.

**Fluid H1/H2 at small widths** (measured): Hero H1 is 64px at 1440 and 1280, **70.61px at 768** (2 lines, lh 67.08, ls -1.743px), and **40px at 390** (lh 38, ls -0.4). Mega H2 is 96 at ≥1280, 56 at 768, 40 at 390. Section H2 is 40/44 at ≥992 and 32/36 (ls -0.32) at 768 and 390. Final CTA H2 is 56 at ≥1280, 45.2/45.2 at 768, 36/36 at 390. Stat numbers are 28/28 at 390.

### 0.4 Radii
2px (xs), 4, 6, **8** (eyebrow pills, footer links, dropdown small), **10** (all buttons, inputs, nav links, small buttons), **12** (cards, dropdown items, hero inner window, mock cards), **13** (hero badge pill, self-building card top corners `13 13 0 0`), **16** (hero window shells, dropdown panel), **23** (integration app tiles), 9999 (dots, avatars).

### 0.5 Shadows
- `shadow-attio-N` stack (N = number of layers used):
  - L1 `0 1px 3px 0 rgba(0,0,0,.01)`
  - L2 `0 2px 4px -1px rgba(0,0,0,.02)`
  - L3 `0 4px 8px -2px rgba(0,0,0,.03)`
  - L4 `0 8px 16px -4px rgba(0,0,0,.04)`
  - L5 `0 16px 32px -8px rgba(0,0,0,.05)`
  - L6 `0 32px 64px -16px rgba(0,0,0,.06)`
  - L7 `0 64px 128px -32px rgba(0,0,0,.07)`
- Banner: attio-3 (L1–L3).
- Dropdown panel: `0 0 0 1px rgba(26,26,26,.08)` + attio-5. Self-building card: attio-5.
- Hero window shell: `0 0 0 1px rgba(11,13,24,.06), 0 1px 2px rgba(11,13,24,.024), 0 3px 6px rgba(11,13,24,.03), 0 8px 14px rgba(11,13,24,.035), 0 16px 28px rgba(11,13,24,.04)`.
- Mock floating card (showcase illustrations): `0 0 1px 1px rgba(0,0,85,.01), 0 4px 12px -1px rgba(0,26,51,.04), 0 1px 3px -1px rgba(0,22,61,.18)`.
- Mock small card / chip: `0 1px 3px 0 rgba(0,0,0,.04), 0 0 2px 0 rgba(28,39,67,.18)`.
- Integration tile (dark): `inset 0.2px 0.2px 2px 0 rgba(255,255,255,.1), 0 1.5px 1.5px 0 rgba(0,0,0,.25)`.

### 0.6 Easing tokens (exact, from site CSS)
`--ease-out: cubic-bezier(0,0,0,1)` · `--ease-in: cubic-bezier(.3,0,1,1)` · `--ease-in-out` and `--ease-emphasized-in-out: cubic-bezier(.2,0,0,1)` · `--ease-reveal: cubic-bezier(0,0,.58,1)` · `--ease-out-cubic: cubic-bezier(.33,1,.68,1)` · `--ease-in-cubic: cubic-bezier(.32,0,.67,0)` · `--ease-in-out-cubic: cubic-bezier(.65,0,.35,1)` · `--ease-in-out-quad: cubic-bezier(.45,.05,.55,.95)`.

### 0.7 Container and grid
- `.container`: `width:100%; max-width:100%; padding-inline:24px; margin-inline:auto`. Overrides: max-width 448px at ≥375, **624px at ≥768**, **1440px at ≥992**. Below 375 the padding is 16px. Result: inner width is **1392 at 1440**, **1232 at 1280**, **576 at 768**, **342 at 390**.
- Almost every section draws its **side hairlines** with `border-x 1px subtle-stroke` on the inner container box (x=24..1416 at 1440), so the page reads as one continuous bordered column. Sections are separated by 1px full-width hairlines. These are `<svg>` 1440x1 elements between sections (`section-divider`), plus border-top/bottom on sections.
- Inside sections, horizontal content inset is **calc(100%/24)** of the bordered box (57.9px at 1440, 51.25 at 1280). The site uses a **24-column grid** (`grid-template-columns: repeat(24, 1fr)`), and content typically starts at column 2 (x = 83 at 1440, 76 at 1280).
- Breakpoints in use: 375, 576, 768, **992 (lg, main desktop switch)**, 1200 (xl), 1400, 1536. Height queries also exist: `(max-height:700px) and (min-width:992px)`.

### 0.8 Buttons (all `border-radius:10px; border:1px solid`)

| variant | size | bg | border | text | hover |
|---|---|---|---|---|---|
| Primary (light) | h36, px12, 14/20 w500 | #202124 (`radial-gradient(at 50% -10%, #202124, #202124)`) | #505967 | #f3f4f6 | bg → `radial-gradient(at 50% -10%, #505967 0%, #202124 100%)`, text #ffffff, border #505967 |
| Outline (light) | h36, px12 | #ffffff | #cad0d9 | #2e3238 | border → #6f7988 (text unchanged). Active: bg #f3f4f6, border #383e47-ish, text #1c1d1f |
| Ghost (nav link) | h36, px12 (trigger: pl12 pr8 + 18px chevron, gap 6) | transparent | transparent | #2e3238 | bg #f3f4f6, text #232529 |
| Primary (dark sections) | h36 | #2e3238 (radial same color) | rgba(80,90,104,.5) | #edeff3 | lighter radial (same pattern) |
| Outline (dark) | h36 | #101010 | #2e3238 | #edeff3 | border lighter |
| Small "link" button | h32, pl10 pr6, gap 6, 12/18 w500 + 14px arrow-right icon | #fff (dark: #101010) | #cad0d9 (dark: #2e3238) | #2e3238 (dark: #edeff3) | as outline |
| Subscribe (form) | h40, px12 | primary | primary | #f3f4f6 | primary hover |

Transitions: `color, background-color, border-color 300ms cubic-bezier(.2,0,0,1)`. Primary animates the custom properties `--button-primary-bg-from/to` over 300ms. To get the gradient fade in Tailwind v3, register them with `@property` (`syntax:'<color>'`) or fall back to a bg-color transition.

Eyebrow pill: `inline-flex h-24 px-6 rounded-8`, 14/20 w500 -0.14px, light #245bc2 on #e8f0ff, dark #c8dcff on #1a2233.

Animated underline used on links (`attio-group-hover-underline`): `background-image: linear-gradient(currentColor,currentColor); background-position: 0 91%; background-repeat: no-repeat; background-size: 0% 0.06em; transition: background-size 400ms cubic-bezier(.65,0,.35,1)`. On group hover it becomes `100% 0.06em` with duration 300ms. On active it uses 50ms.

---

## 1. `site-header` (component: `SiteHeader`)

Wrapper: `position: sticky; top: 0; z-index: 92`. Total height **116px** = banner 48 + nav 68 (`--site-header-height`). Below lg (768/390) it is **100px** (banner 48 + nav 52).

`<header>`: bg `rgba(255,255,255,.95)` (**no backdrop-filter**), `border-bottom: 1px solid #e4e7ec`. The colors transition over **250ms cubic-bezier(.4,0,.2,1)**.

**Dark mode while over dark sections.** When the header overlaps a `.dark` section (universal-context, sdk, final-cta, footer), it switches to the dark theme: bg #101010 (opaque), border #2e3238, logo #ffffff, nav text #e4e7ec, Sign-in button bg #101010 / border #2e3238 / text #edeff3, primary button bg #2e3238 / border rgba(80,90,104,.5) / text #edeff3. Implement with IntersectionObserver on dark sections against the header's bottom line, and toggle `dark` on the header.

### 1a. Announcement banner (48px)
- bg #000, shadow attio-3. Inner container px 48 (inside the 24 container padding). A centered link (flex, gap 6) holds the text (13/20 w500 -0.16 #fff, **c48 w8, 1 line**) and a 14px arrow-right icon.
- Arrow hover: `translate 400ms cubic-bezier(.2,0,0,1)`, a small x-shift on hover. Text has the animated underline (400ms `--ease-in-out-cubic`).
- Dismiss button: 32x32, radius 10, absolute right (x 1384, y 8) with an 18px X icon. Ghost colors on dark.
- The site also defines `--site-header-banner-hidden-height: 0`. Dismissing collapses the banner, and header height becomes 68.

### 1b. Main nav row (68px; content row 36px tall, vertically centered, y 64–100)
- Flex `justify-between`. Left cluster: flex, gap 36.
  - Logo placeholder: 103x24 (link box 111x40 with padding 8 4). Use a neutral wordmark/glyph, not Attio's.
  - Nav `ul`: flex, gap 6. Five items, 36px tall. Two dropdown triggers ("Platform"-style **c8**, w105; "Resources"-style **c9**, w120; padding 0 8 0 12 + 18px chevron-down, gap 6). Three plain links (c10 w106, c9 w103, c7 w75; padding 0 12). Text 15/22 w500 -0.16 #2e3238. Ghost hover/open: bg #f3f4f6, text #232529. Chevron does not rotate (transform none when open).
- Right cluster: flex, gap 10. Outline button "Sign in"-style (**c7**, 71x36) and primary button (**c14**, 110x36).
- Below lg: the nav ul and right buttons are hidden. A 36x36 hamburger icon button (24px icon) sits at right. The mobile drawer uses z-index 90/91 (not measured).

### 1c. Dropdown panel (hover or click a trigger; Base UI NavigationMenu)
- Panel `nav`: left-aligned to the nav ul (x 163), top at y 106 (6px below the trigger row bottom), **1064x352** for the 1st menu. Width and height animate between menus.
- Panel styles: radius 16, bg rgba(255,255,255,.95), `backdrop-filter: blur(24px)`, shadow `0 0 0 1px rgba(26,26,26,.08)` + attio-5. Transition `translate, opacity, width, height 150ms cubic-bezier(.65,0,.35,1)`. Starting style is `translateY(-4px)` with opacity 0. Content cross-fade uses opacity 150ms with the same ease. Content switching uses keyframes `navigation-enter-from-right/left` (opacity 0, blur 8px, translateX ±200px → 0) and `navigation-exit-to-*`.
- Layout: flex, gap 8 → three 264px columns (padding 12) + one 264px "aside" column.
  - Column: group label (12/18 w500 #6f7988, padding 0 8, height 18), then 6px gap, then `ul` flex-col gap 2.
  - Item: 240x58, padding 8, radius 12, 1px transparent border. Title 14/20 #1c1d1f (c9–21) above description 14/20 #6f7988 (c20–30, 1 line). Hover bg transition 50ms `cubic-bezier(.2,0,0,1)` to #f3f4f6 (ghost hover token).
  - Column 1 has 5 items, column 2 has 5, column 3 has 3.
  - Aside (x 963, 256x336): bg #fafafb, radius 12, padding 8 10. Two groups, each a label + 3 compact links (236x32, radius 10, padding 0 6 0 10, 14/20 #2e3238, c5–15).

---

## 2. `hero` (component: `Hero`), section height 1207 at 1440x900 (svh-dependent)

`<section>`: bg #fff, border-bottom 1px #e4e7ec. The inner wrapper is a 1x1 grid with two stacked layers (`col-start-1 row-start-1`).

### 2a. Background layer (sticky)
`position: sticky; top: 116px; height: calc(100svh - 116px)` (784 at 900vh), overflow hidden, pointer-events none, z 0. It holds three absolute full-size layers, bottom to top:
1. `radial-gradient(90% 80% at 50% 100%, #e6ecff 0%, #bccbff 45%, #86a0ee 100%)`, opacity .4.
2. Vertical pinstripes: `repeating-linear-gradient(90deg, rgba(255,255,255,.78) 0 1px, transparent 1px 8px)`, opacity .4.
3. White fade from top: a 5760x1176 box centered horizontally (left -2160px) with `radial-gradient(70% 106.667% at 50% 0%, #ffffff 32%, transparent 64%)`.

The result is a white top that fades into a periwinkle-blue striped glow toward the bottom of the viewport.

### 2b. Text block (sticky)
- `position: sticky; top: 116px`. Flex-col, items center, justify center, gap 24. Padding-top 96, px 24 (58 at 1440 including container). `min-height: clamp(320px, calc(40svh - 116px), 520px)`. `margin-bottom: -min(calc(8px + 20svh), calc(50svh - 261px))`.
- Inner flex-col gap 36 (badge → heading group).
- **Badge pill** (link) 283x30 at y 212 (96px below section top), centered:
  - Outer: radius 13, 1px border #edeff3.
  - Gradient border layer: an absolute `conic-gradient(from <angle> at <x>px <y>px in oklch, rgba(163,236,233,0), #a3ece9 20deg, #709ff5 100deg, rgba(112,159,245,0) 120deg)` under the inner pill.
  - Inner pill: inset 1px, white, radius 13, padding 5 7 5 11, flex gap 4. Text **c37 w7, 1 line**. Chevron-right 12px at #232529.
  - Chevron hover: `transform/translate 300ms cubic-bezier(.2,0,0,1)`.
  - The conic highlight is JS-animated (see Motion M2).
- **H1**: 805 wide, **c27 w4, 1 line** at 1440 (2 lines at 768 and 390). Typography from the hero H1 row in 0.3.
- **Subhead p**: max-width 486, **c96 w15, 2 lines**, center. Top at 375 (36px below the H1 box).
- **CTA row**: flex, gap 10 (row-gap 8), centered, top at y 446 (24 below p). Outline button (**c13**, 108x36), then primary button (**c14**, 110x36).

### 2c. Product window scene (sticky)
- Wrapper: `position: sticky; top: 0; height: 100svh; display:flex; align-items:center; justify-content:center; padding-top:116px; padding-bottom:80px`. Starts at y 422.
- **Main window shell** ("attio-window"): **1080x619** at x 180, y 580 (1440x900). At 1280x800 it is 943x512. It is sized to fit the viewport: the internal 1152x626 canvas is scaled by `transform: scale(0.925)` with origin top-left. Below lg it becomes 506x379 (768) and 371x296 (390).
  - Styles: bg rgba(243,244,246,.8), `backdrop-filter: blur(12px)`, radius 16 (8 below lg), padding 0 6 6 6 (0 3 3 3 below lg), shadow per 0.5 hero shell.
  - Title bar: 32px tall, three 12px dots, gap 6, at left 14 / top 10: #ff5b59, #f5b900, #0fc27b.
  - Content area: white, radius 12, 1px border rgba(0,0,0,.05), 1068x581. **Placeholder**: neutral app-UI mock or a blank #fff panel with a 272px left sidebar column (grid 272px / 880px, scaled).
- **Floating side windows** (absolute, same shell style, z-order as listed; all have `will-change: transform`):
  - `slack`-type: 268x192 at x 20, y 564. z 2, transform-origin 100% 100%. max-width 268.
  - `call`-type: 272x371 at x 1148, y 620 (bleeds 20px past the right edge of the container). z 1, origin 0% 100%.
  - `terminal`-type: 300x315 at x 52, y 852. **Dark variant**: bg rgba(0,0,0,.8), dark inner. z 4, origin 100% 0%.
  - Main window z 3.
  - Placeholders: blank shells with the 3-dot title bar.
  - Side windows are desktop-only. Below lg a separate `mobile-scene` is used (not measured).

---

## 3. `customer-logos` (component: `LogoGrid`), height 194

- `<section>`: bg #fafafb, border-bottom 1px #e4e7ec.
- Inner (container): flex-col. Grid **5 columns** (277.2px each at 1440) with `gap: 1px` over bg #e4e7ec (the gap draws the gridlines), plus `border-x: 1px #e4e7ec`. 2 rows, 10 cells.
- Cell: height **96**, padding 0 24, bg #fafafb, flex center.
- Logo is a `<span>` with `background:#232529` and `mask-image:url(logo.svg)`, contain, centered. Logo boxes measured: 108x23, 123x17, 123x19, 123x27, 132x22, 118x27, 95x21, 133x17, 75x24, 127x15. Width is driven by `--cell-h: clamp(3.5rem, 7.8cqw, 5rem)` times the logo aspect ratio. **Placeholder**: neutral wordmark SVG masks of those sizes.
- 4 of 10 cells are links: row 1 cols 1 and 4, row 2 cols 1 and 3 (1-based). Each has a 20px arrow icon rotated -45deg, absolute top 12 right 12, color #a4adba. Hover: icon color #505967, cell bg #f3f4f6, logo stays #232529. Transition 200ms cubic-bezier(0,0,0,1).
- Logos fade in on load with keyframe `logo-in` (opacity 0 + blur 3px → 1 + blur 0). Duration not captured.
- 1280: 5 cols x 245.2. 768: 5 cols x 152.8 (no side borders, full-bleed). 390: **2 cols** x 194.5, section height 291.

---

## 4. `platform-showcase` (component: `PlatformShowcase`), height 6479 at 1440

`<section>`: bg #fafafb. Inner container box has border-x 1px #e4e7ec (x 24–1416).

### 4a. Intro block
- Padding 152 0 80. Border-bottom 1px #e4e7ec. Height 413.
- Content at x 83 (column 2), flex-col gap 24, items start.
  - Eyebrow pill (**c8**).
  - H2 two-tone: lead span (**c41 w6**, 1 line, #1c1d1f) flows inline into continuation span (**c94 w17**, #6f7988). Total 3 lines (1 + 2), block 896px wide.

### 4b. Showcase grid
24-column grid (57.9px columns) spanning the bordered box.

**Sticky left nav** (`nav`, cols 1–6 = 348px wide):
- `position: sticky; top: 116px; height: calc(100vh - 116px)`, bg #fafafb, border-right 1px #e4e7ec, padding-top 112, z 30. It uses subgrid.
- Inner `ol` spans col 2 to the end (x 83, width 289), flex-col gap 8.
- 5 items, each an `a` 30px tall: padding 4 20 4 0, text 18/21.6 w500 -0.16. Labels are **c14, c13, c17, c16, c17**.
- Active item text #1c1d1f. Idle items #d3d8df; on hover idle → #6f7988. Color transition **320ms cubic-bezier(.33,1,.68,1)**.
- **Active indicator**: a 2px wide x 30px tall bar, bg #709ff5, absolutely positioned on the nav's left hairline (x 24, i.e. `left: calc(-20% - 1px)` of the item). It slides between items as a framer `layoutId` shared-layout animation (see Motion M6).
- Active item = the article currently in view (scroll-spy). Clicking scroll-jumps to the article (`scroll-margin-top: var(--site-header-height)`).

**Articles** (cols 7–24, 1043px wide). 5 articles stacked, each with `border-bottom 1px #e4e7ec` (none on last). Ids: `home-2026-generate-pipeline`, `-convert-leads`, `-run-sales-motions`, `-forecast-revenue`, `-retain-and-expand`. Placeholder ids are fine.

Each article:
1. **Header**: padding 112 / 57.9 / 80 (xl). Tailwind: `px-[calc(100%/18)] pt-16 pb-11 lg:pt-20 lg:pb-14 xl:pt-28 xl:pb-20`. H3 max-width 560, `text-wrap: balance`, two-tone.

   | # | lead (c/w) | continuation (c/w) | lines | header height |
   |---|---|---|---|---|
   | 1 | c~22 | c97 w17 | 3 | 275 |
   | 2 | c~27 | c86 w16 | 3 | 275 |
   | 3 | c~28 | c87 w15 | 3 | 275 |
   | 4 | c~35 | c100 w17 | 3 | 275 |
   | 5 | c~22 | c80 w14 | 2 | 247 |

   Lead = H3 total minus continuation. H3 totals: 119, 113, 115, 135, 102.
2. **Illustration panel**: border-top 1px #e4e7ec. Inner box bg #f3f4f6, height **654** (≥lg; 327 below lg, or `aspect-ratio:1044/654` for #3 and #5), overflow hidden, user-select none. **Placeholder**: neutral mock UI made of white cards on #f3f4f6, using the mock card shadow and radius 12 from 0.5. Measured inner content examples:
   - #1: a white 756x457 r12 card centered (left 71, top 73) plus a 316px side note column.
   - #3: a horizontal 16px-gap row of cards starting 57px in, 73px from top, overflowing right.
   - #5: two stacked white cards 568x159 and 568x355 at left 57 / top 57 (gap 24) plus a right card 486x537 (padding 16, gap 16). Cards bleed past the right edge.
3. **Sub-cards row** (articles 1, 3, 5 only): border-top 1px, bg #fafafb, grid **2 cols** (521.25 each) at ≥1200 (1 col below). Each cell is 480 tall (360 below lg), flex-col gap 32. Left cell has border-right 1px.
   - Text block padding 44 32 0 28.9 (`lg:pl-[calc(100%/18)]`).
   - h4 18/22 #1c1d1f, c21–36, 1 line.
   - p margin-top 4, 16/22 #8f99a8, max-width 352, c74–83, 2 lines.
   - Visual area: flex-1, centered, px 32, pb 32. Placeholder mock: small white cards (r12, mock card shadow).
   - Article 5 left cell has a vertical auto-scrolling list (Motion M8).

Article heights at 1440: 1412, 931, 1411, 931, 1382.

**Below lg (768 and 390)**: the left nav becomes a horizontal sticky tab strip, 53px tall, full width, `max-lg:shadow-attio-2`. Tabs are `a` elements with px 20 py 16, 14/20; active bg #f3f4f6 + #1c1d1f; idle bg #fafafb + #505967; hover bg #f3f4f6. Articles go full width. H3 sits at x 32 (768) / 16 (390). Illustration panels are 327 tall. Sub-card rows are single column with cells 360 tall.

---

`section-divider`: 1440x1 `<svg>` hairline between sections (y 7996, 9094, 13612, 15438, 16914). Stroke uses subtle-stroke (#e4e7ec on light; #2e3238 near dark).

---

## 5. `self-building` (component: `SelfBuilding`), height 1097, bg #fafafb

- Row 1: empty spacer **128px**, border-x 1px #e4e7ec.
- Row 2 (504 tall), border-x:
  - Content: flex-col items-center gap 24, padding-top 152.
  - Centered eyebrow pill (**c13**).
  - H2 two-tone, centered, max 926: lead **c18 w4** inline then continuation **c131 w22**, total **3 lines**.
  - Outline button (**c14**, 110x36).
  - At the bottom of row 2: a full-width (1390x112) **SVG vertical tick pattern**. Thin vertical lines, color ~#e4e7ec, roughly 8px apart, fading upward. Visible as the "barcode" band above the card.
- Row 3 (464 tall, overflow clipped by section bottom), border-x:
  - Frame: x 142, width 1157 (≈ col 3 to col 22), bg rgba(255,255,255,.6), `backdrop-filter: blur(4px)`, padding 3 4 0 4.
  - Inner card: white, radius **13 13 0 0**, border 1px (top/left/right) #e4e7ec, shadow attio-5 (L1–L5), 1149x460.
  - The card is cut off by the section bottom, so there is no bottom radius.
  - **Placeholder**: neutral record-detail mock: grid 319px / 827px, 1px gap; left sidebar with avatar 38px circle and fields; right "highlights" area padding 24 24 16 with a 3-col card grid (236/236/292, gap 7) of r12 #fbfbfb cards with 1px rgba(0,0,0,.05) border.

768: H2 32/36, 4 lines (c18 lead). Card keeps its 1147px width and overflows (clipped). 390: H2 continuation 7 lines.

---

## 6. `universal-context` group (component: `UniversalContext`), total wrapper height 4517 at 1440x900

The wrapper is `relative isolate` and contains:
- (A) a `relative z-10` stack of two **dark** sections (6a, 6b–6d, 6e).
- (B) the white **quote-reveal** section (6f) with `margin-top: -100svh; z-index: 0`. B sits under the bottom of A, and A scrolls away to reveal it like a curtain.

### 6a. Dark section 1: brand moment and horizon (`<section class="dark">`, bg #101010)
- Container box border-x 1px #2e3238 (spans 2573px).
- **Title region** (top 818px): absolute background stripes `repeating-linear-gradient(to right, rgba(255,255,255,.04) 0 1px, transparent 1px 8px)`.
  - Eyebrow line p (**c17 w4**, 16/22 w500 #8f99a8, centered) at section-top + 284.
  - Mega H2 (**c18 w2, 1 line**, 759x96, centered, #fafafb) at +310. A superscript "TM"-style mark (c1, 38.4px) follows.
- **Horizon** (absolute, inside a `bottom-0 inset-x-0 h-[640px] overflow-hidden z-10` box at the bottom of the 818px region):
  - Planet disc: circle **1728px** diameter, left -144 (centered on 720), top at section-top + 466, bg #101010.
  - Rim rings, two layers, inset -3px and -2px (1734 and 1732 diameter), behind the disc: `conic-gradient(from 0deg at 50% 50%, #eef1ea 0deg, #6cbdb0 10deg, #161e69 60deg, #161e69 180deg, #bb2a1e 180deg, #bb2a1e 300deg, #ccc427 350deg, #eef1ea 360deg)`, masked with `conic-gradient(rgba(0,0,0,.4) 0deg, #000 35deg, #000 325deg, rgba(0,0,0,.4) 360deg)`. No filter.
  - Visual result: a thin rainbow rim, white-teal at the top, deep blue on the right, red-orange on the left, yellow at top-left.
  - Atmospheric glow: absolute circle **2247px** (rest state), `radial-gradient(circle closest-side, transparent 64%, rgba(255,255,255,.04) 71%, rgba(255,255,255,.12) 74.5%, rgba(255,255,255,.16) 75.5%, rgba(255,255,255,.125) 77.5%, rgba(255,255,255,.07) 80.5%, rgba(255,255,255,.035) 85%, rgba(255,255,255,.016) 91%, transparent 98%)`, centered on the disc. Enters with scale and opacity (Motion M9).
  - There is also an absolute 1728px SVG over the disc (opacity 0 at rest), likely the "define" layer for keyframes `universal-context-horizon-define/reveal`.
- **Feature row** (y +818, 279 tall): border-top 1px #2e3238. Grid **5 cols** (278.4 each).
  - Each cell: flex-col justify-between, gap 32, padding 32 28. Cells 2–5 have border-left 1px #232529.
  - Top: a 24px generic line icon (#fafafb).
  - Bottom: flex-col gap 6. Title p 16/22.4 w500 #fafafb (c15–24, 1 line). Description p 14/20.3 w500 #8f99a8 (c36–56, 2 lines).
- **Tabs + visual row** (y +1097, 808 tall): full-bleed 1px #2e3238 hairlines top and bottom (absolute, 1440 wide). Flex:
  - Left column: x 82, width 580, padding-top 152 (content at +1249), flex-col.
    - Heading block flex-col gap 32, items start: eyebrow pill (dark, **c7**); H2 two-tone 40/44 (lead **c38 w8** #fafafb + continuation **c16 w4** #8f99a8, 2 lines, 478 wide); small button (**c~9**, 92x32, dark).
    - 154px below the heading: **accordion tabs** flex-col gap 28.
    - Each tab title p 18/25.2 w500 -0.18 #fafafb, cursor pointer, with the animated underline on hover. Labels **c7, c20, c9**.
    - The active tab expands: description p margin-top 8, 16/22.4 #8f99a8, max-width 360 (c65, 2 lines); then a 2px progress track (margin-top 20, full 580 width, bg #2e3238) with a fill bar (bg #8f99a8, `transform-origin:left`, scaleX 0→1).
  - Right column: x 720, width 696, border-left 1px #2e3238, holds a `<canvas>` 695x808. The canvas draws a 3D perspective wireframe (concentric ellipses and radial lines, grey on black, with a moving highlight dot). **Not measurable as DOM**; reproduce with a neutral canvas/SVG wireframe placeholder.
- **Connectivity block** (y +1905, 668 tall) with the same stripe background:
  - Centered column at x 80–1360, starting +152 (padding-top 152).
  - Dark eyebrow pill (**c12**).
  - H3 40/44 (**c28 w4**, 1 line, max 696) at +48 from pill top.
  - p 16/20 #8f99a8, max 464, **c78 w13, 2 lines**, 16px below.
  - Small dark button (**c21**, 169x32; label 12/18 #edeff3 + 14px arrow) 32px below.
  - **Integration marquee** (top +2365, height 96), full container width, overflow hidden. Embla auto-scroll track: slides 128px wide each (`pl-8` 32px gutter + 96px tile).
  - Tile: 96x96, radius 23, `background: linear-gradient(-30.12deg, #1c1d1f 25.6%, #2e3238 163%)`, shadow per 0.5 integration tile. The logo is centered at 35–54px.
  - 12 unique tiles repeated. **Placeholder**: generic monochrome glyphs (white/grey) at 38–44px. The outermost visible tiles at the left and right appear dimmed (fade at edges). The fade mechanism was not identified: no mask on the parent, so it is likely per-slide opacity.

### 6b. Dark section 2: SDK/API block (height 593, bg #101010)
- Container border-x #2e3238.
- Panel 1390x465 with border-y 1px #2e3238. Background grid: 24 vertical 1px SVG lines at 57.9px spacing (`justify-evenly`) and 8 horizontal 1px lines at about 58px spacing. Color ~#2e3238. This forms a graph-paper grid.
- Left card: x 83, width 637, height 348, top +59, bg #101010 (masks the grid), padding 0 32. Content flex-col gap 24, starts at +161:
  - H2 two-tone, 2 lines: lead **c14 w3** #fafafb, continuation **c24 w4** #6f7988, each a block line 44px.
  - Small dark button (**c~9**, 98x32).
- Right half: x 720, 695x463, bg #101010, holds an SVG line illustration (aspect 1.5). Dotted guide lines plus a geometric logo-like mark drawn with hatched strokes, grey #505967-ish. **Placeholder**: a neutral geometric line drawing of the same box.
- Bottom spacer 128px (593 - 465).

### 6f. `quote-reveal` (white section under the curtain), height 2250
- `position:relative; z-index:0; margin-top:-100svh`. bg #ffffff. Container border-x 1px #e4e7ec.
- Sticky panel: `position: sticky; top: 116px; height: 784px` (100svh - header). Flex-col, centered.
  - Absolute full-size SVG dot-grid background (aspect 1.773; light grey dots ~#e4e7ec on an ~8px pitch, visible in screenshots).
  - Content block 1158 wide, centered, flex-col items-center.
    - Quote: serif 48/52 -0.72px, centered, **17 word-spans over 3 lines** (≈ c95 total, line widths about 610 / 700 / 628px).
    - Attribution 46px below: name p (14/20 w600 #232529, **c13**), then role p (**c35 w6**, 14/20 w500).
    - Avatar/logo: not detected. Text only.
  - Word reveal is scroll-driven (Motion M12).

---

## 7. `scale-stats` (component: `ScaleStats`), height 760, bg #fff

- Container box border-x 1px #e4e7ec. Padding 152 0 56. Flex-col.
- Background layers (absolute, full box 1390x760):
  - Center vertical hairline: `linear-gradient(to right, transparent calc(50% - .5px), #e4e7ec calc(50% - .5px), #e4e7ec calc(50% + .5px), transparent calc(50% + .5px))`.
  - Blue wash: `linear-gradient(rgba(150,183,255,.18), transparent 85%)`, absolute, animated in (Motion M14).
  - Two static SVGs (1390x760) draw the **chart**: many thin vertical lines (every ~8px, #e4e7ec), plus an exponential curve rising from bottom-left (y≈ bottom − 56) to the top-right corner. The curve stroke is blue (#266df0 range, ~1.5px) and the area under it has a faint blue vertical-line fill.
  - A third SVG is clip-revealed left→right (M14).
  - **Placeholder**: generic exponential curve SVG with the same geometry.
- Content (x 83, max-width 464): flex-col gap 24.
  - Eyebrow pill (**c14**).
  - H2 two-tone: lead **c17 w4** (1 line) + continuation **c42 w6** (2 lines).
  - Stats grid: margin-top ~32, **2 cols x 216px**, column-gap 48, row-gap 32, max-width 480. Each stat has a blue vertical rule on its left, about 50px tall. I saw it in the screenshot but did not read its computed width or color, so use 2px #245bc2 (blue-600) as a stand-in. The text starts 26px right of the cell edge (stat x 109 vs grid x 83). Number span 32/32 interDisplay w500 (**c3–4**). Label p 16/16 #505967 (c17–22, 1 line), 3px below.
- 390: stats grid 2 x 138.5, numbers 28/28.

---

## 8. `customer-stories` (component: `CustomerStories`), height 937, bg #fff, border-top 1px #e4e7ec

- Container border-x.
- Header block 425 tall with border-bottom: padding-top 152. Content at x 83, flex-col gap 24:
  - Eyebrow (**c16**).
  - H2 two-tone, 2 block lines (lead **c29 w4**, continuation **c37 w6**).
  - Small light button (**c9**, 100x32).
- **Tab strip**: grid **4 cols** (346.75), gap 1px on bg #e4e7ec, border-bottom. Cells are `button`s 80 tall (61 at 768, 57 at 390), bg #fff, centered logo mask (#232529).
  - Active cell gets a **progress fill**: absolute inset-0 span, bg #fafafb, `transform-origin:left`, scaleX 0→1 over 6s (Motion M7).
  - Hover: bg/colors transition 200ms cubic-bezier(0,0,0,1).
  - Below md the full wordmark is swapped for a square mark.
- **Story card** (a link, grid 2 cols 695/695, height 429):
  - Left: bg #fff, flex-col justify-end, padding 32 32 32 57.9, border-right. Text group flex-col gap 12 at the bottom:
    - overline (interDisplay 12/14 w600 0.72px uppercase #6f7988, **c11**)
    - title two-tone 32/36.8 -0.8px: lead **c23 w4** (1 line) + continuation **c56 w9** (2 lines), max-width 16em, balance.
  - Hover overlay: bg #fafafb, absolute, opacity 0→1 on hover.
  - Right: image area 695x429, bg #f3f4f6, overflow hidden. Stacked `img` (object-fit cover, natural 696x435), one per story, plus a top "current" image with `filter: saturate(.55)`. Hover: saturate(1) and scale(1.005), transition 500ms cubic-bezier(0,0,0,1).
  - **Placeholder**: neutral photos/gradients 696x435, 4 variants.
- 768/390: card stacks vertically. Image first (aspect 696/429), text below with padding 24 calc(100%/12). Title 28/32.2, 3 lines.

---

## 9. `spacer-row` (x2: after customer-stories and after changelog), height 128
bg #fff, container border-x 1px #e4e7ec. Hidden below lg (`max-lg:hidden`).

---

## 10. `changelog` + `newsletter` (component: `Changelog`), height 930, bg #fff

- Container box border-x and border-bottom 1px.
- Header: padding-top 152 (content at +152), x 83, flex-col gap 24:
  - Eyebrow (**c9**).
  - H2 two-tone (lead **c19 w4** inline + continuation **c46 w9**, 2 lines, 880 max).
  - Small button (**c8**, 82x32).
- **Cards row** (margin-top 80; y +424, height 312): 24-col grid wrapper. Cards grid from col 2 to col 23: **4 cols** x 318.5 = 1274 wide. Below lg it becomes a horizontally scrolling snap row of 307px cards (`snap-start`), overflowing.
  - Card = link, flex-col, border-left 1px #e4e7ec, height 312.
  - Body: padding 0 24, flex-col gap 16, top padding ~30. Contents: `time` (interDisplay 12/14 w500 #6f7988, **c18**), then title group gap 4: h3 18/24 #232529 (c11–30, 1–2 lines, line-clamp 2) and p 16/22 #6f7988 (c31–77, 1–2 lines, line-clamp 2).
  - Bottom of card: a tick strip 56px tall (`h-14`; 48 at <1200, 40 at <992). 22 vertical 1px SVG ticks per card, ~14.5px apart, color #e4e7ec, `justify-evenly`.
  - Hover:
    - An accent line (absolute, left -1px, 1px wide, full height, bg #6f7988) scales `scaleY 0→1` from bottom origin. In: 240ms; out: 200ms; `cubic-bezier(.33,1,.68,1)`.
    - h3 color → #1c1d1f.
    - Ticks recolor to a gradient from #6f7988 (tick idx 0) to #e4e7ec (idx 20) via `color-mix(in oklab, #6f7988 calc(100%*(20-idx)/20), #e4e7ec)`. Tick-in 160ms, tick-out 200ms, stagger 10ms per index (delay `(20-idx)*10ms`), start offset 60ms.
- **Newsletter row** (border-top 1px, padding 64 0, 193 tall): 24-col grid.
  - Left text at col 2: two block lines interDisplay 24/30 w500 -0.24: lead #1c1d1f (**c18**) + continuation #6f7988 (**c30**).
  - Right form (max-width 352, x 1005–1357): grid `1fr auto`, gap 8.
    - Email input: 251x40, radius 10, border 1px #d3d8df, padding 10 13, bg #fff, placeholder c18 #8f99a8-ish 14px.
    - Subscribe primary button 93x40 (label **c9**). A spinner icon (24px, `spin 1s linear infinite`, opacity 0) replaces the label while submitting.
  - Below 768 the form stacks: full-width input over a full-width button (342 wide at 390).

---

## 11. `final-cta` (component: `FinalCTA`), height 417, `<section class="dark">` bg #101010, border-top 1px #2e3238

- Container box border-x 1px #2e3238. Stripe background `repeating-linear-gradient(to right, rgba(255,255,255,.04) 0 1px, transparent 1px 8px)`.
- Falling light streaks (Motion M16).
- Content: flex-col items-center justify-center gap 28, padding 120 0.
  - H2 56/56 w500 -0.84 #fff, max-width 672, **c30 w5, 2 lines**, centered.
  - Button row gap 10: dark outline (**c13**, 108x36) and dark primary (**c14**, 110x36).
- 390: the CTA row becomes the stacked email form (320 wide) plus an inline link (same pattern as hero mobile).

---

## 12. `site-footer` (component: `SiteFooter`), height 685, `footer.dark`, bg #101010, `min-height: 40svh`, flex-col justify-between

- Top hairline: 1440x1 SVG.
- Main (container): grid **12 cols** (115.8 each at 1440), row-gap 48, padding 80 1 48.
  - Logo placeholder (116x26, white) in col 1.
  - Link area cols 5–12 (x 488, width 927) uses **CSS multi-columns**: `columns: 4; gap: 0` (3 cols < xl starting col 4; 2 cols < lg spanning all; 1 col < xs).
  - Groups flow down the columns:

    | group | links |
    |---|---|
    | 1 | 5 |
    | 2 | 7 |
    | 3 | 6 |
    | 4 | 2 |
    | 5 | 9 |
    | 6 | 7 |

    Groups 1 and 2 share column 1. Groups 3 and 4 share column 2. Group 5 is column 3. Group 6 is column 4.
  - Group heading h2: 14/20 w500 #505967, padding 4 0 (28 tall).
  - Links: ul flex-col. Each a is 28 tall: padding 4, margin-inline -4, radius 8, 14/20 **w400** #b5bdc9, `w-fit`, flex items-center.
  - Link hover: color → secondary-foreground (light-on-dark #edeff3) over 150ms cubic-bezier(0,0,0,1), plus the animated underline on the label span.
  - Gap between groups 28px.
  - Some links carry a "New" pill: margin-left 6, radius 10, bg #538bf3, 10px/7px w400 #fff, padding 4 6.
  - External links carry a 20px arrow-up-right icon (#505967). Its color transition is 200ms cubic-bezier(.65,0,.35,1).
- Bottom bar (108 tall, container): flex justify-between, wrap, gap 24, padding 40 1.
  - Left: 4 social icon links, each 28x28, radius 8, #505967. Hover → tertiary, 400ms cubic-bezier(.2,0,0,1).
  - Right: flex gap 16. Copyright p (12/18 w400 #505967, **c38**) followed by 3 legal links (12/18 w400, padding 4, radius 8, c18/c14/c4, gap-x 24, hover → tertiary 400ms).
- 768: footer container 576 wide, link area 2 columns, height 1039. 390: height 1073.

---

## 13. Fixed overlays (do not clone, or use neutral stand-ins)
- Cookie consent toast: fixed bottom-left (left 16, bottom 16), 350x154, bg #fff, shadow attio-5, 1px border rgba(0,0,0,.05), `backdrop-blur-xs`, slides in from bottom. Third-party/consent UI, optional.
- Intercom launcher bottom-right: third-party, skip.

---

## 14. Motion

All JS animation on the site is framer-motion, which writes inline `style` transforms. In React, use `framer-motion` (`motion` v11, compatible with React 18), or CSS plus IntersectionObserver where noted. Respect `prefers-reduced-motion` (the site has `motion-reduce` variants that disable transitions).

**M1. Hero intro on page load** (time-based, from navigation start of hydration):

| element | from → to | start | duration | easing |
|---|---|---|---|---|
| Badge | visible immediately | n/a | n/a | n/a |
| H1 | opacity 0 → 1, `filter: blur(1.5px)` → 0 | ≈150ms | ≈650ms | ease-out-like (sampled: 0.15@240ms, 0.35@347, 0.60@451, 0.78@554, 0.93@657, 1.0@758) |
| Subhead p | same as H1 | ≈250ms (100ms stagger) | ≈650ms | same |
| CTA row | was visible in samples (not animated) | n/a | n/a | n/a |
| Main window shell | opacity 0 → 1, `scale(0.98)` → 1 | ≈500ms | ≈950ms (done by ~1450ms) | ease-out (opacity .22@657, .52@859, .77@1061, .94@1263) |
| Side windows | present at opacity 1 when sampled | n/a | n/a | n/a |

The side windows may animate before first sample; not verified.

**M2. Hero badge "comet" border.** JS updates the conic-gradient origin every frame. The gradient origin travels along the pill:
- Rightward along the center line, x 13 → 268, at ≈150px/s with angle -80deg.
- At the right end it rotates -80 → 100deg over ≈300ms.
- Leftward x 268 → 13 at the same speed with angle 100deg.
- At the left end it rotates 100 → 280(-80)deg over ≈300ms.

Loop period ≈ **3.65s**, linear, infinite. Rebuild with a rAF loop that writes `background-image` on the gradient layer, or approximate with an `@property --angle` keyframe (site defines `@keyframes ai-hero-box-gradient-spin { to { --ai-hero-box-gradient-angle: 360deg } }`).

**M3. Hero scroll state** (threshold-triggered, not scrubbed). As soon as `scrollY > 0` (measured at 20px), the hero enters a "scrolling" state:
- Text block: opacity 1 → 0 and `filter: blur(2.5px)`, `pointer-events: none`. Decay sampled: 0.76@50ms, 0.53@100, 0.36@150, 0.23@200, 0.11@260, 0.02@370, 0@520. This is an exponential ease-out / spring of ≈500ms. `visibility: hidden` after it finishes.
- All windows: `scale(1)` → `scale(0.95)` as a spring, ≈700ms to settle (0.9975@50, 0.989@100, 0.981@150, 0.973@200, 0.962@320, 0.955@470, 0.9526@570).
- Window bg goes from 80% alpha to opaque, and side windows drop backdrop-blur (`group-data-hero-scrolling` variants).
- Returning to `scrollY = 0` reverses it.
- Meanwhile the sticky window wrapper scrolls up normally with the page.

**M4. Header theme swap**: colors/bg/border transition **250ms cubic-bezier(.4,0,.2,1)** when crossing dark sections (see section 1).

**M5. Dropdown**: open/close 150ms `cubic-bezier(.65,0,.35,1)` on translate (−4px → 0), opacity, width, height. Panel content switches with `navigation-enter/exit-from/to-left/right` keyframes (opacity, blur 8px, translateX ±200px). Duration presumed 150ms (not sampled).

**M6. Platform showcase nav**: scroll-spy updates the active item while each article is in view. Text color transition 320ms `cubic-bezier(.33,1,.68,1)`. The 2px blue indicator bar moves between items with a framer shared-layout (`layoutId`) transition; framer default spring. Exact spring constants not exposed.

**M7. Customer stories auto-cycle**:
- Interval **6000ms** per story, linear progress. The active tab's `#fafafb` fill grows `scaleX 0 → 1` (origin left) over 6s, then advances to the next tab and wraps 4 → 1.
- On switch, the text group exits (opacity → 0, blur 1.5px) and the new text enters from `translateX(~12px)`, opacity 0, blur 1.5px to rest in ≈500ms ease-out.
- The image enters from `translateX(5px) scale(1.015)`, opacity 0, `blur(1px)` to rest in ≈500ms.
- Clicking a tab selects it and restarts progress.
- Pause on hover: not observed (it kept cycling with the pointer elsewhere); unverified with the pointer over the card.

**M8. Signal roller** (platform article 5, left sub-card): a vertical list of mock cards translates `translateY(0) → translateY(-50%)` over **24s linear infinite** (`@keyframes signal-roller-roll`). The list content is duplicated for a seamless loop.

**M9. Universal Context entrance** (in-view, re-triggers on leave/enter in both directions):
- Eyebrow: opacity 0 → 1, `blur(1.5px)` → 0, `translateY(4px)` → 0.
- Mega H2: same but blur 2.5px. Eyebrow lags the H2 slightly (at mid-transition the H2 is .90 while the eyebrow is .52).
- Duration ≈600–800ms ease-out. Triggers when the section top is ≈300–500px from the viewport top.
- Horizon glow: `scale(0.84)` → 1 and opacity 0 → 1 as the section reaches the viewport top (0.96 at section-top = viewport-top, complete ≈200px later).
- Keyframes present on the site for the horizon: `universal-context-horizon-define` (opacity 1, scale 1 → 65% → opacity 0, scale .8) and `-reveal` (opacity 0 → 1). Exact trigger not isolated.

**M10. Accordion tabs (Universal Context)**:
- Auto-advance every **5000ms**. The progress fill scaleX 0 → 1 is linear (0.2 per second).
- On advance, the old panel collapses and the new one expands: height auto ↔ 0, opacity 1 ↔ 0, `filter: blur(1px)` ↔ 0. Duration ≈400–500ms.
- After the switch the bar sat at scaleX 0 for ≈2–3s before filling again, presumably synced to the canvas animation. Treat it as: 5s fill, then a ~2.5s hold before the next fill. Not fully characterized.
- Canvas wireframe animates continuously. Not measurable (canvas).

**M11. Integration marquee**: Embla auto-scroll moving left at ≈**30px/s** (measured −30.0px per 1000ms), continuous, infinite loop. In CSS: a duplicated track with `translateX(0 → -50%)`, linear, duration = trackWidth/2 ÷ 30px/s. 12 tiles x 128px = 1536px per set gives ≈51.2s.

**M12. Quote word reveal** (scroll-linked by threshold):
- While the sticky panel is pinned, words switch from #a4adba to #1c1d1f in order as scroll progresses.
- Measured from the moment the white section's top passes the header: 0px → 0 words, 300px → 2, 600px → 8, 900px → 13, 1200px → all 17. Roughly 1 word per ~70px of scroll, starting ~150px in.
- Each word uses CSS `transition: color 500ms cubic-bezier(0,0,0,1)`.
- The panel unpins after ≈1350px.

**M13. Curtain reveal**: no animation code. Use pure layout: dark stack z-10 on top, white quote section `margin-top:-100svh; z-index:0` with a sticky inner panel.

**M14. Scale chart** (CSS animations, start when in view):
- Third SVG (curve): `infra-reveal-to-right 1.2s cubic-bezier(0,0,.58,1) 0.1s 1`, `clip-path: inset(0 100% 0 0)` → `inset(0)`.
- Blue wash div: `infra-fade-in 0.6s cubic-bezier(0,0,.58,1) 1.3s 1`, opacity 0 → 1.
- Played on load in my sample. Gate with IntersectionObserver (add a class when in view).

**M15. Hero/showcase decorative loops** (inside mock placeholders; optional):
- `pipeline-radar-ring-inner/outer`: opacity pulses (0.11 → 0.22 → 0.07 and 0.067 → 0.135 → 0.045), 3600ms, ease-in-out keyframes, infinite. Outer has a 400ms delay.
- `pipeline-radar-bob`: translateY 0 → −5px → 0. Durations 3800/4150/4500/4850ms with delays 1000/1650/2300/2950ms (staggered nodes).
- `enter` (tailwindcss-animate): opacity 0 + translateY(8px) → rest, 500ms ease, stagger 0/120/240/360ms.
- Hero mock row cells: `opacity 0 → 1; translateY(3px) → 0; transition opacity .3s, transform .3s` (row stagger).
- Caret blink: opacity 1 → 0, 500ms ease-out, alternate.
- Others defined: `reporting-*` radar (cycle), `custom-agents-*` border draw, `ask-hero-rise` (opacity 0, blur 6px, translateY 16px → rest), `ask-thinking-sweep` (bg-position 200% → -100%), `xLmF0q_skeleton-shimmer` (translateX → 100%), `search-shine`.

**M16. Final CTA falling streaks**:
- 6 absolutely positioned divs: 1–2px wide, 360px tall, `background: linear-gradient(transparent, #8a93a1 50%, transparent)`.
- Placed on the 8px stripe columns at random x. Opacity animates 0 → ~0.17–0.25 → 0 while translating downward (inline `matrix` scaleX ~0.5–0.97, scaleY ~0.35–1). Each starts at a random time.
- JS-driven, with random timing per streak. Measured opacity ramp ≈+0.03 per 300ms at the start. Exact durations were not extractable.
- Approximation: each streak runs 2–4s, translateY from −360 to section height, opacity 0 → .25 → 0, random delay 0–3s, re-randomize x on each cycle.

**M17. Micro-interactions** (CSS transitions):

| element | effect | timing |
|---|---|---|
| Buttons | colors | 300ms `cubic-bezier(.2,0,0,1)` |
| Dropdown items | bg | 50ms `cubic-bezier(.2,0,0,1)` |
| Logo cells | bg | 200ms `cubic-bezier(0,0,0,1)` |
| Showcase tabs (mobile) | bg/color | 200ms `cubic-bezier(0,0,0,1)` |
| Footer links | color | 150ms `cubic-bezier(0,0,0,1)` |
| Footer legal/social | color | 400ms `cubic-bezier(.2,0,0,1)` |
| Underline links | background-size | 400ms `cubic-bezier(.65,0,.35,1)` (300ms on hover-in) |
| Banner arrow | translate | 400ms `cubic-bezier(.2,0,0,1)` |
| Hero badge chevron | translate | 300ms `cubic-bezier(.2,0,0,1)` |
| Story image | saturate .55 → 1, scale 1.005 | 500ms `cubic-bezier(0,0,0,1)` |
| Changelog hover | see section 10 | |

No IntersectionObserver-based generic "fade-up on scroll" is applied to the light-section headings. Platform/self-building/scale/customers/changelog headings were static at opacity 1 when scrolled into view. Only the dark Universal Context title (M9) and the specific widgets above animate.

---

## 15. Not measured / caveats
- **Canvas** (Universal Context right panel, 695x808): content is canvas-rendered. I recorded only its box and a visual description.
- **Product mock interiors** (hero app windows, showcase illustrations, self-building record card): these are copyrighted product UI. I recorded only outer boxes, frames, and representative card styles. Inner layouts are intentionally not specified.
- Exact spring parameters for framer `layoutId` (showcase indicator) and hero scale spring. The timing samples above are the best available.
- Mobile nav drawer (hamburger) contents and animation were not opened.
- Section heights for hero, quote-reveal, and Universal Context depend on `svh` (measured at 900px viewport height; at 1440x2200 the hero was 2105 and the UC group 6467).
- Source Serif 4 metrics could not be measured in-page (blocked by CSP). Tune `size-adjust` against the 3-line break target.
- Edge-fade mechanism of the integration marquee was not identified.
