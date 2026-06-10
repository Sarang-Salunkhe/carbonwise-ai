import { Link } from 'react-router-dom'
import { MessageCircle, ArrowRight, Bot } from 'lucide-react'
import { useMemo } from 'react'
import { useCarbon } from '../hooks/useCarbon'
import { generateCoachMessages } from '../utils/coach'
import SectionHeader from '../components/ui/SectionHeader'
import Button from '../components/ui/Button'
import GlassCard from '../components/ui/GlassCard'
import CoachCard from '../components/coach/CoachCard'

export default function CoachPage() {
  const { state } = useCarbon()
  const messages = useMemo(
    () => generateCoachMessages(state.currentFootprint, state.currentScore),
    [state.currentFootprint, state.currentScore]
  )

  return (
    <div>
      <SectionHeader
        title="Sustainability Coach"
        subtitle="Your intelligent assistant analyzes your data and delivers contextual coaching to guide your sustainability journey."
      />

      <GlassCard className="mb-8 flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
          <Bot className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">CarbonWise Coach</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {state.currentFootprint
              ? `Analyzing your footprint of ${state.currentFootprint.totalFootprint.toLocaleString()} kg CO₂/year`
              : 'Waiting for your first calculation to provide personalized coaching'}
          </p>
        </div>
      </GlassCard>

      {!state.currentFootprint ? (
        <div className="text-center py-12">
          <MessageCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Complete the calculator to unlock personalized coaching insights.
          </p>
          <Link to="/calculator">
            <Button>
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <CoachCard key={msg.id} message={msg} />
          ))}
        </div>
      )}
    </div>
  )
}
