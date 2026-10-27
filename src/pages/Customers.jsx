import { Link } from 'react-router-dom'
import PageShell from '../components/marketing/PageShell.jsx'
import { CtaAvatarWall, LogoGrid, PageHero, QuoteReveal } from '../components/marketing/Blocks.jsx'
import { Hairline } from '../components/marketing/primitives.jsx'
import StoriesGrid from '../components/customers/StoriesGrid.jsx'

// T2-a: PageHero -> hairline -> LogoGrid -> CustomerStoriesGrid -> hairline -> QuoteReveal ->
// CtaAvatarWall -> footer. Hero is static (no entrance).
export default function Customers() {
  return (
    <PageShell title="Customers">
      <PageHero
        badge="Our customer hub" // c16
        title="Teams of every size build their revenue here" // c43 l2
        lead="See how fast-moving teams set up, grow and stay in sync." // c55 l1
      />
      <div className="container">
        <Hairline />
      </div>
      <LogoGrid />
      <StoriesGrid />
      <div className="container pb-px">
        <Hairline />
      </div>
      <QuoteReveal
        quote="We moved the whole pipeline over in a week, and now every deal sits where the team can see it." // 2 lines at 1440
        name="Mara Okonkwo" // c12
        role="Head of Revenue at Ostra Kitchens" // c≈33
        portrait={0}
      />
      <div className="h-px" />
      <CtaAvatarWall
        line1="Join the crowd." // c14
        line2="Start building with us." // c23
        primary={{ label: 'Start it today', props: {} }}
        secondary={{ label: 'Talk to sales', props: { as: Link, to: '/contact/sales' } }}
      />
    </PageShell>
  )
}
