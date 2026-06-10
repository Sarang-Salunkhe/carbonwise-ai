import { memo, useMemo } from 'react'
import { Bot } from 'lucide-react'
import { generateCoachMessages } from '../../utils/coach'
import CoachCard from '../coach/CoachCard'

function DashboardCoach({ footprint, score, limit = 3 }) {
  const messages = useMemo(
    () => generateCoachMessages(footprint, score).slice(0, limit),
    [footprint, score, limit],
  )

  if (!footprint || messages.length === 0) return null

  return (
    <section id="coach" className="scroll-mt-20" aria-labelledby="coach-heading">
      <div className="flex items-start gap-3 mb-4 sm:mb-6">
        <div className="p-2 rounded-[var(--radius-md)] gradient-brand text-white flex-shrink-0">
          <Bot className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <h2 id="coach-heading" className="heading-lg">Sustainability Coach</h2>
          <p className="text-sm text-muted mt-0.5">Context-aware guidance based on your data</p>
        </div>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {messages.map((msg) => (
          <CoachCard key={msg.id} message={msg} />
        ))}
      </div>
    </section>
  )
}

export default memo(DashboardCoach)
