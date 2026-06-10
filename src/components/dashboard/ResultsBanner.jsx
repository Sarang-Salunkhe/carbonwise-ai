import { Link } from 'react-router-dom'
import { CheckCircle, X, ArrowRight } from 'lucide-react'
import Button from '../ui/Button'

export default function ResultsBanner({ show, onDismiss, score, grade }) {
  if (!show) return null

  return (
    <div
      className="mb-8 glass-strong rounded-2xl p-6 border border-emerald-500/20 animate-slide-up"
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-xl bg-emerald-500/10 flex-shrink-0">
          <CheckCircle className="w-6 h-6 text-emerald-500" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Assessment Complete!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Your Green Score is <strong className="text-emerald-600 dark:text-emerald-400">{score}/100</strong>
            {grade && <> with a grade of <strong>{grade}</strong></>}.
            Explore your personalized insights below.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="#recommendations"
              className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 rounded"
            >
              View Recommendations
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <Link
              to="/simulator"
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 rounded"
            >
              Try Simulator
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex-shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          aria-label="Dismiss notification"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>
      </div>
    </div>
  )
}

export function CalculatorResultsPrompt({ score, grade, footprint, onViewResults }) {
  return (
    <div
      className="mt-6 glass-strong rounded-2xl p-6 border border-emerald-500/30 animate-slide-up"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <CheckCircle className="w-10 h-10 text-emerald-500 flex-shrink-0" aria-hidden="true" />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Your results are ready!</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Green Score: <strong>{score}/100</strong> · Grade: <strong>{grade}</strong> ·{' '}
            {footprint.toLocaleString()} kg CO₂/year
          </p>
        </div>
        <Button size="lg" onClick={onViewResults}>
          View My Results
          <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
