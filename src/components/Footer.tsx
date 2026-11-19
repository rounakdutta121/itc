import { useState, type FormEvent } from 'react'
import { company, siteFooter } from '../data/content'
import { SiteLink } from './SiteLink'
import './Footer.css'

export function Footer() {
  const [inquirySent, setInquirySent] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const onInquiry = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const phone = String(data.get('phone') || '')
    const city = String(data.get('city') || '')
    const message = String(data.get('message') || '')
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `City: ${city}`,
      '',
      message,
    ].join('\n')
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      'Inquiry for Testing & Certification',
    )}&body=${encodeURIComponent(body)}`
    setInquirySent(true)
  }

  const onSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubscribed(true)
  }

  return (
    <footer className="footer factory-bg factory-bg--dots factory-bg--on-dark">
      <div className="wrap footer__grid">
        <div className="footer__col footer__brand">
          <img src="/logo.webp" alt="ITC India" width={140} height={44} />
          {siteFooter.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <div className="footer__col">
          <h3>{siteFooter.inquiry.title}</h3>
          <form className="footer__form" onSubmit={onInquiry}>
            <input name="name" type="text" placeholder="Name" required />
            <input name="email" type="email" placeholder="Email" required />
            <input name="phone" type="tel" placeholder="Phone/Mobile" />
            <input name="city" type="text" placeholder="City" />
            <textarea name="message" placeholder="Message" rows={3} required />
            <button className="btn btn-solid" type="submit">
              Send inquiry
            </button>
            {inquirySent ? (
              <p className="footer__note">Opening your email client…</p>
            ) : null}
          </form>
        </div>

        <div className="footer__col">
          <h3>{siteFooter.subscribe.title}</h3>
          <form className="footer__form footer__form--subscribe" onSubmit={onSubscribe}>
            <input
              name="email"
              type="email"
              placeholder={siteFooter.subscribe.placeholder}
              required
            />
            <button className="btn btn-solid" type="submit">
              Subscribe
            </button>
            {subscribed ? (
              <p className="footer__note">Thanks — we&apos;ll keep you posted.</p>
            ) : null}
          </form>
        </div>

        <div className="footer__col">
          <h3>{siteFooter.contact.title}</h3>
          <p>{siteFooter.contact.company}</p>
          <p>{siteFooter.contact.address}</p>
          <p>
            Tel :{' '}
            <a href={siteFooter.contact.phoneHref}>
              {siteFooter.contact.phoneDisplay}
            </a>
          </p>
          <p>
            <a href={`mailto:${siteFooter.contact.email}`}>
              {siteFooter.contact.email}
            </a>
          </p>
        </div>
      </div>

      <div className="footer__base">
        <div className="wrap footer__base-inner">
          <nav className="footer__menu" aria-label="Footer">
            {siteFooter.footerMenu.map((link) => (
              <SiteLink key={link.label} href={link.href}>
                {link.label}
              </SiteLink>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
