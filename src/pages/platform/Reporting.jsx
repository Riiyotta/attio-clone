import { LineChartArt, PieArt } from '../../components/platform/tiles.jsx'
import PageShell from '../../components/marketing/PageShell.jsx'
import { LayoutArt } from '../../components/platform/layoutArt.jsx'
import CustomerLogos from '../../components/CustomerLogos.jsx'
import {
  Bento,
  BlockDivider,
  ChartArt,
  HeroRadar,
  MediaGrid3,
  PanelArt,
  PlatformCta,
  SectionDivider,
  SplitAccordion,
  TileArt,
} from '../../components/platform/index.js'

// /platform/reporting (CLONE_SPEC_PLATFORM T1 + legacy-style bento header). Invented copy.
const TIMING = { dur: 1000, pill: 700, title: 800, sub: 900, cta: 1000 } // M-P1

const HERO = {
  pill: 'Analytics', // c9
  title: 'The real story behind each figure.', // c35 w6 target (2L)
  sub: 'Forecasts you can rely on, pipeline health that keeps itself current, and answers only Corvale can give.', // c98 w15 target
}

const BENTO = {
  lead: 'Reports built for revenue teams.', // c31 w5 target
  cont: 'Numbers that are ready when you open them.', // c40 w8
  cards: [
    { title: 'Slice it however you like.', body: 'Group by any attribute and drill into the records behind each bar.', media: <LayoutArt box={[804, 316]} blocks={[{ k: 'regions', x: 92, y: 45, w: 470, h: 230, paleFrom: 0.62 }, { k: 'card', x: 430, y: 112, w: 280, h: 86, pad: 'px-3 py-2', rows: 3, rowH: 23, seed: 2 }]} /> },
    { title: 'A chart type for each need.', body: 'Where deals stall, who is closing and how fast the pipeline moves each week.', media: <LayoutArt box={[457, 316]} blocks={[{ k: 'area', x: 32, y: 84, w: 94, h: 155, vals: [0.1, 0.3, 0.25, 0.5, 0.45, 0.8, 0.95] }, { k: 'frame', x: 154, y: 22, w: 150, h: 172 }, { k: 'row', x: 166, y: 30, w: 120, h: 22, text: 'Won by region', text_cls: 'text-[12px] font-semibold' }, { k: 'donut', x: 183, y: 69, w: 97, h: 100 }, { k: 'card', x: 317, y: 55, w: 128, h: 114, pad: 'px-3 py-2', title: '$14,280', icon: 'coin', lines: 2, lineH: 18, seed: 3 }, { k: 'card', x: 154, y: 204, w: 234, h: 65, pad: 'px-3 py-2', title: 'Stage mix', icon: 'chart', rows: 1, rowH: 22, seed: 5 }]} /> },
    { title: 'Everyone sees the same view.', body: 'Share a dashboard with the team and it stays live.', media: <LayoutArt box={[457, 316]} blocks={[{ k: 'row', x: 43, y: 36, w: 140, h: 20, icon: 'chart', text: 'Active teams', text_cls: 'text-[13px] font-semibold' }, { k: 'pill', x: 214, y: 34, w: 76, h: 22, text: 'Weekly' }, { k: 'row', x: 43, y: 60, w: 90, h: 16, text: 'Teams · Seats', text_cls: 'text-[11px]' }, { k: 'area', x: 43, y: 89, w: 338, h: 179, vals: [0.42, 0.5, 0.56, 0.6, 0.72, 0.76, 0.78, 0.82, 0.86, 0.9], second: [0.18, 0.24, 0.3, 0.42, 0.45, 0.52, 0.6, 0.66, 0.72, 0.8] }, { k: 'avatar', x: 222, y: 216, w: 40, h: 40, seed: 1 }, { k: 'avatar', x: 256, y: 216, w: 40, h: 40, seed: 2 }, { k: 'avatar', x: 290, y: 216, w: 40, h: 40, seed: 4 }, { k: 'pill', x: 326, y: 220, w: 40, h: 32, text: '+3', round: 'rounded-full' }]} /> },
    { title: 'Retire the weekly slide deck.', body: 'A live board your leaders can open whenever they like.', media: <LayoutArt box={[804, 316]} blocks={[{ k: 'frame', x: 22, y: 16, w: 760, h: 300 }, { k: 'row', x: 38, y: 27, w: 140, h: 20, glyph: true, text: 'Northwind', text_cls: 'text-[13px] font-semibold' }, { k: 'row', x: 181, y: 27, w: 200, h: 20, icon: 'chart', text: 'Reports / Growth board' }, { k: 'pill', x: 649, y: 26, w: 110, h: 22, text: 'Share view', icon: 'link' }, { k: 'row', x: 181, y: 52, w: 200, h: 18, text: 'Overview · Pipeline · Retention', text_cls: 'text-[11px]' }, { k: 'table', bare: true, header: false, x: 34, y: 80, w: 110, h: 222, rows: 8, rowH: 27, cols: ['label'], seed: 1 }, { k: 'donut', x: 206, y: 104, w: 171, h: 171, thick: 34, tones: ['#c8dcff', '#94b9ff', '#e8f0ff', '#709ff5'] }, { k: 'bars', x: 482, y: 124, w: 115, h: 169, vals: [0.35, 0.55, 0.8, 0.45, 0.62], hi: 2, gap: 'gap-4' }, { k: 'bars', x: 636, y: 92, w: 122, h: 206, vals: [0.25, 0.5, 0.42, 0.7, 1], tone: 'bg-art-iris/50', gap: 'gap-4' }]} /> },
  ],
}

