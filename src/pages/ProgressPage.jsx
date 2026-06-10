import { Link } from 'react-router-dom'
import { TrendingUp, ArrowDown, ArrowUp, Minus } from 'lucide-react'
import { useCarbon } from '../hooks/useCarbon'
import SectionHeader from '../components/ui/SectionHeader'
import EmptyState from '../components/ui/EmptyState'
import GlassCard from '../components/ui/GlassCard'
import CircularScore from '../components/ui/CircularScore'
import ProgressChart from '../components/charts/ProgressChart'

export default function ProgressPage() {
  const { state } = useCarbon()
  const { history, currentScore, currentFootprint } = state

  if (history.length === 0) {
    return (
      <EmptyState
        icon={TrendingUp}
        title="Start Tracking Your Progress"
        description="Complete your first carbon assessment to begin tracking your sustainability improvements over time. Recalculate periodically to see trends and milestones."
        ctaLabel="Start Carbon Assessment"
      />
    )
  }

  const first = history[0]
  const latest = history[history.length - 1]
  const scoreDiff = latest.score - first.score
  const footprintDiff = latest.totalFootprint - first.totalFootprint
  const footprintImprovement = footprintDiff < 0

  const milestones = [
    { label: 'First Calculation', achieved: history.length >= 1 },
    { label: '3 Calculations', achieved: history.length >= 3 },
    { label: 'Score Above 50', achieved: currentScore >= 50 },
    { label: 'Score Above 80', achieved: currentScore >= 80 },
    { label: 'Reduced Footprint', achieved: footprintImprovement && history.length >= 2 },
  ]

  return (
    <div>
      <SectionHeader
        title="Progress Tracking"
        subtitle="Monitor your sustainability journey with historical data and achievement milestones."
      />

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <GlassCard className="flex flex-col items-center">
          <p className="text-sm text-slate-500 mb-2">Current Score</p>
          <CircularScore score={currentScore} size={120} />
        </GlassCard>

        <GlassCard>
          <p className="text-sm text-slate-500">Score Change</p>
          <div className="flex items-center gap-2 mt-2">
            {scoreDiff > 0 ? (
              <ArrowUp className="w-6 h-6 text-emerald-500" aria-hidden="true" />
            ) : scoreDiff < 0 ? (
              <ArrowDown className="w-6 h-6 text-red-500" aria-hidden="true" />
            ) : (
              <Minus className="w-6 h-6 text-slate-400" aria-hidden="true" />
            )}
            <span className={`text-3xl font-bold ${scoreDiff > 0 ? 'text-emerald-500' : scoreDiff < 0 ? 'text-red-500' : 'text-slate-500'}`}>
              {scoreDiff > 0 ? '+' : ''}{scoreDiff}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">since first calculation</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm text-slate-500">Footprint Change</p>
          <div className="flex items-center gap-2 mt-2">
            {footprintImprovement ? (
              <ArrowDown className="w-6 h-6 text-emerald-500" aria-hidden="true" />
            ) : footprintDiff > 0 ? (
              <ArrowUp className="w-6 h-6 text-red-500" aria-hidden="true" />
            ) : (
              <Minus className="w-6 h-6 text-slate-400" aria-hidden="true" />
            )}
            <span className={`text-3xl font-bold ${footprintImprovement ? 'text-emerald-500' : footprintDiff > 0 ? 'text-red-500' : 'text-slate-500'}`}>
              {footprintDiff > 0 ? '+' : ''}{footprintDiff.toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">kg CO₂ since start</p>
        </GlassCard>
      </div>

      <GlassCard className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Historical Trends</h3>
        <ProgressChart history={history} />
      </GlassCard>

      <GlassCard className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Milestones</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {milestones.map((m) => (
            <div
              key={m.label}
              className={`flex items-center gap-3 p-4 rounded-xl ${
                m.achieved
                  ? 'bg-emerald-500/10 border border-emerald-500/20'
                  : 'bg-slate-100 dark:bg-slate-800/50'
              }`}
            >
              <div className={`w-3 h-3 rounded-full flex-shrink-0 ${m.achieved ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
              <span className={`text-sm font-medium ${m.achieved ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-500'}`}>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>

      {currentFootprint && (
        <p className="text-center text-sm text-slate-500">
          Last updated: {new Date(currentFootprint.calculatedAt).toLocaleString()}
          {' · '}
          {history.length} calculation{history.length !== 1 ? 's' : ''} recorded
          {' · '}
          <Link to="/dashboard" className="text-emerald-600 dark:text-emerald-400 hover:underline">
            Back to Dashboard
          </Link>
        </p>
      )}
    </div>
  )
}
