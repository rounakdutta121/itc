import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom'
import { SiteLayout } from './components/SiteLayout'
import { HomePage } from './pages/HomePage'
import { VibrationTestingPage } from './pages/VibrationTestingPage'
import { VibrationStandardPage } from './pages/VibrationStandardPage'
import { DropTestingPage } from './pages/DropTestingPage'
import { SaltTestingPage } from './pages/SaltTestingPage'
import { SaltStandardPage } from './pages/SaltStandardPage'
import { Jss55555Page } from './pages/Jss55555Page'
import { AboutPage } from './pages/AboutPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { MigratedPage } from './pages/MigratedPage'
import { GonePage } from './pages/GonePage'
import { getVibrationStandardDetail } from './data/vibration'
import { getSaltStandardDetail } from './data/salt'
import {
  migratedDeletes,
  migratedPaths,
  migratedRedirects,
} from './data/migratedIndex'
import './styles/global.css'
import './styles/factory-patterns.css'
import './styles/responsive.css'

const migratedPathSet = new Set<string>(migratedPaths as readonly string[])
const deleteSet = new Set<string>(migratedDeletes as readonly string[])

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

function SaltLegacyStandardRedirect() {
  const { standard } = useParams()
  return <Navigate to={`/salt-spray-testing/${standard ?? ''}`} replace />
}

function MigratedCatchAll() {
  const { pathname } = useLocation()
  const path = pathname.replace(/\/$/, '') || '/'
  if (deleteSet.has(path)) return <GonePage />
  if (migratedPathSet.has(path)) return <MigratedPage />
  return <PlaceholderPage />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="vibration-testing" element={<VibrationTestingPage />} />
          <Route
            path="vibration-testing/jss-55555"
            element={<Navigate to="/jss-55555-testing" replace />}
          />
          <Route
            path="vibration-testing/:standard"
            element={<VibrationStandardRoute />}
          />
          <Route path="drop-testing" element={<DropTestingPage />} />
          <Route
            path="drop-testing/:standard"
            element={<PlaceholderPage title="Drop standard" />}
          />
          <Route path="salt-spray-testing" element={<SaltTestingPage />} />
          <Route
            path="salt-spray-testing/:standard"
            element={<SaltStandardRoute />}
          />
          <Route
            path="salt-testing"
            element={<Navigate to="/salt-spray-testing" replace />}
          />
          <Route
            path="salt-testing/:standard"
            element={<SaltLegacyStandardRedirect />}
          />
          <Route path="jss-55555-testing" element={<Jss55555Page />} />
          <Route
            path="jss-55555"
            element={<Navigate to="/jss-55555-testing" replace />}
          />
          <Route path="about-us" element={<AboutPage />} />

          {migratedRedirects.map((r) => (
            <Route
              key={`redir-${r.from}`}
              path={r.from.replace(/^\//, '')}
              element={<Navigate to={r.to} replace />}
            />
          ))}

          {migratedDeletes.map((d) => (
            <Route
              key={`gone-${d}`}
              path={d.replace(/^\//, '')}
              element={<GonePage />}
            />
          ))}

          {/* Explicit migrated leaf + nested paths via splat */}
          <Route path="*" element={<MigratedCatchAll />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
