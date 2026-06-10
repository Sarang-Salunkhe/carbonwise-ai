import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'
import Button from '../ui/Button'

const steps = [
  'Complete a 5-minute lifestyle assessment',
  'Get your Green Score and emission breakdown',
  'Follow AI-powered recommendations to reduce impact',
]

export default function Hero() {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-72 sm:w-96 h-72 sm:h-96 bg-[color-mix(in_srgb,var(--brand-primary)_12%,transparent)] rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-72 sm:w-96 h-72 sm:h-96 bg-[color-mix(in_srgb,var(--brand-accent)_10%,transparent)] rounded-full blur-3xl" />
      </div>

      <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="animate-slide-up max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full glass text-xs sm:text-sm font-medium text-[var(--brand-primary)] mb-5 sm:mb-6">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
            AI-Powered Sustainability Platform
          </div>

          <h1 id="hero-heading" className="heading-display">
            Understand Your{' '}
            <span className="gradient-text">Carbon Footprint</span>
          </h1>

          <p className="mt-4 sm:mt-6 body-lg max-w-xl mx-auto lg:mx-0">
            Measure your environmental impact, get personalized insights, and build
            sustainable habits — all in your browser, no account required.
          </p>

          <ul className="mt-5 sm:mt-6 space-y-2.5 text-left max-w-md mx-auto lg:mx-0">
            {steps.map((step) => (
              <li key={step} className="flex items-start gap-2.5 body-sm">
                <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{step}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start">
            <Link to="/calculator" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">
                Start Carbon Assessment
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Button>
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                How It Works
              </Button>
            </a>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-3 gap-4 sm:gap-8 max-w-sm mx-auto lg:mx-0">
            {[
              { value: '5 min', label: 'Assessment' },
              { value: '100', label: 'Green Score' },
              { value: 'Free', label: 'Forever' },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="metric-value text-xl sm:text-2xl">{stat.value}</p>
                <p className="text-xs sm:text-sm text-muted mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex justify-center animate-float px-4 sm:px-0">
          <HeroIllustration />
        </div>
      </div>
    </section>
  )
}

function HeroIllustration() {
  return (
    <div className="relative w-full max-w-[min(100%,360px)] aspect-square" aria-hidden="true">
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl card p-6 sm:p-8">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <linearGradient id="earthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--brand-primary)" />
              <stop offset="100%" stopColor="var(--brand-accent)" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="120" fill="url(#earthGrad)" opacity="0.1" />
          <circle cx="200" cy="200" r="90" fill="url(#earthGrad)" opacity="0.2" />
          <circle cx="200" cy="200" r="60" fill="url(#earthGrad)" opacity="0.85" />
          <path d="M200 140 Q160 180 170 220 Q200 200 230 220 Q240 180 200 140" fill="white" opacity="0.25" />
          <text x="200" y="330" textAnchor="middle" fill="var(--text-muted)" fontSize="13" fontWeight="500">
            Track · Reduce · Thrive
          </text>
        </svg>
      </div>
      <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 card px-3 sm:px-4 py-2.5 sm:py-3 animate-slide-up">
        <p className="text-[10px] sm:text-xs text-muted">Green Score</p>
        <p className="text-lg sm:text-xl font-bold text-[var(--brand-primary)]">85</p>
      </div>
      <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 card px-3 sm:px-4 py-2.5 sm:py-3 animate-slide-up">
        <p className="text-[10px] sm:text-xs text-muted">CO₂ Saved</p>
        <p className="text-lg sm:text-xl font-bold text-[var(--brand-secondary)]">-12%</p>
      </div>
    </div>
  )
}
