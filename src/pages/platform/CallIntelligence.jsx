import PageShell from '../../components/marketing/PageShell.jsx'
import { LayoutArt } from '../../components/platform/layoutArt.jsx'
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
    { title: 'Every call, in full.', body: 'Built-in AI records, transcribes and files each call while you talk.', media: <LayoutArt box={[321, 321]} contained blocks={[{ k: 'frame', x: 26, y: 43, w: 270, h: 225 }, { k: 'pill', x: 38, y: 54, w: 62, h: 22, text: 'Notes', icon: 'note' }, { k: 'pill', x: 106, y: 54, w: 86, h: 22, text: 'Transcript', icon: 'list' }, { k: 'row', x: 38, y: 92, w: 200, h: 24, avatar: true, seed: 0 }, { k: 'lines', x: 38, y: 126, w: 222, h: 40, n: 2, lineH: 18, seed: 4 }, { k: 'row', x: 38, y: 174, w: 200, h: 24, avatar: true, seed: 5 }, { k: 'fill', x: 38, y: 212, w: 150, h: 4, cls: 'rounded-full bg-white-600' }, { k: 'fill', x: 38, y: 224, w: 210, h: 4, cls: 'rounded-full bg-white-600' }]} /> },
    { title: 'Notes that never go missing.', body: 'Recordings and meeting details link themselves to the right records.', media: <LayoutArt box={[321, 321]} contained blocks={[{ k: 'glyph', x: 147, y: 74, w: 28, h: 28, shape: 'wave', tone: 'green' }, { k: 'fill', x: 160, y: 112, w: 1, h: 52, cls: 'bg-white-700' }, { k: 'frame', x: 92, y: 178, w: 138, h: 98, cls: 'rounded-full border-white-600 bg-transparent' }, { k: 'glyph', x: 145, y: 210, w: 32, h: 32, shape: 'grid', tone: 'dark' }]} /> },
    { title: 'Context, not just a transcript.', body: 'Each conversation is structured and searchable right away.', media: <LayoutArt box={[321, 321]} contained blocks={[{ k: 'frame', x: 20, y: 86, w: 284, h: 150 }, { k: 'row', x: 36, y: 102, w: 250, h: 26, icon: 'clock', glyph: true, text: 'Kettle & Kiln stage moved to Won', seed: 2 }, { k: 'row', x: 36, y: 146, w: 250, h: 26, icon: 'phone', avatar: true, text: 'Nadia logged a call with Lumenaut', seed: 0 }, { k: 'row', x: 36, y: 190, w: 250, h: 26, icon: 'clock', glyph: true, text: 'Orchardly stage moved to Pilot', seed: 4 }]} /> },
  ],
}

const QUOTE = { text: '“Call notes changed how we sell, for both our leads and our customers. It just works, every time.”', name: 'Theo Laurent', role: 'Head of Sales · Brightwater' }

const SPLIT = {
  lead: 'Every call, mined for detail.', // c33
  cont: 'Every decision, written down.', // c25 target
  items: [
    { title: 'Skip straight to the buyer.', desc: 'With focus view, zoom in on the people who decide and jump past the small talk.', media: <LayoutArt box={[647, 490]} blocks={[{ k: 'tracks', x: 104, y: 140, w: 440, h: 170, rows: 3, rowH: 50 }, { k: 'tip', x: 226, y: 322, w: 195, h: 28, text: 'Focus on Nadia Brooks' }]} /> },
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
  lead: 'Start from call templates.', // line-fit 1.3.0: live lead 348px / cont 438px at 1440
  cont: 'Use ours, or make one that fits.',
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
    { title: 'Buying signals found for you.', body: 'Interest, objections and asks are flagged while the meeting is still live.', media: <LayoutArt box={[481, 289]} contained blocks={[{ k: 'frame', x: 70, y: 60, w: 332, h: 168 }, { k: 'row', x: 80, y: 70, w: 200, h: 22, glyph: true, text: 'Halcyon Freight · Q3 review', seed: 0 }, { k: 'pill', x: 86, y: 104, w: 54, h: 20, text: 'Calls' }, { k: 'pill', x: 144, y: 104, w: 62, h: 20, text: 'Signals' }, { k: 'fill', x: 70, y: 130, w: 332, h: 1, cls: 'bg-white-500' }, { k: 'row', x: 88, y: 144, w: 120, h: 20, icon: 'tag', text: 'Next step' }, { k: 'row', x: 236, y: 144, w: 120, h: 20, text: 'Pilot in May' }, { k: 'row', x: 88, y: 170, w: 130, h: 20, icon: 'users', text: 'Buying group' }, { k: 'row', x: 236, y: 170, w: 120, h: 20, avatar: 16, seed: 3 }, { k: 'row', x: 88, y: 196, w: 120, h: 20, icon: 'alert', text: 'Blockers' }, { k: 'row', x: 236, y: 196, w: 120, h: 20, text: 'Legal review' }]} /> },
    { title: 'Coach with real examples.', body: 'Clip the key moments for training, or send product feedback straight on.', media: <LayoutArt box={[481, 289]} contained blocks={[{ k: 'frame', x: 104, y: 50, w: 220, h: 182, cls: 'bg-white-100 shadow-mock-card' }, { k: 'row', x: 116, y: 188, w: 150, h: 16, text: 'Pricing pushback', text_cls: 'text-[13px] font-semibold' }, { k: 'row', x: 116, y: 205, w: 60, h: 14, text: '08:42', text_cls: 'text-[11px]' }, { k: 'fill', x: 68, y: 257, w: 60, h: 3, cls: 'rounded-full bg-black-100' }, { k: 'fill', x: 132, y: 257, w: 66, h: 3, cls: 'rounded-full bg-black-600' }, { k: 'fill', x: 204, y: 257, w: 210, h: 3, cls: 'rounded-full bg-white-500' }]} /> },
    { title: 'Handovers, done.', body: 'Share clips, summaries and the main points.', media: <LayoutArt box={[481, 289]} contained blocks={[{ k: 'card', x: 59, y: 82, w: 363, h: 114, pad: 'px-3 py-2.5', title: 'Nadia Brooks · 2h', icon: 'mail', lines: 3, lineH: 19, seed: 1 }, { k: 'tip', x: 175, y: 203, w: 131, h: 23, text: 'Copy clip link' }]} /> },
    { title: 'Start the next action.', body: 'Attach tasks to the matching deal without retyping.', media: <LayoutArt box={[481, 289]} contained blocks={[{ k: 'frame', x: 130, y: 36, w: 216, h: 216, cls: 'rounded-full border-white-600 bg-transparent' }, { k: 'frame', x: 205, y: 111, w: 66, h: 66, cls: 'rounded-full border-art-iris/40 bg-white-100' }, { k: 'pill', x: 54, y: 40, w: 154, h: 24, text: 'Send the revised quote', icon: 'send' }, { k: 'pill', x: 291, y: 94, w: 113, h: 24, text: 'Book a review', icon: 'calendar' }, { k: 'pill', x: 111, y: 227, w: 157, h: 24, text: 'Add Nadia to the dinner', icon: 'users' }]} /> },
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
