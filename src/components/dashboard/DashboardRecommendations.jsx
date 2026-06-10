import { memo, useMemo } from 'react'
import { Lightbulb } from 'lucide-react'
import { generateRecommendations } from '../../utils/recommendations'
import RecommendationCard from '../recommendations/RecommendationCard'

function DashboardRecommendations({ footprint, limit = 3 }) {
  const allRecommendations = useMemo(
    () => (footprint ? generateRecommendations(footprint) : []),
    [footprint],
  )
  const recommendations = allRecommendations.slice(0, limit)

  if (!footprint || recommendations.length === 0) return null

  const totalPotential = recommendations.reduce((sum, r) => sum + r.estimatedReduction, 0)

  return (
    <section id="recommendations" className="scroll-mt-20" aria-labelledby="recommendations-heading">
      <div className="flex items-start gap-3 mb-4 sm:mb-6">
        <div className="p-2 rounded-[var(--radius-md)] bg-[color-mix(in_srgb,var(--color-warning)_10%,transparent)] flex-shrink-0">
          <Lightbulb className="w-5 h-5 text-[var(--color-warning)]" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h2 id="recommendations-heading" className="heading-lg">Top Recommendations</h2>
          {totalPotential > 0 && (
            <p className="text-sm text-muted mt-0.5">
              Up to {totalPotential.toLocaleString()} kg CO₂/year potential savings
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {recommendations.map((rec) => (
          <RecommendationCard key={rec.id} recommendation={rec} />
        ))}
      </div>
      {allRecommendations.length > limit && (
        <p className="mt-4 text-sm text-muted text-center">
          Showing top {limit} of {allRecommendations.length} personalized recommendations
        </p>
      )}
    </section>
  )
}

export default memo(DashboardRecommendations)
