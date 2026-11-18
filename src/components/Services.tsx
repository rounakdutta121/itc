import { services } from '../data/content'
import './Services.css'

export function Services() {
  return (
    <section className="services factory-bg factory-bg--grid" id="services">
      <div className="wrap">
        <header className="services__head">
          <p className="eyebrow">Testing lines</p>
          <h2 className="display">Factory-ready disciplines for compliance work</h2>
          <p>
            Twelve active testing lines engineered like production stations — clear scope,
            calibrated setups, and deliverables your team can act on.
          </p>
        </header>

        <div className="services__grid">
          {services.map((service) => (
            <article key={service.id} className="services__card">
              <div className="services__media">
                <img src={service.image} alt="" width={900} height={675} loading="lazy" />
                <span className="services__index">{service.code}</span>
              </div>
              <div className="services__body">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="#contact">
                  View Services
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
