import { Outlet, useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import JourneyBar from './JourneyBar'
import { useTheme } from '../../hooks/useTheme'
import { useJourneyProgress } from '../../hooks/useJourneyProgress'

export default function Layout() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const journey = useJourneyProgress()

  const showJourney = location.pathname !== '/'

  const journeyProps = useMemo(
    () => ({
      pathname: location.pathname,
      hash: location.hash,
      ...journey,
    }),
    [location.pathname, location.hash, journey],
  )

  return (
    <div className="min-h-screen gradient-bg flex flex-col overflow-x-hidden">
      <ScrollToTop />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main
        id="main-content"
        className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      >
        {showJourney && <JourneyBar {...journeyProps} />}
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
