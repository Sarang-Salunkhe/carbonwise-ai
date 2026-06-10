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
    <div>
      <ResultsBanner
        show={showBanner}
        onDismiss={() => setBannerDismissed(true)}
        score={state.currentScore}
        grade={state.currentGrade?.grade}
      />

      <SectionHeader
        title="Your Sustainability Hub"
        subtitle="Everything you need to understand, improve, and track your carbon footprint — all in one place."
      />

      <section id="summary" className="scroll-mt-24 mb-10" aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="sr-only">Summary</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard className="md:col-span-2 lg:col-span-1 flex flex-col items-center justify-center">
            <CircularScore
              score={state.currentScore}
              grade={state.currentGrade?.grade}
              label={state.currentGrade?.label}
              size={140}
            />
          </GlassCard>

          <GlassCard>
            <p className="text-sm text-slate-500">Total Carbon Footprint</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
              {totalFootprint.toLocaleString()}
            </p>
            <p className="text-sm text-slate-500 mt-1">kg CO₂ per year</p>
          </GlassCard>

          <GlassCard>
            <p className="text-sm text-slate-500">Sustainability Grade</p>
            <p className="text-3xl font-bold gradient-text mt-2">{state.currentGrade?.grade}</p>
            <p className="text-sm text-slate-500 mt-1">{state.currentGrade?.label}</p>
          </GlassCard>

          <GlassCard>
            <p className="text-sm text-slate-500">vs Global Average</p>
            <p className={`text-3xl font-bold mt-2 ${totalFootprint < 4800 ? 'text-emerald-500' : 'text-amber-500'}`}>
              {totalFootprint < 4800 ? 'Below' : 'Above'}
            </p>
            <p className="text-sm text-slate-500 mt-1">4,800 kg benchmark</p>
          </GlassCard>
        </div>
      </section>

      <section id="breakdown" className="scroll-mt-24 mb-10" aria-labelledby="breakdown-heading">
        <h2 id="breakdown-heading" className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          Emissions Breakdown
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
          {Object.entries(breakdown).map(([category, value]) => (
            <CategoryCard
              key={category}
              category={category}
              value={value}
              total={totalFootprint}
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <GlassCard>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Distribution</h3>
            <EmissionPieChart breakdown={breakdown} />
          </GlassCard>
          <GlassCard>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Category Comparison</h3>
            <EmissionBarChart breakdown={breakdown} />
          </GlassCard>
        </div>
      </section>

      <div className="mb-10">
        <DashboardRecommendations footprint={footprint} limit={3} />
      </div>

      <div className="mb-10">
        <DashboardCoach footprint={footprint} score={state.currentScore} limit={3} />
      </div>

      <div className="mb-10">
        <DashboardAchievements achievementIds={state.achievements} />
      </div>

      <DashboardNextSteps />
    </div>
  )
}
