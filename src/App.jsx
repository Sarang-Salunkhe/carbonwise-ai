import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CarbonProvider } from './context/CarbonContext.jsx'
import Layout from './components/layout/Layout'
import LandingPage from './pages/LandingPage'
import CalculatorPage from './pages/CalculatorPage'
import DashboardPage from './pages/DashboardPage'
import SimulatorPage from './pages/SimulatorPage'
import ProgressPage from './pages/ProgressPage'

export default function App() {
  return (
    <CarbonProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="calculator" element={<CalculatorPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="simulator" element={<SimulatorPage />} />
            <Route path="progress" element={<ProgressPage />} />
            {/* Legacy routes — redirect to dashboard sections */}
            <Route path="recommendations" element={<Navigate to="/dashboard#recommendations" replace />} />
            <Route path="coach" element={<Navigate to="/dashboard#coach" replace />} />
            <Route path="achievements" element={<Navigate to="/dashboard#achievements" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CarbonProvider>
  )
}
