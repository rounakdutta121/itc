import { Link, useLocation } from 'react-router-dom'
import { company } from '../data/content'
import './PlaceholderPage.css'

export function PlaceholderPage({ title }: { title?: string }) {
  const { pathname } = useLocation()
  const heading =
    title ||
    pathname
      .split('/')
      .filter(Boolean)
      .map((part) => part.replace(/-/g, ' '))
      .join(' · ')

  return (
    <section className="placeholder factory-bg factory-bg--grid">
      <div className="wrap placeholder__inner">
        <p className="eyebrow">Coming soon</p>
        <h1 className="display">{heading || 'Page'}</h1>
        <p>
          This internal page is linked and ready for content. The vibration
          testing hub is live — related standards pages will follow the same
          layout and shared header/footer.
        </p>
        <div className="placeholder__actions">
          <Link className="btn btn-solid" to="/vibration-testing">
            Vibration testing
          </Link>
          <Link className="btn btn-line" to="/">
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
