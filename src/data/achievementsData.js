export const ACHIEVEMENTS = [
  {
    id: 'first_calculation',
    title: 'First Calculation',
    description: 'Completed your first carbon footprint assessment',
    icon: 'Calculator',
    condition: (state) => state.history.length >= 1,
  },
  {
    id: 'green_beginner',
    title: 'Green Beginner',
    description: 'Achieved a Green Score of 50 or higher',
    icon: 'Sprout',
    condition: (state) => state.currentScore >= 50,
  },
  {
    id: 'eco_explorer',
    title: 'Eco Explorer',
    description: 'Used the What-If Simulator',
    icon: 'Compass',
    condition: (state) => state.simulatorUsed,
  },
  {
    id: 'sustainability_hero',
    title: 'Sustainability Hero',
    description: 'Achieved a Green Score of 80 or higher',
    icon: 'Trophy',
    condition: (state) => state.currentScore >= 80,
  },
  {
    id: 'carbon_reducer',
    title: 'Carbon Reducer',
    description: 'Reduced your footprint by 10% or more',
    icon: 'TrendingDown',
    condition: (state) => {
      if (state.history.length < 2) return false
      const first = state.history[0].totalFootprint
      const latest = state.history[state.history.length - 1].totalFootprint
      return latest < first * 0.9
    },
  },
]
