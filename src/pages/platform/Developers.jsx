import PageShell from '../../components/marketing/PageShell.jsx'
import Hero from '../../components/platform/developers/Hero.jsx'
import CardSection from '../../components/platform/developers/CardSection.jsx'
import Testimonial from '../../components/platform/developers/Testimonial.jsx'
import Heatmap from '../../components/platform/developers/Heatmap.jsx'
import AppsRow from '../../components/platform/developers/AppsRow.jsx'
import ReadyCta from '../../components/platform/developers/ReadyCta.jsx'
import { API, APPS, CTA, HEAT, HERO, MCP, SDK, TESTIMONIALS } from '../../components/platform/developers/content.jsx'

// T3 /platform/developers (CLONE_SPEC_PLATFORM section 4): whole page `.dark`, header dark from
// first paint, own closing CTA (no shared S-CTA), then the footer.
export default function Developers() {
  return (
    <PageShell title="Developers" headerDark mainClassName="dark bg-primary-background">
      <Hero data={HERO} />
      <CardSection data={API} />
      <Testimonial data={TESTIMONIALS[0]} variant={0} />
      <CardSection data={SDK} />
      <CardSection data={MCP} />
      <Heatmap data={HEAT} />
      <Testimonial data={TESTIMONIALS[1]} variant={1} />
      <AppsRow data={APPS} />
      <ReadyCta data={CTA} />
    </PageShell>
  )
}
