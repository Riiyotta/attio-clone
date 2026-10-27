import PageShell from '../components/marketing/PageShell.jsx'
import { LatestArticles } from '../components/blog/Listing.jsx'
import { EngHero, Heatmap } from '../components/blog/Engineering.jsx'
import { ENG } from '../data/blog.js'

// T6 /engineering/blog (dark): EngHero(ASCII art + 3 cards) -> LatestArticles(6 filters, 13 rows)
// -> ContributionHeatmap + careers CTA. Header is dark from load.
export default function EngineeringBlog() {
  return (
    <PageShell title="Engineering blog" headerDark mainClassName="bg-black-50">
      <EngHero data={ENG} />
      <LatestArticles data={ENG} dark />
      <Heatmap data={ENG} />
    </PageShell>
  )
}
