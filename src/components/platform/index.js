/**
 * Platform section library (CLONE_SPEC_PLATFORM.md section 3). Shared by the v2 (T1) and legacy
 * (T2) /platform/* routes. All copy/media come in through props; `media` props take any node
 * (use ./art.jsx for original artwork). Every component accepts `className` on its outer wrapper.
 *
 * Shell primitives (./shell.jsx)
 *   V2Block { spacer=true, boxClassName }      P1 container + border-x, 128/64 spacer + hairline; full-bleed < lg
 *   V2Spacer, BlockDivider, SectionDivider     128 spacer / container hairline / full-width hairline
 *   LegacyBlock { as='div', boxClassName }     P2 container + border-x (stays bordered < lg)
 *   GuideRow { lines=2, heightClass }          P3 dashed `4 6` guide row (160 / 120 / 100)
 *   GuideStub                                  P3 20px stub above a legacy frame (absolute)
 *   DashedH / DashedV                          P4 dashed 1px rules
 *   DotWell { masked }                         P5 10px dot pattern (absolute fill)
 *   HatchFill                                  P6 125deg hatch gutter fill
 *   StripeField { variant: default|uc, mask: t|t20|none }   P7 8px stripe field
 *   V2Heading { lead, cont, lh: 46|44, block, as }          v2 two-tone H2
 *   LegacyHeading { lead, cont, block }        legacy two-tone H2 (32/36 w600 + w500)
 *   LegacyHeader { lead, cont, block, center } legacy header row (pt/pb 160/80)
 *   StackedHeader { title, sub }               legacy stacked header (40/44 w600 + 20/26)
 *   Overline { children }                      `[ 01 ]` overline
 *   HeroCopy { pill?, title, sub, primary, secondary, timing: {dur,pill,title,sub,cta}, align }
 *   CtaPair { primary, secondary }             primary + outline buttons (h46 < lg, stacked < md)
 *
 * Sections
 *   PlatformCta { lines: string | [l1, l2], primary, secondary }                 S-CTA (450)
 *   SplitAccordion { lead, cont, items: [{ title, desc, media }] }              S-SPLIT v2 (auto-advance while in view + scrolling)
 *   SplitAccordionLegacy { lead, cont, items: [{ title, desc, media }] }        S-SPLIT-L (timed 5.5s)
 *   MediaGrid3 { lead, cont, cards: [{ title, body, media }] }  (3 or 6 cards)   S-GRID3
 *   LegacyGrid3 { lead, cont, cards: [{ title, body, media?, icon?, maskWell? }], variant: media|icon }  S-GRID-L3
 *   LegacyGrid2Q { lead, cont, cards: [4 x { title, body, media }], quote?: { text, name, role } }  S-GRID-L2Q
 *   TaggedQuad { lead, cont, cards: [4 x { tag, title, body }] }                S-QUAD
 *   IconRow { lead, cont, items: [3 x { icon, title, body }] }                  S-ICON-ROW
 *   SplitIcons { lead, cont, items: [3 x { icon, title, body }] }               S-SPLIT-ICONS
 *   Bento { lead, cont, cards: [4 x { title, body, media }] }                   S-BENTO (legacy header)
 *   CenterMedia { lead, cont, media, variant: top|centered }                    S-CENTER-MEDIA
 *   Stat { lead, cont, value, label }                                           S-STAT
 *   TextColumns { lead, cont, items: [{ title, body }], variant: columns|steps, button }  S-COLUMNS / S-STEPS
 *   CardMarquee { header: v2|legacy, lead, cont | title, sub, rows: [[card], [card]] }    S-MARQUEE
 *       card = { icon, title, desc, label }   (scroll-linked, rows move in opposite directions)
 *   ScrollQuote { text, name, role, variant: legacy|v2 }                        S-QUOTE (scroll-lit words)
 *   IntegrationStrip { title, sub, tiles: [icon names], shell: v2|legacy }      S-STRIP
 *   LinksGrid { variant: v2|legacy, lead, cont | title, sub, links: [8 x { label, to? }] }  S-LINKS
 *   Tabs { lead, cont, tabs: [{ label, title, desc, media }], more }            S-TABS legacy (click only)
 *   UcBand { kicker, title, cards: [5 x { icon, text, cont }] }                 S-UCBAND (dark)
 *   Orbit { lead, cont, items: [3 x { title, body }] }                          S-ORBIT
 *   Newsletter { title, sub, placeholder, buttonLabel }                         S-NEWS (shared SubscribeForm)
 *
 * Heroes (./heroes.jsx, route-specific): HeroWebAgent, HeroCustomAgents, HeroEnrichment,
 * HeroHorizon, HeroRadar, HeroMcp  -  { copy: HeroCopy props, timing, ...artwork data }.
 * Artwork (./art.jsx): PanelArt, TileArt, ChartArt, WindowArt, OrbitArt, GlyphTile.
 * Customer logos: reuse `CustomerLogos` with the `platform` prop.
 */
export * from './shell.jsx'
export { SplitAccordion, SplitAccordionLegacy } from './SplitAccordion.jsx'
export { MediaGrid3, LegacyGrid3, LegacyGrid2Q, TaggedQuad, IconRow, SplitIcons, Bento } from './Grids.jsx'
export {
  PlatformCta,
  CenterMedia,
  Stat,
  TextColumns,
  CardMarquee,
  ScrollQuote,
  IntegrationStrip,
  LinksGrid,
  Tabs,
  UcBand,
  Orbit,
  Newsletter,
} from './Sections.jsx'
export { HeroWebAgent, HeroCustomAgents, HeroEnrichment, HeroHorizon, HeroRadar, HeroMcp } from './heroes.jsx'
export { PanelArt, TileArt, ChartArt, FunnelArt, WindowArt, OrbitArt, GlyphTile } from './art.jsx'
