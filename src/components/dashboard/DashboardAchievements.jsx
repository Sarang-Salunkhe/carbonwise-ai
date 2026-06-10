import { useMemo } from 'react'
import { Trophy } from 'lucide-react'
import { getAchievementDetails } from '../../utils/achievements'
import AchievementBadge from '../progress/AchievementBadge'
import GlassCard from '../ui/GlassCard'

export default function DashboardAchievements({ achievementIds }) {
  const achievements = useMemo(
    () => getAchievementDetails(achievementIds),
    [achievementIds]
  )

  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const nextLocked = achievements.find((a) => !a.unlocked)

  return (
    <section id="achievements" className="scroll-mt-24" aria-labelledby="achievements-heading">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10">
            <Trophy className="w-5 h-5 text-amber-500" aria-hidden="true" />
          </div>
          <div>
            <h2 id="achievements-heading" className="text-xl font-bold text-slate-900 dark:text-white">
              Achievements
            </h2>
            <p className="text-sm text-slate-500">
              {unlockedCount} of {achievements.length} unlocked
            </p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-4">
        {achievements.map((achievement) => (
          <AchievementBadge key={achievement.id} achievement={achievement} />
        ))}
      </div>

      {nextLocked && (
        <GlassCard className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900 dark:text-white">Next badge: {nextLocked.title}</p>
            <p className="text-sm text-slate-500 mt-0.5">{nextLocked.description}</p>
          </div>
          <div className="h-2 w-24 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex-shrink-0">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
              style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
              role="progressbar"
              aria-valuenow={unlockedCount}
              aria-valuemin={0}
              aria-valuemax={achievements.length}
              aria-label="Achievement progress"
            />
          </div>
        </GlassCard>
      )}
    </section>
  )
}
