import { aboutSection } from '../data/content'
import { SiteLink } from './SiteLink'
import './Facility.css'

export function Facility() {
  return (
    <section className="facility" id="facility">
      <div className="facility__media">
        <img
          src="/images/facility.webp"
          alt="ITC India testing facility building"
          width={1400}
          height={1050}
          loading="lazy"
        />
      </div>
      <div className="facility__panel factory-bg factory-bg--hatch factory-bg--on-dark">
        <p className="eyebrow">{aboutSection.eyebrow}</p>
        <h2 className="display">{aboutSection.title}</h2>
        {aboutSection.paragraphs.map((p) => (
          <p key={p.slice(0, 48)}>{p}</p>
        ))}
        <ul>
          {aboutSection.bullets.map((item) => (
            <li key={item.label}>
              <SiteLink href={item.href}>{item.label}</SiteLink>
            </li>
          ))}
        </ul>
        <SiteLink className="btn btn-solid" href={aboutSection.ctaHref}>
          {aboutSection.cta}
        </SiteLink>
      </div>
    </section>
  )
}
