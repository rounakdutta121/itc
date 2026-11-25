import { Outlet, useLocation } from 'react-router-dom'
import { useMemo, useRef } from 'react'
import { TopBar } from './TopBar'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { FloatingActions } from './FloatingActions'
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import { usePageMotion } from '../hooks/usePageMotion'
import { migratedPaths } from '../data/migratedIndex'

const migratedPathSet = new Set(
  (migratedPaths as readonly string[]).map((p) => p.replace(/\/$/, '') || '/'),
)

export function SiteLayout() {
  const siteRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const path = pathname.replace(/\/$/, '') || '/'
  const isMigratedRoute = useMemo(() => migratedPathSet.has(path), [path])

  // Native scroll on long migrated articles — Lenis + blur/patterns was janky
  useSmoothScroll(!isMigratedRoute)
  usePageMotion(siteRef, [pathname], { lite: isMigratedRoute })

  return (
    <div className="site" ref={siteRef}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <TopBar />
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
