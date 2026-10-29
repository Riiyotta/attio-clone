import { WorkflowWindowArt } from '../../components/platform/windows.jsx'
import PageShell from '../../components/marketing/PageShell.jsx'
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
  title: 'Turn your best play into a teammate.', // c29 w6 target (2L)
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
  cont: 'Clear instructions become dependable work.', // c42 w6
  items: [
    { title: 'Write the brief like a memo.', desc: 'Explain the goal, the steps and the tone, the way you would to a new hire.', media: <PanelArt variant={4} /> },
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
