import { useEffect } from 'react'
import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Pricing from './pages/Pricing.jsx'
import Customers from './pages/Customers.jsx'
import Startups from './pages/Startups.jsx'
import Careers from './pages/Careers.jsx'
import AppPartners from './pages/AppPartners.jsx'
import CreatorPartners from './pages/CreatorPartners.jsx'
import ExpertPartners from './pages/ExpertPartners.jsx'
import ContactSales from './pages/ContactSales.jsx'
import Apps from './pages/Apps.jsx'
import AppDetail from './pages/AppDetail.jsx'
import Blog from './pages/Blog.jsx'
import EngineeringBlog from './pages/EngineeringBlog.jsx'
import ChangelogYear from './pages/ChangelogYear.jsx'
import HelpHome from './pages/help/HelpHome.jsx'
import HelpAcademy from './pages/help/HelpAcademy.jsx'
import HelpReference from './pages/help/HelpReference.jsx'
import Architecture from './pages/Architecture.jsx'

// Reset scroll on route change, as a full page load would.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Route table. Add new pages here (one entry per route).
const ROUTES = [
  ['/', Home],
  ['/pricing', Pricing],
  ['/customers', Customers],
  ['/startups', Startups],
  ['/careers', Careers],
  ['/partners/app-partners', AppPartners],
  ['/partners/creator-partners', CreatorPartners],
  ['/partners/expert-partners', ExpertPartners],
  ['/contact/sales', ContactSales],
  ['/apps', Apps],
  ['/apps/:slug', AppDetail],
  ['/blog', Blog],
  ['/engineering/blog', EngineeringBlog],
  ['/changelog', () => <Navigate to="/changelog/2026" replace />],
  ['/changelog/:year', ChangelogYear],
  ['/help', HelpHome],
  ['/help/academy', HelpAcademy],
  ['/help/reference/attio-101', HelpReference],
  ['/architecture', Architecture],
]

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <Routes>
        {ROUTES.map(([path, Page]) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
