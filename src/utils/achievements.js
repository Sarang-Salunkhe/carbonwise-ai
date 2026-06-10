import { ACHIEVEMENTS } from '../data/achievementsData'

export function checkAchievements(state) {
  const unlocked = ACHIEVEMENTS.filter((a) => a.condition(state)).map((a) => a.id)
  return unlocked
}

export function getAchievementDetails(unlockedIds) {
  return ACHIEVEMENTS.map((a) => ({
    ...a,
    unlocked: unlockedIds.includes(a.id),
  }))
}
