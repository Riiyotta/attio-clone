import PageShell from '../../components/marketing/PageShell.jsx'
import { LegacyGrid2Q, LegacyGrid3, LinksGrid, PanelArt, PlatformCta, ScrollQuote, SectionDivider, SplitAccordionLegacy, TileArt } from '../../components/platform/index.js'
import { HeroSequences, Showcase } from '../../components/platform/legacy.jsx'
import { LINKS_HEAD, PLATFORM_LINKS } from './_links.js'

// /platform/sequences (CLONE_SPEC_PLATFORM T2 legacy). Invented copy sized to Appendix A counts.
const TIMING = { dur: 1000, pill: 4100, title: 4200, sub: 4300, cta: 4400 } // M-P1, waits for the mock

const HERO = {
  pill: 'Sequences', // c9
  title: 'From first touch to signature.', // c25
  sub: 'Move from the first hello to the signed order with timely emails that go out at the right moment.', // c92
}
const STEPS = [
  { subject: 'Welcome to your trial', when: '3 days ago', wait: 'After 2 business days', lines: 9, height: 269 },
  { subject: 'Next steps', when: 'Yesterday', wait: 'Completed', lines: 2, height: 101 },
]

const SHOWCASE = { lead: 'A tour of the editor.', cont: 'Watch timely emails go out on their own as buyers show interest.' }

const GRID3 = {
  lead: 'Replies chase themselves.', // c22
  cont: 'Corvale keeps every thread alive while your team works on closing deals.', // c68
  cards: [
    { title: 'Enrol people on a signal.', body: 'Choose the cue, a signup, a form or an event, and the contact joins.', media: <TileArt variant={1} /> },
    { title: 'One sequence, many senders.', body: 'Build a single sequence and send it from the right owner.', media: <TileArt variant={2} /> },
    { title: 'Sending runs on schedule.', body: 'No exports, no manual syncs. Win back hours every week.', media: <TileArt variant={3} />, maskWell: true },
  ],
}

const QUOTE = { text: '“Our follow-ups finally go out on time, and they still sound like us.”', name: 'Priya Halvorsen', role: 'Head of Revenue Operations · Lumenaut' }

const SPLIT = {
  lead: 'Personal at scale.', // c19
  cont: 'Every email reads one-to-one, even across a hundred accounts.', // c60
  items: [
    { title: 'Merge fields, filled for you.', desc: 'Pull any field from the record into the email so each person reads something written for them.', media: <PanelArt variant={0} /> },
    { title: 'Writing help.', desc: 'Draft a first version from the record, then edit it in your own voice.', media: <PanelArt variant={1} /> },
    { title: 'Always accurate.', desc: 'Values are read at send time, so nothing goes out stale.', media: <PanelArt variant={2} /> },
  ],
}

const GRID2 = {
  lead: 'Track it all from one screen.', // c27
  cont: 'Who joined, who replied and who booked, shown for every person you contact.', // c71
  cards: [
    { title: 'Follow the path.', body: 'See who moves through each step.', media: <TileArt variant={4} /> },
    { title: 'Results.', body: 'Opens, replies and exits at a glance.', media: <TileArt variant={5} /> },
    { title: 'Quick controls.', body: 'Pause, resume or remove anyone in one click.', media: <TileArt variant={6} /> },
    { title: 'Timed sending.', body: 'Arrive in the inbox when they are reading.', media: <TileArt variant={0} /> },
  ],
}

export default function Sequences() {
  return (
    <PageShell title="Sequences">
      <HeroSequences copy={HERO} steps={STEPS} booked="Meeting booked with Nadia" timing={TIMING} />
      <SectionDivider />
      <Showcase {...SHOWCASE} />
      <SectionDivider />
      <LegacyGrid3 {...GRID3} />
      <SectionDivider />
      <ScrollQuote {...QUOTE} />
      <SectionDivider />
      <SplitAccordionLegacy {...SPLIT} />
      <SectionDivider />
      <LegacyGrid2Q {...GRID2} />
      <SectionDivider />
      <LinksGrid variant="legacy" {...LINKS_HEAD} links={PLATFORM_LINKS} />
      <PlatformCta lines={['Revenue that runs', 'while you sleep.']} />
    </PageShell>
  )
}
