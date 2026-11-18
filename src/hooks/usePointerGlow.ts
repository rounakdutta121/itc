import { useEffect, type RefObject } from 'react'

export function usePointerGlow(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduced || coarse) return

    const glow = root.querySelector<HTMLElement>('.pointer-glow')
    if (!glow) return

    let raf = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x
    let ty = y

    const onMove = (event: PointerEvent) => {
      tx = event.clientX
      ty = event.clientY
    }

    const tick = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [rootRef])
}
