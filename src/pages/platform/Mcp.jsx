import { GroupListArt, RecordCardArt, RingChipsArt } from '../../components/platform/tiles.jsx'
import { ChatWindowArt } from '../../components/platform/windows.jsx'
import PageShell from '../../components/marketing/PageShell.jsx'
import { LayoutArt } from '../../components/platform/layoutArt.jsx'
import CustomerLogos from '../../components/CustomerLogos.jsx'
import {
  BlockDivider,
  CenterMedia,
  HeroMcp,
  IntegrationStrip,
  MediaGrid3,
  Newsletter,
  PlatformCta,
  SectionDivider,
  SplitIcons,
  Stat,
  TextColumns,
  TileArt,
  WindowArt,
} from '../../components/platform/index.js'

// /platform/mcp (CLONE_SPEC_PLATFORM T1). Invented copy sized to Appendix A counts.
const TIMING = { dur: 1000, pill: 100, title: 200, sub: 300, cta: 400 } // M-P1

const HERO = {
  pill: 'Hub', // c3
  title: 'Ask from anywhere. Act on it all.', // line-fit 1.3.0 (782px, live 772px)
  sub: 'Corvale connects to the assistants your team opens daily.', // c58
}
const PROMPTS = ['Find my notes on the Pinecrest deal', 'List renewals due in the next month', 'Add a task to follow up on Friday']

const STRIP = {
  title: 'In the tools you use.', // line-fit 1.3.0 (live 205px / 525px)
  sub: 'Every assistant and agent that speaks the open protocol.',
  tiles: ['sparkle', 'at', 'globe', 'terminal', 'bolt', 'send'],
}

const SPLIT_ICONS = {
  lead: 'Context travels with each request.', // c33 w6 target
  cont: 'Full workspace context in each reply.', // c47 w8 target
  items: [
    { icon: 'sparkle', title: 'Plain words work.', body: 'No views to set up and no filters to learn. Just ask, and records come back in the reply.' },
    { icon: 'list', title: 'Full workspace reach.', body: 'Search, create and update any record from the chat you have open.' },
    { icon: 'settings', title: 'Secure by default.', body: 'Sign in with your account, and access follows your permissions.' },
  ],
}

const CENTER = {
  lead: 'Your CRM inside any assistant.', // c30 w5 target
  cont: 'Search records, log calls and update deals without switching tabs.', // c58 w9 target
}

const GRID = {
  lead: 'More possible than you would think.', // line-fit 1.3.0 (live 3 lines: lead+79 / 732 / 74)
  cont: 'Your assistant can look up records and edit them when you say yes.',
  cards: [
    { title: 'Edit a deal.', body: '“Move the Halcyon deal to the proposal stage.”', media: <RecordCardArt /> },
    { title: 'Find a call.', body: '“Find calls where pricing came up last month.”', media: <LayoutArt box={[416, 329]} blocks={[{ k: 'row', x: 82, y: 70, w: 100, h: 20, text: 'This week', text_cls: 'text-[12px] !text-black-600' }, { k: 'pill', x: 149, y: 71, w: 18, h: 17, text: '1', round: 'rounded-4 !px-1' }, { k: 'row', x: 85, y: 108, w: 260, h: 24, icon: 'video', text: 'Halcyon // Northwind: renewal sync', text_cls: 'text-[15px]' }, { k: 'row', x: 82, y: 157, w: 100, h: 20, text: 'This month', text_cls: 'text-[12px] !text-black-600' }, { k: 'pill', x: 156, y: 158, w: 18, h: 17, text: '2', round: 'rounded-4 !px-1' }, { k: 'row', x: 85, y: 195, w: 260, h: 24, icon: 'video', text: 'Ines Varga and Theo Laurent intro', text_cls: 'text-[15px]' }, { k: 'row', x: 85, y: 235, w: 260, h: 24, icon: 'video', text: 'Kettle pricing feedback session', text_cls: 'text-[15px]' }]} /> },
    { title: 'Add tasks.', body: '“Remind me to send the contract on Friday.”', media: <LayoutArt box={[416, 329]} blocks={[{ k: 'frame', x: 58, y: 23, w: 270, h: 270, cls: 'rounded-full border-white-600 bg-transparent' }, { k: 'frame', x: 123, y: 88, w: 140, h: 140, cls: 'rounded-full border-dashed border-white-700 bg-transparent' }, { k: 'frame', x: 168, y: 133, w: 50, h: 50, cls: 'rounded-full border-white-600 bg-white-200' }, { k: 'pill', x: 193, y: 43, w: 140, h: 22, text: 'Add Nadia to the demo', round: 'rounded-6 !bg-traffic-yellow/20 !border-traffic-yellow/40' }, { k: 'pill', x: 33, y: 90, w: 75, h: 22, text: 'Move deal', round: 'rounded-6 !bg-traffic-green/10 !border-traffic-green/40 !text-traffic-green' }, { k: 'pill', x: 28, y: 213, w: 145, h: 22, text: 'Send the pricing note', round: 'rounded-6 !bg-blue-100 !border-blue-200 !text-blue-600' }, { k: 'pill', x: 240, y: 240, w: 98, h: 22, text: 'Book review', round: 'rounded-6 !bg-art-haze !border-art-haze !text-art-navy' }]} /> },
  ],
}

const STAT = {
  lead: 'Where busy teams get going.', // c26
  cont: 'Connected tools are part of the day.', // c33 w7 target
  value: '318k+', // c5
  label: 'Average daily requests from connected assistants', // c46 target
}

const STEPS = {
  lead: 'Running in two minutes.', // c21 w4 target
  cont: 'No setup, no code and no keys to copy around.', // c45 w9 target
  button: 'Read the guide', // c13 target
  items: [
    { title: 'Find Corvale.', body: 'Pick Corvale from the list of tools inside your assistant.' },
    { title: 'Sign in.', body: 'Log in with your work account and approve the requested access.' },
    { title: 'Get to it.', body: 'Permissions mirror your current access, so nothing extra is shared.' },
  ],
}

const NEWS = {
  title: 'Stay in the loop.', // c16 target
  sub: 'News from the team, monthly.', // c27
  placeholder: 'you@yourcompany.com', // c18 target
  buttonLabel: 'Subscribe', // c9
}

export default function Mcp() {
  return (
    <PageShell title="Hub">
      <HeroMcp copy={HERO} prompts={PROMPTS} timing={TIMING} />
      <SectionDivider />
      <IntegrationStrip {...STRIP} />
      <BlockDivider />
      <SplitIcons {...SPLIT_ICONS} />
      <BlockDivider />
      <CenterMedia {...CENTER} media={<ChatWindowArt />} />
      <BlockDivider />
      <MediaGrid3 {...GRID} />
      <BlockDivider />
      <Stat {...STAT} />
      <SectionDivider />
      <CustomerLogos platform />
      <SectionDivider />
      <TextColumns variant="steps" {...STEPS} />
      <BlockDivider />
      <Newsletter {...NEWS} />
      <PlatformCta lines="Put your whole CRM to work." />
    </PageShell>
  )
}
