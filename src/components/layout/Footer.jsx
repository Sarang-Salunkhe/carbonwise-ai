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
    <footer className="border-t border-slate-200 dark:border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-5 h-5 text-emerald-500" aria-hidden="true" />
              <span className="font-bold text-slate-900 dark:text-white">CarbonWise AI</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Our mission is to make carbon awareness accessible to everyone. Small actions,
              multiplied by millions, can heal our planet.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Credits</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Built with React, Tailwind CSS, and Recharts. Emission factors based on IPCC and EPA guidelines.
              Designed for sustainability awareness and education.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} CarbonWise AI. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-400" aria-hidden="true" /> for a greener future
          </p>
        </div>
      </div>
    </footer>
  )
}
