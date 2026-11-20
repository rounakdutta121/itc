import { processSteps } from '../data/content'
import './Process.css'

export function Process() {
  return (
    <section className="process factory-bg factory-bg--chevron factory-bg--on-dark" id="process">
      <div className="wrap">
        <header className="process__head">
          <p className="eyebrow">How it works</p>
          <h2 className="display">How Testing Works at ITC India</h2>
        </header>
        <ol className="process__line">
          {processSteps.map((step) => (
            <li key={step.step} className="process__step">
              <span className="process__num">{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
