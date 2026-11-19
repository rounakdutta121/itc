import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { company } from '../data/content'
import {
  vibrationCompare,
  vibrationFaqs,
  vibrationGallery,
  vibrationHeroSlides,
  vibrationIntro,
  vibrationLabImages,
  vibrationProcess,
  vibrationStandards,
  vibrationTypes,
} from '../data/vibration'
import { LabGallery } from '../components/LabGallery'
import './VibrationTestingPage.css'

export function VibrationTestingPage() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % vibrationHeroSlides.length)
    }, 5500)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="vib">
      <section className="vib-hero" id="top">
        <div className="vib-hero__media" aria-hidden="true">
          <div className="vib-hero__slides">
            {vibrationHeroSlides.map((slide, i) => (
              <div
                key={slide.landscape}
                className={`vib-hero__slide${i === active ? ' is-active' : ''}`}
              >
                <picture>
                  <source
                    media="(max-width: 767px)"
                    srcSet={slide.portrait}
                    width={1080}
                    height={1920}
                  />
                  <img
                    src={slide.landscape}
                    alt=""
                    width={1920}
                    height={1080}
                    fetchPriority={i === 0 ? 'high' : 'low'}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </picture>
              </div>
            ))}
          </div>
          <div className="vib-hero__veil" />
        </div>

        <div className="vib-hero__content">
          <p className="eyebrow vib-hero__eyebrow">{vibrationIntro.eyebrow}</p>
          <h1 className="display vib-hero__title">
            Vibration
            <span>testing laboratory</span>
          </h1>
          <p className="vib-hero__lede">{vibrationIntro.lede}</p>
          <div className="vib-hero__actions">
            <a className="btn btn-solid" href="#standards">
              View standards
            </a>
            <a className="btn btn-line vib-hero__line" href={`tel:${company.phone}`}>
              {company.phoneDisplay}
            </a>
          </div>
          <div className="vib-hero__dots" aria-hidden="true">
            {vibrationHeroSlides.map((slide, i) => (
              <button
                key={slide.landscape}
                type="button"
                className={i === active ? 'is-active' : undefined}
                onClick={() => setActive(i)}
                aria-label={`Show slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Beige — editorial split */}
      <section className="vib-intro factory-bg factory-bg--grid is-pattern-on">
        <div className="wrap vib-intro__grid">
          <div className="vib-intro__copy">
            <p className="eyebrow">What is vibration testing?</p>
            <h2 className="display">Simulated load. Clear evidence.</h2>
            {vibrationIntro.body.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
            <Link className="btn btn-solid" to="/contact-us">
              Get vibration testing done
            </Link>
          </div>
          <figure className="vib-intro__media">
            <img
              src={vibrationLabImages[0]}
              alt="Vibration testing standards overview — global compliance map"
              width={900}
              height={700}
              loading="lazy"
            />
            <figcaption>Vibration standards · Global compliance map</figcaption>
          </figure>
        </div>
      </section>

      {/* Navy — statement band */}
      <section className="vib-why factory-bg factory-bg--dots factory-bg--on-dark is-pattern-on">
        <div className="wrap vib-why__layout">
          <div className="vib-why__label">
            <p className="eyebrow">Why it matters</p>
            <h2 className="display">Why do we need vibration testing?</h2>
          </div>
          <blockquote className="vib-why__quote">
            <p>{vibrationIntro.why}</p>
          </blockquote>
          <ul className="vib-why__signals" aria-label="Key outcomes">
            <li>
              <strong>Structure</strong>
              <span>Fault exposure before service</span>
            </li>
            <li>
              <strong>Function</strong>
              <span>Response under dynamic load</span>
            </li>
            <li>
              <strong>Evidence</strong>
              <span>Standards-backed reporting</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Beige — asymmetric modes */}
      <section className="vib-types factory-bg factory-bg--hex is-pattern-on">
        <div className="wrap vib-types__layout">
          <header className="vib-types__head">
            <p className="eyebrow">Modes</p>
            <h2 className="display">Types of vibration testing</h2>
            <p>
              Modes change with the governing standard. In practice, programmes
              fall into two primary methods.
            </p>
          </header>
          <div className="vib-types__stack">
            {vibrationTypes.map((item, i) => (
              <article key={item.title} className="vib-type">
                <span className="vib-type__index">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="vib-type__aka">{item.aka}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Navy — standards directory */}
      <section className="vib-standards factory-bg factory-bg--grid factory-bg--on-dark is-pattern-on" id="standards">
        <div className="wrap">
          <header className="vib-standards__head">
            <div>
              <p className="eyebrow">Coverage</p>
              <h2 className="display">Popular standards</h2>
            </div>
            <p>
              Commercial, defense, railway and packaging programmes — each row
              links to its dedicated page.
            </p>
          </header>
          <ol className="vib-dir">
            {vibrationStandards.map((item, i) => (
              <li key={item.slug}>
                <span className="vib-dir__num">{String(i + 1).padStart(2, '0')}</span>
                <div className="vib-dir__body">
                  <p className="vib-dir__code">{item.code}</p>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </div>
                <Link className="vib-dir__link" to={item.href}>
                  Open
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Beige — standards comparison */}
      <section
        className="vib-compare factory-bg factory-bg--cross is-pattern-on"
        id="compare"
      >
        <div className="wrap">
          <header className="vib-compare__head">
            <p className="eyebrow">Distinctions</p>
            <h2 className="display">How the programmes differ</h2>
            <p>
              Scope, method and sector shift by standard. Use this map to shortlist
              a programme, then open the dedicated page for lab detail.
            </p>
          </header>
          <div
            className="vib-compare__table-wrap"
            role="region"
            aria-label="Standards comparison"
          >
            <table className="vib-compare__table">
              <thead>
                <tr>
                  <th scope="col">Standard</th>
                  <th scope="col">Method</th>
                  <th scope="col">Sector</th>
                  <th scope="col">Focus</th>
                </tr>
              </thead>
              <tbody>
                {vibrationCompare.map((row) => (
                  <tr key={row.code}>
                    <th scope="row">{row.code}</th>
                    <td>{row.method}</td>
                    <td>{row.sector}</td>
                    <td>{row.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Navy — vertical timeline */}
      <section className="vib-process factory-bg factory-bg--grid factory-bg--on-dark is-pattern-on">
        <div className="wrap vib-process__layout">
          <aside className="vib-process__aside">
            <header className="vib-process__head">
              <p className="eyebrow">Method</p>
              <h2 className="display">How testing is performed</h2>
              <p>
                Procedures vary by standard. This is the floor overview from intake
                to report.
              </p>
            </header>
          </aside>
          <ol className="vib-timeline">
            {vibrationProcess.map((step, i) => (
              <li key={step}>
                <span className="vib-timeline__node" aria-hidden="true" />
                <div>
                  <span className="vib-timeline__step">
                    Step {String(i + 1).padStart(2, '0')}
                  </span>
                  <p>{step}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <LabGallery
        eyebrow="Methods"
        title="Response, resonance & severity setups"
        items={vibrationGallery}
      />

      {/* Navy — FAQ split */}
      <section className="vib-faq factory-bg factory-bg--dots factory-bg--on-dark is-pattern-on">
        <div className="wrap vib-faq__layout">
          <header className="vib-faq__head">
            <p className="eyebrow">FAQ</p>
            <h2 className="display">Questions we hear first</h2>
            <p>
              Still unsure about scope? Call{' '}
              <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a> or{' '}
              <Link to="/contact-us">book a consultation</Link>.
            </p>
          </header>
          <div className="vib-faq__list">
            {vibrationFaqs.map((item) => (
              <details key={item.q} className="vib-faq__item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Beige — CTA */}
      <section className="vib-cta factory-bg factory-bg--grid is-pattern-on">
        <div className="wrap vib-cta__inner">
          <p className="eyebrow">Next step</p>
          <h2 className="display">Get vibration testing done</h2>
          <p>
            Share product scope, target standard and timeline — we will map the
            right sine or random programme on our Mohali floor.
          </p>
          <div className="vib-cta__actions">
            <Link className="btn btn-solid" to="/contact-us">
              Book a consultation
            </Link>
            <a className="btn btn-line" href={`mailto:${company.email}`}>
              {company.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
