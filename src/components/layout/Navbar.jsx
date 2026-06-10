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
    <header className="sticky top-0 z-50 glass-strong">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link
            to="/"
            className="flex items-center gap-2 min-w-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] rounded-lg"
            aria-label="CarbonWise AI Home"
          >
            <div className="p-1.5 rounded-lg gradient-brand text-white flex-shrink-0">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </div>
            <span className="font-bold text-base sm:text-lg text-heading truncate">
              Carbon<span className="gradient-text">Wise</span> AI
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] ${
                  isActiveLink(location.pathname, link.to)
                    ? 'bg-[color-mix(in_srgb,var(--brand-primary)_12%,transparent)] text-[var(--brand-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-interactive)]'
                }`}
                aria-current={isActiveLink(location.pathname, link.to) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-2 pl-2 border-l border-[var(--border-default)]">
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            </div>
          </div>

          <div className="flex lg:hidden items-center gap-1.5">
            <Link to="/calculator" aria-label="Go to Calculator">
              <Button size="sm" variant="primary" className="!px-2.5 !py-2">
                <Calculator className="w-4 h-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link to="/dashboard" aria-label="Go to Dashboard">
              <Button size="sm" variant="secondary" className="!px-2.5 !py-2">
                <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
              </Button>
            </Link>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button
              type="button"
              onClick={toggleMenu}
              className="p-2 rounded-[var(--radius-md)] bg-[var(--surface-elevated)] border border-[var(--border-default)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile slide-out drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
          onClick={closeMenu}
          aria-hidden="true"
        />
        <div
          id="mobile-menu"
          className={`absolute top-0 right-0 h-full w-[min(100%,280px)] surface-elevated border-l border-[var(--border-default)] shadow-[var(--shadow-elevated)] transition-transform duration-300 ease-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)]">
            <span className="font-semibold text-heading text-sm">Menu</span>
            <button
              type="button"
              onClick={closeMenu}
              className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--surface-interactive)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={`px-4 py-3.5 rounded-[var(--radius-md)] text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] ${
                  isActiveLink(location.pathname, link.to)
                    ? 'bg-[color-mix(in_srgb,var(--brand-primary)_12%,transparent)] text-[var(--brand-primary)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--surface-interactive)] hover:text-[var(--text-primary)]'
                }`}
                aria-current={isActiveLink(location.pathname, link.to) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
