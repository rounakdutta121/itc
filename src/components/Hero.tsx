import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { company } from '../data/content'
import './Hero.css'

const heroSlides = [
  {
    landscape: '/images/hero-cinematic.webp',
    portrait: '/images/hero-cinematic-portrait.webp',
  },
  {
    landscape: '/images/hero-slide-1.webp',
    portrait: '/images/hero-slide-1-portrait.webp',
  },
  {
    landscape: '/images/hero-slide-2.webp',
    portrait: '/images/hero-slide-2-portrait.webp',
  },
  {
    landscape: '/images/hero-slide-3.webp',
    portrait: '/images/hero-slide-3-portrait.webp',
  },
  {
    landscape: '/images/hero-slide-4.webp',
    portrait: '/images/hero-slide-4-portrait.webp',
  },
  {
    landscape: '/images/hero-slide-5.webp',
    portrait: '/images/hero-slide-5-portrait.webp',
  },
]

export function Hero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % heroSlides.length)
    }, 5500)

    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="hero" id="top">
      <div className="hero__media" aria-hidden="true">
        <div className="hero__slides">
          {heroSlides.map((slide, i) => (
            <div
              key={slide.landscape}
              className={`hero__slide${i === active ? ' is-active' : ''}`}
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
        <div className="hero__veil" />
      </div>

      <div className="wrap hero__content">
        <p className="eyebrow hero__eyebrow">NABL-accredited · Mohali plant</p>
        <h1 className="display hero__title">
          Electrical safety
          <span>testing laboratory</span>
        </h1>
        <p className="hero__lede">
          A precision factory for compliance — calibrated bays, accredited methods,
          and clear pathways from sample intake to market certification.
        </p>
        <div className="hero__actions">
          <Link className="btn btn-solid" to="/services">
            View services
          </Link>
          <a className="btn btn-line hero__line" href={`tel:${company.phone}`}>
            {company.phoneDisplay}
          </a>
        </div>

        <div className="hero__dots" aria-hidden="true">
          {heroSlides.map((slide, i) => (
            <button
              key={slide.landscape}
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
