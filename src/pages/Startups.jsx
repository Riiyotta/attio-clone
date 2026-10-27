import PageShell from '../components/marketing/PageShell.jsx'
import Faq, { InlineLink } from '../components/marketing/Faq.jsx'
import { Hairline } from '../components/marketing/primitives.jsx'
import { ApplyBlock, FeatureCells, PerksBand, ProgramPartners, StartupsHero } from '../components/startups/Sections.jsx'

const FAQ = [
  { q: 'Who can join the founder program?', a: ['Teams that are less than two years old and have raised under $5M in total funding are eligible to apply.'] },
  { q: 'How long does the discount last?', a: ['The discount applies to your first twelve months on any paid plan, starting the day you are approved.'] },
  { q: 'Can I apply if I already have an account?', a: ['Yes. Apply with the email you use to sign in and we will apply the discount to your existing workspace.'] },
  { q: 'What happens after the first year ends?', a: ['Your workspace moves to the standard price for your plan. We will remind you a month before so there are no surprises.'] },
  { q: 'Do partner perks expire?', a: ['Each partner sets its own terms. You can see the details for every offer on the perks page once you are accepted.'] },
  { q: 'How long does a review take?', a: ['Most applications are reviewed within five working days.'] },
  { q: 'Is there a limit on seats?', a: ['No. The discount covers every seat in the workspace for the full year, however quickly the team grows.'] },
  { q: 'Can accelerators partner with you?', a: [<>We work with programs of every size. Reach out through the <InlineLink href="/contact/sales">contact page</InlineLink> to set up an offer for your founders.</>] },
  { q: 'Who do I contact with questions?', a: ['Send a note to the founder team and someone will reply within a day.'] },
]

// T2-b: PageHero+LogoStrip -> ApplyBlock -> FeatureCells -> ProgramPartners -> PerksBand -> FAQ(9).
export default function Startups() {
  const line = (
    <div className="container">
      <Hairline />
    </div>
  )
  return (
    <PageShell title="Startups">
      <StartupsHero />
      {line}
      <ApplyBlock />
      {line}
      <FeatureCells />
      {line}
      <ProgramPartners />
      {line}
      <PerksBand />
      {line}
      <Faq title="Questions from founders." items={FAQ} />
    </PageShell>
  )
}
