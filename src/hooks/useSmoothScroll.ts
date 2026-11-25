import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !enabled) return

    const lenis = new Lenis({
      duration: 0.95,
      smoothWheel: true,
      touchMultiplier: 1.2,
      wheelMultiplier: 0.95,
      allowNestedScroll: true,
      prevent: (node) =>
        Boolean(
          node.closest(
            '[data-lenis-prevent], .nav__fly, .nav__fly-cats, .nav__fly-stage, .nav__fly-detail, .nav__drawer, #mobile-nav, .migrated-side__nav',
          ),
        ),
    })

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [enabled])
}
