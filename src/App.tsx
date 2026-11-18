import { useRef } from 'react'
import { TopBar } from './components/TopBar'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Metrics } from './components/Metrics'
import { Services } from './components/Services'
import { Facility } from './components/Facility'
import { Capabilities } from './components/Capabilities'
import { Process } from './components/Process'
import { Products } from './components/Products'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { FloatingActions } from './components/FloatingActions'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { usePageMotion } from './hooks/usePageMotion'
import './styles/global.css'
import './styles/factory-patterns.css'
import './styles/responsive.css'

export default function App() {
  const siteRef = useRef<HTMLDivElement>(null)
  useSmoothScroll()
  usePageMotion(siteRef)

  return (
    <div className="site" ref={siteRef}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <TopBar />
      <Nav />
      <main id="main">
        <Hero />
        <Metrics />
        <Services />
        <Facility />
        <Capabilities />
        <Process />
        <Products />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
