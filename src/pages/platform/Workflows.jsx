import PageShell from '../../components/marketing/PageShell.jsx'
import { LayoutArt } from '../../components/platform/layoutArt.jsx'
import CustomerLogos from '../../components/CustomerLogos.jsx'
import { CardMarquee, LegacyGrid3, PanelArt, PlatformCta, ScrollQuote, SectionDivider, SplitAccordionLegacy, TileArt, UcBand } from '../../components/platform/index.js'
import { AgentColumns, HeroWorkflows } from '../../components/platform/legacy.jsx'
import { MARQUEE_ROWS } from './_links.js'

// /platform/workflows (CLONE_SPEC_PLATFORM T2 legacy). Invented copy sized to Appendix A counts.
// Hero copy is static at first paint (M-P1 table: not animated).
const HERO = {
  pill: 'Workflows', // c9
  title: 'Sales agents that run whatever play you pick.', // line-fit 1.3.0: 3 lines, sub 2 lines like live
  sub: 'Your strongest playbooks, run on each account with the full context behind them.',
}
const NODES = [
  { icon: 'bolt', title: 'When a new deal appears', desc: 'Start when a deal record is created.', tab: 'Trigger' },
  { icon: 'globe', title: 'Account scout', desc: 'Look the company up on the open web.' },
  { icon: 'sparkle', title: 'Fit grader', desc: 'Grade the lead and choose an owner.' },
  { icon: 'list', title: 'Add to the large-account list', desc: 'Send to large accounts and draft outreach.' },
  { icon: 'list', title: 'Add to the small-account list', desc: 'Send to small accounts and draft outreach.' },
]

const AGENTS = [
  ['globe', 'Account scout', 'Reads the web for fresh news on each account.'],
  ['filter', 'Fit grader', 'Grades each lead against your ideal customer.'],
  ['users', 'Lead dispatcher', 'Hands each lead to the owner who fits best.'],
  ['chart', 'Deal reviewer', 'Spots what the closed deals have in common.'],
  ['task', 'Kickoff guide', 'Guides new customers through setup, one milestone at a time.'],
  ['mic', 'Call coach', 'Listens back to calls and marks teachable moments.'],
  ['search', 'Lookalike finder', 'Surfaces companies that resemble your top accounts.'],
  ['sparkle', 'Profile filler', 'Completes missing fields so reps can act quickly.'],
  ['note', 'Prep writer', 'Writes a one-page brief ahead of each meeting.'],
  ['mail', 'Recap writer', 'Summarises the call, edits the deal, drafts the reply.'],
  ['alert', 'Health monitor', 'Notices quiet accounts and suggests a rescue plan.'],
  ['trend', 'Upsell spotter', 'Notices growth signals and queues an offer.'],
  ['board', 'Forecast helper', 'Prepares a weekly pipeline view for leaders.'],
  ['calendar', 'Kickoff prep', 'Writes a short brief before each onboarding call.'],
  ['send', 'Cadence writer', 'Writes tailored email cadences for target accounts.'],
]
const MARQUEE = {
  title: 'Meet the crew.', // c15 target
  sub: 'An agent for each revenue job, run by Corvale and moving deals along with your team.', // c83
  rows: MARQUEE_ROWS(AGENTS),
}

const COLUMNS = {
  lead: 'Clone your top performer, five times over.', // c43
  cont: 'Agents working together on every deal, next to your team.', // c50 target
  items: [
    { title: 'Profile filler', body: 'Layered data from many sources at once.' },
    { title: 'Account scout', body: 'Buyers, org charts and fresh signals.' },
    { title: 'Fit grader', body: 'Grades leads on match and urgency.' },
    { title: 'Lead dispatcher', body: 'Picks the owner and drafts the intro.' },
    { title: 'Prep writer', body: 'A one-page brief before each meeting.' },
  ],
}

