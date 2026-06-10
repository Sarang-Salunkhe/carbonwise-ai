import { memo, useMemo } from 'react'
import { Trophy } from 'lucide-react'
import { getAchievementDetails } from '../../utils/achievements'
import AchievementBadge from '../progress/AchievementBadge'
import GlassCard from '../ui/GlassCard'

function DashboardAchievements({ achievementIds }) {
  const achievements = useMemo(
    () => getAchievementDetails(achievementIds),
    [achievementIds],
  )

  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const nextLocked = achievements.find((a) => !a.unlocked)

  return (
    <section id="achievements" className="scroll-mt-20" aria-labelledby="achievements-heading">
      <div className="flex items-start gap-3 mb-4 sm:mb-6">
        <div className="p-2 rounded-[var(--radius-md)] bg-[color-mix(in_srgb,var(--color-warning)_10%,transparent)] flex-shrink-0">
          <Trophy className="w-5 h-5 text-[var(--color-warning)]" aria-hidden="true" />
        </div>
        <div>
          <h2 id="achievements-heading" className="heading-lg">Achievements</h2>
          <p className="text-sm text-muted mt-0.5">
            {unlockedCount} of {achievements.length} unlocked
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 mb-4">
        {achievements.map((achievement) => (
          <AchievementBadge key={achievement.id} achievement={achievement} />
        ))}
      </div>

      {nextLocked && (
        <GlassCard className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4" padding="sm">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-heading">Next: {nextLocked.title}</p>
            <p className="text-sm text-muted mt-0.5">{nextLocked.description}</p>
          </div>
          <div className="w-full sm:w-28 h-1.5 bg-[var(--surface-interactive)] rounded-full overflow-hidden flex-shrink-0">
            <div
              className="h-full bg-gradient-to-r from-[var(--color-warning)] to-[var(--color-error)] rounded-full"
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

export default memo(DashboardAchievements)
