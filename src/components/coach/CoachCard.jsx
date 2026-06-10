import { Lightbulb, Trophy, Target, Info } from 'lucide-react'
import GlassCard from '../ui/GlassCard'

const typeConfig = {
  welcome: { icon: Info, bg: 'bg-[color-mix(in_srgb,var(--color-info)_10%,transparent)]', color: 'text-[var(--color-info)]' },
  insight: { icon: Lightbulb, bg: 'bg-[color-mix(in_srgb,var(--color-warning)_10%,transparent)]', color: 'text-[var(--color-warning)]' },
  action: { icon: Target, bg: 'bg-[color-mix(in_srgb,var(--brand-primary)_10%,transparent)]', color: 'text-[var(--brand-primary)]' },
  celebration: { icon: Trophy, bg: 'bg-[color-mix(in_srgb,var(--brand-secondary)_10%,transparent)]', color: 'text-[var(--brand-secondary)]' },
  motivation: { icon: Lightbulb, bg: 'bg-[color-mix(in_srgb,var(--brand-accent)_10%,transparent)]', color: 'text-[var(--brand-accent)]' },
}

export default function CoachCard({ message }) {
  const config = typeConfig[message.type] || typeConfig.insight
  const Icon = config.icon

  return (
    <GlassCard className="flex gap-3 sm:gap-4">
      <div className={`flex-shrink-0 p-2.5 sm:p-3 rounded-[var(--radius-md)] h-fit ${config.bg}`}>
        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${config.color}`} aria-hidden="true" />
      </div>
      <p className="body-sm leading-relaxed min-w-0">{message.message}</p>
    </GlassCard>
  )
}