const SPLIT = {
  lead: 'Open any figure.', // c16 w3
  cont: 'See what moved it and the records behind it.', // c46 w10 target
  items: [
    { title: 'Drill into the records.', desc: 'Click any bar or line and see the exact deals and companies behind it.', media: <LayoutArt box={[695, 639]} blocks={[{ k: 'fill', x: 190, y: 178, w: 330, h: 1, cls: 'bg-white-500' }, { k: 'row', x: 148, y: 170, w: 40, h: 16, text: '400k', text_cls: 'text-[11px]' }, { k: 'fill', x: 190, y: 258, w: 330, h: 1, cls: 'bg-white-500' }, { k: 'row', x: 148, y: 250, w: 40, h: 16, text: '300k', text_cls: 'text-[11px]' }, { k: 'fill', x: 190, y: 335, w: 330, h: 1, cls: 'bg-white-500' }, { k: 'row', x: 148, y: 327, w: 40, h: 16, text: '200k', text_cls: 'text-[11px]' }, { k: 'fill', x: 190, y: 415, w: 330, h: 1, cls: 'bg-white-500' }, { k: 'row', x: 148, y: 407, w: 40, h: 16, text: '100k', text_cls: 'text-[11px]' }, { k: 'fill', x: 245, y: 270, w: 27, h: 217, cls: 'rounded-t-6 bg-blue-500' }, { k: 'fill', x: 350, y: 327, w: 27, h: 160, cls: 'rounded-t-6 bg-blue-500' }, { k: 'fill', x: 455, y: 185, w: 27, h: 302, cls: 'rounded-t-6 bg-blue-500' }, { k: 'fill', x: 277, y: 140, w: 28, h: 347, cls: 'rounded-t-6 border border-dashed border-blue-500 bg-blue-200' }, { k: 'fill', x: 382, y: 245, w: 28, h: 242, cls: 'rounded-t-6 border border-dashed border-blue-500 bg-blue-200' }, { k: 'fill', x: 487, y: 245, w: 28, h: 242, cls: 'rounded-t-6 border border-dashed border-blue-500 bg-blue-200' }, { k: 'row', x: 268, y: 510, w: 40, h: 18, text: 'Apr', text_cls: 'text-[12px]' }, { k: 'row', x: 371, y: 510, w: 40, h: 18, text: 'May', text_cls: 'text-[12px]' }, { k: 'row', x: 470, y: 510, w: 40, h: 18, text: 'Jun', text_cls: 'text-[12px]' }, { k: 'card', x: 125, y: 177, w: 235, h: 125, pad: 'px-3 py-2', title: 'Net revenue +12%', icon: 'trend', lines: 4, lineH: 18, seed: 2 }]} /> },
    { title: 'Compare across periods.', desc: 'Line up this quarter against the last one and spot the shift at a glance.', media: <PanelArt variant={5} /> },
    { title: 'Ask follow-up questions.', desc: 'Type a question about the chart and get an answer grounded in your data.', media: <PanelArt variant={2} /> },
  ],
}