const QUOTE = {
  text: '“Our agents now handle the research and routing we used to do by hand, so the team spends its week talking to customers instead of updating records.”',
  name: 'Arlo Chen',
  role: 'Head of Sales and Partnerships · Vesper',
}

const SPLIT = {
  lead: 'An idea in the morning, a live agent by lunchtime.', // c49
  cont: 'Explain it. Check it. Switch it on. Repeat.', // line-fit 1.3.0: 3 lines like live
  items: [
    { title: 'Say it in one sentence.', desc: 'Write down the outcome and Corvale drafts every step for your review.', media: <LayoutArt box={[647, 490]} blocks={[{ k: 'frame', x: 74, y: 180, w: 500, h: 122, cls: 'bg-white-100 !border-blue-300 shadow-mock-card' }, { k: 'row', x: 88, y: 190, w: 470, h: 22, text: 'Make an agent that reads each inbound form and routes good fits to the owner', text_cls: 'text-[13px] !text-black-100' }, { k: 'row', x: 446, y: 270, w: 40, h: 18, text: 'Auto', text_cls: 'text-[12px]' }, { k: 'row', x: 488, y: 270, w: 20, h: 18, icon: 'settings', text: ' ' }, { k: 'fill', x: 524, y: 266, w: 28, h: 26, cls: 'rounded-8 bg-blue-500' }]} /> },
    { title: 'Test each block in turn.', desc: 'Run a block on a sample record and read the result before going live.', media: <PanelArt variant={3} /> },
    { title: 'One run or many thousands.', desc: 'Start it by hand or let every new record trigger it.', media: <PanelArt variant={0} /> },
  ],
}

const BAND = {
  kicker: 'Powered by', // c10
  title: (
    <>
      Unified Knowledge<sup className="text-[0.4em]">TM</sup>
    </>
  ),
  cards: [
    { icon: 'bolt', text: 'Always on.', cont: 'Data arrives as it changes, so agents never act on old facts.' },
    { icon: 'sparkle', text: 'Built for agents.', cont: 'Shaped so agents can search it and reason over it.' },
    { icon: 'trend', text: 'Trends, not noise.', cont: 'Agents read the pattern, not the blip.' },
    { icon: 'link', text: 'Wired to your tools.', cont: 'Agents reach your docs, tickets and chat.' },
    { icon: 'globe', text: 'Any language.', cont: 'Ask and answer in the language you work in.' },
  ],
}

