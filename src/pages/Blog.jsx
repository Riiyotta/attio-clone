import PageShell from '../components/marketing/PageShell.jsx'
import { GuideRow, Hairline } from '../components/marketing/primitives.jsx'
import { FeaturedPost, LatestArticles } from '../components/blog/Listing.jsx'
import { BLOG } from '../data/blog.js'

// T6 /blog: FeaturedPost + 3 secondary -> LatestArticles (7 filters, 35 rows, ?category=) -> Spacer.
export default function Blog() {
  return (
    <PageShell title="Blog">
      <FeaturedPost data={BLOG} />
      <Hairline />
      <LatestArticles data={BLOG} />
      <Hairline />
      <div className="container">
        <div className="border-x border-solid border-white-500">
          <GuideRow heightClass="h-[100px] xl:h-40" />
        </div>
      </div>
    </PageShell>
  )
}
