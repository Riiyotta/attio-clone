import { AttributeListArt, RecordCardArt } from '../../components/platform/tiles.jsx'
import { QuestionBuilderArt } from '../../components/platform/windows.jsx'
import PageShell from '../../components/marketing/PageShell.jsx'
import { LayoutArt } from '../../components/platform/layoutArt.jsx'
import {
  BlockDivider,
  CenterMedia,
  HeroEnrichment,
  LinksGrid,
  MediaGrid3,
  PanelArt,
  PlatformCta,
  ScrollQuote,
  SectionDivider,
  SplitAccordion,
  TextColumns,
  TileArt,
  WindowArt,
} from '../../components/platform/index.js'

// /platform/enrichment (CLONE_SPEC_PLATFORM T1). Invented copy sized to Appendix A counts.
const TIMING = { dur: 1000, pill: 100, title: 200, sub: 300, cta: 400 } // M-P1

const HERO = {
  pill: 'Auto-enrich', // line-fit 1.3.0 (live pill 69px, title 773px at 1440)
  title: 'Every profile, filled in on arrival.',
  sub: 'Titles, firmographics, warm paths and recent news, gathered quietly before anyone opens it.', // c87
}
const f = (loc, rev, emp, round) => [
  ['pin', loc],
  ['coin', rev],
  ['users', emp],
  ['trend', round],
]
const COLUMNS = [
  {
    label: 'New leads',
    cards: [
      { name: 'Larkspur', fields: f('Denver, CO', '$6M revenue', '48 employees', '$9M Series A'), age: '2d' },
      { name: 'Fernhollow', fields: f('Leeds, UK', '$3.1M revenue', '22 employees', '$4M Seed'), age: '6d' },
    ],
  },
  {
    label: 'Qualifying',
    cards: [
      { name: 'Oakhaven', fields: f('Bristol, UK', '$2.6M revenue', '19 employees', '$5M Seed'), age: '1d' },
      { name: 'Meridel', fields: f('Lyon, FR', '$14M revenue', '90 employees', '$20M Series B'), age: '4d' },
    ],
  },
  {
    label: 'Contacted',
    cards: [
      { name: 'Quillstone', fields: f('Austin, TX', '$21M revenue', '140 employees', '$38M Series B'), age: '3h' },
      { name: 'Saltmarsh', fields: f('Perth, AU', '$17M revenue', '75 employees', '$11M Series A'), age: '2h' },
    ],
  },
  {
    label: 'Won',
    cards: [
      { name: 'Brackenfield', fields: f('Oslo, NO', '$9M revenue', '61 employees', '$12M Series A'), age: '5d' },
      { name: 'Wrenford', fields: f('Toronto, CA', '$26M revenue', '210 employees', '$40M Series C'), age: '9d' },
    ],
  },
]

const GRID = {
  lead: 'Filled in on arrival.', // c21 w4 target
  cont: 'Corvale checks each person and company you add against public sources, then fills in what your team needs.', // c106 w18
  cards: [
    { title: 'Kept fresh.', body: 'When a company raises, hires or moves, the record changes with it, no import needed.', media: <AttributeListArt /> },
    { title: 'Complete company data.', body: 'Location, headcount, revenue, funding and industry, ready on the record the moment it appears.', media: <RecordCardArt /> },
    { title: 'People, linked up.', body: 'Name, job title, seniority and links for each person, kept tidy as they change roles.', media: <RecordCardArt person /> },
  ],
}

const SPLIT = {
  lead: 'Data that stays true over time.', // c31 w5 target
  cont: 'Records refresh on their own, so every number stays current.', // c73 w10 target
  items: [
    { title: 'Refreshed on a schedule.', desc: 'Every record is checked again on a regular cadence, with no one lifting a finger.', media: <LayoutArt box={[695, 639]} blocks={[{ k: 'table', x: 128, y: 128, w: 456, h: 390, headH: 28, rowH: 27, rows: 12, cols: ['person', 'chip', 'chips'], widths: [166, 157, 133] }]} /> },
    { title: 'Changes flagged for you.', desc: 'When a key attribute moves, the owner gets a short note listing what changed, when it changed, and which source reported it first.', media: <PanelArt variant={3} /> },
    { title: 'Sources always visible.', desc: 'Every value links back to where it came from, so you can trust what you see.', media: <PanelArt variant={2} /> },
  ],
}

const CENTER = {
  lead: 'Add your own spin to it.', // c24 w6 target
  cont: 'Write a question once and Web Scout fills in a reply on every record.', // line-fit 1.3.0: 2nd line 786px (live 791)
}

const QUOTE = {
  text: '“The enrichment in Corvale made it easy to spot promising accounts early, so our team spends its time on the conversations that matter.”', // c~140 w19 target
  name: 'Priya Holloway', // c13 target
  role: 'Head of Revenue Operations, Larkspur', // c32 target
}

const COLUMNS4 = {
  lead: 'Enriched data that does the work.', // c32 w6 target
  cont: 'Every detail is sharp and searchable, ready to power routing, lists, workflows and reports across the workspace.', // c100 w16 target
  items: [
    { title: 'Assign on arrival.', body: 'Hand each account to the right owner the moment it lands.' },
    { title: 'Self-updating lists.', body: 'Filter on filled-in fields and the list keeps itself tidy.' },
    { title: 'Trigger on signals.', body: 'Start an email cadence the day funding or headcount moves.' },
    { title: 'Report on what is real.', body: 'Slice the pipeline by industry, size or region with confidence.' },
  ],
}

const LINKS = {
  lead: 'Every tool, one click away.', // c29 w6 target
  cont: 'Work your way, from first lead to renewal.', // c41 w7
  links: [
    { label: 'Web Scout', to: '/platform/web-agent' },
    { label: 'Agent Builder', to: '/platform/custom-agents' },
    { label: 'Unified Knowledge', to: '/platform/universal-context' },
    { label: 'Hub', to: '/platform/mcp' },
    { label: 'Analytics', to: '/platform/reporting' },
    { label: 'Workflows' },
    { label: 'Sequences' },
    { label: 'Data model' },
  ],
}

export default function Enrichment() {
  return (
    <PageShell title="Autofiller">
      <HeroEnrichment copy={HERO} columns={COLUMNS} timing={TIMING} />
      <SectionDivider />
      <MediaGrid3 {...GRID} />
      <BlockDivider />
      <SplitAccordion {...SPLIT} />
      <CenterMedia variant="centered" {...CENTER} media={<QuestionBuilderArt />} />
      <BlockDivider />
      <ScrollQuote variant="v2" {...QUOTE} />
      <BlockDivider />
      <TextColumns {...COLUMNS4} />
      <BlockDivider />
      <LinksGrid variant="v2" {...LINKS} />
      <PlatformCta lines="Put your whole CRM to work." />
    </PageShell>
  )
}
