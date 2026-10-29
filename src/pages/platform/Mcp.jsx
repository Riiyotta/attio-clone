import { GroupListArt, RecordCardArt, RingChipsArt } from '../../components/platform/tiles.jsx'
import { ChatWindowArt } from '../../components/platform/windows.jsx'
import PageShell from '../../components/marketing/PageShell.jsx'
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
  title: 'Ask from anywhere. Do it all.', // c29 w4 target
  sub: 'Corvale connects to the assistants your team opens daily.', // c58
}
const PROMPTS = ['Find my notes on the Pinecrest deal', 'List renewals due in the next month', 'Add a task to follow up on Friday']

const STRIP = {
  title: 'Ready wherever you work.', // c20 target
  sub: 'Every assistant that speaks the open protocol works.', // c53 target
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
  lead: 'More possible than you would think.', // c37 w5 target
  cont: 'Assistants can look up records and edit them once you say yes.', // c57
  cards: [
    { title: 'Edit a deal.', body: '“Move the Halcyon deal to the proposal stage.”', media: <RecordCardArt /> },
    { title: 'Find a call.', body: '“Find calls where pricing came up last month.”', media: <GroupListArt /> },
    { title: 'Add tasks.', body: '“Remind me to send the contract on Friday.”', media: <RingChipsArt /> },
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
