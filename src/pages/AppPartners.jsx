import PageShell from '../components/marketing/PageShell.jsx'
import { PartnerCrossLinks, QuoteReveal } from '../components/marketing/Blocks.jsx'
import Faq, { InlineLink } from '../components/marketing/Faq.jsx'
import { Hairline } from '../components/marketing/primitives.jsx'
import { AppPartnersHero, ExploreApps, TwoPaths } from '../components/partners/Sections.jsx'
import { StartBuilding } from '../components/partners/StepList.jsx'

const REST_STEPS = [
  ['Create a developer seat', 'Sign up for a free developer workspace with sample data you can safely change while you build.'],
  ['Register your app', 'Add a name, icon and redirect address, then pick the scopes your integration needs.'],
  ['Authenticate users', 'Use the standard sign-in flow so teams can connect your app in a couple of clicks.'],
  ['Call the endpoints', 'Read and write records, lists and notes. See the full {link} for every resource.', 'API reference'],
  ['Submit for review', 'Send your app for a quick review and we will list it in the directory once it passes.'],
]
const SDK_STEPS = [
  ['Install the kit', 'Add the toolkit to a new project with one command and log in with your developer seat.'],
  ['Scaffold an app', 'Generate a starter with record cards, actions and settings already wired up.'],
  ['Design your widgets', 'Build native panels with ready-made components that match the workspace look and feel.'],
  ['Preview in a sandbox', 'Run the app against a sandbox and test it with sample data. Read the {link} to learn more.', 'preview guide'],
  ['Publish to the store', 'Bundle a release, add screenshots and submit it for listing in the app directory.'],
]

const FAQ = [
  { q: 'Who can build an app?', a: [<>Any team or solo developer can build an app. Start with the <InlineLink>developer docs</InlineLink> and a free workspace.</>] },
  { q: 'Is there a fee to list an app in the store?', a: ['No. Listing is free, and approved apps appear in the directory for every team to install.'] },
  { q: 'How long does review take?', a: ['Most apps are reviewed within a week. We will reach out if anything needs to change before listing.'] },
]

// T2-d: PartnerHero -> TwoPaths -> StartBuilding -> ExploreApps -> QuoteReveal -> FAQ(3) -> CrossLinks.
export default function AppPartners() {
  return (
    <PageShell title="App partners">
      <AppPartnersHero />
      <Hairline />
      <TwoPaths
        cells={[
          ['Web API', 'Connect any service to the workspace with a stable, well-documented web interface.', 'Read the docs'],
          ['App kit', 'Build native panels and actions that live right inside the workspace pages people use.', 'Explore the app kit'],
        ]}
      />
      <Hairline />
      <StartBuilding
        head={['Start building now', 'Pick a path and follow the steps to ship your first integration.']}
        tabs={[
          ['HTTP API', 'globe'],
          ['Kit', 'terminal'],
        ]}
        stepSets={[REST_STEPS, SDK_STEPS]}
        footer="Browse example apps on the code hub"
      />
      <Hairline />
      <ExploreApps />
      <Hairline />
      <QuoteReveal
        overline="From a partner team"
        quote="Shipping our app here put us in front of the right teams overnight, and the review process was quick and friendly."
        name="Riya Desai"
        role="Head of Partnerships at Mailbridge"
        portrait={1}
        featuresLabel="Favorite features to build on"
        features={[
          ['coin', 'Deals'],
          ['flow', 'Workflows'],
          ['note', 'Notes'],
        ]}
      />
      <Hairline />
      <Faq title="Questions from builders." items={FAQ} />
      <Hairline />
      <PartnerCrossLinks current="/partners/app-partners" title="Other ways to partner." sub="Pick the program that fits your skills and the way you like to work with customers." />
    </PageShell>
  )
}