const GRID3 = {
  lead: 'Built to keep running.', // line-fit 1.3.0: 607/432px (live 577/442)
  cont: 'Start from any trigger. Encode any rule. Rerun any job.',
  cards: [
    { title: 'Many kinds of trigger.', body: 'Field edits, timers, incoming hooks or a button press.', media: <LayoutArt box={[321, 321]} contained blocks={[{ k: 'pill', x: 46, y: 72, w: 64, h: 20, text: 'Start', icon: 'bolt', round: 'rounded-6 !bg-blue-100 !text-blue-600 !border-blue-200' }, { k: 'frame', x: 46, y: 94, w: 230, h: 62 }, { k: 'row', x: 56, y: 102, w: 210, h: 20, icon: 'link', text: 'Form submitted', text_cls: 'text-[12px] !text-black-100' }, { k: 'row', x: 56, y: 126, w: 210, h: 16, text: 'Describe this step...', text_cls: 'text-[10px] !text-black-800' }, { k: 'fill', x: 120, y: 156, w: 1, h: 30, cls: 'bg-white-600' }, { k: 'frame', x: 46, y: 186, w: 230, h: 62 }, { k: 'row', x: 56, y: 194, w: 210, h: 20, icon: 'list', text: 'Add to list', text_cls: 'text-[12px] !text-black-100' }, { k: 'row', x: 56, y: 218, w: 210, h: 16, text: 'Describe this step...', text_cls: 'text-[10px] !text-black-800' }]} /> },
    { title: 'Branching and retries.', body: 'Express the rules your business runs on, code included.', media: <LayoutArt box={[321, 321]} contained blocks={[{ k: 'frame', x: 47, y: 36, w: 225, h: 62 }, { k: 'row', x: 57, y: 44, w: 205, h: 20, icon: 'plus', text: 'Record joined list', text_cls: 'text-[12px] !text-black-100' }, { k: 'row', x: 57, y: 68, w: 205, h: 16, text: 'Describe this step...', text_cls: 'text-[10px] !text-black-800' }, { k: 'fill', x: 159, y: 98, w: 1, h: 31, cls: 'bg-white-600' }, { k: 'frame', x: 47, y: 129, w: 225, h: 62 }, { k: 'row', x: 57, y: 137, w: 205, h: 20, icon: 'flow', text: 'Branch', text_cls: 'text-[12px] !text-black-100' }, { k: 'row', x: 57, y: 161, w: 205, h: 16, text: 'Describe this step...', text_cls: 'text-[10px] !text-black-800' }, { k: 'fill', x: 159, y: 191, w: 1, h: 28, cls: 'bg-white-600' }, { k: 'frame', x: 47, y: 219, w: 225, h: 62 }, { k: 'row', x: 57, y: 227, w: 205, h: 20, icon: 'task', text: 'Open a task', text_cls: 'text-[12px] !text-black-100' }, { k: 'row', x: 57, y: 251, w: 205, h: 16, text: 'Describe this step...', text_cls: 'text-[10px] !text-black-800' }]} /> },
    { title: 'Make custom steps.', body: 'Drop in a script, ship one with the app kit, or connect a hub.', media: <LayoutArt box={[321, 321]} contained blocks={[{ k: 'frame', x: 47, y: 84, w: 230, h: 62 }, { k: 'row', x: 57, y: 92, w: 210, h: 20, icon: 'note', text: 'Record added', text_cls: 'text-[12px] !text-black-100' }, { k: 'row', x: 57, y: 116, w: 210, h: 16, text: 'Describe this step...', text_cls: 'text-[10px] !text-black-800' }, { k: 'fill', x: 159, y: 146, w: 1, h: 28, cls: 'bg-white-600' }, { k: 'frame', x: 47, y: 174, w: 230, h: 62 }, { k: 'row', x: 57, y: 182, w: 210, h: 20, icon: 'bolt', text: 'Run a script', text_cls: 'text-[12px] !text-black-100' }, { k: 'row', x: 57, y: 206, w: 210, h: 16, text: 'Describe this step...', text_cls: 'text-[10px] !text-black-800' }]} /> },
  ],
}

const GRID3_ICON = {
  lead: 'Guardrails included.', // c17
  cont: 'Clear permissions. Traceable steps. Pause at any time.', // c53
  cards: [
    { icon: 'users', title: 'Permissions you assign.', body: 'Workflows take on the permissions of the person you choose.' },
    { icon: 'list', title: 'A log for each run.', body: 'Open a run to read every input, choice and change an agent made.' },
    { icon: 'clock', title: 'Stop and retry freely.', body: 'Halt a workflow at once, or retry one run and leave the rest alone.' },
  ],
}

export default function Workflows() {
  return (
    <PageShell title="Workflows">
      <HeroWorkflows copy={HERO} nodes={NODES} />
      <SectionDivider />
      <CustomerLogos platform />
      <SectionDivider />
      <CardMarquee header="legacy" {...MARQUEE} />
      <SectionDivider />
      <AgentColumns {...COLUMNS} />
      <SectionDivider />
      <ScrollQuote {...QUOTE} />
      <SectionDivider />
      <SplitAccordionLegacy {...SPLIT} />
      <UcBand {...BAND} />
      <LegacyGrid3 {...GRID3} />
      <SectionDivider />
      <LegacyGrid3 {...GRID3_ICON} variant="icon" />
      <PlatformCta lines="Put your whole CRM to work." />
    </PageShell>
  )
}
