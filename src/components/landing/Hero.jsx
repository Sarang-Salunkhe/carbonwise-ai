import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import Button from '../ui/Button'

export default function Hero() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-6">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            Intelligent Sustainability Platform
          </div>

          <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
            Understand Your{' '}
            <span className="gradient-text">Carbon Footprint</span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
            Measure your impact in minutes, get personalized recommendations, and track your progress —
            no login required.
          </p>

          <div className="mt-4 text-sm text-slate-500 dark:text-slate-400 space-y-1">
            <p>1. Complete a quick lifestyle assessment</p>
            <p>2. View your Green Score and emission breakdown</p>
            <p>3. Follow tailored insights to reduce your footprint</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/calculator">
              <Button size="lg">
                Start Carbon Assessment
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="secondary" size="lg">
                How It Works
              </Button>
            </a>
          </div>

          <div className="mt-10 flex items-center gap-8 text-sm text-slate-500 dark:text-slate-400">
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">5 min</p>
              <p>Assessment</p>
            </div>
            <div className="w-px h-10 bg-slate-200 dark:bg-slate-700" aria-hidden="true" />
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">100</p>
              <p>Green Score</p>
            </div>
            <div className="w-px h-10 bg-slate-200 dark:bg-slate-700" aria-hidden="true" />
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">0</p>
              <p>Login Required</p>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center animate-float">
          <HeroIllustration />
        </div>
      </div>
    </section>
  )
}

function HeroIllustration() {
  return (
    <div className="relative w-full max-w-md aspect-square" aria-hidden="true">
      <div className="absolute inset-0 rounded-3xl glass-strong p-8">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <linearGradient id="earthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="120" fill="url(#earthGrad)" opacity="0.15" />
          <circle cx="200" cy="200" r="90" fill="url(#earthGrad)" opacity="0.3" />
          <circle cx="200" cy="200" r="60" fill="url(#earthGrad)" />
          <path d="M200 140 Q160 180 170 220 Q200 200 230 220 Q240 180 200 140" fill="url(#leafGrad)" opacity="0.9" />
          <path d="M200 160 Q175 190 180 215 Q200 205 220 215 Q225 190 200 160" fill="#ecfdf5" opacity="0.6" />
          <circle cx="130" cy="150" r="8" fill="#10b981" opacity="0.6">
            <animate attributeName="cy" values="150;140;150" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="280" cy="170" r="6" fill="#06b6d4" opacity="0.6">
            <animate attributeName="cy" values="170;160;170" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="150" cy="280" r="5" fill="#14b8a6" opacity="0.6">
            <animate attributeName="cy" values="280;270;280" dur="3.5s" repeatCount="indefinite" />
          </circle>
          <text x="200" y="330" textAnchor="middle" fill="currentColor" className="text-slate-600 dark:text-slate-300" fontSize="14" fontWeight="600">
            Track · Reduce · Thrive
          </text>
        </svg>
      </div>
      <div className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 shadow-lg animate-slide-up">
        <p className="text-xs text-slate-500">Green Score</p>
        <p className="text-xl font-bold text-emerald-500">85</p>
      </div>
      <div className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 shadow-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <p className="text-xs text-slate-500">CO₂ Saved</p>
        <p className="text-xl font-bold text-teal-500">-12%</p>
      </div>
    </div>
  )
}
