import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { company } from '../data/content'
import {
  saltHeroImage,
  saltLabImages,
  saltPage as page,
} from '../data/salt'
import { QuoteStrip } from '../components/QuoteStrip'
import { Metrics } from '../components/Metrics'
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
          <p className="eyebrow vib-hero__eyebrow">ITC India · Laboratory</p>
          <h1 className="display vib-hero__title">Salt Spray Testing Lab</h1>
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

      <Metrics />

      <section
        className="salt-intro factory-bg factory-bg--grid is-pattern-on"
        id="get-testing"
      >
        <div className="wrap salt-intro__inner">
          <header className="salt-intro__head">
            <p className="eyebrow">Salt fog · Corrosion</p>
            <h2 className="display">What is Salt Fog Test?</h2>
          </header>

          <figure className="salt-intro__plate">
            <img
              src={saltLabImages[7]}
              alt="Salt fog chamber at ITC India"
              width={1200}
              height={720}
              loading="lazy"
            />
            <figcaption>Salt fog chamber · Mohali laboratory</figcaption>
          </figure>

          <div className="salt-intro__body">
            <p className="salt-intro__lead">{page.intro[0]}</p>
            <div className="salt-intro__rest">
              {page.intro.slice(1).map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            <div className="salt-intro__cta">
              <Link className="btn btn-solid" to="/contact-us">
                {page.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <QuoteStrip text="Need salt spray or corrosion testing? Tell us the standard and exposure duration." />

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

      <section className="vib-types vib-types--split salt-types factory-bg factory-bg--hex is-pattern-on">
        <div className="wrap">
          <header className="vib-types__head">
            <h2 className="display">{page.typesTitle}</h2>
            <p>{page.typesIntro}</p>
          </header>

          <div className="vib-types__pair vib-types__pair--four">
            {page.typesList.map((item, i) => (
              <article key={item} className="vib-type">
                <span className="vib-type__index">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>
                  {item.startsWith('pH ') ? (
                    <>
                      <span className="salt-types__ph">pH</span>
                      {item.slice(2)}
                    </>
                  ) : (
                    item
                  )}
                </h3>
              </article>
            ))}
          </div>

          <p className="vib-types__note">{page.afterTypes}</p>
        </div>
      </section>

      <QuoteStrip text="Need NSS, AASS, or CASS exposure? Share the coating and acceptance criteria." />

      <section
        className="vib-standards salt-standards factory-bg factory-bg--grid factory-bg--on-dark is-pattern-on"
        id="standards"
      >
        <div className="wrap">
          <div className="salt-standards__panel">
            <header className="salt-standards__head">
              <p className="eyebrow">Scope</p>
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
            aria-label="Salt fog testing standards distinctions"
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

      <QuoteStrip text="Need a salt fog standard matched to your product? Tell us the method and market." />

      <section className="vib-process factory-bg factory-bg--grid factory-bg--on-dark is-pattern-on">
        <div className="wrap vib-process__layout">
          <aside className="vib-process__aside">
            <header className="vib-process__head">
              <h2 className="display">{page.howTitle}</h2>
              <p>{page.howIntro}</p>
              <p className="vib-process__note">{page.howNote}</p>
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
            <p className="vib-process__close">{page.howClose}</p>
          </div>
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
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <QuoteStrip text="Ready to book salt fog testing? Share your specimen details and timeline." />

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
