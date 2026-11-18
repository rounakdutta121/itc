import { metrics } from '../data/content'
import './Metrics.css'

export function Metrics() {
  return (
    <section className="metrics factory-bg factory-bg--cross" aria-label="Laboratory credentials">
      <div className="wrap metrics__row">
        {metrics.map((item) => (
          <article key={item.label} className="metrics__item">
            <strong className="display">{item.value}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
