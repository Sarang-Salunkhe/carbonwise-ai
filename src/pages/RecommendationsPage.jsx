import { Link } from 'react-router-dom'
import { Lightbulb, ArrowRight } from 'lucide-react'
import { useMemo } from 'react'
import { useCarbon } from '../hooks/useCarbon'
import { generateRecommendations } from '../utils/recommendations'
import SectionHeader from '../components/ui/SectionHeader'
import Button from '../components/ui/Button'
import RecommendationCard from '../components/recommendations/RecommendationCard'

export default function RecommendationsPage() {
  const { state } = useCarbon()
  const footprint = state.currentFootprint

  const recommendations = useMemo(
    () => (footprint ? generateRecommendations(footprint) : []),
    [footprint]
  )

  if (!footprint) {
    return (
      <div className="text-center py-20">
        <Lightbulb className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">No Recommendations Yet</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
          Complete your carbon footprint calculation to receive personalized sustainability recommendations.
        </p>
        <Link to="/calculator">
          <Button size="lg">
            Go to Calculator
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    )
  }

  const totalPotential = recommendations.reduce((sum, r) => sum + r.estimatedReduction, 0)

  return (
    <div>
      <SectionHeader
        title="Personalized Insights"
        subtitle="Actionable recommendations ranked by impact, tailored to your lifestyle data."
      />

      {totalPotential > 0 && (
        <div className="glass-strong rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Total Potential Reduction</p>
            <p className="text-2xl font-bold text-emerald-500">
              up to {totalPotential.toLocaleString()} kg CO₂/year
            </p>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
            Implementing these recommendations could significantly lower your environmental impact.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {recommendations.map((rec) => (
          <RecommendationCard key={rec.id} recommendation={rec} />
        ))}
      </div>
    </div>
  )
}
