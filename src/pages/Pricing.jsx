import { useState } from 'react'
import PageShell from '../components/marketing/PageShell.jsx'
import { LogoGrid } from '../components/marketing/Blocks.jsx'
import Faq from '../components/marketing/Faq.jsx'
import PricingHero from '../components/pricing/PricingHero.jsx'
import ComparisonTable from '../components/pricing/ComparisonTable.jsx'
import { FAQ, FAQ_TITLE } from '../components/pricing/data.js'

// T1: PricingHero+PlanCards(4) -> LogoGrid(12) -> ComparisonTable -> FAQ(12) -> footer.
export default function Pricing() {
  const [annual, setAnnual] = useState(true) // default = Annual
  return (
    <PageShell title="Pricing">
      <PricingHero annual={annual} setAnnual={setAnnual} />
      <div className="mt-16">
        <LogoGrid className="[&>div]:border-x-0" />
      </div>
      <ComparisonTable annual={annual} setAnnual={setAnnual} />
      <Faq title={FAQ_TITLE} items={FAQ} width="pricing" bordered={false} padClass="pb-16 pt-20 lg:pb-32 lg:pt-44" />
    </PageShell>
  )
}
