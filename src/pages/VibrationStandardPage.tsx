import { Link, useParams } from 'react-router-dom'
import { company } from '../data/content'
import { getVibrationStandardDetail } from '../data/vibration'
import './VibrationStandardPage.css'

export function VibrationStandardPage() {
  const { standard } = useParams()
  const detail = getVibrationStandardDetail(standard ?? '')

  if (!detail) return null


  return (
    <div className="vib-std">
      <section className="vib-std__hero factory-bg factory-bg--grid">
        <div className="wrap vib-std__hero-inner">
          <p className="eyebrow">Vibration standard</p>
          <p className="vib-std__code">{detail.code}</p>
          <h1 className="display">{detail.title}</h1>
          <p className="vib-std__lede">{detail.lede}</p>
          <p className="vib-std__meta">
            {detail.method} · {detail.editionNote}
          </p>
          <div className="vib-std__actions">
            <a className="btn btn-solid" href={`tel:${company.phone}`}>
              Book this test
            </a>
            <Link className="btn btn-line" to="/vibration-testing">
              All vibration standards
            </Link>
          </div>
        </div>
      </section>

      <section className="vib-std__who factory-bg factory-bg--dots factory-bg--on-dark">
        <div className="wrap vib-std__split">
          <header>
            <p className="eyebrow">Who it is for</p>
            <h2 className="display">Typical use case</h2>
          </header>
          <p>{detail.whoFor}</p>
        </div>
      </section>

      <section className="vib-std__cover factory-bg factory-bg--hex">
        <div className="wrap">
          <header className="vib-std__section-head">
            <p className="eyebrow">Lab coverage</p>
            <h2 className="display">What we cover under this method</h2>
          </header>
          <ol className="vib-std__list">
            {detail.whatWeCover.map((item, i) => (
              <li key={item}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="vib-std__flow factory-bg factory-bg--grid">
        <div className="wrap vib-std__split">
          <header>
            <p className="eyebrow">Floor method</p>
            <h2 className="display">How the run is organised</h2>
          </header>
          <ol className="vib-std__steps">
            {detail.labFlow.map((step, i) => (
              <li key={step}>
                <span>Step {String(i + 1).padStart(2, '0')}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="vib-std__out factory-bg factory-bg--hatch factory-bg--on-dark">
        <div className="wrap">
          <header className="vib-std__section-head">
            <p className="eyebrow">Deliverables</p>
            <h2 className="display">What you leave with</h2>
          </header>
          <ul className="vib-std__outcomes">
            {detail.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="vib-std__actions">
            <a className="btn btn-solid" href={`tel:${company.phone}`}>
              {company.phoneDisplay}
            </a>
            <Link className="btn btn-line vib-std__line" to="/vibration-testing#standards">
              Back to standards list
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
