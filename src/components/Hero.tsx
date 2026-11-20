import { useEffect, useState } from 'react'
import { company, heroContent } from '../data/content'
import { SiteLink } from './SiteLink'
import './Hero.css'

export function Hero() {
  const [active, setActive] = useState(0)
  const slides = heroContent.slides
  const slide = slides[active]

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length)
    }, 5500)

    return () => window.clearInterval(id)
  }, [slides.length])

  const titleBody = (
    <>
      <span className="hero__title-line">{slide.line1}</span>
      <span className="hero__title-line hero__title-line--accent">
        {slide.line2}
        {'line2Break' in slide && slide.line2Break ? (
          <span className="hero__title-break"> {slide.line2Break}</span>
        ) : null}
      </span>
    </>
  )

  return (
    <section className="hero" id="top">
      <div className="hero__media" aria-hidden="true">
        <div className="hero__slides">
          {slides.map((item, i) => (
            <div
              key={item.landscape}
              className={`hero__slide${i === active ? ' is-active' : ''}`}
            >
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcSet={item.portrait}
                  width={1080}
                  height={1920}
                />
                <img
                  src={item.landscape}
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
        <div className="hero__veil" />
      </div>

      <div className="wrap hero__content">
        <p className="eyebrow hero__eyebrow">{heroContent.eyebrow}</p>
        {active === 0 ? (
          <h1 className="display hero__title" key={slide.landscape}>
            {titleBody}
          </h1>
        ) : (
          <>
            <h1 className="sr-only">{heroContent.title}</h1>
            <p className="display hero__title" aria-live="polite" key={slide.landscape}>
              {titleBody}
            </p>
          </>
        )}
        <p className="hero__lede">{heroContent.lede}</p>
        <div className="hero__actions">
          <SiteLink className="btn btn-solid" href={heroContent.primaryHref}>
            {heroContent.primaryCta}
          </SiteLink>
          <a className="btn btn-line hero__line" href={`tel:${company.phone}`}>
            {heroContent.secondaryCta}
          </a>
        </div>

        <div className="hero__dots" aria-hidden="true">
          {slides.map((item, i) => (
            <button
              key={item.landscape}
              type="button"
              className={`hero__dot${i === active ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
              tabIndex={-1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
