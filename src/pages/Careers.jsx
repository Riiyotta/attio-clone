import PageShell from '../components/marketing/PageShell.jsx'
import { Hairline } from '../components/marketing/primitives.jsx'
import CareersHero from '../components/careers/Hero.jsx'
import OpenPositions from '../components/careers/OpenPositions.jsx'
import { InterviewVideo, KeepUpToDate, NewsletterBand, TeamIntro, TeamPhotos, Values } from '../components/careers/Sections.jsx'

// T2-c: CareersHero -> InterviewVideo -> TeamIntro -> TeamPhotos -> Values -> OpenPositions ->
// NewsletterBand -> KeepUpToDate (full-width 1px svg dividers between most sections).
export default function Careers() {
  return (
    <PageShell title="Careers">
      <CareersHero />
      <Hairline />
      <InterviewVideo />
      <Hairline />
      <TeamIntro />
      <TeamPhotos />
      <Hairline />
      <Values />
      <Hairline />
      <OpenPositions />
      <Hairline />
      <NewsletterBand />
      <Hairline />
      <KeepUpToDate />
    </PageShell>
  )
}
