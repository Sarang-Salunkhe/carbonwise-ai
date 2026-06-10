import { BENCHMARKS } from '../data/emissionFactors'

export function generateCoachMessages(footprint, score) {
  if (!footprint) {
    return [{
      id: 'welcome',
      type: 'welcome',
      message: 'Welcome to CarbonWise AI! Complete the carbon calculator to receive personalized coaching insights tailored to your lifestyle.',
      priority: 'info',
    }]
  }

  const messages = []
  const { breakdown, totalFootprint, inputs } = footprint
  const avg = BENCHMARKS.globalAverageKg

  const sorted = Object.entries(breakdown).sort(([, a], [, b]) => b - a)
  const [topCategory, topValue] = sorted[0]
  const categoryLabels = {
    transportation: 'transportation',
    food: 'food',
    energy: 'energy',
    waste: 'waste',
    shopping: 'shopping',
  }

  if (totalFootprint > avg) {
    messages.push({
      id: 'above_avg',
      type: 'insight',
      message: `Your annual footprint of ${totalFootprint.toLocaleString()} kg CO₂ is above the global average of ${avg.toLocaleString()} kg. Your biggest opportunity is in ${categoryLabels[topCategory]} — it accounts for ${topValue.toLocaleString()} kg (${Math.round(topValue / totalFootprint * 100)}% of your total).`,
      priority: 'high',
    })
  } else {
    messages.push({
      id: 'below_avg',
      type: 'celebration',
      message: `Excellent work! Your footprint of ${totalFootprint.toLocaleString()} kg CO₂ is below the global average. You're making a real difference — keep building on your sustainable habits.`,
      priority: 'positive',
    })
  }

  if (breakdown.transportation > 1000) {
    const mode = inputs.transportation.mode
    const days = inputs.transportation.daysPerWeek
    if (mode === 'car' && days >= 4) {
      messages.push({
        id: 'coach_transport',
        type: 'action',
        message: `Your transportation emissions are above average. Switching to public transport twice a week could reduce your annual emissions by approximately ${Math.round(breakdown.transportation * 0.3).toLocaleString()} kg CO₂.`,
        priority: 'high',
      })
    }
  }

  if (breakdown.energy > 600) {
    messages.push({
      id: 'coach_energy',
      type: 'action',
      message: `Household energy is a significant contributor at ${breakdown.energy.toLocaleString()} kg CO₂/year. Reducing AC usage by 2 hours daily and switching to LED lighting could save up to ${Math.round(breakdown.energy * 0.2).toLocaleString()} kg annually.`,
      priority: 'medium',
    })
  }

  if (inputs.waste.recycling === 'always' || inputs.waste.recycling === 'often') {
    messages.push({
      id: 'coach_recycle_good',
      type: 'celebration',
      message: 'Your recycling habits are excellent! Focus next on reducing household energy consumption or exploring plant-based meal options for even greater impact.',
      priority: 'positive',
    })
  } else if (breakdown.waste > 350) {
    messages.push({
      id: 'coach_waste',
      type: 'action',
      message: 'Improving your waste management — especially recycling and composting — is a quick win. These changes require minimal lifestyle adjustment but yield meaningful emission reductions.',
      priority: 'medium',
    })
  }

  if (score >= 80) {
    messages.push({
      id: 'coach_champion',
      type: 'celebration',
      message: `With a Green Score of ${score}, you're in the top tier of sustainability performers. Share your journey with friends and family to multiply your positive impact.`,
      priority: 'positive',
    })
  } else if (score < 50) {
    messages.push({
      id: 'coach_improve',
      type: 'motivation',
      message: `Your Green Score of ${score} shows room for improvement, but every small change counts. Start with one category — even a 10% reduction saves ${Math.round(totalFootprint * 0.1).toLocaleString()} kg CO₂ per year.`,
      priority: 'info',
    })
  }

  if (breakdown.food > 2500 && inputs.food.diet !== 'vegan') {
    messages.push({
      id: 'coach_food',
      type: 'action',
      message: 'Diet changes are among the most impactful actions you can take. Try "Meatless Mondays" or swap red meat for poultry and legumes to gradually lower your food emissions.',
      priority: 'medium',
    })
  }

  return messages
}
