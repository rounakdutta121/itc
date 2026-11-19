import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { SiteLayout } from './components/SiteLayout'
import { HomePage } from './pages/HomePage'
import { VibrationTestingPage } from './pages/VibrationTestingPage'
import { VibrationStandardPage } from './pages/VibrationStandardPage'
import { DropTestingPage } from './pages/DropTestingPage'
import { SaltTestingPage } from './pages/SaltTestingPage'
import { SaltStandardPage } from './pages/SaltStandardPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { getVibrationStandardDetail } from './data/vibration'
import { getSaltStandardDetail } from './data/salt'
import './styles/global.css'
import './styles/factory-patterns.css'
import './styles/responsive.css'

function VibrationStandardRoute() {
  const { standard } = useParams()
  if (standard && getVibrationStandardDetail(standard)) {
    return <VibrationStandardPage />
  }
  return <PlaceholderPage title="Vibration standard" />
}

function SaltStandardRoute() {
  const { standard } = useParams()
  if (standard && getSaltStandardDetail(standard)) {
    return <SaltStandardPage />
  }
  return <PlaceholderPage title="Salt fog standard" />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="vibration-testing" element={<VibrationTestingPage />} />
          <Route
            path="vibration-testing/:standard"
            element={<VibrationStandardRoute />}
          />
          <Route path="drop-testing" element={<DropTestingPage />} />
          <Route
            path="drop-testing/:standard"
            element={<PlaceholderPage title="Drop standard" />}
          />
          <Route path="salt-testing" element={<SaltTestingPage />} />
          <Route
            path="salt-testing/:standard"
            element={<SaltStandardRoute />}
          />
          <Route path="about-us" element={<PlaceholderPage title="About Us" />} />
          <Route
            path="about-us/:slug"
            element={<PlaceholderPage title="About Us" />}
          />
          <Route path="products" element={<PlaceholderPage title="Products" />} />
          <Route path="services" element={<PlaceholderPage title="Testing Services" />} />
          <Route path="contact-us" element={<PlaceholderPage title="Contact Us" />} />
          <Route
            path="contact-us/:slug"
            element={<PlaceholderPage title="Contact Us" />}
          />
          <Route path="careers" element={<PlaceholderPage title="Career in ITC" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
