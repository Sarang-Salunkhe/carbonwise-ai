import { useState, useMemo } from 'react'
import { FlaskConical, TrendingDown } from 'lucide-react'
import { useCarbon } from '../hooks/useCarbon'
import { simulateFootprint } from '../utils/carbonCalculator'
import { TRANSPORT_MODES } from '../data/emissionFactors'
import SectionHeader from '../components/ui/SectionHeader'
import EmptyState from '../components/ui/EmptyState'
import GlassCard from '../components/ui/GlassCard'
import EmissionBarChart from '../components/charts/EmissionBarChart'

export default function SimulatorPage() {
  const { state, markSimulatorUsed } = useCarbon()
  const footprint = state.currentFootprint

  const [simTransport, setSimTransport] = useState({
    mode: state.inputs.transportation.mode,
    daysPerWeek: state.inputs.transportation.daysPerWeek,
  })

  const simulation = useMemo(() => {
    if (!footprint) return null
    const result = simulateFootprint(state.inputs, {
      transportation: simTransport,
    })
    const reduction = footprint.totalFootprint - result.totalFootprint
    const reductionPercent = footprint.totalFootprint > 0
      ? Math.round((reduction / footprint.totalFootprint) * 100)
      : 0
    return { ...result, reduction, reductionPercent }
  }, [footprint, state.inputs, simTransport])

  const handleSimulate = () => {
    markSimulatorUsed()
  }

  if (!footprint) {
    return (
      <EmptyState
        icon={FlaskConical}
        title="Simulator Requires Assessment Data"
        description="Complete your carbon assessment first, then return here to experiment with lifestyle changes and see how they would affect your footprint."
        ctaLabel="Start Carbon Assessment"
      />
    )
  }

  return (
    <div>
      <SectionHeader
        title="What-If Simulator"
        subtitle="Modify your habits and instantly see projected emission changes — no commitment required."
      />

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <GlassCard>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Current Habits</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">Transport Mode</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {TRANSPORT_MODES[state.inputs.transportation.mode]?.label}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">Days per Week</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {state.inputs.transportation.daysPerWeek}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Annual Footprint</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {footprint.totalFootprint.toLocaleString()} kg CO₂
                </span>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Simulate Changes</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="sim-mode" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Transport Mode
                </label>
                <select
                  id="sim-mode"
                  value={simTransport.mode}
                  onChange={(e) => {
                    setSimTransport((s) => ({ ...s, mode: e.target.value }))
                    handleSimulate()
                  }}
                  className="w-full px-4 py-2.5 rounded-xl glass text-slate-900 dark:text-white border-0 focus:ring-2 focus:ring-emerald-500"
                >
                  {Object.entries(TRANSPORT_MODES).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="sim-days" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Days per Week: {simTransport.daysPerWeek}
                </label>
                <input
                  id="sim-days"
                  type="range"
                  min={0}
                  max={7}
                  value={simTransport.daysPerWeek}
                  onChange={(e) => {
                    setSimTransport((s) => ({ ...s, daysPerWeek: Number(e.target.value) }))
                    handleSimulate()
                  }}
                  className="w-full accent-emerald-500"
                  aria-valuemin={0}
                  aria-valuemax={7}
                  aria-valuenow={simTransport.daysPerWeek}
                />
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          {simulation && (
            <>
              <GlassCard className="text-center">
                <p className="text-sm text-slate-500">Simulated Footprint</p>
                <p className="text-4xl font-bold text-slate-900 dark:text-white mt-2">
                  {simulation.totalFootprint.toLocaleString()}
                  <span className="text-lg font-normal text-slate-500 ml-1">kg CO₂/yr</span>
                </p>

                {simulation.reduction > 0 ? (
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <TrendingDown className="w-5 h-5" aria-hidden="true" />
                    <span className="font-semibold">
                      {simulation.reductionPercent}% reduction ({simulation.reduction.toLocaleString()} kg saved)
                    </span>
                  </div>
                ) : simulation.reduction < 0 ? (
                  <div className="mt-4 text-amber-500 text-sm">
                    +{Math.abs(simulation.reduction).toLocaleString()} kg increase
                  </div>
                ) : (
                  <div className="mt-4 text-slate-500 text-sm">No change from current</div>
                )}
              </GlassCard>

              <GlassCard>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Simulated Breakdown</h3>
                <EmissionBarChart breakdown={simulation.breakdown} />
              </GlassCard>

              <GlassCard>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Yearly Impact</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {simulation.reduction > 0
                    ? `This change would save approximately ${simulation.reduction.toLocaleString()} kg of CO₂ annually — equivalent to planting ${Math.round(simulation.reduction / 21)} trees.`
                    : 'Try switching to a lower-emission transport mode or reducing travel days to see savings.'}
                </p>
              </GlassCard>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
