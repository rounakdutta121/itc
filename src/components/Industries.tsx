import { industries } from '../data/content'
import './Industries.css'

export function Industries() {
  return (
    <section className="industries factory-bg factory-bg--hex" id="industries">
      <div className="wrap">
        <header className="industries__head">
          <p className="eyebrow">Markets</p>
          <h2 className="display">Industries We Serve</h2>
        </header>
        <ul className="industries__grid">
          {industries.map((name) => (
            <li key={name}>
              <span className="industries__mark" aria-hidden="true" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
