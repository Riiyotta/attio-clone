import PageShell from '../../components/marketing/PageShell.jsx'
import { IntelApprovalArt, IntelListArt, IntelRingsArt } from '../../components/platform/intelArt.jsx'
import { CardMarquee, PlatformCta, ScrollQuote, SectionDivider, UcBand } from '../../components/platform/index.js'
import { AskIntel, AskIntelArt, AskTabs, HeroAsk } from '../../components/platform/legacy.jsx'
import { MARQUEE_ROWS } from './_links.js'

// /platform/ask (CLONE_SPEC_PLATFORM T2 legacy). Invented copy sized to Appendix A counts.
const TIMING = { dur: 1000, title: 200, sub: 300 } // M-P1 (no pill, no CTA row in the stage)

const HERO = {
  title: 'Just ask.', // c10 target
  sub: 'Ask a question, get the answer, then let it handle the follow-up.', // c66
  widget: { query: 'Summarise feature requests', status: 'Searched calls', answer: 'Three accounts asked for the same features in last week’s calls.' },
  strip: 'Quick on any amount of data, and sharing one record with the rest of Corvale.', // c78
}

const TABS = {
  title: 'Customer answers for every kind of team.', // c39
  tabs: [
    { label: 'Marketing', title: 'Know which campaigns turn into pipeline.', desc: 'Compare sources, segments and spend in one answer.' },
    { label: 'Success', title: 'Walk into every renewal ready.', desc: 'Usage, open tickets and sentiment for each account.' },
    { label: 'Sales', title: 'Win sooner when every single call is fully prepared.', desc: 'Get ready for calls, edit deals and check the funnel.' },
    { label: 'Founders', title: 'See the whole business in one question.', desc: 'Revenue, pipeline and hiring at a glance.' },
    { label: 'Venture capital', title: 'Track every fund and founder you meet.', desc: 'Notes, intros and follow-ups kept together.' },
  ],
}

const BAND = {
  kicker: 'Powered by',
  title: (
    <>
      Unified Knowledge<sup className="text-[0.4em]">TM</sup>
    </>
  ),
  cards: [
    { icon: 'search', text: 'Fast search', cont: 'returns answers instantly even as your data grows.' },
    { icon: 'mail', text: 'Grounded in your data', cont: 'like email, calls and product usage.' },
    { icon: 'trend', text: 'Sees patterns', cont: 'in how customers behave over time, not one-offs.' },
    { icon: 'note', text: 'Notes and threads.', cont: 'The tools you love, connected and searchable.' },
    { icon: 'globe', text: 'Any language.', cont: 'Ask in whichever language you work in.' },
  ],
}

const INTEL = {
  title: 'Answers built around how your team sells and serves.', // line-fit 1.3.0: 438/312 (live 405/318)
  cards: [
    { icon: 'checkCircle', title: 'Real records, not invented answers.', body: 'Each reply cites the records, calls and notes it was drawn from, and nothing more.', media: <IntelListArt /> },
    { icon: 'settings', title: 'Your access rules, applied.', body: 'The assistant follows the access you already set, so each person sees only what they should.', media: <IntelRingsArt /> },
    { icon: 'sparkle', title: 'Smart suggestions. You make the call.', body: 'You stay in charge, free to approve, edit or turn down any change it suggests to you.', media: <IntelApprovalArt /> },
  ],
}

const PROMPTS = [
  ['calendar', 'Daily brief', 'Start the day with a briefing on each of your meetings.'],
  ['note', 'Feature requests', 'Pull feature requests out of a call recording.'],
  ['alert', 'Objection prep', 'Prepare answers to the objections likely on your next call.'],
  ['globe', 'Company digest', 'Read up on a company online and keep the useful parts.'],
  ['mail', 'Thank-you note', 'Write the note that keeps momentum going once a meeting ends.'],
  ['board', 'Deal brief', 'Create a full briefing on a deal.'],
  ['users', 'Pre-call sheet', 'See who is attending and what changed since you last spoke.'],
  ['send', 'Release outreach', 'Find customers who asked for a feature and draft a note to each.'],
  ['chart', 'Quarterly review', 'Pull together the numbers for an upcoming account review.'],
  ['mic', 'Call recap', 'Turn a recording into decisions, owners and dates.'],
  ['star', 'Pitch feedback', 'Hear how your pitch could land better.'],
  ['task', 'Update deal', 'Update a deal record from a recorded call.'],
  ['check', 'Action items', 'List the to-dos agreed on a call.'],
  ['trend', 'Usage summary', 'Show which features a customer leans on most.'],
]
const MARQUEE = {
  title: 'From one expert to the whole team.', // c28 target
  sub: 'Save a good prompt once and the whole team can run it whenever they need.', // c71
  rows: MARQUEE_ROWS(PROMPTS),
}

const QUOTE = {
  text: '“Our whole go-to-market team leans on the assistant at Orchard. It gives everyone hours back each week and puts product, marketing and sales in front of the same picture of what customers want.”',
  name: 'Jun Ishida',
  role: 'Growth Engineer · Orchard',
}

export default function Ask() {
  return (
    <PageShell title="Assistant">
      <HeroAsk {...HERO} timing={TIMING} />
      <SectionDivider />
      <AskTabs {...TABS} />
      <UcBand {...BAND} />
      <AskIntel {...INTEL} />
      <SectionDivider />
      <CardMarquee header="legacy" {...MARQUEE} />
      <SectionDivider />
      <ScrollQuote {...QUOTE} />
      <PlatformCta lines="Put your whole CRM to work." />
    </PageShell>
  )
}
