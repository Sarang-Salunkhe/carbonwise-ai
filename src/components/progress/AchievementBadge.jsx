import * as Icons from 'lucide-react'
import GlassCard from '../ui/GlassCard'

export default function AchievementBadge({ achievement }) {
  const Icon = Icons[achievement.icon] || Icons.Award
  const unlocked = achievement.unlocked

  return (
    <GlassCard
      className={`text-center transition-all ${unlocked ? '' : 'opacity-55'}`}
      padding="sm"
      aria-label={`${achievement.title} achievement${unlocked ? ' unlocked' : ' locked'}`}
    >
      <div
        className={`inline-flex p-3 sm:p-4 rounded-2xl mb-3 sm:mb-4 ${
          unlocked
            ? 'bg-[color-mix(in_srgb,var(--brand-primary)_12%,transparent)] border border-[color-mix(in_srgb,var(--brand-primary)_15%,transparent)]'
            : 'bg-[var(--surface-interactive)]'
        }`}
      >
        <Icon
          className={`w-6 h-6 sm:w-7 sm:h-7 ${unlocked ? 'text-[var(--brand-primary)]' : 'text-muted'}`}
          aria-hidden="true"
        />
      </div>
      <h3 className="heading-lg text-sm sm:text-base">{achievement.title}</h3>
      <p className="mt-1 text-xs sm:text-sm text-muted leading-snug">{achievement.description}</p>
      {unlocked && (
        <span className="inline-block mt-2 sm:mt-3 text-xs font-medium text-[var(--brand-primary)]">
          Unlocked
        </span>
      )}
    </GlassCard>
  )
}
