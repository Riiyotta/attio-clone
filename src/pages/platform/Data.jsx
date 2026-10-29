import PageShell from '../../components/marketing/PageShell.jsx'
import { LayoutArt } from '../../components/platform/layoutArt.jsx'
import { Icon } from '../../components/mock.jsx'
import { LegacyGrid2Q, LegacyGrid3, LinksGrid, PanelArt, PlatformCta, SectionDivider, SplitAccordionLegacy, Tabs, TileArt, ChartArt, FunnelArt } from '../../components/platform/index.js'
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
  { name: 'Partners', icon: 'users', glyph: 'peak', tone: 'green', custom: true, fields: f('Partner name', 'Partner tier', 'Region'), more: '12 more attributes' },
  { name: 'Invoices', icon: 'coin', glyph: 'ring', tone: 'amber', custom: true, fields: f('Billing contact', 'Phone', 'Owner'), more: '10 more attributes' },
  { name: 'Companies', icon: 'building', glyph: 'stack', tone: 'teal', fields: f('Company name', 'Industry'), more: '11 more attributes' },
  { name: 'Deals', icon: 'board', glyph: 'grid', tone: 'iris', fields: f('Deal ID', 'Deal type'), more: '7 more attributes' },
  { name: 'People', icon: 'users', glyph: 'orbit', tone: 'blue', fields: f('Full name', 'Email'), more: '14 more attributes' },
]
const HERO_TABS = [
  { label: 'Marketplaces', icon: 'building' },
  { label: 'Self-serve growth', icon: 'trend' },
  { label: 'Assisted sales', icon: 'users' },
  { label: 'Sales', icon: 'board' },
]

