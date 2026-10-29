import PageShell from '../../components/marketing/PageShell.jsx'
import { IntegrationStrip, LegacyGrid2Q, LegacyGrid3, LinksGrid, PanelArt, PlatformCta, ScrollQuote, SectionDivider, SplitAccordionLegacy, Tabs, TileArt } from '../../components/platform/index.js'
import { HeroCallIntel, TemplateArt } from '../../components/platform/legacy.jsx'
import { LINKS_HEAD, PLATFORM_LINKS } from './_links.js'

// /platform/call-intelligence (CLONE_SPEC_PLATFORM T2 legacy). Invented copy sized to Appendix A.
const TIMING = { dur: 1000, pill: 1100, title: 1200, sub: 1300, cta: 1400 } // M-P1

const HERO = {
  pill: 'Call notes', // c17 target
  title: 'Your calls, written up.', // c23 target
  sub: 'Recordings, transcripts and summaries land on the right record the moment a meeting ends, ready for whoever picks up the next step.', // c130
}
const CALL = {
  title: 'Product demo with Halcyon',
  summary: 'Nadia leads the decision at Halcyon. They want to move off shared sheets by Friday and plan to buy eight seats on the Team plan.',
}

const GRID3 = {
  lead: 'Every word from every meeting, kept in one place.', // c49 target
  cont: 'Search, replay or find answers in any conversation.', // c58 target
  cards: [
    { title: 'Every call, in full.', body: 'Built-in AI records, transcribes and files each call while you talk.', media: <TileArt variant={2} /> },
    { title: 'Notes that never go missing.', body: 'Recordings and meeting details link themselves to the right records.', media: <TileArt variant={5} /> },
    { title: 'Context, not just a transcript.', body: 'Each conversation is structured and searchable right away.', media: <TileArt variant={6} /> },
  ],
}

const QUOTE = { text: '“Call notes changed how we sell, for both our leads and our customers. It just works, every time.”', name: 'Theo Laurent', role: 'Head of Sales · Brightwater' }

const SPLIT = {
  lead: 'Every call, mined for detail.', // c33
  cont: 'Every decision, written down.', // c25 target
  items: [
    { title: 'Skip straight to the buyer.', desc: 'With focus view, zoom in on the people who decide and jump past the small talk.', media: <PanelArt variant={3} /> },
    { title: 'Leave each call with next steps.', desc: 'Tasks and owners are drafted from what was agreed.', media: <PanelArt variant={1} /> },
    { title: 'Transcripts in many languages.', desc: 'Calls are transcribed in the language they were held in.', media: <PanelArt variant={2} /> },
  ],
}

const STRIP = { title: 'Works with your meeting apps.', sub: 'Corvale connects with the video tools your team already uses.', tiles: ['video', 'phone', 'calendar', 'mic', 'link', 'globe'] }

const FIELDS = [
  ['Situation', 'In four sentences or fewer, describe where the prospect is today, including their team, company size and any useful context.', 'Text'],
  ['Pain', 'List the main problems the prospect is trying to solve that your product can help with.', 'List'],
  ['Impact', 'Explain what changes for the prospect once those problems are solved.', 'Text'],
  ['Timeline', 'Note any dates or events that set the pace of the deal.', 'Text'],
]
const TABS = {
  lead: 'Pick a call template.', // c22
  cont: 'Use one of ours or make it your own.', // c36
  tabs: [
    { label: 'Discovery', title: 'Discovery', listLabel: 'Sections', list: ['Situation', 'Pain', 'Impact', 'Timeline', 'Decision'], media: <TemplateArt fields={FIELDS} /> },
    { label: 'Product demo', title: 'Product demo', listLabel: 'Sections', list: ['Goals', 'What we showed', 'Reactions', 'Questions', 'Next steps'], media: <TemplateArt fields={FIELDS.slice(1)} /> },
    { label: 'Customer onboarding', title: 'Onboarding', listLabel: 'Sections', list: ['Owners', 'Milestones', 'Risks', 'Training', 'Sign-off'], media: <TemplateArt fields={FIELDS.slice(2)} /> },
  ],
}

const GRID2 = {
  lead: 'After the call ends.', // c27 target
  cont: 'The conversation keeps going after the recording stops.', // c45 target
  cards: [
    { title: 'Buying signals found for you.', body: 'Interest, objections and asks are flagged while the meeting is still live.', media: <TileArt variant={1} /> },
    { title: 'Coach with real examples.', body: 'Clip the key moments for training, or send product feedback straight on.', media: <TileArt variant={4} /> },
    { title: 'Handovers, done.', body: 'Share clips, summaries and the main points.', media: <TileArt variant={3} /> },
    { title: 'Start the next action.', body: 'Attach tasks to the matching deal without retyping.', media: <TileArt variant={0} /> },
  ],
  quote: { text: '“Every recording sitting beside the deal it belongs to has changed how our team prepares.”', name: 'Ines Varga', role: 'Founding GTM · Kettle' },
}

export default function CallIntelligence() {
  return (
    <PageShell title="Call notes">
      <HeroCallIntel copy={HERO} call={CALL} timing={TIMING} />
      <SectionDivider />
      <LegacyGrid3 {...GRID3} />
      <SectionDivider />
      <ScrollQuote {...QUOTE} />
      <SectionDivider />
      <SplitAccordionLegacy {...SPLIT} />
      <SectionDivider />
      <IntegrationStrip {...STRIP} shell="legacy" />
      <SectionDivider />
      <Tabs {...TABS} />
      <SectionDivider />
      <LegacyGrid2Q {...GRID2} />
      <SectionDivider />
      <LinksGrid variant="legacy" {...LINKS_HEAD} links={PLATFORM_LINKS} />
      <PlatformCta lines={['Revenue that runs', 'while you sleep.']} />
    </PageShell>
  )
}
