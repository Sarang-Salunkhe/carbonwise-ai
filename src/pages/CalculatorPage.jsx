import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calculator } from 'lucide-react'
import { useCarbon } from '../hooks/useCarbon'
import SectionHeader from '../components/ui/SectionHeader'
import Button from '../components/ui/Button'
import GlassCard from '../components/ui/GlassCard'
import CircularScore from '../components/ui/CircularScore'
import CalculatorForm from '../components/calculator/CalculatorForm'
import { CalculatorResultsPrompt } from '../components/dashboard/ResultsBanner'

export default function CalculatorPage() {
  const { state, updateInputs, calculate } = useCarbon()
  const navigate = useNavigate()
  const [justCalculated, setJustCalculated] = useState(false)

  const footprint = state.currentFootprint

  const handleCalculate = () => {
    calculate()
    setJustCalculated(true)
  }

  const handleViewResults = () => {
    navigate('/dashboard', { state: { justCalculated: true } })
  }

  return (
    <div>
      <SectionHeader
        title="Carbon Footprint Assessment"
        subtitle="Step 1 of your sustainability journey — answer a few questions about your lifestyle to estimate your annual carbon footprint."
      />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CalculatorForm inputs={state.inputs} onUpdate={updateInputs} />

          <div className="mt-6 flex flex-wrap gap-4">
            <Button size="lg" onClick={handleCalculate}>
              <Calculator className="w-5 h-5" aria-hidden="true" />
              Calculate My Footprint
            </Button>
          </div>

          {justCalculated && footprint && (
            <CalculatorResultsPrompt
              score={state.currentScore}
              grade={state.currentGrade?.grade}
              footprint={footprint.totalFootprint}
              onViewResults={handleViewResults}
            />
          )}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <GlassCard className="text-center">
            {footprint ? (
              <>
                <CircularScore
                  score={state.currentScore}
                  grade={state.currentGrade?.grade}
                  label={state.currentGrade?.label}
                />
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-slate-500">Annual Footprint</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                    {footprint.totalFootprint.toLocaleString()}
                    <span className="text-sm font-normal text-slate-500 ml-1">kg CO₂</span>
                  </p>
                </div>
                {!justCalculated && (
                  <Button className="mt-6 w-full" onClick={handleViewResults}>
                    View My Results
                  </Button>
                )}
              </>
            ) : (
              <div className="py-12">
                <Calculator className="w-12 h-12 text-emerald-500 mx-auto mb-4" aria-hidden="true" />
                <p className="text-slate-600 dark:text-slate-400">
                  Fill in your details and click Calculate to see your Green Score and footprint estimate.
                </p>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
