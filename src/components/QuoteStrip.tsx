import { SiteLink } from './SiteLink'
import './QuoteStrip.css'

type Props = {
  id?: string
}

export function QuoteStrip({ id }: Props) {
  return (
    <section
      className="quote-strip factory-bg factory-bg--grid factory-bg--on-dark is-pattern-on"
      id={id}
      aria-label="Get a quote"
    >
      <div className="wrap quote-strip__inner">
        <p className="quote-strip__text">
          Need a test plan for your product? Tell us the standard and target market.
        </p>
        <SiteLink className="btn btn-solid" href="#contact">
          Get a Quote
        </SiteLink>
      </div>
    </section>
  )
}
