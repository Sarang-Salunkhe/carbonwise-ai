import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Leaf, Menu, X, Calculator, LayoutDashboard } from 'lucide-react'
import ThemeToggle from '../ui/ThemeToggle'
import Button from '../ui/Button'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/calculator', label: 'Calculator' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/simulator', label: 'Simulator' },
  { to: '/progress', label: 'Progress' },
]

function isActiveLink(pathname, to) {
  if (to === '/') return pathname === '/'
  if (to === '/dashboard') {
    return pathname === '/dashboard' || ['/recommendations', '/coach', '/achievements'].includes(pathname)
  }
  return pathname === to
}

export default function Navbar({ theme, onToggleTheme }) {
  const [menuPath, setMenuPath] = useState(null)
  const location = useLocation()
  const open = menuPath === location.pathname

  const toggleMenu = useCallback(() => {
    setMenuPath((prev) => (prev === location.pathname ? null : location.pathname))
  }, [location.pathname])

  const closeMenu = useCallback(() => setMenuPath(null), [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-white/20 dark:border-slate-700/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 rounded-lg"
            aria-label="CarbonWise AI Home"
          >
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
              <Leaf className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-white">
              Carbon<span className="gradient-text">Wise</span> AI
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
                  isActiveLink(location.pathname, link.to)
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                aria-current={isActiveLink(location.pathname, link.to) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <Link to="/calculator" aria-label="Go to Calculator">
              <Button size="sm" variant="primary" className="!px-3">
                <Calculator className="w-4 h-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link to="/dashboard" aria-label="Go to Dashboard">
              <Button size="sm" variant="secondary" className="!px-3">
                <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
              </Button>
            </Link>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button
              type="button"
              onClick={toggleMenu}
              className="p-2 rounded-xl glass focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <>
            <div
              className="fixed inset-0 top-16 bg-black/20 dark:bg-black/40 lg:hidden"
              onClick={closeMenu}
              aria-hidden="true"
            />
            <div
              id="mobile-menu"
              className="lg:hidden pb-4 animate-fade-in relative z-10"
            >
              <div className="flex flex-col gap-1 pt-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={closeMenu}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
                      isActiveLink(location.pathname, link.to)
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    aria-current={isActiveLink(location.pathname, link.to) ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  )
}
