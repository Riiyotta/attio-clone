import PageShell from '../../components/marketing/PageShell.jsx'
import { LegacyGrid2Q, LegacyGrid3, LinksGrid, PanelArt, PlatformCta, SectionDivider, SplitAccordionLegacy, Tabs, TileArt, ChartArt } from '../../components/platform/index.js'
import { HeroData } from '../../components/platform/legacy.jsx'
import { LINKS_HEAD, PLATFORM_LINKS } from './_links.js'

// /platform/data (CLONE_SPEC_PLATFORM T2 legacy). Invented copy sized to Appendix A counts.
const TIMING = { dur: 1000, pill: 100, title: 200, sub: 300, cta: 400 }

const HERO = {
  pill: 'Data model', // c10
  title: 'Shared truth, every desk.', // c24
  sub: 'The right answer is always in reach. People, agents and reports all read from one picture.', // c87
}
const f = (...a) => a
const ENTITIES = [
  { name: 'Partners', icon: 'users', custom: true, fields: f('Partner name', 'Partner tier', 'Region'), more: '12 more attributes' },
  { name: 'Invoices', icon: 'coin', custom: true, fields: f('Billing contact', 'Phone', 'Owner'), more: '10 more attributes' },
  { name: 'Companies', icon: 'building', fields: f('Company name', 'Industry'), more: '11 more attributes' },
  { name: 'Deals', icon: 'board', fields: f('Deal ID', 'Deal type'), more: '7 more attributes' },
  { name: 'People', icon: 'users', fields: f('Full name', 'Email'), more: '14 more attributes' },
]
const HERO_TABS = [
  { label: 'Marketplaces', icon: 'building' },
  { label: 'Self-serve growth', icon: 'trend' },
  { label: 'Assisted sales', icon: 'users' },
  { label: 'Sales', icon: 'board' },
]

const GRID2 = {
  lead: 'Quick to query, easy to reshape.', // c35 target
  cont: 'Model customers, partners and products with objects shaped like your company.', // c76
  cards: [
    { title: 'Fit any business model.', body: 'Funds, resellers, listings, or any object that only your company has.', media: <TileArt variant={0} /> },
    { title: 'Change things quickly.', body: 'Sort, filter and work with millions of records in an instant.', media: <TileArt variant={1} /> },
    { title: 'Shape it to your data.', body: 'Add the fields your process depends on, nothing more.', media: <TileArt variant={2} /> },
    { title: 'Link your objects.', body: 'Connect objects so your data becomes useful with a flexible graph model.', media: <TileArt variant={3} /> },
  ],
  quote: { text: '“At last our CRM bends to the way our company operates, instead of us bending to it every single day.”', name: 'Mara Quist', role: 'Head of Business Operations · Tidewell' },
}

const GRID3_ICON = {
  lead: 'Detail that refreshes itself.', // c27
  cont: 'Fresh customer detail appears on every record without anyone typing it in.', // c74
  cards: [
    { icon: 'tag', title: 'Your own attributes', body: 'Store, fill in and refresh whatever your process tracks.' },
    { icon: 'clock', title: 'History at a glance', body: 'Each email, meeting and edit in one running feed.' },
    { icon: 'board', title: 'Flexible views', body: 'From boards to tables, see data the way that suits you.' },
  ],
}

const GRID3 = {
  lead: 'Profiles that complete themselves.', // c42
  cont: 'Firmographics, people and news for every prospect, collected from public sources and reviewed by AI first.', // c104
  cards: [
    { title: 'Each record, filled in.', body: 'Revenue, location, headcount, company size and more.', media: <TileArt variant={4} /> },
    { title: 'Conversations beside the record.', body: 'Your team gets live context from each email, meeting and record.', media: <TileArt variant={5} /> },
    { title: 'Workflows that use your data.', body: 'Trigger routing, scoring and outreach from data your team has every reason to trust.', media: <TileArt variant={6} />, maskWell: true },
  ],
}

const SPLIT = {
  lead: 'Bring every source together.', // c24
  cont: 'Pipe in billing, product usage and support data so every team works from the same complete record.', // c100
  items: [
    { title: 'Warehouse sync.', desc: 'No silos. Bring your product, user and billing data in as it changes, through reverse sync and event pipes.', media: <PanelArt variant={0} /> },
    { title: 'Mail and calendar sync.', desc: 'Every thread and meeting lands on the right record.', media: <PanelArt variant={2} /> },
    { title: 'Outreach tools.', desc: 'Activity from the tools you send with appears beside each contact.', media: <PanelArt variant={1} /> },
  ],
}

const TABS = {
  lead: 'Reports that answer back.', // c32
  cont: 'Charts and tables that update on their own as deals, customers and usage change.', // c73
  more: 'Learn more',
  tabs: [
    { label: 'Sales pipeline', title: 'Sales pipeline', desc: 'Conversion by stage, forecast and cycle length in a single view.', media: <ChartArt variant={0} /> },
    { label: 'Revenue numbers', title: 'Revenue numbers', desc: 'New, expansion and churned revenue by month.', media: <ChartArt variant={1} /> },
    { label: 'Product growth', title: 'Product growth', desc: 'Signups, activation and usage on one board.', media: <ChartArt variant={2} /> },
  ],
}

export default function Data() {
  return (
    <PageShell title="Data model">
      <HeroData copy={HERO} timing={TIMING} entities={ENTITIES} tabs={HERO_TABS} />
      <SectionDivider />
      <LegacyGrid2Q {...GRID2} />
      <SectionDivider />
      <LegacyGrid3 {...GRID3_ICON} variant="icon" />
      <SectionDivider />
      <LegacyGrid3 {...GRID3} />
      <SectionDivider />
      <SplitAccordionLegacy {...SPLIT} />
      <SectionDivider />
      <Tabs {...TABS} />
      <SectionDivider />
      <LinksGrid variant="legacy" {...LINKS_HEAD} links={PLATFORM_LINKS} />
      <PlatformCta lines={['Revenue that runs', 'while you sleep.']} />
    </PageShell>
  )
}
