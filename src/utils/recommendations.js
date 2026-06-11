import { TRANSPORT_MODES } from '../data/emissionFactors'

const IMPACT_LEVELS = { high: 'High', medium: 'Medium', low: 'Low' }


/**
 * Generates personalized sustainability recommendations.
 * @param {Object} footprint Calculated footprint data
 * @returns {Array<Object>} Ranked recommendations
 */

export function generateRecommendations(footprint) {
  const { breakdown, inputs, totalFootprint } = footprint
  const recommendations = []
  const { transportation, food, energy, waste, shopping } = breakdown

  if (transportation > 1000) {
    const currentMode = inputs.transportation.mode
    const distance = inputs.transportation.distancePerDay
    const days = inputs.transportation.daysPerWeek

    if (currentMode === 'car') {
      const ptSaving = Math.round(
        distance * days * 52 * (TRANSPORT_MODES.car.factor - TRANSPORT_MODES.publicTransport.factor) * 0.5
      )
      recommendations.push({
        id: 'transport_public',
        category: 'transportation',
        title: 'Switch to Public Transport',
        description: `Your car commute generates ${transportation.toLocaleString()} kg CO₂/year. Using public transport 2-3 days per week could significantly cut emissions.`,
        impactLevel: IMPACT_LEVELS.high,
        estimatedReduction: ptSaving,
      })

      recommendations.push({
        id: 'transport_bike',
        category: 'transportation',
        title: 'Try Cycling for Short Trips',
        description: 'Replacing car trips under 5 km with cycling eliminates emissions entirely while improving health.',
        impactLevel: IMPACT_LEVELS.medium,
        estimatedReduction: Math.round(transportation * 0.2),
      })
    }

    if (currentMode !== 'electricVehicle') {
      recommendations.push({
        id: 'transport_ev',
        category: 'transportation',
        title: 'Consider an Electric Vehicle',
        description: 'EVs produce up to 75% fewer emissions than gasoline cars over their lifetime.',
        impactLevel: IMPACT_LEVELS.high,
        estimatedReduction: Math.round(transportation * 0.6),
      })
    }
  }

  if (energy > 600) {
    const acHours = inputs.energy.acHoursPerDay
    recommendations.push({
      id: 'energy_led',
      category: 'energy',
      title: 'Switch to LED Bulbs',
      description: 'LED bulbs use 75% less energy than incandescent bulbs and last 25 times longer.',
      impactLevel: IMPACT_LEVELS.medium,
      estimatedReduction: Math.round(energy * 0.08),
    })

    if (acHours > 3) {
      recommendations.push({
        id: 'energy_ac',
        category: 'energy',
        title: 'Reduce AC Usage',
        description: `You run AC ${acHours} hours/day. Raising the thermostat by 2°C or using fans can cut cooling emissions by 20-30%.`,
        impactLevel: IMPACT_LEVELS.high,
        estimatedReduction: Math.round(energy * 0.15),
      })
    }

    recommendations.push({
      id: 'energy_solar',
      category: 'energy',
      title: 'Explore Renewable Energy',
      description: 'Switching to a green energy provider or installing solar panels can eliminate grid electricity emissions.',
      impactLevel: IMPACT_LEVELS.high,
      estimatedReduction: Math.round(energy * 0.5),
    })
  }

  if (food > 2200) {
    const diet = inputs.food.diet
    if (diet === 'nonVegetarian' || diet === 'mixed') {
      recommendations.push({
        id: 'food_plant',
        category: 'food',
        title: 'Adopt More Plant-Based Meals',
        description: 'Having 2-3 meat-free days per week can reduce your food carbon footprint by up to 30%.',
        impactLevel: IMPACT_LEVELS.high,
        estimatedReduction: Math.round(food * 0.25),
      })
    }

    recommendations.push({
      id: 'food_local',
      category: 'food',
      title: 'Buy Local & Seasonal Produce',
      description: 'Local, seasonal food travels shorter distances and requires less refrigeration and packaging.',
      impactLevel: IMPACT_LEVELS.low,
      estimatedReduction: Math.round(food * 0.05),
    })
  }

  if (waste > 350) {
    const recycling = inputs.waste.recycling
    if (recycling === 'never' || recycling === 'sometimes') {
      recommendations.push({
        id: 'waste_recycle',
        category: 'waste',
        title: 'Improve Recycling Habits',
        description: 'Consistent recycling can reduce landfill emissions by up to 45%. Set up labeled bins for paper, plastic, and glass.',
        impactLevel: IMPACT_LEVELS.medium,
        estimatedReduction: Math.round(waste * 0.2),
      })
    }

    if (inputs.waste.plastic !== 'low') {
      recommendations.push({
        id: 'waste_plastic',
        category: 'waste',
        title: 'Reduce Single-Use Plastic',
        description: 'Carry reusable bags, bottles, and containers. Avoid packaged products when possible.',
        impactLevel: IMPACT_LEVELS.medium,
        estimatedReduction: Math.round(waste * 0.15),
      })
    }

    if (inputs.waste.composting === 'none') {
      recommendations.push({
        id: 'waste_compost',
        category: 'waste',
        title: 'Start Composting',
        description: 'Food waste in landfills produces methane. Composting diverts organic waste and enriches soil.',
        impactLevel: IMPACT_LEVELS.medium,
        estimatedReduction: 120,
      })
    }
  }

  if (shopping > 250) {
    recommendations.push({
      id: 'shop_clothing',
      category: 'shopping',
      title: 'Buy Less, Choose Better',
      description: 'Fast fashion is a major emissions source. Buy durable clothing, shop second-hand, and repair instead of replacing.',
      impactLevel: IMPACT_LEVELS.medium,
      estimatedReduction: Math.round(shopping * 0.3),
    })

    recommendations.push({
      id: 'shop_electronics',
      category: 'shopping',
      title: 'Extend Device Lifespan',
      description: 'Keep electronics longer and buy refurbished. Manufacturing accounts for most of a device\'s carbon footprint.',
      impactLevel: IMPACT_LEVELS.medium,
      estimatedReduction: Math.round(shopping * 0.25),
    })
  }

  if (recommendations.length === 0) {
    recommendations.push({
      id: 'maintain',
      category: 'general',
      title: 'Keep Up the Great Work!',
      description: `Your footprint of ${totalFootprint.toLocaleString()} kg CO₂/year is below average. Continue your sustainable habits and inspire others.`,
      impactLevel: IMPACT_LEVELS.low,
      estimatedReduction: 0,
    })
  }

  return recommendations.sort((a, b) => b.estimatedReduction - a.estimatedReduction)
}
