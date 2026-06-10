import { memo } from 'react'
import { Link } from 'react-router-dom'
import {
  Home,
  Calculator,
  LayoutDashboard,
  Lightbulb,
  MessageCircle,
  FlaskConical,
  TrendingUp,
  Trophy,
  Check,
} from 'lucide-react'

const STEPS = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'calculator', label: 'Assessment', icon: Calculator, path: '/calculator' },
  { id: 'dashboard', label: 'Results', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'insights', label: 'Insights', icon: Lightbulb, path: '/dashboard#recommendations' },
  { id: 'coach', label: 'Coach', icon: MessageCircle, path: '/dashboard#coach' },
  { id: 'simulator', label: 'Simulator', icon: FlaskConical, path: '/simulator' },
  { id: 'progress', label: 'Progress', icon: TrendingUp, path: '/progress' },
  { id: 'achievements', label: 'Achievements', icon: Trophy, path: '/dashboard#achievements' },
]

function getActiveStep(pathname, hash) {
  if (pathname === '/') return 'home'
  if (pathname === '/calculator') return 'calculator'
  if (pathname === '/simulator') return 'simulator'
  if (pathname === '/progress') return 'progress'
  if (pathname === '/dashboard') {
    if (hash === '#recommendations') return 'insights'
    if (hash === '#coach') return 'coach'
    if (hash === '#achievements') return 'achievements'
    return 'dashboard'
  }
  return null
}

function getCompletedSteps(hasFootprint, historyLength, simulatorUsed) {
  const completed = new Set(['home'])
  if (hasFootprint) {
    ['calculator', 'dashboard', 'insights', 'coach', 'achievements'].forEach((s) => completed.add(s))
  }
  if (simulatorUsed) completed.add('simulator')
  if (historyLength >= 2) completed.add('progress')
  return completed
}

function JourneySteps({ currentPath, hash = '', hasFootprint, historyLength = 0, simulatorUsed = false, compact = false }) {
  const active = getActiveStep(currentPath, hash)
  const completed = getCompletedSteps(hasFootprint, historyLength, simulatorUsed)

  if (compact) {
    const currentIndex = Math.max(0, STEPS.findIndex((s) => s.id === active))
    const current = STEPS[currentIndex]
    const next = STEPS[currentIndex + 1]

    return (
      <nav aria-label="Your sustainability journey" className="card p-3 sm:p-4 mb-5 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            {current && (
              <>
                <div className="p-2 rounded-[var(--radius-md)] bg-[color-mix(in_srgb,var(--brand-primary)_10%,transparent)] flex-shrink-0">
                  <current.icon className="w-4 h-4 text-[var(--brand-primary)]" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] sm:text-xs text-muted">Step {currentIndex + 1} of {STEPS.length}</p>
                  <p className="text-sm font-semibold text-heading truncate">{current.label}</p>
                </div>
              </>
            )}
          </div>
          {next && (
            <Link
              to={next.path}
              className="text-xs sm:text-sm font-medium text-[var(--brand-primary)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] rounded whitespace-nowrap"
            >
              Next: {next.label} →
            </Link>
          )}
        </div>
        <div className="mt-2.5 sm:mt-3 h-1 bg-[var(--surface-interactive)] rounded-full overflow-hidden">
          <div
            className="h-full gradient-brand rounded-full transition-[width] duration-500"
            style={{ width: `${((currentIndex + 1) / STEPS.length) * 100}%` }}
            role="progressbar"
            aria-valuenow={currentIndex + 1}
            aria-valuemin={1}
            aria-valuemax={STEPS.length}
            aria-label="Journey progress"
          />
        </div>
      </nav>
    )
  }

  return (
    <nav aria-label="Sustainability journey" className="py-6 sm:py-8 overflow-x-auto no-scrollbar">
      <p className="text-center label text-muted mb-5 sm:mb-6">Your guided sustainability journey</p>
      <ol className="flex min-w-max sm:min-w-0 sm:flex-wrap justify-start sm:justify-center gap-1 sm:gap-2 px-2 sm:px-0">
        {STEPS.map((step) => {
          const isActive = step.id === active
          const isCompleted = completed.has(step.id)
          const Icon = step.icon

          return (
            <li key={step.id}>
              <Link
                to={step.path}
                className={`flex flex-col items-center gap-1 px-2 py-2 rounded-[var(--radius-md)] transition-colors min-w-[4rem] sm:min-w-[4.5rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] ${
                  isActive
                    ? 'text-[var(--brand-primary)]'
                    : isCompleted
                      ? 'text-[var(--brand-secondary)]'
                      : 'text-muted hover:text-[var(--text-secondary)]'
                }`}
                aria-current={isActive ? 'step' : undefined}
              >
                <span
                  className={`relative p-2 sm:p-2.5 rounded-[var(--radius-md)] ${
                    isActive
                      ? 'bg-[color-mix(in_srgb,var(--brand-primary)_12%,transparent)] ring-1 ring-[color-mix(in_srgb,var(--brand-primary)_25%,transparent)]'
                      : isCompleted
                        ? 'bg-[color-mix(in_srgb,var(--brand-secondary)_10%,transparent)]'
                        : 'bg-[var(--surface-interactive)]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                  {isCompleted && !isActive && (
                    <Check className="absolute -top-0.5 -right-0.5 w-3 h-3 text-[var(--brand-secondary)]" aria-hidden="true" />
                  )}
                </span>
                <span className="text-[10px] sm:text-xs font-medium text-center leading-tight">{step.label}</span>
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default memo(JourneySteps)
