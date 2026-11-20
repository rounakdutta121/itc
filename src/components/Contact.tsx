import { useState, type FormEvent } from 'react'
import { company, contactSection, services } from '../data/content'
import './Contact.css'

export function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="contact factory-bg factory-bg--grid is-pattern-on" id="contact">
      <div className="wrap contact__grid">
        <div className="contact__copy">
          <p className="eyebrow">{contactSection.eyebrow}</p>
          <h2 className="display">{contactSection.title}</h2>
          <p>{contactSection.text}</p>
          <div className="contact__facts">
            <p>
              <strong>Plant</strong>
              <span>{company.address}</span>
            </p>
            <p>
              <strong>Phone</strong>
              <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a>
            </p>
            <p>
              <strong>Email</strong>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </p>
          </div>
        </div>

        <form className="contact__form" onSubmit={onSubmit}>
          <div className="contact__fields">
            <div className="field">
              <label htmlFor="c-name">Name</label>
              <input id="c-name" name="name" required placeholder="Full name" />
            </div>
            <div className="field">
              <label htmlFor="c-company">Company</label>
              <input id="c-company" name="company" required placeholder="Company name" />
            </div>
            <div className="field">
              <label htmlFor="c-email">Email</label>
              <input
                id="c-email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
              />
            </div>
            <div className="field">
              <label htmlFor="c-phone">Mobile</label>
              <input
                id="c-phone"
                name="phone"
                type="tel"
                required
                placeholder={company.phoneDisplay}
              />
            </div>
            <div className="field">
              <label htmlFor="c-service">Testing category</label>
              <select id="c-service" name="service" required defaultValue="">
                <option value="" disabled>
                  Select a category
                </option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="c-details">Product and standard</label>
            <textarea
              id="c-details"
              name="details"
              required
              placeholder="Product type, target standard and market..."
            />
          </div>
          <button className="btn btn-solid" type="submit">
            {sent ? contactSection.submitted : contactSection.submit}
          </button>
        </form>
      </div>
    </section>
  )
}
