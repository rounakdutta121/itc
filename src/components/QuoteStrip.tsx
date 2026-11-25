import { SiteLink } from './SiteLink'
import './QuoteStrip.css'

type Props = {
  id?: string
  text?: string
  href?: string
  cta?: string
}

const DEFAULT_TEXT =
  'Need a test plan for your product? Tell us the standard and target market.'

export function QuoteStrip({
  id,
  text = DEFAULT_TEXT,
  href = '/contact-us',
  cta = 'Get a Quote',
}: Props) {
  return (
    <section
      className="quote-strip factory-bg factory-bg--grid factory-bg--on-dark is-pattern-on"
      id={id}
      aria-label="Get a quote"
    >
      <div className="wrap quote-strip__inner">
        <p className="quote-strip__text">{text}</p>
        <SiteLink className="btn btn-solid" href={href}>
          {cta}
        </SiteLink>
      </div>
    </section>
  )
}