const GRID6 = {
  lead: 'The arithmetic is handled.', // c20 w4 target
  cont: 'Totals, ratios and scores are worked out for you, kept current, and always one click from the records that feed them.', // c103 w15 target
  cards: [
    { title: 'New teams each day', body: 'Fresh accounts as they arrive, day by day.', media: <LayoutArt box={[398, 315]} contained blocks={[{ k: 'frame', x: 40, y: 72, w: 314, h: 172 }, { k: 'row', x: 49, y: 81, w: 130, h: 18, text: 'Teams created', text_cls: 'text-[12px] font-semibold' }, { k: 'pill', x: 262, y: 79, w: 84, h: 20, text: 'Daily' }, { k: 'table', bare: true, header: false, x: 40, y: 118, w: 30, h: 100, rows: 3, rowH: 33, cols: ['date'] }, { k: 'area', x: 72, y: 120, w: 274, h: 92, fill: '#ffffff', vals: [0.1, 0.18, 0.12, 0.35, 0.9, 0.55, 0.3, 0.25, 0.4, 0.2] }, { k: 'card', x: 160, y: 132, w: 100, h: 44, pad: 'px-2 py-1', lines: 2, lineH: 16, seed: 3 }, { k: 'row', x: 72, y: 220, w: 274, h: 16, text: 'Jan  Feb  Mar  Apr  May  Jun  Jul', text_cls: 'text-[11px]' }]} /> },
    { title: 'Revenue by plan', body: 'Which tiers bring in the most, at a glance.', media: <LayoutArt box={[398, 315]} contained blocks={[{ k: 'frame', x: 47, y: 80, w: 307, h: 156 }, { k: 'table', bare: true, header: false, x: 50, y: 116, w: 60, h: 66, rows: 3, rowH: 22, cols: ['label'] }, { k: 'donut', x: 128, y: 92, w: 132, h: 132, thick: 50, tones: ['#266df0', '#709ff5', '#c8dcff', '#94b9ff'] }, { k: 'card', x: 232, y: 128, w: 100, h: 64, pad: 'px-2 py-1.5', title: 'Pro', icon: 'coin', lines: 2, lineH: 16, seed: 5 }]} /> },
    { title: 'Seats in use', body: 'How many people log in per account, over time.', media: <LayoutArt box={[398, 315]} contained blocks={[{ k: 'frame', x: 46, y: 80, w: 305, h: 160 }, { k: 'row', x: 60, y: 92, w: 170, h: 18, text: 'Average seats per team', text_cls: 'text-[12px] font-semibold' }, { k: 'pill', x: 262, y: 90, w: 80, h: 20, text: 'Teams' }, { k: 'row', x: 60, y: 114, w: 120, h: 14, text: 'EU · US', text_cls: 'text-[10px]' }, { k: 'area', x: 80, y: 130, w: 257, h: 72, fill: '#e8f0ff', vals: [0.4, 0.45, 0.38, 0.5, 0.48, 0.55, 0.6, 0.58, 0.66, 0.7], second: [0.2, 0.22, 0.25, 0.24, 0.3, 0.32, 0.3, 0.36, 0.38, 0.42] }, { k: 'table', bare: true, header: false, x: 50, y: 128, w: 30, h: 76, rows: 3, rowH: 25, cols: ['date'] }, { k: 'row', x: 140, y: 208, w: 180, h: 16, text: 'Teams   Users   Active', text_cls: 'text-[11px]' }]} /> },
    { title: 'Monthly recurring revenue', body: 'One figure for where recurring revenue sits.', media: <LayoutArt box={[398, 315]} contained blocks={[{ k: 'frame', x: 20, y: 52, w: 358, h: 212, cls: 'bg-white-200' }, { k: 'row', x: 172, y: 104, w: 70, h: 18, icon: 'dots', text: 'Total', text_cls: 'text-[12px]' }, { k: 'node', x: 70, y: 136, w: 260, h: 42, node: <span className="flex h-full items-center justify-center font-display text-[34px] font-semibold tabular-nums text-black-100">$248,630.00</span> }, { k: 'node', x: 120, y: 190, w: 160, h: 18, node: <span className="flex h-full items-center justify-center text-[12px] text-black-600">Revenue · Monthly sum</span> }]} /> },
    { title: 'Customer acquisition cost', body: 'Spend per new account, broken out by channel and by quarter.', media: <LayoutArt box={[398, 315]} contained blocks={[{ k: 'frame', x: -60, y: 92, w: 100, h: 140, cls: 'bg-white-200' }, { k: 'frame', x: 360, y: 92, w: 100, h: 140, cls: 'bg-white-200' }, { k: 'frame', x: 100, y: 90, w: 198, h: 135 }, { k: 'row', x: 112, y: 102, w: 170, h: 16, text: 'Spend · Signups', text_cls: 'text-[11px]' }, { k: 'bars', x: 112, y: 132, w: 76, h: 42, vals: [0.3, 0.45, 0.4, 0.6, 0.55, 0.8, 0.9, 1], gap: 'gap-0.5' }, { k: 'row', x: 196, y: 140, w: 90, h: 30, text: '9.8%', text_cls: 'text-[20px] font-semibold' }, { k: 'row', x: 112, y: 188, w: 170, h: 30, text: 'Cost per signup', text_cls: 'text-[13px] font-semibold' }, { k: 'bars', x: 6, y: 136, w: 30, h: 38, vals: [0.5, 0.8, 0.6], gap: 'gap-0.5' }, { k: 'bars', x: 366, y: 136, w: 30, h: 38, vals: [0.7, 0.4, 0.9], gap: 'gap-0.5' }]} /> },
    { title: 'Lead source distribution', body: 'The changing blend of paid and organic signups.', media: <LayoutArt box={[398, 315]} contained blocks={[{ k: 'frame', x: 40, y: 80, w: 318, h: 160 }, { k: 'row', x: 48, y: 90, w: 150, h: 18, text: 'Signups by source', text_cls: 'text-[12px] font-semibold' }, { k: 'pill', x: 268, y: 88, w: 80, h: 20, text: 'Monthly' }, { k: 'row', x: 48, y: 114, w: 110, h: 16, text: 'Paid · Organic', text_cls: 'text-[11px]' }, { k: 'bars', x: 70, y: 141, w: 278, h: 72, vals: [0.2, 0.35, 0.25, 0.5, 0.3, 0.62, 0.45, 0.8, 0.55, 0.9, 0.7, 1], gap: 'gap-1.5' }, { k: 'table', bare: true, header: false, x: 40, y: 136, w: 34, h: 80, rows: 4, rowH: 20, cols: ['date'] }]} /> },
  ],
}

export default function Reporting() {
  return (
    <PageShell title="Analytics">
      <HeroRadar copy={HERO} timing={TIMING} />
      <SectionDivider />
      <CustomerLogos platform />
      <SectionDivider />
      <Bento {...BENTO} />
      <BlockDivider />
      <SplitAccordion {...SPLIT} />
      <BlockDivider />
      <MediaGrid3 {...GRID6} />
      <BlockDivider />
      <PlatformCta lines={['Revenue that runs', 'while you sleep.']} />
    </PageShell>
  )
}
