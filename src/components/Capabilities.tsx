import { capabilities } from '../data/content'
import './Capabilities.css'

export function Capabilities() {
  return (
    <section className="caps factory-bg factory-bg--hex" id="capabilities">
      <div className="wrap caps__layout">
        <header className="caps__head">
          <p className="eyebrow">Operating system</p>
          <h2 className="display">How the floor stays precise</h2>
          <p>
            Four controls that keep every bay disciplined — from method to
            schedule — so compliance work stays predictable.
          </p>
        </header>

        <div className="caps__grid">
          {capabilities.map((item, i) => (
            <article key={item.title} className="caps__item">
              <span className="caps__watermark" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="caps__index">{String(i + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
