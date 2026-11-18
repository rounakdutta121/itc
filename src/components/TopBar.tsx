import { company } from '../data/content'
import './TopBar.css'

export function TopBar() {
  return (
    <div className="topbar">
      <div className="wrap topbar__row">
        <p>Industrial Area · Sector 82, Mohali</p>
        <div className="topbar__links">
          <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </div>
      </div>
    </div>
  )
}
