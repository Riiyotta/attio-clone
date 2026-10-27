import PageShell from '../components/marketing/PageShell.jsx'
import { Hairline } from '../components/marketing/primitives.jsx'
import { AppsHero, BuildWithUs, Directory, FeaturedApps } from '../components/apps/Sections.jsx'

// T4: AppsHero+IconBand -> FeaturedApps(5 chip tabs) -> Directory(search + 11 categories + 272) -> BuildWithUs.
export default function Apps() {
  return (
    <PageShell title="App directory">
      <AppsHero />
      <Hairline />
      <FeaturedApps />
      <Hairline />
      <Directory />
      <Hairline />
      <BuildWithUs />
    </PageShell>
  )
}
