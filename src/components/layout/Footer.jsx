import { Link } from 'react-router-dom'
import { Leaf, Heart } from 'lucide-react'

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/calculator', label: 'Calculator' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/simulator', label: 'Simulator' },
  { to: '/progress', label: 'Progress' },
]

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] mt-auto surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Leaf className="w-5 h-5 text-[var(--brand-primary)]" aria-hidden="true" />
              <span className="font-bold text-heading">CarbonWise</span>
            </div>
            <p className="body-sm text-muted leading-relaxed">
              Making carbon awareness accessible to everyone. Small actions,
              multiplied by millions, can heal our planet.
            </p>
          </div>

          <div>
            <h3 className="heading-lg text-sm mb-3 sm:mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="body-sm text-muted hover:text-[var(--brand-primary)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="heading-lg text-sm mb-3 sm:mb-4">Credits</h3>
            <p className="body-sm text-muted leading-relaxed">
              Built with React, Tailwind CSS, and Recharts. Emission factors based on IPCC and EPA guidelines.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 sm:pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-muted">
            © {new Date().getFullYear()} CarbonWise. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-muted flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-[var(--color-error)]" aria-hidden="true" /> for a greener future
          </p>
        </div>
      </div>
    </footer>
  )
}
