import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { company } from '../data/content'
import {
  aboutHeroImage,
  aboutLabImages,
  aboutPage as page,
  aboutSeo,
} from '../data/about'
import { QuoteStrip } from '../components/QuoteStrip'
import { Metrics } from '../components/Metrics'
import './VibrationTestingPage.css'
import './AboutPage.css'

export function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = aboutSeo.title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', aboutSeo.description)

    let canonical = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = aboutSeo.canonical
  }, [])

  return (
    <div className="vib about-page">
      <section className="vib-hero" id="top">
        <div className="vib-hero__media" aria-hidden="true">
          <div className="vib-hero__frame">
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet={aboutHeroImage.portrait}
                width={1080}
                height={1920}
              />
              <img
                src={aboutHeroImage.landscape}
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
          <h1 className="display vib-hero__title">About Company</h1>
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

      <Metrics />

      {/* 1 beige */}
      <section
        className="vib-intro factory-bg factory-bg--grid is-pattern-on"
        id="get-testing"
      >
        <div className="wrap vib-intro__grid">
          <div className="vib-intro__copy">
            <h2 className="display">About ITC India</h2>
            {page.intro.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
            <Link className="btn btn-solid" to="/contact-us">
              {page.cta}
            </Link>
          </div>
          <figure className="vib-intro__media">
            <img
              src={aboutLabImages.intro}
              alt="ITC India technical staff reviewing a product test report"
              width={900}
              height={700}
              loading="lazy"
            />
            <figcaption>Product testing · Mohali laboratory</figcaption>
          </figure>
        </div>
      </section>

      <QuoteStrip text="Need product testing at ITC India? Tell us the standard and target market." />

      {/* 2 blue */}
      <section className="vib-why factory-bg factory-bg--dots factory-bg--on-dark is-pattern-on">
        <div className="wrap vib-why__layout">
          <div className="vib-why__label">
            <h2 className="display">{page.overviewTitle}</h2>
          </div>
          <div className="vib-why__body">
            {page.overview.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 3 beige */}
      <section className="vib-types vib-types--split factory-bg factory-bg--hex is-pattern-on">
        <div className="wrap">
          <header className="vib-types__head">
            <h2 className="display">{page.whyTitle}</h2>
            {page.why.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </header>

          <div className="vib-types__pair about-factors">
            {page.whyFactors.map((item, i) => (
              <article key={`factor-${i}`} className="vib-type">
                <span className="vib-type__index">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{item}</h3>
              </article>
            ))}
          </div>

          <p className="vib-types__note">{page.whyClose}</p>
        </div>
      </section>

      <QuoteStrip text="Need durability, electrical, or packaging tests? Share the product and compliance goal." />

      {/* 4 blue */}
      <section className="vib-standards factory-bg factory-bg--grid factory-bg--on-dark is-pattern-on">
        <div className="wrap vib-standards__grid">
          <div className="vib-standards__copy">
            <header className="vib-standards__head">
              <h2 className="display">{page.accreditationsTitle}</h2>
            </header>
            {page.accreditations.map((p) => (
              <p className="about-accredit__p" key={p.slice(0, 48)}>
                {p}
              </p>
            ))}
          </div>
          <figure className="vib-standards__figure about-accredit__figure">
            <img
              src={aboutLabImages.bay}
              alt="ITC India environmental and mechanical testing bay"
              width={900}
              height={700}
              loading="lazy"
            />
            <figcaption>Accredited laboratory · ISO/IEC 17025</figcaption>
          </figure>
        </div>
      </section>

      {/* 5 beige */}
      <section className="about-flow factory-bg factory-bg--cross is-pattern-on">
        <div className="wrap about-flow__layout">
          <aside className="about-flow__aside">
            <header className="about-flow__head">
              <h2 className="display">{page.flowTitle}</h2>
              <p>{page.flowIntro}</p>
            </header>
          </aside>
          <div className="about-flow__main">
            <ol className="about-flow__timeline">
              {page.flowSteps.map((step, i) => (
                <li key={`flow-${i}`}>
                  <span className="about-flow__node" aria-hidden="true" />
                  <div>
                    <span className="about-flow__step">
                      Step {String(i + 1).padStart(2, '0')}
                    </span>
                    <p>{step}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="about-flow__close">{page.flowClose}</p>
          </div>
        </div>
      </section>

      <QuoteStrip text="Need end-to-end lab support for a tender? Tell us the standard and deadline." />

      {/* 6 blue */}
      <section className="about-choose-section factory-bg factory-bg--hex factory-bg--on-dark is-pattern-on">
        <div className="wrap">
          <header className="about-choose-section__head">
            <h2 className="display">{page.chooseTitle}</h2>
            <p>{page.chooseIntro}</p>
          </header>

          <div className="about-choose">
            {page.choosePoints.map((item, i) => (
              <article key={`choose-${i}`} className="about-choose__card">
                <span className="about-choose__index">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{item}</h3>
              </article>
            ))}
          </div>

          {page.chooseClose.map((p) => (
            <p className="about-choose-section__note" key={p.slice(0, 48)}>
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* 7 beige */}
      <section className="vib-faq vib-faq--light factory-bg factory-bg--grid is-pattern-on">
        <div className="wrap vib-faq__layout">
          <header className="vib-faq__head">
            <h2 className="display">{page.faqTitle}</h2>
            <p>
              Still unsure? Call{' '}
              <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a> or reach
              us on{' '}
              <a href={page.whatsappHref} target="_blank" rel="noreferrer">
                {company.whatsappLabel}
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

      <QuoteStrip text="Ready to book an appointment at ITC India? Share your product and test need." />

      {/* 8 blue */}
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
