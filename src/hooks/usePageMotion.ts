import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Unique industrial motion language per section.
 * Rule: always fromTo → visible end state; cleanup resets visibility.
 */
export function usePageMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const root = scope.current
      if (!root) return

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
            { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.9 },
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
          '.topbar, .nav, .hero__content > *, .metrics__item, .services__card, .caps__item, .process__step, .products__row, .contact__form, .contact__form .field, .facility__media, .facility__panel > *, .footer__grid > *',
          { clearProps: 'all' },
        )
      }
    },
    { scope, dependencies: [] },
  )
}
