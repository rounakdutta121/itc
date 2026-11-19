import { Hero } from '../components/Hero'
import { Metrics } from '../components/Metrics'
import { Services } from '../components/Services'
import { Facility } from '../components/Facility'
import { Capabilities } from '../components/Capabilities'
import { Process } from '../components/Process'
import { Products } from '../components/Products'
import { Contact } from '../components/Contact'

export function HomePage() {
  return (
    <>
      <Hero />
      <Metrics />
      <Services />
      <Facility />
      <Capabilities />
      <Process />
      <Products />
      <Contact />
    </>
  )
}