const GRID2 = {
  lead: 'Quick to query, easy to reshape.', // c35 target
  cont: 'Design the model your company actually runs on, with objects you add.', // line-fit 1.3.0: lines 606/592/227 (live 610/598/220)
  cards: [
    { title: 'Fit any business model.', body: 'Funds, resellers, listings, or any object that only your company has.', media: <LayoutArt box={[481, 289]} contained blocks={[{ k: 'card', x: 10, y: 62, w: 150, h: 160, pad: 'px-2.5 py-2', rows: 4, rowH: 30, seed: 6 }, { k: 'pill', x: 186, y: 112, w: 106, h: 24, text: 'One to many' }, { k: 'frame', x: 312, y: 60, w: 124, h: 196 }, { k: 'table', bare: true, header: false, x: 316, y: 66, w: 118, h: 186, rows: 7, rowH: 26, cols: ['co'] }]} /> },
    { title: 'Change things quickly.', body: 'Sort, filter and work with millions of records in an instant.', media: <LayoutArt box={[481, 289]} contained blocks={[{ k: 'frame', x: 88, y: 64, w: 300, h: 160 }, { k: 'row', x: 100, y: 88, w: 40, h: 16, text: 'Where', text_cls: 'text-[12px]' }, { k: 'pill', x: 172, y: 76, w: 70, h: 22, text: 'Stage', icon: 'filter' }, { k: 'pill', x: 252, y: 76, w: 34, h: 22, text: 'is' }, { k: 'pill', x: 298, y: 76, w: 72, h: 22, text: 'Pilot' }, { k: 'pill', x: 172, y: 104, w: 70, h: 22, text: 'Plan', icon: 'filter' }, { k: 'pill', x: 252, y: 104, w: 34, h: 22, text: 'is' }, { k: 'pill', x: 298, y: 104, w: 72, h: 22, text: 'Annual' }, { k: 'row', x: 100, y: 150, w: 40, h: 18, text: 'And', text_cls: 'text-[12px]' }, { k: 'pill', x: 172, y: 148, w: 60, h: 22, text: 'Seats' }, { k: 'pill', x: 246, y: 148, w: 30, h: 22, text: '>' }, { k: 'pill', x: 292, y: 148, w: 74, h: 22, text: '40 – 120' }, { k: 'row', x: 100, y: 196, w: 90, h: 18, icon: 'plus', text: 'Add rule', text_cls: 'text-[12px]' }, { k: 'row', x: 310, y: 196, w: 70, h: 18, text: 'Clear', text_cls: 'text-[12px]' }]} /> },
    { title: 'Shape it to your data.', body: 'Add the fields your process depends on, nothing more.', media: <LayoutArt box={[481, 289]} contained blocks={[{ k: 'frame', x: 84, y: 48, w: 314, h: 222 }, { k: 'row', x: 94, y: 56, w: 120, h: 16, text: 'New field', text_cls: 'text-[12px] font-semibold' }, { k: 'row', x: 94, y: 76, w: 120, h: 14, text: 'Field type', text_cls: 'text-[11px]' }, { k: 'frame', x: 92, y: 92, w: 296, h: 46, cls: 'border-blue-450 bg-white-100' }, { k: 'row', x: 104, y: 104, w: 140, h: 22, icon: 'note', text: 'Short text' }, { k: 'row', x: 106, y: 150, w: 120, h: 22, icon: 'check', text: 'Yes / no' }, { k: 'row', x: 106, y: 178, w: 120, h: 22, icon: 'hash', text: 'Amount' }, { k: 'row', x: 106, y: 206, w: 120, h: 22, icon: 'calendar', text: 'Day' }]} /> },
    { title: 'Link your objects.', body: 'Connect objects so your data becomes useful with a flexible graph model.', media: <LayoutArt box={[481, 289]} contained blocks={[{ k: 'card', x: 9, y: 92, w: 186, h: 136, pad: 'px-2.5 py-2', title: 'Accounts', co: true, rows: 3, rowH: 26, seed: 1 }, { k: 'fill', x: 195, y: 160, w: 85, h: 1, cls: 'border-t border-dashed border-white-700' }, { k: 'card', x: 280, y: 64, w: 186, h: 88, pad: 'px-2.5 py-2', title: 'Orders', co: true, rows: 1, rowH: 26, seed: 3 }, { k: 'card', x: 280, y: 170, w: 186, h: 76, pad: 'px-2.5 py-2', title: 'Owners', co: true, rows: 1, rowH: 24, seed: 4 }]} /> },
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
  lead: 'Self-completing profiles, self-updating data.', // line-fit 1.3.0: live lead 639px, cont 3 lines
  cont: 'Firmographics, people and news for every prospect, collected from public sources and reviewed by AI first.',
  cards: [
    { title: 'Each record, filled in.', body: 'Revenue, location, headcount, company size and more.', media: <LayoutArt box={[321, 321]} contained blocks={[{ k: 'frame', x: 14, y: 78, w: 292, h: 184 }, { k: 'fill', x: 20, y: 156, w: 280, h: 34, cls: 'rounded-8 bg-white-300' }, { k: 'row', x: 29, y: 92, w: 200, h: 22, icon: 'users', text: 'Full name' }, { k: 'node', x: 278, y: 94, w: 16, h: 16, node: <span className="flex size-full items-center justify-center text-blue-500"><Icon name="sparkle" size={12} /></span> }, { k: 'row', x: 29, y: 127, w: 200, h: 22, icon: 'mail', text: 'Work email' }, { k: 'node', x: 278, y: 129, w: 16, h: 16, node: <span className="flex size-full items-center justify-center text-blue-500"><Icon name="sparkle" size={12} /></span> }, { k: 'row', x: 29, y: 161, w: 200, h: 22, icon: 'note', text: 'Summary' }, { k: 'node', x: 278, y: 163, w: 16, h: 16, node: <span className="flex size-full items-center justify-center text-blue-500"><Icon name="sparkle" size={12} /></span> }, { k: 'row', x: 29, y: 196, w: 200, h: 22, icon: 'pin', text: 'Head office' }, { k: 'node', x: 278, y: 198, w: 16, h: 16, node: <span className="flex size-full items-center justify-center text-blue-500"><Icon name="sparkle" size={12} /></span> }, { k: 'row', x: 29, y: 231, w: 200, h: 22, icon: 'tag', text: 'Role' }, { k: 'node', x: 278, y: 233, w: 16, h: 16, node: <span className="flex size-full items-center justify-center text-blue-500"><Icon name="sparkle" size={12} /></span> }]} /> },
    { title: 'Conversations beside the record.', body: 'Your team sees live account context from each email, meeting, record and call.', media: <LayoutArt box={[321, 321]} contained blocks={[{ k: 'row', x: 13, y: 70, w: 230, h: 22, icon: 'calendar', avatar: 16, text: 'Robin Hale booked a renewal call', seed: 10 }, { k: 'row', x: 243, y: 72, w: 50, h: 18, text: '2h ago', text_cls: 'text-[11px]' }, { k: 'card', x: 40, y: 96, w: 260, h: 60, pad: 'px-2.5 py-1.5', lines: 2, lineH: 18, seed: 2 }, { k: 'row', x: 43, y: 168, w: 110, h: 16, text: 'Show 3 more', text_cls: 'text-[11px]' }, { k: 'row', x: 12, y: 195, w: 230, h: 22, icon: 'mail', avatar: 16, text: 'Sam Okafor replied in 4 mins', seed: 3 }, { k: 'row', x: 251, y: 197, w: 50, h: 18, text: '4h ago', text_cls: 'text-[11px]' }, { k: 'row', x: 43, y: 222, w: 90, h: 16, text: 'Show reply', text_cls: 'text-[11px]' }]} /> },
    { title: 'Workflows that use your data.', body: 'Trigger routing, scoring and outreach from records your team has every reason to trust.', media: <LayoutArt box={[321, 321]} contained blocks={[{ k: 'pill', x: 196, y: 52, w: 100, h: 22, text: 'Finished', icon: 'check' }, { k: 'card', x: 103, y: 76, w: 198, h: 58, pad: 'px-2.5 py-1.5', title: 'Notify owner', icon: 'send', lines: 1, lineH: 18, seed: 4 }, { k: 'fill', x: 200, y: 134, w: 1, h: 40, cls: 'bg-blue-450' }, { k: 'pill', x: 18, y: 186, w: 64, h: 22, text: 'Branch', icon: 'flow' }, { k: 'card', x: 18, y: 214, w: 140, h: 54, pad: 'px-2 py-1.5', lines: 2, lineH: 17, seed: 5 }, { k: 'card', x: 168, y: 214, w: 140, h: 54, pad: 'px-2 py-1.5', lines: 2, lineH: 17, seed: 6 }]} />, maskWell: true },
  ],
}

const SPLIT = {
  lead: 'Join up your data sources.', // line-fit 1.3.0: 4 lines like live (423/418/455/340)
  cont: 'Use all of your company, client and product records to sharpen what your GTM team does.',
  items: [
    { title: 'Warehouse sync.', desc: 'No silos. Bring your product, user and billing data in as it changes, through reverse sync and event pipes.', media: <LayoutArt box={[647, 490]} blocks={[{ k: 'fill', x: 230, y: 20, w: 1, h: 440, cls: 'border-l border-dashed border-white-700' }, { k: 'fill', x: 230, y: 120, w: 106, h: 1, cls: 'border-t border-dashed border-white-700' }, { k: 'fill', x: 230, y: 330, w: 106, h: 1, cls: 'border-t border-dashed border-white-700' }, { k: 'card', x: 336, y: 40, w: 213, h: 135, pad: 'px-3 py-2', title: 'Lakehouse', co: true, rows: 2, rowH: 26, value: 'chip', seed: 2 }, { k: 'card', x: 94, y: 203, w: 215, h: 72, pad: 'px-3 py-2', title: 'Workspace', co: true, lines: 1, lineH: 18, seed: 5 }, { k: 'card', x: 336, y: 265, w: 213, h: 180, pad: 'px-3 py-2', title: 'Event stream', co: true, rows: 4, rowH: 26, seed: 7 }]} /> },
    { title: 'Mail and calendar sync.', desc: 'Every thread and meeting lands on the right record.', media: <PanelArt variant={2} /> },
    { title: 'Sequencing tools.', desc: 'Activity from the tools you send with appears beside each contact.', media: <PanelArt variant={1} /> },
  ],
}

const TABS = {
  lead: 'From records to answers, quickly.', // line-fit 1.3.0: live lead 463px / cont 109+588+221px at 1440
  cont: 'Find the signal early with reports that follow how your company runs.',
  block: false,
  more: 'Learn more',
  tabs: [
    { label: 'Sales pipeline', title: 'Sales pipeline', desc: 'Conversion by stage, forecast and cycle length in a single view.', media: <FunnelArt /> },
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
