import { Trophy } from 'lucide-react'
import { useMemo } from 'react'
import { useCarbon } from '../hooks/useCarbon'
import { getAchievementDetails } from '../utils/achievements'
import SectionHeader from '../components/ui/SectionHeader'
import GlassCard from '../components/ui/GlassCard'
import AchievementBadge from '../components/progress/AchievementBadge'

export default function AchievementsPage() {
  const { state } = useCarbon()

  const achievements = useMemo(
    () => getAchievementDetails(state.achievements),
    [state.achievements]
  )

  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <div>
      <SectionHeader
        title="Achievements"
        subtitle="Earn badges as you progress on your sustainability journey."
      />

      <GlassCard className="mb-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white">
          <Trophy className="w-10 h-10" />
        </div>
        <div className="text-center sm:text-left">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {unlockedCount} / {achievements.length}
          </p>
          <p className="text-slate-600 dark:text-slate-400">Achievements unlocked</p>
        </div>
        <div className="flex-1 w-full sm:max-w-xs">
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-700"
              style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
              role="progressbar"
              aria-valuenow={unlockedCount}
              aria-valuemin={0}
              aria-valuemax={achievements.length}
            />
          </div>
        </div>
      </GlassCard>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <AchievementBadge key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  )
}
