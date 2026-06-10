import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from './Button'

export default function EmptyState({
  icon: Icon,
  title,
  description,
  ctaLabel = 'Start Carbon Assessment',
  ctaTo = '/calculator',
  children,
}) {
  return (
    <div
      className="text-center py-16 md:py-24 px-4"
      role="status"
      aria-live="polite"
    >
      <div className="inline-flex p-5 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 mb-6">
        <Icon className="w-12 h-12 text-emerald-500" aria-hidden="true" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
        {title}
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">
        {description}
      </p>
      {children}
      <Link to={ctaTo} className="inline-block">
        <Button size="lg">
          {ctaLabel}
          <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </Button>
      </Link>
    </div>
  )
}
