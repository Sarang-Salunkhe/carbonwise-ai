import { useMemo } from 'react'
import { Lightbulb } from 'lucide-react'
import { generateRecommendations } from '../../utils/recommendations'
import RecommendationCard from '../recommendations/RecommendationCard'

export default function DashboardRecommendations({ footprint, limit = 3 }) {
  const allRecommendations = useMemo(
    () => (footprint ? generateRecommendations(footprint) : []),
    [footprint]
  )
  const recommendations = allRecommendations.slice(0, limit)

  if (!footprint || recommendations.length === 0) return null

  const totalPotential = recommendations.reduce((sum, r) => sum + r.estimatedReduction, 0)

  return (
    <section id="recommendations" className="scroll-mt-24" aria-labelledby="recommendations-heading">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-amber-500/10">
          <Lightbulb className="w-5 h-5 text-amber-500" aria-hidden="true" />
        </div>
        <div>
          <h2 id="recommendations-heading" className="text-xl font-bold text-slate-900 dark:text-white">
            Top Recommendations
          </h2>
          <p className="text-sm text-slate-500">
            {totalPotential > 0 && `Up to ${totalPotential.toLocaleString()} kg CO₂/year potential savings`}
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((rec) => (
          <RecommendationCard key={rec.id} recommendation={rec} />
        ))}
      </div>
      {allRecommendations.length > limit && (
        <p className="mt-4 text-sm text-slate-500 text-center">
          Showing top {limit} of {allRecommendations.length} personalized recommendations
        </p>
      )}
    </section>
  )
}
