import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { company } from '../data/content'
import {
  vibrationHeroImage,
  vibrationLabImages,
  vibrationPage as page,
} from '../data/vibration'
import './VibrationTestingPage.css'

export function VibrationTestingPage() {
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
                srcSet={vibrationHeroImage.portrait}
                width={1080}
                height={1920}
              />
              <img
                src={vibrationHeroImage.landscape}
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
          <p className="eyebrow vib-hero__eyebrow">ITC India · Laboratory</p>
          <h1 className="display vib-hero__title">Vibration Testing Lab</h1>
          <div className="vib-hero__actions">
            <a className="btn btn-solid" href="#get-testing">
              {page.cta}
            </a>
            <a className="btn btn-line vib-hero__line" href={`tel:${company.phone}`}>
              {company.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <section
        className="vib-intro factory-bg factory-bg--grid is-pattern-on"
        id="get-testing"
      >
        <div className="wrap vib-intro__grid">
          <div className="vib-intro__copy">
            <h2 className="display">What is Vibration Test?</h2>
            {page.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
            <Link className="btn btn-solid" to="/contact-us">
              {page.cta}
            </Link>
          </div>
          <figure className="vib-intro__media">
            <img
              src={vibrationLabImages[4]}
              alt="Electrodynamic shaker fixture at ITC India"
              width={900}
              height={700}
              loading="lazy"
            />
            <figcaption>Vibration shaker · Mohali laboratory</figcaption>
          </figure>
        </div>
      </section>

      <section className="vib-why factory-bg factory-bg--dots factory-bg--on-dark is-pattern-on">
        <div className="wrap vib-why__layout">
          <div className="vib-why__label">
            <h2 className="display">{page.whyTitle}</h2>
          </div>
          <div className="vib-why__body">
            {page.why.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="vib-types vib-types--split factory-bg factory-bg--hex is-pattern-on">
        <div className="wrap">
          <header className="vib-types__head">
            <h2 className="display">{page.typesTitle}</h2>
            <p>{page.typesIntro}</p>
          </header>

          <div className="vib-types__pair">
            <article className="vib-type">
              <span className="vib-type__index">01</span>
              <h3>{page.typesList[0]}</h3>
              <p>{page.sinusoidal}</p>
            </article>
            <article className="vib-type">
              <span className="vib-type__index">02</span>
              <h3>{page.typesList[1]}</h3>
              <p>{page.random}</p>
            </article>
          </div>

          <p className="vib-types__note">{page.afterTypes}</p>
        </div>
      </section>

      <section
        className="vib-standards factory-bg factory-bg--grid factory-bg--on-dark is-pattern-on"
        id="standards"
      >
        <div className="wrap vib-standards__grid">
          <div className="vib-standards__copy">
            <header className="vib-standards__head">
              <h2 className="display">{page.standardsTitle}</h2>
              <p>{page.standardsIntro}</p>
            </header>
            <ol className="vib-dir vib-dir--compact">
              {page.popularStandards.map((item, i) => (
                <li key={item.label}>
                  <span className="vib-dir__num">{String(i + 1).padStart(2, '0')}</span>
                  <div className="vib-dir__body">
                    <p className="vib-dir__code">{item.label}</p>
                  </div>
                  <Link className="vib-dir__link" to={item.href}>
                    View
                  </Link>
                </li>
              ))}
            </ol>
            <p className="vib-standards__more">{page.standardsMore}</p>
          </div>
          <figure className="vib-standards__figure">
            <img
              src={vibrationLabImages[0]}
              alt="Vibration testing standards overview"
              width={900}
              height={700}
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <section
        className="vib-distinctions factory-bg factory-bg--cross is-pattern-on"
        id="distinctions"
      >
        <div className="wrap">
          <header className="vib-distinctions__head">
            <h2 className="display">{page.distinctionsTitle}</h2>
            <p>{page.distinctionsIntro}</p>
          </header>
          <div
            className="vib-distinctions__table-wrap"
            role="region"
            aria-label="Vibration testing standards distinctions"
          >
            <table className="vib-distinctions__table">
              <thead>
                <tr>
                  <th scope="col">Standard</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {page.distinctions.map((item) => (
                  <tr key={item.title}>
                    <th scope="row">
                      <Link to={item.href}>{item.title}</Link>
                    </th>
                    <td>{item.text}</td>
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
              <h2 className="display">{page.howTitle}</h2>
              <p>{page.howIntro}</p>
            </header>
          </aside>
          <ol className="vib-timeline">
            {page.howSteps.map((step, i) => (
              <li key={step.slice(0, 36)}>
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

      <section className="vib-faq factory-bg factory-bg--dots factory-bg--on-dark is-pattern-on">
        <div className="wrap vib-faq__layout">
          <header className="vib-faq__head">
            <h2 className="display">{page.faqTitle}</h2>
            <p>
              Still unsure about scope? Call{' '}
              <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a> or reach
              us on{' '}
              <a href={page.whatsappHref} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              .
            </p>
          </header>
          <div className="vib-faq__list">
            {page.faqs.map((item, i) => (
              <details key={item.q} className="vib-faq__item">
                <summary>
                  {i + 1}. {item.q}
                </summary>
                <p>
                  <strong>Answer:</strong> {item.a}
                  {'linkSite' in item && item.linkSite ? (
                    <>
                      <Link to="/contact-us">site</Link>.
                    </>
                  ) : null}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="vib-cta factory-bg factory-bg--grid is-pattern-on">
        <div className="wrap vib-cta__inner">
          <h2 className="display">{page.cta}</h2>
          <p>
            In case of any other doubt or query feel free to reach us on Whatsapp @
            <a href={page.whatsappHref} target="_blank" rel="noreferrer">
              {company.phoneDisplay}
            </a>
            .
          </p>
          <div className="vib-cta__actions">
            <Link className="btn btn-solid" to="/contact-us">
              {page.cta}
            </Link>
            <a className="btn btn-line" href={`tel:${company.phone}`}>
              {company.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
