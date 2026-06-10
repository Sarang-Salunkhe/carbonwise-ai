import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LayoutDashboard } from 'lucide-react'
import { useCarbon } from '../hooks/useCarbon'
import SectionHeader from '../components/ui/SectionHeader'
import EmptyState from '../components/ui/EmptyState'
import GlassCard from '../components/ui/GlassCard'
import CircularScore from '../components/ui/CircularScore'
import CategoryCard from '../components/dashboard/CategoryCard'
import EmissionPieChart from '../components/charts/EmissionPieChart'
import EmissionBarChart from '../components/charts/EmissionBarChart'
import DashboardRecommendations from '../components/dashboard/DashboardRecommendations'
import DashboardCoach from '../components/dashboard/DashboardCoach'
import DashboardAchievements from '../components/dashboard/DashboardAchievements'
import DashboardNextSteps from '../components/dashboard/DashboardNextSteps'
import ResultsBanner from '../components/dashboard/ResultsBanner'

export default function DashboardPage() {
  const { state } = useCarbon()
  const location = useLocation()
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const footprint = state.currentFootprint

  const showBanner = !!location.state?.justCalculated && !bannerDismissed && !!footprint

  if (!footprint) {
    return (
      <EmptyState
        icon={LayoutDashboard}
        title="Your Dashboard Awaits"
        description="Complete the carbon assessment to unlock your personalized dashboard — including your Green Score, emission breakdown, tailored recommendations, coaching insights, and achievements."
        ctaLabel="Start Carbon Assessment"
      />
    )
  }

  const { breakdown, totalFootprint } = footprint

  return (
    <div className="space-y-8 sm:space-y-10">
      <ResultsBanner
        show={showBanner}
        onDismiss={() => setBannerDismissed(true)}
        score={state.currentScore}
        grade={state.currentGrade?.grade}
      />

      <SectionHeader
        badge="Sustainability Hub"
        title="Your Dashboard"
        subtitle="Everything you need to understand, improve, and track your carbon footprint — all in one place."
      />

      <section id="summary" className="scroll-mt-20" aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="sr-only">Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          <GlassCard className="sm:col-span-2 xl:col-span-1 flex flex-col items-center justify-center py-6">
            <CircularScore
              score={state.currentScore}
              grade={state.currentGrade?.grade}
              label={state.currentGrade?.label}
              size={130}
            />
          </GlassCard>

          <GlassCard>
            <p className="label text-muted">Total Carbon Footprint</p>
            <p className="metric-value mt-2">{totalFootprint.toLocaleString()}</p>
            <p className="text-xs text-muted mt-1">kg CO₂ per year</p>
          </GlassCard>

          <GlassCard>
            <p className="label text-muted">Sustainability Grade</p>
            <p className="metric-value gradient-text mt-2">{state.currentGrade?.grade}</p>
            <p className="text-xs text-muted mt-1">{state.currentGrade?.label}</p>
          </GlassCard>

          <GlassCard>
            <p className="label text-muted">vs Global Average</p>
            <p className={`metric-value mt-2 ${totalFootprint < 4800 ? 'text-[var(--color-success)]' : 'text-[var(--color-warning)]'}`}>
              {totalFootprint < 4800 ? 'Below' : 'Above'}
            </p>
            <p className="text-xs text-muted mt-1">4,800 kg benchmark</p>
          </GlassCard>
        </div>
      </section>

      <section id="breakdown" className="scroll-mt-20" aria-labelledby="breakdown-heading">
        <h2 id="breakdown-heading" className="heading-lg mb-4 sm:mb-6">Emissions Breakdown</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 mb-5 sm:mb-6">
          {Object.entries(breakdown).map(([category, value]) => (
            <CategoryCard
              key={category}
              category={category}
              value={value}
              total={totalFootprint}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          <GlassCard>
            <h3 className="heading-lg text-base mb-3 sm:mb-4">Distribution</h3>
            <EmissionPieChart breakdown={breakdown} />
          </GlassCard>
          <GlassCard>
            <h3 className="heading-lg text-base mb-3 sm:mb-4">Category Comparison</h3>
            <EmissionBarChart breakdown={breakdown} />
          </GlassCard>
        </div>
      </section>

      <DashboardRecommendations footprint={footprint} limit={3} />
      <DashboardCoach footprint={footprint} score={state.currentScore} limit={3} />
      <DashboardAchievements achievementIds={state.achievements} />
      <DashboardNextSteps />
    </div>
  )
}
