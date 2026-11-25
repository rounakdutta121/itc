import { company, homeFaqs } from '../data/content'
import './HomeFaq.css'

export function HomeFaq() {
  return (
    <section className="home-faq factory-bg factory-bg--dots factory-bg--on-dark" id="faq">
      <div className="wrap home-faq__layout">
        <header className="home-faq__head">
          <p className="eyebrow">FAQ</p>
          <h2 className="display">Frequently Asked Questions</h2>
          <p>
            Still unsure about scope? Call{' '}
            <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a> or reach us on{' '}
            <a href={company.whatsappHref} target="_blank" rel="noreferrer">
              {company.whatsappLabel}
            </a>
            .
          </p>
        </header>
        <div className="home-faq__list">
          {homeFaqs.map((item, i) => (
            <details key={item.q} className="home-faq__item">
              <summary>
                {i + 1}. {item.q}
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
