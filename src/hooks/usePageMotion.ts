import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type PageMotionOptions = {
  /** Skip heavy ScrollTrigger / Lenis-coupled motion (migrated article pages). */
  lite?: boolean
}

/**
 * Unique industrial motion language per section.
 * Rule: always fromTo → visible end state; cleanup resets visibility.
 */
export function usePageMotion(
  scope: RefObject<HTMLElement | null>,
  deps: unknown[] = [],
  options: PageMotionOptions = {},
) {
  const { lite = false } = options
  useGSAP(
    () => {
      const root = scope.current
      if (!root) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        root.querySelectorAll('.factory-bg').forEach((section) => {
          section.classList.add('is-pattern-on')
        })
        return
      }

      if (lite) {
        root.querySelectorAll('.factory-bg').forEach((section) => {
          section.classList.add('is-pattern-on')
        })
        const ctx = gsap.context(() => {
          gsap.fromTo(
            '.topbar',
            { yPercent: -40, opacity: 0.85 },
            { yPercent: 0, opacity: 1, duration: 0.35, ease: 'power2.out', clearProps: 'all' },
          )
          gsap.fromTo(
            '.nav',
            { y: -10, opacity: 0.85 },
            { y: 0, opacity: 1, duration: 0.35, delay: 0.04, ease: 'power2.out', clearProps: 'all' },
          )
        }, root)
        return () => ctx.revert()
      }

      const ctx = gsap.context(() => {
        // --- Chrome: stamp-down ---
        gsap.fromTo(
          '.topbar',
          { yPercent: -100 },
          { yPercent: 0, duration: 0.55, ease: 'power3.out', clearProps: 'transform' },
        )
        gsap.fromTo(
          '.nav',
          { y: -18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, delay: 0.08, ease: 'power3.out', clearProps: 'transform' },
        )

        // --- Hero: word cascade + button punch ---
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        heroTl
          .fromTo(
            '.hero__eyebrow',
            { scale: 0.7, opacity: 0, rotate: -4 },
            { scale: 1, opacity: 1, rotate: 0, duration: 0.55, clearProps: 'transform' },
            0.1,
          )
          .fromTo(
            '.hero__title',
            { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
            { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.9, clearProps: 'clipPath' },
            0.2,
          )
          .fromTo(
            '.hero__lede',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, clearProps: 'transform' },
            0.45,
          )
          .fromTo(
            '.hero__actions .btn',
            { y: 24, opacity: 0, scale: 0.92 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.1,
              clearProps: 'transform',
            },
            0.6,
          )
          .fromTo(
            '.hero__dots',
            { opacity: 0 },
            { opacity: 1, duration: 0.4 },
            0.85,
          )

        // --- Metrics: gauge fill (scaleX from left) ---
        ScrollTrigger.batch('.metrics__item', {
          start: 'top 88%',
          once: true,
          onEnter: (els) => {
            gsap.fromTo(
              els,
              { scaleX: 0.15, opacity: 0, transformOrigin: 'left center' },
              {
                scaleX: 1,
                opacity: 1,
                duration: 0.7,
                stagger: 0.1,
                ease: 'power2.out',
                clearProps: 'transform',
              },
            )
            const values = els
              .map((el) => el.querySelector('strong'))
              .filter(Boolean)
            if (values.length) {
              gsap.fromTo(
                values,
                { y: 16, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.5,
                  stagger: 0.1,
                  delay: 0.15,
                  ease: 'power3.out',
                  clearProps: 'transform',
                },
              )
            }
          },
        })

        // --- Services: bay doors (clip from sides) ---
        gsap.fromTo(
          '.services__head > *',
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.65,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: { trigger: '.services__head', start: 'top 85%', once: true },
          },
        )
        ScrollTrigger.batch('.services__card', {
          start: 'top 90%',
          once: true,
          onEnter: (els) => {
            gsap.fromTo(
              els,
              { clipPath: 'inset(0 50% 0 50%)', opacity: 0.2 },
              {
                clipPath: 'inset(0 0% 0 0%)',
                opacity: 1,
                duration: 0.75,
                stagger: 0.07,
                ease: 'power3.inOut',
              },
            )
          },
        })

        // --- Facility: split shutter ---
        const facility = root.querySelector('.facility')
        if (facility) {
          gsap.fromTo(
            '.facility__media',
            { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: 1,
              ease: 'power3.inOut',
              scrollTrigger: { trigger: facility, start: 'top 75%', once: true },
            },
          )
          gsap.fromTo(
            '.facility__panel > *',
            { x: 40, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.65,
              stagger: 0.09,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: { trigger: facility, start: 'top 75%', once: true },
            },
          )
        }

        // --- Capabilities: drop from overhead crane ---
        gsap.fromTo(
          '.caps__head > *',
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: { trigger: '.caps__head', start: 'top 85%', once: true },
          },
        )
        ScrollTrigger.batch('.caps__item', {
          start: 'top 88%',
          once: true,
          onEnter: (els) => {
            gsap.fromTo(
              els,
              { y: -48, opacity: 0, rotate: -2 },
              {
                y: 0,
                opacity: 1,
                rotate: 0,
                duration: 0.75,
                stagger: 0.1,
                ease: 'bounce.out',
                clearProps: 'transform',
              },
            )
          },
        })

        // --- Process: conveyor belt left→right ---
        gsap.fromTo(
          '.process__head > *',
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power2.out',
            clearProps: 'transform',
            scrollTrigger: { trigger: '.process__head', start: 'top 85%', once: true },
          },
        )
        ScrollTrigger.batch('.process__step', {
          start: 'top 90%',
          once: true,
          onEnter: (els) => {
            gsap.fromTo(
              els,
              { x: -60, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.12,
                ease: 'power2.out',
                clearProps: 'transform',
              },
            )
            const nums = els
              .map((el) => el.querySelector('.process__num'))
              .filter(Boolean)
            if (nums.length) {
              gsap.fromTo(
                nums,
                { scale: 0.4, opacity: 0 },
                {
                  scale: 1,
                  opacity: 1,
                  duration: 0.55,
                  stagger: 0.12,
                  delay: 0.1,
                  ease: 'back.out(1.8)',
                  clearProps: 'transform',
                },
              )
            }
          },
        })

        // --- Products: inspection scan (skew straighten) ---
        gsap.fromTo(
          '.products__intro > *',
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.65,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: { trigger: '.products__intro', start: 'top 85%', once: true },
          },
        )
        ScrollTrigger.batch('.products__row', {
          start: 'top 92%',
          once: true,
          onEnter: (els) => {
            gsap.fromTo(
              els,
              { skewX: 8, x: 40, opacity: 0 },
              {
                skewX: 0,
                x: 0,
                opacity: 1,
                duration: 0.65,
                stagger: 0.08,
                ease: 'power3.out',
                clearProps: 'transform',
              },
            )
          },
        })

        // --- Contact: dock & clamp ---
        gsap.fromTo(
          '.contact__copy > *',
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.09,
            duration: 0.6,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: { trigger: '.contact__copy', start: 'top 85%', once: true },
          },
        )
        gsap.fromTo(
          '.contact__form',
          { scale: 0.92, opacity: 0, rotateX: 8 },
          {
            scale: 1,
            opacity: 1,
            rotateX: 0,
            duration: 0.85,
            ease: 'power3.out',
            transformPerspective: 900,
            clearProps: 'transform',
            scrollTrigger: { trigger: '.contact__form', start: 'top 88%', once: true },
          },
        )
        gsap.fromTo(
          '.contact__form .field, .contact__form .btn',
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.out',
            clearProps: 'transform',
            scrollTrigger: { trigger: '.contact__form', start: 'top 86%', once: true },
          },
        )

        // --- Footer: plate settle ---
        gsap.fromTo(
          '.footer__grid > *',
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: { trigger: '.footer', start: 'top 90%', once: true },
          },
        )

        // --- Vibration / handcrafted lab pages (not migrated articles) ---
        if (root.querySelector('.vib:not(.migrated-page)')) {
          const vibHero = gsap.timeline({ defaults: { ease: 'power3.out' } })
          vibHero
            .fromTo(
              '.vib-hero__eyebrow',
              { scale: 0.7, opacity: 0, rotate: -4 },
              { scale: 1, opacity: 1, rotate: 0, duration: 0.55, clearProps: 'transform' },
              0.1,
            )
            .fromTo(
              '.vib-hero__title',
              { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
              { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.9 },
              0.2,
            )
            .fromTo(
              '.vib-hero__lede',
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, clearProps: 'transform' },
              0.45,
            )
            .fromTo(
              '.vib-hero__actions .btn',
              { y: 24, opacity: 0, scale: 0.92 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.1,
                clearProps: 'transform',
              },
              0.6,
            )
            .fromTo(
              '.vib-hero__dots',
              { opacity: 0 },
              { opacity: 1, duration: 0.4 },
              0.85,
            )

          // Intro: split reveal
          gsap.fromTo(
            '.vib-intro__copy > *',
            { x: -36, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.7,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: { trigger: '.vib-intro', start: 'top 80%', once: true },
            },
          )
          gsap.fromTo(
            '.vib-intro__media',
            { clipPath: 'inset(0 0 0 100%)', opacity: 1 },
            {
              clipPath: 'inset(0 0 0 0%)',
              duration: 0.95,
              ease: 'power3.inOut',
              scrollTrigger: { trigger: '.vib-intro', start: 'top 80%', once: true },
            },
          )

          // Why: quote rise + signals
          gsap.fromTo(
            '.vib-why__label > *',
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.65,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: { trigger: '.vib-why', start: 'top 82%', once: true },
            },
          )
          gsap.fromTo(
            '.vib-why__quote',
            { x: 40, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: { trigger: '.vib-why', start: 'top 82%', once: true },
            },
          )
          ScrollTrigger.batch('.vib-why__signals li', {
            start: 'top 92%',
            once: true,
            onEnter: (els) => {
              gsap.fromTo(
                els,
                { y: 28, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.55,
                  stagger: 0.1,
                  ease: 'power2.out',
                  clearProps: 'transform',
                },
              )
            },
          })

          // Types: index punch + copy slide
          gsap.fromTo(
            '.vib-types__head > *',
            { y: 22, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.6,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: { trigger: '.vib-types', start: 'top 82%', once: true },
            },
          )
          ScrollTrigger.batch('.vib-type', {
            start: 'top 90%',
            once: true,
            onEnter: (els) => {
              gsap.fromTo(
                els,
                { x: 48, opacity: 0 },
                {
                  x: 0,
                  opacity: 1,
                  duration: 0.7,
                  stagger: 0.14,
                  ease: 'power3.out',
                  clearProps: 'transform',
                },
              )
              const indexes = els
                .map((el) => el.querySelector('.vib-type__index'))
                .filter(Boolean)
              if (indexes.length) {
                gsap.fromTo(
                  indexes,
                  { scale: 0.4, opacity: 0 },
                  {
                    scale: 1,
                    opacity: 1,
                    duration: 0.55,
                    stagger: 0.14,
                    delay: 0.08,
                    ease: 'back.out(1.7)',
                    clearProps: 'transform',
                  },
                )
              }
            },
          })

          // Standards: card cascade
          gsap.fromTo(
            '.vib-standards__head > *',
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.6,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: { trigger: '.vib-standards', start: 'top 82%', once: true },
            },
          )
          ScrollTrigger.batch('.vib-dir > li', {
            start: 'top 92%',
            once: true,
            onEnter: (els) => {
              gsap.fromTo(
                els,
                { y: 40, opacity: 0, scale: 0.96 },
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 0.65,
                  stagger: 0.07,
                  ease: 'power3.out',
                  clearProps: 'transform',
                },
              )
            },
          })

          // Process: timeline draw
          gsap.fromTo(
            '.vib-process__head > *',
            { x: -28, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.65,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: { trigger: '.vib-process', start: 'top 82%', once: true },
            },
          )
          ScrollTrigger.batch('.vib-timeline > li', {
            start: 'top 90%',
            once: true,
            onEnter: (els) => {
              gsap.fromTo(
                els,
                { x: -30, opacity: 0 },
                {
                  x: 0,
                  opacity: 1,
                  duration: 0.6,
                  stagger: 0.1,
                  ease: 'power2.out',
                  clearProps: 'transform',
                },
              )
              const nodes = els
                .map((el) => el.querySelector('.vib-timeline__node'))
                .filter(Boolean)
              if (nodes.length) {
                gsap.fromTo(
                  nodes,
                  { scale: 0, opacity: 0 },
                  {
                    scale: 1,
                    opacity: 1,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: 'back.out(2)',
                    clearProps: 'transform',
                  },
                )
              }
            },
          })

          // Gallery: shutter + rail
          gsap.fromTo(
            '.vib-gallery__head > *',
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.55,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: { trigger: '.vib-gallery', start: 'top 82%', once: true },
            },
          )
          gsap.fromTo(
            '.vib-gallery__feature',
            { clipPath: 'inset(12% 12% 12% 12%)', opacity: 0.4 },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: '.vib-gallery__mosaic', start: 'top 85%', once: true },
            },
          )
          ScrollTrigger.batch('.vib-gallery__rail figure, .vib-gallery__strip figure', {
            start: 'top 92%',
            once: true,
            onEnter: (els) => {
              gsap.fromTo(
                els,
                { y: 28, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.55,
                  stagger: 0.07,
                  ease: 'power2.out',
                  clearProps: 'transform',
                },
              )
            },
          })

          // FAQ: list unfold
          gsap.fromTo(
            '.vib-faq__head > *',
            { y: 22, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.6,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: { trigger: '.vib-faq', start: 'top 82%', once: true },
            },
          )
          ScrollTrigger.batch('.vib-faq__item', {
            start: 'top 94%',
            once: true,
            onEnter: (els) => {
              gsap.fromTo(
                els,
                { y: 18, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.5,
                  stagger: 0.08,
                  ease: 'power2.out',
                  clearProps: 'transform',
                },
              )
            },
          })

          // CTA: dock
          gsap.fromTo(
            '.vib-cta__inner > *',
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.65,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: { trigger: '.vib-cta', start: 'top 85%', once: true },
            },
          )
        }

        // Pattern wash-in when section enters
        gsap.utils.toArray<HTMLElement>('.factory-bg').forEach((section) => {
          gsap.fromTo(
            section,
            { '--pattern-ops': 0 } as gsap.TweenVars,
            {
              duration: 0.01,
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                once: true,
                onEnter: () => section.classList.add('is-pattern-on'),
              },
            },
          )
        })

        requestAnimationFrame(() => ScrollTrigger.refresh())
      }, root)

      return () => {
        ctx.revert()
        gsap.set(
          '.topbar, .nav, .hero__content > *, .metrics__item, .services__card, .caps__item, .process__step, .products__row, .contact__form, .contact__form .field, .facility__media, .facility__panel > *, .footer__grid > *, .vib-hero__content > *, .vib-intro__copy > *, .vib-intro__media, .vib-why__label > *, .vib-why__quote, .vib-why__signals li, .vib-types__head > *, .vib-type, .vib-standards__head > *, .vib-dir > li, .vib-process__head > *, .vib-timeline > li, .vib-gallery__head > *, .vib-gallery__feature, .vib-gallery__rail figure, .vib-gallery__strip figure, .vib-faq__head > *, .vib-faq__item, .vib-cta__inner > *',
          { clearProps: 'all' },
        )
      }
    },
    { scope, dependencies: [...deps, lite] },
  )
}
