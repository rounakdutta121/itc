import { useEffect } from 'react'
import { Hero } from '../components/Hero'
import { Metrics } from '../components/Metrics'
import { Services } from '../components/Services'
import { Facility } from '../components/Facility'
import { Capabilities } from '../components/Capabilities'
import { Process } from '../components/Process'
import { PopularTests } from '../components/PopularTests'
import { Products } from '../components/Products'
import { Industries } from '../components/Industries'
import { HomeFaq } from '../components/HomeFaq'
import { Contact } from '../components/Contact'
import { QuoteStrip } from '../components/QuoteStrip'
import { homeSeo } from '../data/content'

export function HomePage() {
  useEffect(() => {
    document.title = homeSeo.title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', homeSeo.description)

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = homeSeo.canonical
  }, [])

  return (
    <>
      <Hero />
      <Metrics />
      <Services />
      <QuoteStrip />
      <Facility />
      <Capabilities />
      <QuoteStrip text="Need lab capacity for environmental or safety tests? Share your standard and timeline." />
      <Process />
      <PopularTests />
      <QuoteStrip text="Ready to book testing? Tell us the product family and compliance target." />
      <Products />
      <Industries />
      <QuoteStrip text="Looking for a specific product test scope? Share the category and market." />
      <HomeFaq />
      <Contact />
    </>
  )
}
