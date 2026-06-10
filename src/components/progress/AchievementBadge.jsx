import * as Icons from 'lucide-react'
import GlassCard from '../ui/GlassCard'

export default function AchievementBadge({ achievement }) {
  const Icon = Icons[achievement.icon] || Icons.Award
  const unlocked = achievement.unlocked

  return (
    <GlassCard
      className={`text-center transition-all ${unlocked ? '' : 'opacity-50 grayscale'}`}
      aria-label={`${achievement.title} achievement${unlocked ? ' unlocked' : ' locked'}`}
    >
      <div className={`inline-flex p-4 rounded-2xl mb-4 ${unlocked ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20' : 'bg-slate-200 dark:bg-slate-700'}`}>
        <Icon className={`w-8 h-8 ${unlocked ? 'text-emerald-500' : 'text-slate-400'}`} />
      </div>
      <h3 className="font-semibold text-slate-900 dark:text-white">{achievement.title}</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{achievement.description}</p>
      {unlocked && (
        <span className="inline-block mt-3 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          Unlocked
        </span>
      )}
    </GlassCard>
  )
}
