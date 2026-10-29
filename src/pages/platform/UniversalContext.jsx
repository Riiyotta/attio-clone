import { AskIntelArt } from '../../components/platform/legacy.jsx'
import { HomeWindowArt } from '../../components/platform/windows.jsx'
import PageShell from '../../components/marketing/PageShell.jsx'
import { LayoutArt } from '../../components/platform/layoutArt.jsx'
import { IntelApprovalArt, IntelListArt, IntelRingsArt } from '../../components/platform/intelArt.jsx'
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
    { title: 'Logs itself.', desc: 'Each email, call and meeting is filed as soon as it ends.', media: <LayoutArt box={[695, 639]} blocks={[{ k: 'frame', x: 200, y: 205, w: 330, h: 236, cls: 'bg-white-100 shadow-mock-card rotate-[4deg]' }, { k: 'frame', x: 186, y: 200, w: 330, h: 236, cls: 'bg-white-100 shadow-mock-card rotate-[2deg]' }, { k: 'frame', x: 176, y: 196, w: 330, h: 236 }, { k: 'row', x: 190, y: 204, w: 120, h: 16, text: 'New deal', text_cls: 'text-[11px] !text-black-800' }, { k: 'row', x: 192, y: 244, w: 220, h: 22, glyph: true, text: 'Brightwater Labs renewal', seed: 1 }, { k: 'row', x: 195, y: 276, w: 100, h: 22, icon: 'users', text: 'Owner', text_cls: 'text-[12px]' }, { k: 'row', x: 309, y: 276, w: 140, h: 22, avatar: 16, seed: 2 }, { k: 'row', x: 195, y: 307, w: 100, h: 22, icon: 'coin', text: 'Amount', text_cls: 'text-[12px]' }, { k: 'row', x: 310, y: 307, w: 100, h: 22, text: '$18,400.00' }, { k: 'row', x: 194, y: 337, w: 100, h: 22, icon: 'flow', text: 'Stage', text_cls: 'text-[12px]' }, { k: 'pill', x: 310, y: 337, w: 70, h: 22, text: 'Review' }, { k: 'fill', x: 195, y: 380, w: 60, h: 6, cls: 'rounded-full bg-white-400' }, { k: 'fill', x: 310, y: 380, w: 130, h: 6, cls: 'rounded-full bg-white-400' }, { k: 'fill', x: 195, y: 404, w: 60, h: 6, cls: 'rounded-full bg-white-400' }, { k: 'fill', x: 310, y: 404, w: 130, h: 6, cls: 'rounded-full bg-white-400' }]} /> },
    { title: 'Sits on the record.', desc: 'The full account story, never out of date.', media: <PanelArt variant={0} /> },
    { title: 'Learns as it goes.', desc: 'Over time, you have less and less to spell out.', media: <PanelArt variant={2} /> },
  ],
}

const CENTER = {
  lead: 'What every agent works from.', // line-fit 1.3.0: 718/701/167 (live 716/626/201)
  cont: 'Assistants, custom agents and the automations that link them.',
}

const GRID = {
  lead: 'Built for the questions you actually ask.', // line-fit 1.3.0 (live 748 / 441)
  cont: 'Sourced replies, scoped permissions, and your approval on each edit.',
  cards: [
    { title: 'Never stale.', body: 'Updates the moment a source changes.', media: <IntelListArt /> },
    { title: 'Fully connected.', body: 'Every record linked to its neighbors.', media: <IntelRingsArt /> },
    { title: 'Open by design.', body: 'Read it from any tool you connect.', media: <IntelApprovalArt /> },
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
