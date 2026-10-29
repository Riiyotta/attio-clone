import { ConfidenceArt, ReasoningArt, RunNodeArt } from '../../components/platform/tiles.jsx'
import PageShell from '../../components/marketing/PageShell.jsx'
import CustomerLogos from '../../components/CustomerLogos.jsx'
import {
  BlockDivider,
  HeroWebAgent,
  MediaGrid3,
  Orbit,
  PanelArt,
  PlatformCta,
  SectionDivider,
  SplitAccordion,
  TaggedQuad,
  TileArt,
} from '../../components/platform/index.js'

// /platform/web-agent (CLONE_SPEC_PLATFORM T1). Invented copy sized to Appendix A counts.
const TIMING = { dur: 1000, title: 700, sub: 800, cta: 900 } // M-P1 (no pill animation)

const HERO = {
  pill: 'Web Scout', // c9
  pillAs: 'div',
  title: 'Every account, fully briefed', // c28 w4
  sub: 'Web Scout reads the open web for each record, then writes what it learns back to you.', // c79 w15
}
const CHIPS = ['northwind.news', 'ledgerly.io', 'harborpost.com', 'civicfiles.org', 'q2.dev', 'fundwatch.net', 'codehub.dev', 'dailyrecord.co', 'launchboard.io', 'teamreviews.com']

const SPLIT = {
  lead: 'Research for each next move.', // c27 w5
  cont: 'Useful to people and agents alike.', // c34
  items: [
    { title: 'Saved onto the record.', desc: 'Attributes are filled in on each record, and stay current as things change.', media: <PanelArt variant={0} /> },
    { title: 'Runs inside workflows.', desc: 'Add Web Scout to any workflow step and pass its answer to the next.', media: <PanelArt variant={1} /> },
    { title: 'Shapes what comes next.', desc: 'The prep for the call, the email or the handover is done early.', media: <PanelArt variant={2} /> },
  ],
}

const GRID = {
  lead: 'You can always verify.', // c21 w4
  cont: 'A score, a short explanation and a list of links come with every result, so the weak spots stand out.', // c92 w15
  cards: [
    { title: 'It flags its weaker answers.', body: 'A confidence score on each answer, so the weak ones get a second look first.', media: <ConfidenceArt /> },
    { title: 'It lists every page it read.', body: 'Open the trail and see each page it read to reach the answer.', media: <ReasoningArt /> },
    { title: 'You choose when it runs.', body: 'A single row, an entire column, or each new record that lands.', media: <RunNodeArt /> },
  ],
}

const ORBIT = {
  lead: 'If it is online, you can ask about it.', // c40 w9 (approx)
  cont: 'Anyone can write their own research.', // c37 w7
  items: [
    { title: 'Write the brief yourself.', body: 'If you can put it into words, it can go and look.' },
    { title: 'Set it up in a sentence.', body: 'Describe it to the assistant and it sets up the step for your team.' },
    { title: 'Test, adjust, repeat.', body: 'Rewrite the prompt, run it on a sample, and keep the version that reads right.' },
  ],
}

const QUAD = {
  lead: 'The same bar for each account.', // c25
  cont: 'Not only the handful anyone could reach.', // c40
  cards: [
    { tag: '[ SALES ]', title: 'Ahead of the meeting.', body: 'The news, the round and the new hires, all in one view.' },
    { tag: '[ MARKETING ]', title: 'Ahead of the campaign.', body: 'Segment on fresh signals instead of old spreadsheets.' },
    { tag: '[ CUSTOMER SUCCESS ]', title: 'Ahead of renewal.', body: 'Company changes surfaced before the renewal call.' },
    { tag: '[ REVOPS ]', title: 'Ahead of the quarter.', body: 'The same rules applied the same way to every record.' },
  ],
}

export default function WebAgent() {
  return (
    <PageShell title="Web Scout">
      <HeroWebAgent copy={HERO} chips={CHIPS} timing={TIMING} />
      <SectionDivider />
      <CustomerLogos platform />
      <SectionDivider />
      <SplitAccordion {...SPLIT} />
      <BlockDivider />
      <MediaGrid3 {...GRID} />
      <BlockDivider />
      <Orbit {...ORBIT} />
      <BlockDivider />
      <TaggedQuad {...QUAD} />
      <PlatformCta lines="Put your whole CRM to work." />
    </PageShell>
  )
}
