import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const lenis = new Lenis({
      duration: 0.95,
      smoothWheel: true,
      touchMultiplier: 1.2,
      wheelMultiplier: 0.95,
      allowNestedScroll: true,
      prevent: (node) =>
        Boolean(
          node.closest(
            '[data-lenis-prevent], .nav__mega, .nav__mega-cats, .nav__mega-panel, .nav__mega-nested, .nav__drawer, #mobile-nav',
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
  }, [])
}
