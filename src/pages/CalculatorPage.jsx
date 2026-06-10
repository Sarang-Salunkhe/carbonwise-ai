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
        badge="Step 1"
        title="Carbon Footprint Assessment"
        subtitle="Answer a few questions about your lifestyle to estimate your annual carbon footprint using science-backed emission factors."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 min-w-0">
          <CalculatorForm inputs={state.inputs} onUpdate={updateInputs} />

          <div className="mt-5 sm:mt-6">
            <Button size="lg" onClick={handleCalculate} className="w-full sm:w-auto">
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

        <div className="lg:sticky lg:top-20 lg:self-start">
          <GlassCard className="text-center">
            {footprint ? (
              <>
                <CircularScore
                  score={state.currentScore}
                  grade={state.currentGrade?.grade}
                  label={state.currentGrade?.label}
                  size={140}
                />
                <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-[var(--border-subtle)]">
                  <p className="label text-muted">Annual Footprint</p>
                  <p className="metric-value mt-1">
                    {footprint.totalFootprint.toLocaleString()}
                    <span className="text-sm font-normal text-muted ml-1">kg CO₂</span>
                  </p>
                </div>
                {!justCalculated && (
                  <Button className="mt-5 w-full" onClick={handleViewResults}>
                    View My Results
                  </Button>
                )}
              </>
            ) : (
              <div className="py-8 sm:py-12">
                <Calculator className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--brand-primary)] mx-auto mb-4" aria-hidden="true" />
                <p className="body-sm text-muted px-2">
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
