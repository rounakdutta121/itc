import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { company } from '../data/content'
import {
  dropCompare,
  dropFailCriteria,
  dropFaqs,
  dropGallery,
  dropHeroImage,
  dropIntro,
  dropLabImages,
  dropProcess,
  dropStandards,
  dropTypes,
} from '../data/drop'
import { LabGallery } from '../components/LabGallery'
import './VibrationTestingPage.css'

export function DropTestingPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="vib">
      <section className="vib-hero" id="top">
        <div className="vib-hero__media" aria-hidden="true">
          <div className="vib-hero__frame">
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet={dropHeroImage.portrait}
                width={1080}
                height={1920}
              />
              <img
                src={dropHeroImage.landscape}
                alt=""
                width={1920}
                height={1080}
                fetchPriority="high"
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>
          <div className="vib-hero__veil" />
        </div>

        <div className="vib-hero__content">
          <p className="eyebrow vib-hero__eyebrow">{dropIntro.eyebrow}</p>
          <h1 className="display vib-hero__title">
            Drop
            <span>testing laboratory</span>
          </h1>
          <p className="vib-hero__lede">{dropIntro.lede}</p>
          <div className="vib-hero__actions">
            <a className="btn btn-solid" href="#standards">
              View standards
            </a>
            <a className="btn btn-line vib-hero__line" href={`tel:${company.phone}`}>
              {company.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <section className="vib-intro factory-bg factory-bg--grid is-pattern-on">
        <div className="wrap vib-intro__grid">
          <div className="vib-intro__copy">
            <p className="eyebrow">What is drop testing?</p>
            <h2 className="display">Impact resistance. Clear evidence.</h2>
            {dropIntro.body.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
            <Link className="btn btn-solid" to="/contact-us">
              Book a call now
            </Link>
          </div>
          <figure className="vib-intro__media">
            <img
              src={dropLabImages[0]}
              alt="Drop testing laboratory setup at ITC India"
              width={900}
              height={700}
              loading="lazy"
            />
            <figcaption>Drop floor · Steel plate over concrete</figcaption>
          </figure>
        </div>
      </section>

      <section className="vib-why factory-bg factory-bg--dots factory-bg--on-dark is-pattern-on">
        <div className="wrap vib-why__layout">
          <div className="vib-why__label">
            <p className="eyebrow">Why it matters</p>
            <h2 className="display">Why do we need drop testing?</h2>
          </div>
          <blockquote className="vib-why__quote">
            <p>{dropIntro.why}</p>
          </blockquote>
          <ul className="vib-why__signals" aria-label="Key outcomes">
            <li>
              <strong>Impact</strong>
              <span>Survive free-fall shocks</span>
            </li>
            <li>
              <strong>Handling</strong>
              <span>Rough transport simulation</span>
            </li>
            <li>
              <strong>Evidence</strong>
              <span>Standards-backed reporting</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="vib-types factory-bg factory-bg--hex is-pattern-on">
        <div className="wrap vib-types__layout">
          <header className="vib-types__head">
            <p className="eyebrow">Varieties</p>
            <h2 className="display">How drop programmes differ</h2>
            <p>
              Each standard sets its own height, orientation and trial count. In
              practice, most programmes fall into free-fall or handling-simulation
              methods.
            </p>
          </header>
          <div className="vib-types__stack">
            {dropTypes.map((item, i) => (
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

      <section
        className="vib-standards factory-bg factory-bg--grid factory-bg--on-dark is-pattern-on"
        id="standards"
      >
        <div className="wrap">
          <header className="vib-standards__head">
            <div>
              <p className="eyebrow">Coverage</p>
              <h2 className="display">Popular standards</h2>
            </div>
            <p>
              IT, telecom, defense and Ex programmes — each row links to its
              dedicated page.
            </p>
          </header>
          <ol className="vib-dir">
            {dropStandards.map((item, i) => (
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

      <section
        className="vib-compare factory-bg factory-bg--cross is-pattern-on"
        id="compare"
      >
        <div className="wrap">
          <header className="vib-compare__head">
            <p className="eyebrow">Distinctions</p>
            <h2 className="display">How the programmes differ</h2>
            <p>
              Height, orientation and sector shift by standard. Use this map to
              shortlist a programme, then open the dedicated page for lab detail.
            </p>
          </header>
          <div
            className="vib-compare__table-wrap"
            role="region"
            aria-label="Drop standards comparison"
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
                {dropCompare.map((row) => (
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

      <section className="vib-process factory-bg factory-bg--grid factory-bg--on-dark is-pattern-on">
        <div className="wrap vib-process__layout">
          <aside className="vib-process__aside">
            <header className="vib-process__head">
              <p className="eyebrow">Method</p>
              <h2 className="display">How drop testing is performed</h2>
              <p>
                Procedures vary by standard. This is the floor overview from purpose
                to report.
              </p>
            </header>
          </aside>
          <ol className="vib-timeline">
            {dropProcess.map((step, i) => (
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

      <section className="drop-fail factory-bg factory-bg--hex is-pattern-on">
        <div className="wrap">
          <header className="drop-fail__head">
            <p className="eyebrow">Pass / fail</p>
            <h2 className="display">When equipment fails the test</h2>
            <p>
              Each standard sets acceptance clauses. Typical failure observations
              after drop include the following.
            </p>
          </header>
          <ol className="drop-fail__list">
            {dropFailCriteria.map((item, i) => (
              <li key={item}>
                <span className="drop-fail__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="drop-fail__body">
                  <h3>Criterion {String(i + 1).padStart(2, '0')}</h3>
                  <p>{item}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <LabGallery
        eyebrow="Facility"
        title="Drop floor imagery"
        items={dropGallery}
        dark
      />

      <section className="vib-faq vib-faq--light factory-bg factory-bg--dots is-pattern-on">
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
            {dropFaqs.map((item) => (
              <details key={item.q} className="vib-faq__item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="vib-cta vib-cta--dark factory-bg factory-bg--grid factory-bg--on-dark is-pattern-on">
        <div className="wrap vib-cta__inner">
          <p className="eyebrow">Next step</p>
          <h2 className="display">Get drop testing done</h2>
          <p>
            Share product scope, target standard and timeline — we will map the
            right free-fall or handling programme on our Mohali floor.
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
