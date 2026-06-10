import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import JourneySteps from '../ui/JourneySteps'
import { useTheme } from '../../hooks/useTheme'
import { useCarbon } from '../../hooks/useCarbon'

export default function Layout() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const { state } = useCarbon()

  const showJourney = location.pathname !== '/'

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <ScrollToTop />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main-content" className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showJourney && (
          <JourneySteps
            compact
            currentPath={location.pathname}
            hash={location.hash}
            hasFootprint={!!state.currentFootprint}
            historyLength={state.history.length}
            simulatorUsed={state.simulatorUsed}
          />
        )}
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
