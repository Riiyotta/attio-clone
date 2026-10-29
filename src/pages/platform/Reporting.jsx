import { LineChartArt, PieArt } from '../../components/platform/tiles.jsx'
import PageShell from '../../components/marketing/PageShell.jsx'
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
    { title: 'Slice it however you like.', body: 'Group by any attribute and drill into the records behind each bar.', media: <ChartArt variant={0} /> },
    { title: 'A chart type for each need.', body: 'Where deals stall, who is closing and how fast the pipeline moves each week.', media: <ChartArt variant={1} /> },
    { title: 'Everyone sees the same view.', body: 'Share a dashboard with the team and it stays live.', media: <ChartArt variant={2} /> },
    { title: 'Retire the weekly slide deck.', body: 'A live board your leaders can open whenever they like.', media: <ChartArt variant={3} /> },
  ],
}

const SPLIT = {
  lead: 'Open any figure.', // c16 w3
  cont: 'See what moved it and the records behind it.', // c46 w10 target
  items: [
    { title: 'Drill into the records.', desc: 'Click any bar or line and see the exact deals and companies behind it.', media: <PanelArt variant={3} /> },
    { title: 'Compare across periods.', desc: 'Line up this quarter against the last one and spot the shift at a glance.', media: <PanelArt variant={5} /> },
    { title: 'Ask follow-up questions.', desc: 'Type a question about the chart and get an answer grounded in your data.', media: <PanelArt variant={2} /> },
  ],
}

const GRID6 = {
  lead: 'The arithmetic is handled.', // c20 w4 target
  cont: 'Totals, ratios and scores are worked out for you, kept current, and always one click from the records that feed them.', // c103 w15 target
  cards: [
    { title: 'New teams each day', body: 'Fresh accounts as they arrive, day by day.', media: <LineChartArt title="Teams created" /> },
    { title: 'Revenue by plan', body: 'Which tiers bring in the most, at a glance.', media: <PieArt /> },
    { title: 'Seats in use', body: 'How many people log in per account, over time.', media: <LineChartArt title="Seats in use" area /> },
    { title: 'Monthly recurring revenue', body: 'One figure for where recurring revenue sits.', media: <TileArt variant={7} /> },
    { title: 'Customer acquisition cost', body: 'Spend per new account, broken out by channel and by quarter.', media: <TileArt variant={0} /> },
    { title: 'Lead source distribution', body: 'The changing blend of paid and organic signups.', media: <TileArt variant={8} /> },
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
