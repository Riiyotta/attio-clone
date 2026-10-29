import { WorkflowWindowArt } from '../../components/platform/windows.jsx'
import PageShell from '../../components/marketing/PageShell.jsx'
import { LayoutArt } from '../../components/platform/layoutArt.jsx'
import CustomerLogos from '../../components/CustomerLogos.jsx'
import {
  BlockDivider,
  CardMarquee,
  CenterMedia,
  HeroCustomAgents,
  IconRow,
  PanelArt,
  PlatformCta,
  SectionDivider,
  SplitAccordion,
  Stat,
  WindowArt,
} from '../../components/platform/index.js'

// /platform/custom-agents (CLONE_SPEC_PLATFORM T1). Invented copy sized to Appendix A counts.
const TIMING = { dur: 600, pill: 100, title: 200, sub: 300, cta: 400 } // M-P1

const HERO = {
  pill: 'Agent Builder', // c13
  title: 'Set your best play in motion.', // line-fit 1.3.0: 326/353px (live 326/388)
  sub: 'Describe the play once and an agent runs it on every record, at any hour, for you.', // c79 w14
}
const AGENTS = [
  { icon: 'search', title: 'Find the next best lead', desc: 'Scores each new signup by fit' },
  { icon: 'mail', title: 'Draft the first reply', desc: 'Writes an intro using account notes' },
  { icon: 'users', title: 'Route every new lead', desc: 'Gives each lead to the right owner' },
  { icon: 'calendar', title: 'Book the next meeting', desc: 'Proposes times after a reply lands' },
]

const SPLIT = {
  lead: 'Teach it in plain words.', // c25 w5
  cont: 'Ordinary words in. Dependable records out.', // line-fit 1.3.0: 314/426px (live 301/415)
  items: [
    { title: 'Write the brief like a memo.', desc: 'Explain the goal, the steps and the tone, the way you would to a new hire.', media: <LayoutArt box={[695, 639]} blocks={[{ k: 'frame', x: 153, y: 240, w: 470, h: 162 }, { k: 'row', x: 170, y: 252, w: 420, h: 30, text: 'Write an agent that grades each new signup against', text_cls: 'text-[18px] !text-black-100' }, { k: 'pill', x: 165, y: 352, w: 170, h: 32, text: 'Halcyon // Northwind', icon: 'video' }, { k: 'pill', x: 446, y: 352, w: 54, h: 32, text: 'Auto' }, { k: 'row', x: 508, y: 358, w: 60, h: 20, icon: 'mic', text: ' ' }, { k: 'pill', x: 324, y: 422, w: 190, h: 30, text: 'Draft the next brief', icon: 'note', round: 'rounded-8 !border-0 !bg-transparent !shadow-none !text-[16px]' }, { k: 'row', x: 540, y: 426, w: 80, h: 22, icon: 'sparkle', text: 'Score', text_cls: 'text-[16px] opacity-50' }]} /> },
    { title: 'Give it the tools it should use.', desc: 'Pick which records, inboxes and actions the agent is allowed to touch.', media: <PanelArt variant={1} /> },
    { title: 'Check its work before it ships.', desc: 'Test on a handful of records, read each step, then switch it on for the whole team.', media: <PanelArt variant={2} /> },
  ],
}

const ROW_TITLES = [
  ['sparkle', 'Lead triage', 'Sorts every inbound lead by size, region and fit before anyone looks.'],
  ['mail', 'Reply drafts', 'Prepares a first reply from the thread and the account history.'],
  ['calendar', 'Meeting prep', 'Builds a one page brief for each call on tomorrow’s calendar.'],
  ['chart', 'Deal health', 'Flags deals that have gone quiet for more than two weeks.'],
  ['users', 'Owner routing', 'Matches each new account to the rep who knows the region.'],
  ['note', 'Call notes', 'Turns the call summary into tasks and next steps on the deal.'],
  ['globe', 'Account research', 'Collects news, hiring and funding changes for target accounts.'],
  ['bolt', 'Renewal watch', 'Raises renewals at risk ninety days before the date.'],
  ['task', 'Task cleanup', 'Closes stale tasks and reminds owners of what is overdue.'],
  ['filter', 'List hygiene', 'Merges duplicates and fills gaps in company records.'],
]
const LABELS = ['Corvale', 'Ops team', 'Sales', 'RevOps', 'Success']
const mk = (offset) =>
  ROW_TITLES.map((_, i) => {
    const [icon, title, desc] = ROW_TITLES[(i + offset) % ROW_TITLES.length]
    return { icon, title, desc, label: LABELS[(i + offset) % LABELS.length] }
  })

const MARQUEE = {
  lead: 'The careful decisions your sharpest people would make.', // c53
  cont: 'Now made on every record.', // c31
  rows: [mk(0), mk(5)],
}

const STAT = {
  lead: 'Hard at work already.', // c23 target
  cont: 'Teams of all sizes hand routine work to agents daily.', // c57 w11 target
  value: '41k+', // c4
  label: 'Agents running each week', // c23 target
}

const CENTER = {
  lead: 'See each step it takes.', // c22 w4 target
  cont: 'Inputs, tool calls and decisions, all written to a log you can open.', // c69 w14
}

const ICONS = {
  lead: 'Safe by default, all the way.', // c29 w6
  cont: 'Guardrails that security teams will love.', // c38 w7
  items: [
    { icon: 'users', title: 'Acts as someone you trust.', body: 'With exactly the access of the person who set it up, and nothing more.' },
    { icon: 'note', title: 'Leaves a full trail.', body: 'With a full log of every record it read and every change it made.' },
    { icon: 'settings', title: 'You keep the controls.', body: 'With the option to pause, edit or roll back any run in a click.' },
  ],
}

export default function CustomAgents() {
  return (
    <PageShell title="Agent Builder">
      <HeroCustomAgents copy={HERO} agents={AGENTS} timing={TIMING} />
      <SectionDivider />
      <CustomerLogos platform />
      <SectionDivider />
      <SplitAccordion {...SPLIT} />
      <BlockDivider />
      <CardMarquee header="v2" {...MARQUEE} />
      <Stat {...STAT} />
      <BlockDivider />
      <CenterMedia {...CENTER} media={<WorkflowWindowArt />} />
      <BlockDivider />
      <IconRow {...ICONS} />
      <PlatformCta lines="Put an agent on the job today." />
    </PageShell>
  )
}
