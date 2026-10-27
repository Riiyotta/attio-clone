import PageShell from '../components/marketing/PageShell.jsx'
import { PartnerCrossLinks, QuoteReveal } from '../components/marketing/Blocks.jsx'
import Faq from '../components/marketing/Faq.jsx'
import { Hairline } from '../components/marketing/primitives.jsx'
import { ApplyNotice, CreatorHero, Perks, WhoYouAre } from '../components/partners/Sections.jsx'

const FAQ = [
  { q: 'Do I need a big audience?', a: ['No. We care more about clear, helpful content than follower counts.'] },
  { q: 'What kind of content counts?', a: ['Videos, written guides, templates and live sessions all count, as long as they help teams get more out of the workspace.'] },
  { q: 'How are rewards paid out?', a: ['Rewards are paid monthly for every new paying team that signs up through your link, for their whole first year.'] },
  { q: 'When will applications open again?', a: ['We open new rounds a few times a year. Follow our updates to hear about the next one.'] },
]

// T2-e: PartnerHero+VideoCarousel -> WhoYouAre -> Perks -> ApplyNotice -> QuoteReveal -> FAQ(4) -> CrossLinks.
export default function CreatorPartners() {
  return (
    <PageShell title="Creator partners">
      <CreatorHero />
      <Hairline />
      <WhoYouAre
        cells={[
          ['Video makers', 'Video creators', 'You explain tools on camera and love turning complex topics into short lessons.', 'video'],
          ['Writers', 'Guide writers', 'You write step-by-step guides and newsletters that people save and come back to.', 'note'],
          ['Template builders', 'System designers', 'You build templates and setups that help teams get started on day one.', 'board'],
        ]}
      />
      <Hairline />
      <Perks
        top={[
          ['Revenue share program', 'Earn a share of revenue for every paying team you bring in during year one.'],
          ['Early access', 'Try new features before launch and share first looks with your audience.'],
          ['Featured placement', 'Get your best work highlighted in our newsletter and on social channels.'],
        ]}
        bottom={[
          ['Creator community', 'A private space to swap ideas with other creators and our team.'],
          ['Free workspace seats', 'Full access to every paid feature for you and your collaborators.'],
          ['Direct line to the product team', 'Share feedback and shape what we build next.'],
        ]}
      />
      <Hairline />
      <ApplyNotice />
      <Hairline />
      <QuoteReveal
        overline="From a creator"
        quote="Making guides about the workspace has become a real part of my income, and the team always has my back."
        name="Ava Morales"
        role="Creator and educator, Pipeline Weekly"
        portrait={2}
        featuresLabel="Favorite features to teach"
        features={[
          ['list', 'Views'],
          ['flow', 'Workflows'],
          ['chart', 'Reports'],
        ]}
      />
      <Hairline />
      <Faq title="Questions from creators." items={FAQ} />
      <Hairline />
      <PartnerCrossLinks current="/partners/creator-partners" title="Other ways to partner." sub="Pick the program that fits your skills and the way you like to work with customers." />
    </PageShell>
  )
}
