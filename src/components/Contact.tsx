import { useState, type FormEvent } from 'react'
import { company, services } from '../data/content'
import './Contact.css'

export function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="contact factory-bg factory-bg--grid factory-bg--on-dark" id="contact">
      <div className="wrap contact__grid">
        <div className="contact__copy">
          <p className="eyebrow">Book a consultation</p>
          <h2 className="display">Start your testing slot request</h2>
          <p>
            Tell us the product family and target market. Our engineers will
            return a clear next step for quotation and bay scheduling.
          </p>
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
              <label htmlFor="c-email">Email</label>
              <input id="c-email" name="email" type="email" required placeholder="you@company.com" />
            </div>
            <div className="field">
              <label htmlFor="c-phone">Mobile</label>
              <input id="c-phone" name="phone" type="tel" required placeholder={company.phoneDisplay} />
            </div>
            <div className="field">
              <label htmlFor="c-service">Testing line</label>
              <select id="c-service" name="service" required defaultValue="">
                <option value="" disabled>
                  Select a line
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
            <label htmlFor="c-details">Project details</label>
            <textarea
              id="c-details"
              name="details"
              required
              placeholder="Standards, product type, target market, timeline..."
            />
          </div>
          <button className="btn btn-solid" type="submit">
            {sent ? 'Request received' : 'Submit request'}
          </button>
        </form>
      </div>
    </section>
  )
}
