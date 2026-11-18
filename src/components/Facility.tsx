import { company } from '../data/content'
import './Facility.css'

export function Facility() {
  return (
    <section className="facility" id="facility">
      <div className="facility__media">
        <img
          src="/images/facility.webp"
          alt="ITC India testing facility building"
          width={1400}
          height={1050}
          loading="lazy"
        />
      </div>
      <div className="facility__panel factory-bg factory-bg--hatch factory-bg--on-dark">
        <p className="eyebrow">The plant</p>
        <h2 className="display">Built like a factory. Run like a laboratory.</h2>
        <p>{company.about}</p>
        <ul>
          <li>NABL accreditation under ISO/IEC 17025</li>
          <li>BIS recognition under the CRS scheme</li>
          <li>Notified-body aligned reporting pathways</li>
        </ul>
        <a className="btn btn-solid" href="#contact">
          Plan a plant visit
        </a>
      </div>
    </section>
  )
}
