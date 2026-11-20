import { popularTests } from '../data/content'
import { SiteLink } from './SiteLink'
import './PopularTests.css'

export function PopularTests() {
  return (
    <section className="popular factory-bg factory-bg--cross" id="popular-tests">
      <div className="wrap">
        <header className="popular__head">
          <p className="eyebrow">Standards</p>
          <h2 className="display">Popular Tests and Standards</h2>
        </header>
        <ul className="popular__grid">
          {popularTests.map((item) => (
            <li key={item.label}>
              <SiteLink href={item.href}>{item.label}</SiteLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
