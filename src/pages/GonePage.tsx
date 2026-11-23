import { Link } from 'react-router-dom'
import { company } from '../data/content'
import './PlaceholderPage.css'

export function GonePage() {
  return (
    <section className="placeholder factory-bg factory-bg--grid">
      <div className="wrap placeholder__inner">
        <p className="eyebrow">410 · Gone</p>
        <h1 className="display">This page has been removed</h1>
        <p>
          The requested content is no longer published. Browse active laboratory
          services from the home page or contact the lab for guidance.
        </p>
        <div className="placeholder__actions">
          <Link className="btn btn-solid" to="/">
            Back home
          </Link>
          <a className="btn btn-line" href={`tel:${company.phone}`}>
            {company.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  )
}
