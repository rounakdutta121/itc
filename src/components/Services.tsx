import { services } from '../data/content'
import { SiteLink } from './SiteLink'
import './Services.css'

export function Services() {
  return (
    <section className="services factory-bg factory-bg--grid" id="services">
      <div className="wrap">
        <header className="services__head">
          <p className="eyebrow">Testing Services</p>
          <h2 className="display">Testing Services for Every Product Category</h2>
          <p>
            One accredited lab for safety, EMC, environmental, photometry, medical and
            calibration work. Pick a category to see the standards we test to.
          </p>
        </header>

        <div className="services__grid">
          {services.map((service) => (
            <article key={service.id} className="services__card">
              <div className="services__media">
                <img
                  src={service.image}
                  alt=""
                  width={900}
                  height={675}
                  loading="lazy"
                />
                <span className="services__index">{service.code}</span>
              </div>
              <div className="services__body">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <SiteLink href={service.href}>
                  {service.cta}
                  <span aria-hidden="true">→</span>
                </SiteLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
