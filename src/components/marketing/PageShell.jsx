import { useEffect } from 'react'
import SiteHeader from '../SiteHeader.jsx'
import SiteFooter from '../SiteFooter.jsx'

/** Header + main + dark footer, with the homepage's overscroll colour behaviour (spec 0.2). */
export default function PageShell({ title, children, headerDark = false, footerVariant = 'dark', mainClassName }) {
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
  useEffect(() => {
    if (title) document.title = `${title} | Corvale`
  }, [title])
  return (
    <>
      <SiteHeader forceDark={headerDark} />
      <main className={mainClassName}>{children}</main>
      <SiteFooter variant={footerVariant} />
    </>
  )
}
