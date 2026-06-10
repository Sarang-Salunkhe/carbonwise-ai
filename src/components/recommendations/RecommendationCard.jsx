import { ArrowDownRight } from 'lucide-react'
import GlassCard from '../ui/GlassCard'
import Badge from '../ui/Badge'

export default function RecommendationCard({ recommendation }) {
  const { title, description, impactLevel, estimatedReduction, category } = recommendation

  return (
    <GlassCard hover className="relative">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge impact={impactLevel}>{impactLevel} Impact</Badge>
            <span className="text-xs text-slate-500 capitalize">{category}</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
        </div>
      </div>
      {estimatedReduction > 0 && (
        <div className="mt-4 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
          <ArrowDownRight className="w-4 h-4" />
          <span className="text-sm font-medium">
            Est. reduction: {estimatedReduction.toLocaleString()} kg CO₂/year
          </span>
        </div>
      )}
    </GlassCard>
  )
}
