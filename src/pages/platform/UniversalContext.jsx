import { AskIntelArt } from '../../components/platform/legacy.jsx'
import { HomeWindowArt } from '../../components/platform/windows.jsx'
import PageShell from '../../components/marketing/PageShell.jsx'
import CustomerLogos from '../../components/CustomerLogos.jsx'
import {
  BlockDivider,
  CenterMedia,
  HeroHorizon,
  MediaGrid3,
  PanelArt,
  PlatformCta,
  SectionDivider,
  SplitAccordion,
  TaggedQuad,
  TextColumns,
  TileArt,
  WindowArt,
} from '../../components/platform/index.js'

// /platform/universal-context (CLONE_SPEC_PLATFORM T1). Invented copy sized to Appendix A counts.
const TIMING = { dur: 1000, title: 1200, sub: 1300, cta: 1400 } // M-P1 (no pill)

const HERO = {
  title: 'Unified Knowledge™', // c18 w2
  sub: 'Each signal your people and agents lean on, collected, connected and ready to use.', // c80
}

const SPLIT = {
  lead: 'One record of every customer moment.', // c38 w8 target
  cont: 'Mail, calls, usage and notes, kept together on their own.', // c66 w8 target
  items: [
    { title: 'Logs itself.', desc: 'Each email, call and meeting is filed as soon as it ends.', media: <PanelArt variant={4} /> },
    { title: 'Sits on the record.', desc: 'The full account story, never out of date.', media: <PanelArt variant={0} /> },
    { title: 'Learns as it goes.', desc: 'The more it runs, the less you need to spell out.', media: <PanelArt variant={2} /> },
  ],
}

const CENTER = {
  lead: 'Context your agents can work with.', // c30 w5 target
  cont: 'The same full picture your team sees, open to every agent.', // c56 w9 target
}

const GRID = {
  lead: 'Built for the questions you actually ask.', // c41 w6 target
  cont: 'Fast answers from every source, without a single export.', // c66 w10 target (2L)
  cards: [
    { title: 'Never stale.', body: 'Updates the moment a source changes.', media: <AskIntelArt variant={0} /> },
    { title: 'Fully connected.', body: 'Every record linked to its neighbors.', media: <AskIntelArt variant={1} /> },
    { title: 'Open by design.', body: 'Read it from any tool you connect.', media: <AskIntelArt variant={2} /> },
  ],
}

const COLUMNS = {
  lead: 'Engineered as a platform.', // c25
  cont: 'Read from it, add to it and ship things on top.', // c47
  items: [
    { title: 'Read your own data.', body: 'Every record and event, open to read at any time.' },
    { title: 'Query in plain SQL.', body: 'Your whole workspace as tables you can join.' },
    { title: 'Find by intent.', body: 'Semantic and keyword search across all notes.' },
    { title: 'Stream every change.', body: 'Webhooks fire the moment a record is updated.' },
    { title: 'Scale without worry.', body: 'Millions of records, still answered in seconds.' },
  ],
}

const QUAD = {
  lead: 'One context, every team.', // c20 w5 target
  cont: 'Each group sees the same history, shaped for the work in front of it.', // c62 w9 target
  cards: [
    { tag: '[ SALES ]', title: 'Walk in prepared.', body: 'Every past touch, summarized before the next call.' },
    { tag: '[ MARKETING ]', title: 'Target real intent.', body: 'Segments built from what accounts actually do.' },
    { tag: '[ CUSTOMER SUCCESS ]', title: 'Spot risk early.', body: 'Usage dips and quiet threads raised in one view.' },
    { tag: '[ LEADERSHIP ]', title: 'Trust the numbers.', body: 'Reports drawn from one source, not ten exports.' },
  ],
}

export default function UniversalContext() {
  return (
    <PageShell title="Unified Knowledge">
      <HeroHorizon copy={HERO} timing={TIMING} />
      <SectionDivider />
      <CustomerLogos platform />
      <SectionDivider />
      <SplitAccordion {...SPLIT} />
      <BlockDivider />
      <CenterMedia {...CENTER} media={<HomeWindowArt h={647} />} />
      <BlockDivider />
      <MediaGrid3 {...GRID} />
      <BlockDivider />
      <TextColumns {...COLUMNS} />
      <BlockDivider />
      <TaggedQuad {...QUAD} />
      <BlockDivider />
      <PlatformCta lines={['Put your whole CRM', 'to work now.']} />
    </PageShell>
  )
}
