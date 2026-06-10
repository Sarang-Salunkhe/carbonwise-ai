import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from './Button'

export default function EmptyState({
  icon: Icon,
  title,
  description,
  ctaLabel = 'Start Carbon Assessment',
  ctaTo = '/calculator',
}) {
  return (
    <div
      className="text-center py-12 sm:py-20 px-4 max-w-lg mx-auto animate-fade-in"
      role="status"
      aria-live="polite"
    >
      <div className="inline-flex p-5 rounded-2xl bg-[color-mix(in_srgb,var(--brand-primary)_10%,transparent)] border border-[color-mix(in_srgb,var(--brand-primary)_15%,transparent)] mb-6">
        <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--brand-primary)]" aria-hidden="true" />
      </div>
      <h2 className="heading-xl mb-3">{title}</h2>
      <p className="body-sm text-muted mb-8 leading-relaxed">{description}</p>
      <Link to={ctaTo} className="inline-block">
        <Button size="lg">
          {ctaLabel}
          <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </Button>
      </Link>
    </div>
  )
}
