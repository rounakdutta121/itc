import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { company } from '../data/content'
import {
  jss55555HeroImage,
  jss55555LabImages,
  jss55555Page as page,
} from '../data/jss55555'
import './VibrationTestingPage.css'

export function Jss55555Page() {
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
                srcSet={jss55555HeroImage.portrait}
                width={1080}
                height={1920}
              />
              <img
                src={jss55555HeroImage.landscape}
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
          <h1 className="display vib-hero__title vib-hero__title--long">
            JSS 55555 Testing Laboratory in India
            <span>ITC India</span>
          </h1>
          <div className="vib-hero__actions">
            <a className="btn btn-solid" href="#get-testing">
              Book an appointment now
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
            <h2 className="display">What is JSS 55555?</h2>
            {page.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
            <Link className="btn btn-solid" to="/contact-us">
              {page.cta}
            </Link>
          </div>
          <figure className="vib-intro__media">
            <img
              src={jss55555LabImages[0]}
              alt="JSS 55555 environmental testing at ITC India"
              width={900}
              height={700}
              loading="lazy"
            />
            <figcaption>Environmental testing · Mohali laboratory</figcaption>
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

          <div className="vib-types__pair vib-types__pair--four">
            {page.typesCards.map((item, i) => (
              <article key={item.title} className="vib-type">
                <span className="vib-type__index">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <p className="vib-types__note">{page.afterTypes}</p>
        </div>
      </section>

      <section
        className="vib-distinctions factory-bg factory-bg--grid factory-bg--on-dark is-pattern-on"
        id="revisions"
      >
        <div className="wrap">
          <header className="vib-distinctions__head">
            <h2 className="display">{page.distinctionsTitle}</h2>
            <p>{page.distinctionsIntro}</p>
          </header>
          <div
            className="vib-distinctions__table-wrap"
            role="region"
            aria-label="JSS 55555 revisions and modifications"
          >
            <table className="vib-distinctions__table">
              <thead>
                <tr>
                  <th scope="col">Revision</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {page.distinctions.map((item) => (
                  <tr key={item.title}>
                    <th scope="row">{item.title}</th>
                    <td>{item.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section
        className="vib-standards salt-standards salt-standards--light factory-bg factory-bg--cross is-pattern-on"
        id="tests"
      >
        <div className="wrap">
          <div className="salt-standards__panel">
            <header className="salt-standards__head">
              <p className="eyebrow">Coverage</p>
              <h2 className="display">{page.standardsTitle}</h2>
            </header>

            <div className="salt-standards__intro">
              {page.standardsIntro.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>

            <ol className="salt-standards__list">
              {page.popularStandards.map((item, i) => (
                <li key={item.label}>
                  <Link to={item.href}>
                    <span className="salt-standards__num">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="salt-standards__name">{item.label}</span>
                    <span className="salt-standards__arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
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
          <div>
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
            <p className="vib-process__close jss-disclaimer">{page.disclaimer}</p>
          </div>
        </div>
      </section>

      <section className="vib-faq vib-faq--light factory-bg factory-bg--grid is-pattern-on">
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
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="vib-cta vib-cta--dark factory-bg factory-bg--dots factory-bg--on-dark is-pattern-on">
        <div className="wrap vib-cta__inner">
          <h2 className="display">Book an appointment now</h2>
          <p>{page.cta}</p>
          <div className="vib-cta__actions">
            <Link className="btn btn-solid" to="/contact-us">
              Book an appointment now
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
