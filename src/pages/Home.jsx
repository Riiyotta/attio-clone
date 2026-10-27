import { useEffect } from 'react'
import SiteHeader from '../components/SiteHeader.jsx'
import Hero from '../components/Hero.jsx'
import CustomerLogos from '../components/CustomerLogos.jsx'
import PlatformShowcase from '../components/PlatformShowcase.jsx'
import SectionDivider from '../components/SectionDivider.jsx'
import SelfBuilding from '../components/SelfBuilding.jsx'
import UniversalContext from '../components/UniversalContext.jsx'
import ScaleStats from '../components/ScaleStats.jsx'
import CustomerStories from '../components/CustomerStories.jsx'
import SpacerRow from '../components/SpacerRow.jsx'
import Changelog from '../components/Changelog.jsx'
import FinalCta from '../components/FinalCta.jsx'
import SiteFooter from '../components/SiteFooter.jsx'

export default function Home() {
  // 0.2 overscroll colour: <html> bg is #000 at the top, #101010 once scrolled (see index.css).
  useEffect(() => {
    const root = document.documentElement
    const onScroll = () => {
      if (window.scrollY > 0) root.dataset.scrolled = ''
      else delete root.dataset.scrolled
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <CustomerLogos />
        <PlatformShowcase />
        <SectionDivider />
        <SelfBuilding />
        <SectionDivider />
        <UniversalContext />
        <SectionDivider />
        <ScaleStats />
        <CustomerStories />
        <SpacerRow />
        <SectionDivider />
        <Changelog />
        <SpacerRow />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
