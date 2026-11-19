import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { company } from '../data/content'
import {
  saltCompare,
  saltFaqs,
  saltGallery,
  saltHeroImage,
  saltIntro,
  saltLabImages,
  saltProcess,
  saltStandards,
  saltTypes,
} from '../data/salt'
import { LabGallery } from '../components/LabGallery'
import './VibrationTestingPage.css'

export function SaltTestingPage() {
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
                srcSet={saltHeroImage.portrait}
                width={1080}
                height={1920}
              />
              <img
                src={saltHeroImage.landscape}
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
          <p className="eyebrow vib-hero__eyebrow">{saltIntro.eyebrow}</p>
          <h1 className="display vib-hero__title">
            Salt fog
            <span>testing laboratory</span>
          </h1>
          <p className="vib-hero__lede">{saltIntro.lede}</p>
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
            <p className="eyebrow">What is salt fog testing?</p>
            <h2 className="display">Corrosion resistance. Clear evidence.</h2>
            {saltIntro.body.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
            <Link className="btn btn-solid" to="/contact-us">
              Book your appointment
            </Link>
          </div>
          <figure className="vib-intro__media">
            <img
              src={saltLabImages[0]}
              alt="Salt fog chamber at ITC India"
              width={900}
              height={700}
              loading="lazy"
            />
            <figcaption>Salt mist chamber · Controlled fog exposure</figcaption>
          </figure>
        </div>
      </section>

      <section className="vib-why factory-bg factory-bg--dots factory-bg--on-dark is-pattern-on">
        <div className="wrap vib-why__layout">
          <div className="vib-why__label">
            <p className="eyebrow">Why it matters</p>
            <h2 className="display">What does the salt fog test actually do?</h2>
          </div>
          <blockquote className="vib-why__quote">
            <p>{saltIntro.why}</p>
          </blockquote>
          <ul className="vib-why__signals" aria-label="Key outcomes">
            <li>
              <strong>Coating</strong>
              <span>Protective layer strength</span>
            </li>
            <li>
              <strong>Corrosion</strong>
              <span>Salt-laden atmosphere</span>
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
            <p className="eyebrow">Variations</p>
            <h2 className="display">Types and variations</h2>
            <p>
              The base method is salt solution spray. Temperature, pH,
              concentration and spray schedule shift with the governing standard.
            </p>
          </header>
          <div className="vib-types__stack">
            {saltTypes.map((item, i) => (
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
              Defense, IEC, ASTM, ISO, TEC and railway clauses — each row links to
              its dedicated page.
            </p>
          </header>
          <ol className="vib-dir">
            {saltStandards.map((item, i) => (
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
              Solution chemistry, spray style and sector shift by standard. Use
              this map to shortlist a programme, then open the dedicated page.
            </p>
          </header>
          <div
            className="vib-compare__table-wrap"
            role="region"
            aria-label="Salt fog standards comparison"
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
                {saltCompare.map((row) => (
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
              <h2 className="display">How salt fog testing is done</h2>
              <p>
                Exact parameters come from the referred specification. This is the
                floor overview from preparation to report.
              </p>
            </header>
          </aside>
          <ol className="vib-timeline">
            {saltProcess.map((step, i) => (
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
        eyebrow="Facility"
        title="Chamber & coupon imagery"
        items={saltGallery}
      />

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
            {saltFaqs.map((item) => (
              <details key={item.q} className="vib-faq__item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="vib-cta factory-bg factory-bg--grid is-pattern-on">
        <div className="wrap vib-cta__inner">
          <p className="eyebrow">Next step</p>
          <h2 className="display">Get salt fog testing done</h2>
          <p>
            Share product scope, target standard and exposure hours — we will map
            the right continuous or cyclic fog programme on our Mohali floor.
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
