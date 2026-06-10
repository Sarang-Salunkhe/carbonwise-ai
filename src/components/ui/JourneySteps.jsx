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
  const completed = new Set()
  completed.add('home')
  if (hasFootprint) {
    completed.add('calculator')
    completed.add('dashboard')
    completed.add('insights')
    completed.add('coach')
    completed.add('achievements')
  }
  if (simulatorUsed) completed.add('simulator')
  if (historyLength >= 2) completed.add('progress')
  return completed
}

export default function JourneySteps({ currentPath, hash = '', hasFootprint, historyLength = 0, simulatorUsed = false, compact = false }) {
  const active = getActiveStep(currentPath, hash)
  const completed = getCompletedSteps(hasFootprint, historyLength, simulatorUsed)

  if (compact) {
    const currentIndex = STEPS.findIndex((s) => s.id === active)
    const current = STEPS[currentIndex]
    const next = STEPS[currentIndex + 1]

    return (
      <nav aria-label="Your sustainability journey" className="glass rounded-2xl p-4 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            {current && (
              <>
                <div className="p-2 rounded-xl bg-emerald-500/10">
                  <current.icon className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Step {currentIndex + 1} of {STEPS.length}</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{current.label}</p>
                </div>
              </>
            )}
          </div>
          {next && (
            <Link
              to={next.path}
              className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 rounded"
            >
              Next: {next.label} →
            </Link>
          )}
        </div>
        <div className="mt-3 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
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
    <nav aria-label="Sustainability journey" className="py-8">
      <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">
        Your guided sustainability journey
      </p>
      <ol className="flex flex-wrap justify-center gap-2 md:gap-0 md:justify-between max-w-4xl mx-auto">
        {STEPS.map((step, i) => {
          const isActive = step.id === active
          const isCompleted = completed.has(step.id)
          const Icon = step.icon

          return (
            <li key={step.id} className="flex items-center">
              <Link
                to={step.path}
                className={`flex flex-col items-center gap-1.5 px-2 py-2 rounded-xl transition-colors min-w-[4.5rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
                  isActive
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : isCompleted
                      ? 'text-teal-600 dark:text-teal-400'
                      : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
                aria-current={isActive ? 'step' : undefined}
              >
                <span
                  className={`relative p-2.5 rounded-xl ${
                    isActive
                      ? 'bg-emerald-500/15 ring-2 ring-emerald-500/30'
                      : isCompleted
                        ? 'bg-teal-500/10'
                        : 'bg-slate-100 dark:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {isCompleted && !isActive && (
                    <Check className="absolute -top-1 -right-1 w-3.5 h-3.5 text-teal-500 bg-white dark:bg-slate-900 rounded-full" aria-hidden="true" />
                  )}
                </span>
                <span className="text-xs font-medium text-center leading-tight">{step.label}</span>
              </Link>
              {i < STEPS.length - 1 && (
                <span className="hidden md:block w-4 h-px bg-slate-200 dark:bg-slate-700 mx-0.5" aria-hidden="true" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
