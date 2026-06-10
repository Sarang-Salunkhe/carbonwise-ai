import { ArrowDownRight } from 'lucide-react'
import GlassCard from '../ui/GlassCard'
import Badge from '../ui/Badge'

export default function RecommendationCard({ recommendation }) {
  const { title, description, impactLevel, estimatedReduction, category } = recommendation

  return (
    <GlassCard hover className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <Badge impact={impactLevel}>{impactLevel} Impact</Badge>
        <span className="text-xs text-muted capitalize">{category}</span>
      </div>
      <h3 className="heading-lg text-base">{title}</h3>
      <p className="mt-2 body-sm text-muted leading-relaxed flex-1">{description}</p>
      {estimatedReduction > 0 && (
        <div className="mt-4 flex items-center gap-1.5 text-[var(--color-success)]">
          <ArrowDownRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span className="text-sm font-medium">
            Est. {estimatedReduction.toLocaleString()} kg CO₂/year saved
          </span>
        </div>
      )}
    </GlassCard>
  )
}
