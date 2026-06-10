import { useMemo } from 'react'
import { Bot } from 'lucide-react'
import { generateCoachMessages } from '../../utils/coach'
import CoachCard from '../coach/CoachCard'

export default function DashboardCoach({ footprint, score, limit = 3 }) {
  const messages = useMemo(
    () => generateCoachMessages(footprint, score).slice(0, limit),
    [footprint, score, limit]
  )

  if (!footprint || messages.length === 0) return null

  return (
    <section id="coach" className="scroll-mt-24" aria-labelledby="coach-heading">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
          <Bot className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <h2 id="coach-heading" className="text-xl font-bold text-slate-900 dark:text-white">
            Sustainability Coach
          </h2>
          <p className="text-sm text-slate-500">Context-aware guidance based on your data</p>
        </div>
      </div>
      <div className="space-y-4">
        {messages.map((msg) => (
          <CoachCard key={msg.id} message={msg} />
        ))}
      </div>
    </section>
  )
}
