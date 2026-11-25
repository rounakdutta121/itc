import { useEffect, useState } from 'react'
import { company } from '../data/content'
import './FloatingActions.css'

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 420)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fab" aria-label="Quick contact actions">
      <a
        className="fab__btn fab__btn--call"
        href={`tel:${company.phone}`}
        aria-label={`Call ${company.phoneDisplay}`}
        title="Call"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
          <path d="M22 16.9v2.2a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.1-8.7A2 2 0 014.1 1h2.2a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L7.1 8.7a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.9 2.1z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

      <a
        className="fab__btn fab__btn--mail"
        href={`mailto:${company.email}`}
        aria-label={`Email ${company.email}`}
        title="Email"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
          <path d="M4 6h16v12H4V6z" strokeLinejoin="round" />
          <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

      <a
        className="fab__btn fab__btn--wa"
        href={`https://wa.me/${company.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        aria-label={company.whatsappLabel}
        title={company.whatsappLabel}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2c-5.5 0-9.96 4.45-9.96 9.93 0 1.75.46 3.45 1.34 4.95L2 22l5.27-1.38a9.94 9.94 0 004.77 1.21h.01c5.49 0 9.95-4.46 9.95-9.94S17.54 2 12.04 2zm5.8 14.2c-.24.68-1.4 1.25-1.94 1.33-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.93-4.36-.14-.2-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.57-.35.76-.35h.55c.18 0 .42-.07.65.5.24.58.81 2 .88 2.14.07.14.12.3.02.49-.1.2-.14.32-.28.49-.14.17-.3.38-.42.51-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.21 1.36.28.14.44.12.6-.07.16-.2.7-.81.89-1.09.19-.28.38-.23.64-.14.26.1 1.64.77 1.92.91.28.14.47.21.54.33.07.11.07.66-.17 1.34z" />
        </svg>
      </a>

      <button
        type="button"
        className={`fab__btn fab__btn--top${showTop ? ' is-on' : ''}`}
        onClick={scrollTop}
        aria-label="Back to top"
        title="Back to top"
        tabIndex={showTop ? 0 : -1}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}
