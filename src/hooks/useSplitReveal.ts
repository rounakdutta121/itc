import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSplitReveal(
  containerRef: RefObject<HTMLElement | null>,
  selector = '[data-split]',
) {
  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = root.querySelectorAll<HTMLElement>(selector)

    nodes.forEach((el) => {
      const text = el.textContent?.trim() ?? ''
      if (!text) return

      el.setAttribute('aria-label', text)
      const words = text.split(/\s+/)
      el.innerHTML = words
        .map(
          (word) =>
            `<span class="split-word" aria-hidden="true"><span>${word}</span></span>`,
        )
        .join('')

      const inners = el.querySelectorAll('.split-word > span')

      if (reduced) {
        gsap.set(inners, { yPercent: 0 })
        return
      }

      gsap.set(inners, { yPercent: 110 })
      gsap.to(inners, {
        yPercent: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.04,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger && root.contains(t.trigger as Node)) t.kill()
      })
    }
  }, [containerRef, selector])
}
