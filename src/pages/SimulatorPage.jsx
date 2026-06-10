import { useState, useMemo } from 'react'
import { FlaskConical, TrendingDown, RotateCcw } from 'lucide-react'
import { useCarbon } from '../hooks/useCarbon'
import { simulateFootprint } from '../utils/carbonCalculator'
import { TRANSPORT_MODES, FOOD_DIETS, WASTE_FACTORS } from '../data/emissionFactors'
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
  const [simFood, setSimFood] = useState({
    diet: state.inputs.food.diet,
  })
  const [simEnergy, setSimEnergy] = useState({
    acHoursPerDay: state.inputs.energy.acHoursPerDay,
    monthlyElectricity: state.inputs.energy.monthlyElectricity,
  })
  const [simWaste, setSimWaste] = useState({
    recycling: state.inputs.waste.recycling,
    plastic: state.inputs.waste.plastic,
  })

  const simulation = useMemo(() => {
    if (!footprint) return null
    const result = simulateFootprint(state.inputs, {
      transportation: simTransport,
      food: simFood,
      energy: {
        ...state.inputs.energy,
        ...simEnergy,
      },
      waste: {
        ...state.inputs.waste,
        ...simWaste,
      },
    })
    const reduction = footprint.totalFootprint - result.totalFootprint
    const reductionPercent = footprint.totalFootprint > 0
      ? Math.round((reduction / footprint.totalFootprint) * 100)
      : 0
    return { ...result, reduction, reductionPercent }
  }, [footprint, state.inputs, simTransport, simFood, simEnergy, simWaste])

  const handleSimulate = () => {
    markSimulatorUsed()
  }

  const handleReset = () => {
    setSimTransport({
      mode: state.inputs.transportation.mode,
      daysPerWeek: state.inputs.transportation.daysPerWeek,
    })
    setSimFood({
      diet: state.inputs.food.diet,
    })
    setSimEnergy({
      acHoursPerDay: state.inputs.energy.acHoursPerDay,
      monthlyElectricity: state.inputs.energy.monthlyElectricity,
    })
    setSimWaste({
      recycling: state.inputs.waste.recycling,
      plastic: state.inputs.waste.plastic,
    })
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
              <div className="flex justify-between py-1.5 border-b border-[var(--border-subtle)]">
                <span className="text-slate-500">Transport</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {TRANSPORT_MODES[state.inputs.transportation.mode]?.label} ({state.inputs.transportation.daysPerWeek}d/wk)
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[var(--border-subtle)]">
                <span className="text-slate-500">Diet Type</span>
                <span className="font-medium text-slate-900 dark:text-white text-capitalize">
                  {FOOD_DIETS[state.inputs.food.diet]?.label}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[var(--border-subtle)]">
                <span className="text-slate-500">Energy & AC</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {state.inputs.energy.monthlyElectricity} kWh/mo · {state.inputs.energy.acHoursPerDay}h AC/day
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[var(--border-subtle)]">
                <span className="text-slate-500">Waste Recycling</span>
                <span className="font-medium text-slate-900 dark:text-white text-capitalize">
                  {WASTE_FACTORS.recycling[state.inputs.waste.recycling]?.label}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Annual Footprint</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {footprint.totalFootprint.toLocaleString()} kg CO₂
                </span>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">Simulate Changes</h3>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-primary)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] rounded px-2.5 py-1 bg-[color-mix(in_srgb,var(--brand-primary)_8%,transparent)] border border-[color-mix(in_srgb,var(--brand-primary)_12%,transparent)]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Habits
              </button>
            </div>

            <div className="space-y-6">
              {/* Transportation Changes */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">Transportation Changes</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="sim-mode" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                      Transport Mode
                    </label>
                    <select
                      id="sim-mode"
                      value={simTransport.mode}
                      onChange={(e) => {
                        setSimTransport((s) => ({ ...s, mode: e.target.value }))
                        handleSimulate()
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-[var(--surface-primary)] text-slate-900 dark:text-white border border-[var(--border-default)] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {Object.entries(TRANSPORT_MODES).map(([k, v]) => (
                        <option key={k} value={k}>{v.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="sim-days" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                      Travel Days per Week: {simTransport.daysPerWeek}
                    </label>
                    <div className="pt-2">
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
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-valuemin={0}
                        aria-valuemax={7}
                        aria-valuenow={simTransport.daysPerWeek}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-[var(--border-subtle)]" />

              {/* Diet Changes */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">Dietary Changes</h4>
                <div>
                  <label htmlFor="sim-diet" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                    Diet Type
                  </label>
                  <select
                    id="sim-diet"
                    value={simFood.diet}
                    onChange={(e) => {
                      setSimFood({ diet: e.target.value })
                      handleSimulate()
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-[var(--surface-primary)] text-slate-900 dark:text-white border border-[var(--border-default)] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {Object.entries(FOOD_DIETS).map(([k, v]) => (
                      <option key={k} value={k}>{v.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <hr className="border-[var(--border-subtle)]" />

              {/* Home Energy Changes */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">Home Energy Changes</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="sim-ac" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                      AC Hours/Day: {simEnergy.acHoursPerDay} hrs
                    </label>
                    <div className="pt-2">
                      <input
                        id="sim-ac"
                        type="range"
                        min={0}
                        max={24}
                        value={simEnergy.acHoursPerDay}
                        onChange={(e) => {
                          setSimEnergy((s) => ({ ...s, acHoursPerDay: Number(e.target.value) }))
                          handleSimulate()
                        }}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-valuemin={0}
                        aria-valuemax={24}
                        aria-valuenow={simEnergy.acHoursPerDay}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="sim-elec" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                      Monthly Electricity: {simEnergy.monthlyElectricity} kWh
                    </label>
                    <div className="pt-2">
                      <input
                        id="sim-elec"
                        type="range"
                        min={0}
                        max={1500}
                        step={10}
                        value={simEnergy.monthlyElectricity}
                        onChange={(e) => {
                          setSimEnergy((s) => ({ ...s, monthlyElectricity: Number(e.target.value) }))
                          handleSimulate()
                        }}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-valuemin={0}
                        aria-valuemax={1500}
                        aria-valuenow={simEnergy.monthlyElectricity}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-[var(--border-subtle)]" />

              {/* Waste Changes */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">Waste Habits</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="sim-recycling" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                      Recycling Frequency
                    </label>
                    <select
                      id="sim-recycling"
                      value={simWaste.recycling}
                      onChange={(e) => {
                        setSimWaste((w) => ({ ...w, recycling: e.target.value }))
                        handleSimulate()
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-[var(--surface-primary)] text-slate-900 dark:text-white border border-[var(--border-default)] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {Object.entries(WASTE_FACTORS.recycling).map(([k, v]) => (
                        <option key={k} value={k}>{v.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="sim-plastic" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                      Plastic Usage
                    </label>
                    <select
                      id="sim-plastic"
                      value={simWaste.plastic}
                      onChange={(e) => {
                        setSimWaste((w) => ({ ...w, plastic: e.target.value }))
                        handleSimulate()
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-[var(--surface-primary)] text-slate-900 dark:text-white border border-[var(--border-default)] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {Object.entries(WASTE_FACTORS.plastic).map(([k, v]) => (
                        <option key={k} value={k}>{v.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
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
                  <div className="mt-4 text-amber-500 text-sm font-semibold">
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
                    : 'Try switching to lower-emission habits or reducing consumption to see savings.'}
                </p>
              </GlassCard>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
