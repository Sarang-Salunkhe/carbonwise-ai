import { Link } from 'react-router-dom'
import { CheckCircle, X, ArrowRight } from 'lucide-react'
import Button from '../ui/Button'

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function ResultsBanner({ show, onDismiss, score, grade }) {
  if (!show) return null

  return (
    <div
      className="mb-6 sm:mb-8 card p-4 sm:p-6 border-[color-mix(in_srgb,var(--brand-primary)_20%,transparent)] animate-slide-up"
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="p-2 rounded-[var(--radius-md)] bg-[color-mix(in_srgb,var(--brand-primary)_10%,transparent)] flex-shrink-0">
          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--brand-primary)]" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="heading-lg">Assessment Complete!</h2>
          <p className="body-sm text-muted mt-1">
            Your Green Score is <strong className="text-[var(--brand-primary)]">{score}/100</strong>
            {grade && <> · Grade <strong className="text-heading">{grade}</strong></>}.
            Explore your personalized insights below.
          </p>
          <div className="mt-3 sm:mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('recommendations')}
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--brand-primary)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] rounded"
            >
              View Recommendations
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <Link
              to="/simulator"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-[var(--brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] rounded"
            >
              Try Simulator
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="p-1.5 rounded-[var(--radius-md)] hover:bg-[var(--surface-interactive)] flex-shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
          aria-label="Dismiss notification"
        >
          <X className="w-5 h-5 text-muted" />
        </button>
      </div>
    </div>
  )
}

export function CalculatorResultsPrompt({ score, grade, footprint, onViewResults }) {
  return (
    <div
      className="mt-5 sm:mt-6 card p-4 sm:p-6 border-[color-mix(in_srgb,var(--brand-primary)_25%,transparent)] animate-slide-up"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <CheckCircle className="w-9 h-9 sm:w-10 sm:h-10 text-[var(--brand-primary)] flex-shrink-0" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <h3 className="heading-lg">Your results are ready!</h3>
          <p className="body-sm text-muted mt-1">
            Green Score: <strong className="text-heading">{score}/100</strong> · Grade: <strong className="text-heading">{grade}</strong> ·{' '}
            {footprint.toLocaleString()} kg CO₂/year
          </p>
        </div>
        <Button size="lg" onClick={onViewResults} className="w-full sm:w-auto flex-shrink-0">
          View My Results
          <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
