import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { company } from '../data/content'
import './ReloadShutter.css'

function ShutterPanel({ side }: { side: 'top' | 'bottom' }) {
  return (
    <div className={`shutter__panel shutter__panel--${side}`}>
      <div className="shutter__skin" aria-hidden="true">
        <span className="shutter__rib" />
        <span className="shutter__rib" />
        <span className="shutter__rib" />
        <span className="shutter__rib" />
        <span className="shutter__rib" />
      </div>
      <div className="shutter__edge" aria-hidden="true">
        <span className="shutter__bolt" />
        <span className="shutter__bolt" />
        <span className="shutter__bolt" />
        <span className="shutter__bolt" />
        <span className="shutter__bolt" />
      </div>
      <div className="shutter__bend" aria-hidden="true" />
    </div>
  )
}

/**
 * Full-document loads remount the app → shutter plays.
 * Client-side route changes keep App mounted → shutter does not remount.
 */
export function ReloadShutter() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [alive, setAlive] = useState(true)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setAlive(false)
      return
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const top = root.querySelector<HTMLElement>('.shutter__panel--top')
    const bottom = root.querySelector<HTMLElement>('.shutter__panel--bottom')
    const seam = root.querySelector<HTMLElement>('.shutter__seam')
    const brand = root.querySelector<HTMLElement>('.shutter__brand')
    const disc = root.querySelector<HTMLElement>('.shutter__disc')
    const logo = root.querySelector<HTMLElement>('.shutter__logo')
    const name = root.querySelector<HTMLElement>('.shutter__name')

    if (!top || !bottom || !seam || !brand || !disc || !logo || !name) {
      document.body.style.overflow = prevOverflow
      setAlive(false)
      return
    }

    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      document.body.style.overflow = prevOverflow
      setAlive(false)
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: finish,
    })

    gsap.set(top, { yPercent: 0 })
    gsap.set(bottom, { yPercent: 0 })
    gsap.set(seam, { opacity: 0, scaleX: 0.06, transformOrigin: '50% 50%' })
    gsap.set(brand, { opacity: 1 })
    gsap.set(disc, { opacity: 0, scale: 0.55 })
    gsap.set(logo, { opacity: 0, scale: 0.88, y: 8 })
    gsap.set(name, { opacity: 0, y: 18 })

    tl.to({}, { duration: 0.12 })
      // Full-width joint lights up first (grows from center)
      .to(seam, {
        opacity: 1,
        scaleX: 1,
        duration: 0.6,
        ease: 'power2.out',
      })
      .to(
        seam,
        {
          boxShadow:
            '0 0 18px 4px rgba(255, 255, 255, 0.75), 0 0 48px 12px rgba(212, 160, 168, 0.45)',
          duration: 0.4,
          ease: 'sine.inOut',
        },
        '-=0.2',
      )
      // White disc + logo at the joint
      .to(
        disc,
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)' },
        '-=0.1',
      )
      .to(
        logo,
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'power2.out' },
        '-=0.28',
      )
      // Company name
      .to(
        name,
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        '-=0.12',
      )
      .to({}, { duration: 0.5 })
      // Fade brand/seam, then part shutters so the site is visible in the gap
      .to([brand, seam], { opacity: 0, duration: 0.25, ease: 'power2.in' })
      .to(
        top,
        { yPercent: -110, duration: 1.05, ease: 'power3.inOut' },
        '-=0.05',
      )
      .to(
        bottom,
        { yPercent: 110, duration: 1.05, ease: 'power3.inOut' },
        '<',
      )

    return () => {
      tl.kill()
      if (!finished) {
        document.body.style.overflow = prevOverflow
      }
    }
  }, [])

  if (!alive) return null

  return (
    <div
      ref={rootRef}
      className="shutter is-active"
      aria-hidden="true"
      role="presentation"
    >
      <ShutterPanel side="top" />
      <ShutterPanel side="bottom" />
      <div className="shutter__seam" />
      <div className="shutter__brand">
        <div className="shutter__mark">
          <span className="shutter__disc" />
          <img
            className="shutter__logo"
            src="/logo.webp"
            alt=""
            width={200}
            height={64}
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <p className="shutter__name">{company.shortName}</p>
      </div>
    </div>
  )
}
