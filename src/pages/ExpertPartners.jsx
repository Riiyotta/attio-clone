import PageShell from '../components/marketing/PageShell.jsx'
import { PartnerCrossLinks, ResourceCards } from '../components/marketing/Blocks.jsx'
import Faq from '../components/marketing/Faq.jsx'
import { Hairline, Section } from '../components/marketing/primitives.jsx'
import { ExpertApply, ExpertHero, Tiers, WhoWereLookingFor } from '../components/partners/Sections.jsx'
import { Steps } from '../components/partners/StepList.jsx'
import { SectionHead } from '../components/marketing/primitives.jsx'

const APPLY_ROWS = [
  [
    { name: 'firstName', label: 'First name', placeholder: 'First', error: 'Please enter your first name' },
    { name: 'lastName', label: 'Last name', placeholder: 'Last', error: 'Please enter your last name' },
  ],
  [{ name: 'email', kind: 'email', label: 'Work email', placeholder: 'Your work email', error: 'Please enter a valid address' }],
  [
    { name: 'company', label: 'Practice name', placeholder: 'Your company', error: 'Please add your practice name' },
    { name: 'size', kind: 'select', label: 'Team size', placeholder: 'Select', options: ['Just me', '2-5', '6-20', '21+'], error: 'Please choose your team size' },
  ],
  [{ name: 'details', kind: 'textarea', label: 'Recent projects', placeholder: 'Tell us about two recent client projects', error: 'Please share a recent project' }],
]

const STEPS = [
  ['Apply to the program', 'Tell us about your practice and the kind of projects you take on.'],
  ['Complete the training', 'Work through a short course on setup, data models and migrations.'],
  ['Deliver a project', 'Ship a client project with support from our partner team along the way.'],
  ['Get listed publicly', 'Appear in the expert directory, where teams can find and contact you.'],
]

const FAQ = [
  { q: 'Who can become an expert partner?', a: ['Consultants, agencies and freelancers with experience setting up sales tools for clients.'] },
  { q: 'Is there a cost to join?', a: ['No. The program is free, including the training and certification.'] },
  { q: 'How do clients find me?', a: ['Listed partners appear in the expert directory and receive matched leads from our sales team.'] },
  { q: 'How do I move up a tier?', a: ['Tiers are reviewed every quarter based on completed projects, client feedback and certifications.'] },
  { q: 'Can I work with clients in any region?', a: ['Yes. Experts work with clients worldwide, and the directory lets teams filter by language and time zone.'] },
]

// T2-f: ExpertHero -> WhoWereLookingFor -> Tiers -> PathToDirectory -> ApplyForm -> BeAnExpert -> FAQ(5) -> CrossLinks.
export default function ExpertPartners() {
  return (
    <PageShell title="Expert partners">
      <ExpertHero />
      <Hairline />
      <WhoWereLookingFor
        cols={[
          ['Hands-on builders', 'You set up workspaces end to end.'],
          ['Data minded', 'You model data cleanly and plan migrations.'],
          ['Clear communicators', 'You explain trade-offs to busy teams.'],
          ['Client focused', 'You put outcomes before hours billed.'],
          ['Always learning', 'You keep up with new features and tools.'],
        ]}
      />
      <Hairline />
      <Tiers
        tiers={[
          { name: 'Core', items: ['Directory listing', 'Partner training', 'Shared Slack-style chat', 'Monthly office hours', 'Sandbox workspace'] },
          { name: 'Advanced', items: ['Everything in Core', 'Matched client leads', 'Co-marketing slots', 'Priority partner help', 'Beta feature access'] },
          { name: 'Elite', items: ['Everything in Advanced', 'Named partner manager', 'Joint account planning', 'Featured placement', 'Annual partner summit'] },
        ]}
      />
      <Hairline />
      <div className="container flex flex-1 flex-col">
        <div className="flex w-full flex-1 flex-col border-x border-solid border-white-500">
          <SectionHead lead="Your path to the expert directory" cont="Four steps from application to your listing." />
          <Steps steps={STEPS} footer="Read the partner handbook" />
        </div>
      </div>
      <Hairline />
      <ExpertApply rows={APPLY_ROWS} />
      <Hairline />
      <Section as="section">
        <div className="grid grid-cols-12 pb-[60px] pt-[100px] lg:pt-[120px] xl:pt-40">
          <div className="col-[2/-2] flex max-w-[576px] flex-col gap-3 text-start mix-blend-multiply lg:gap-4">
            <h2 className="text-pretty text-heading-md-sm text-black-100 lg:text-heading-md">Resources for every expert</h2>
            <p className="text-pretty text-lg text-black-100 lg:text-xl">Everything you need to learn, build and support clients.</p>
          </div>
        </div>
        <div className="grid grid-cols-12 pb-[100px] lg:pb-[120px] xl:pb-40">
          <ResourceCards
            cols={3}
            className="col-[2/-2]"
            cards={[
              { icon: 'alert', title: 'Help center', desc: 'Answers to common setup questions, with guides for every feature in the product.' },
              { icon: 'star', title: 'Academy', desc: 'Short courses that take you from the basics to advanced data modeling.' },
              { icon: 'users', title: 'Community', desc: 'Meet other experts, share templates and ask the partner team anything.' },
            ]}
          />
        </div>
      </Section>
      <Hairline />
      <Faq title="Questions from experts." items={FAQ} />
      <Hairline />
      <PartnerCrossLinks current="/partners/expert-partners" title="Explore the other ways you can partner with us." sub="Pick the program that fits your skills and the way you like to work with customers." />
    </PageShell>
  )
}
