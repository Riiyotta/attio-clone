import PageShell from '../../components/marketing/PageShell.jsx'
import CustomerLogos from '../../components/CustomerLogos.jsx'
import { CardMarquee, LegacyGrid3, PanelArt, PlatformCta, ScrollQuote, SectionDivider, SplitAccordionLegacy, TileArt, UcBand } from '../../components/platform/index.js'
import { AgentColumns, HeroWorkflows } from '../../components/platform/legacy.jsx'
import { MARQUEE_ROWS } from './_links.js'

// /platform/workflows (CLONE_SPEC_PLATFORM T2 legacy). Invented copy sized to Appendix A counts.
// Hero copy is static at first paint (M-P1 table: not animated).
const HERO = {
  pill: 'Workflows', // c9
  title: 'Agents that run the plays you choose.', // c38
  sub: 'Your strongest playbooks, executed on each account and grounded in everything the CRM knows.', // c92
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
  cont: 'Explain the job, check each step, then switch it on.', // c49
  items: [
    { title: 'Say it in one sentence.', desc: 'Write down the outcome and Corvale drafts every step for your review.', media: <PanelArt variant={1} /> },
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
  lead: 'Sturdy enough for real ops.', // c23
  cont: 'Triggers for everything. Logic for anything. Full history.', // c56
  cards: [
    { title: 'Many kinds of trigger.', body: 'Field edits, timers, incoming hooks or a button press.', media: <TileArt variant={3} /> },
    { title: 'Branching and retries.', body: 'Express the rules your business runs on, code included.', media: <TileArt variant={4} /> },
    { title: 'Make custom steps.', body: 'Drop in a script, ship one with the app kit, or connect a hub.', media: <TileArt variant={6} /> },
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
