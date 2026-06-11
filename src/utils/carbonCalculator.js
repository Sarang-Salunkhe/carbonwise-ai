import {
  TRANSPORT_MODES,
  FOOD_DIETS,
  ENERGY_FACTORS,
  WASTE_FACTORS,
  SHOPPING_FACTORS,
} from '../data/emissionFactors'


/**
 * Calculates annual transportation emissions in kilograms of CO₂.
 * @param {Object} transport
 * @param {string} transport.mode Transportation mode
 * @param {number} transport.distancePerDay Distance traveled per day (km)
 * @param {number} transport.daysPerWeek Days traveled per week
 * @returns {number} Annual transportation emissions
 **/

export function calculateTransportation({ mode, distancePerDay, daysPerWeek }) {
  const transport = TRANSPORT_MODES[mode] || TRANSPORT_MODES.car
  const weeklyKm = (distancePerDay || 0) * (daysPerWeek || 0)
  const annualKg = weeklyKm * 52 * transport.factor
  return Math.round(annualKg)
}


/**
 * Calculates annual food-related emissions.
 * @param {Object} food
 * @param {string} food.diet Diet type
 * @returns {number} Annual food emissions
 */

export function calculateFood({ diet }) {
  const food = FOOD_DIETS[diet] || FOOD_DIETS.mixed
  return food.annualKg
}


/**
 * Calculates annual household energy emissions.
 * @param {Object} energy
 * @param {number} energy.monthlyElectricity Monthly electricity usage (kWh)
 * @param {number} energy.acHoursPerDay Daily AC usage hours
 * @param {number} energy.householdSize Number of household members
 * @returns {number} Annual energy emissions per household member
 */

export function calculateEnergy({ monthlyElectricity, acHoursPerDay, householdSize }) {
  const size = Math.max(householdSize || 1, 1)
  const electricityAnnual = (monthlyElectricity || 0) * 12 * ENERGY_FACTORS.electricityPerKwh
  const acAnnual = (acHoursPerDay || 0) * 365 * ENERGY_FACTORS.acPerHour
  const total = (electricityAnnual + acAnnual) / size
  return Math.round(total)
}


/**
 * Calculates annual waste-related emissions.
 * @param {Object} waste
 * @param {string} waste.recycling Recycling frequency
 * @param {string} waste.plastic Plastic consumption level
 * @param {string} waste.composting Composting habit
 * @returns {number} Annual waste emissions
 */

export function calculateWaste({ recycling, plastic, composting }) {
  const recyclingData = WASTE_FACTORS.recycling[recycling] || WASTE_FACTORS.recycling.sometimes
  const plasticData = WASTE_FACTORS.plastic[plastic] || WASTE_FACTORS.plastic.medium
  const compostData = WASTE_FACTORS.composting[composting] || WASTE_FACTORS.composting.none

  const base = WASTE_FACTORS.baseWasteKg * recyclingData.multiplier
  const total = base + plasticData.annualKg - compostData.reduction
  return Math.max(Math.round(total), 50)
}


/**
 * Calculates annual shopping-related emissions.
 * @param {Object} shopping
 * @param {string} shopping.clothing Clothing consumption level
 * @param {string} shopping.electronics Electronics consumption level
 * @returns {number} Annual shopping emissions
 */

export function calculateShopping({ clothing, electronics }) {
  const clothingData = SHOPPING_FACTORS.clothing[clothing] || SHOPPING_FACTORS.clothing.moderate
  const electronicsData = SHOPPING_FACTORS.electronics[electronics] || SHOPPING_FACTORS.electronics.moderate
  return clothingData.annualKg + electronicsData.annualKg
}


/**
 * Calculates the complete annual carbon footprint breakdown.
 * @param {Object} inputs User lifestyle inputs
 * @returns {Object} Carbon footprint analysis and breakdown
 */

export function calculateFootprint(inputs) {
  const breakdown = {
    transportation: calculateTransportation(inputs.transportation),
    food: calculateFood(inputs.food),
    energy: calculateEnergy(inputs.energy),
    waste: calculateWaste(inputs.waste),
    shopping: calculateShopping(inputs.shopping),
  }

  const totalFootprint = Object.values(breakdown).reduce((sum, v) => sum + v, 0)

  return {
    breakdown,
    totalFootprint,
    inputs: { ...inputs },
    calculatedAt: new Date().toISOString(),
  }
}


/**
 * Simulates a modified carbon footprint using hypothetical changes.
 * @param {Object} currentInputs Current user inputs
 * @param {Object} overrides Simulated lifestyle changes
 * @returns {Object} Simulated footprint results
 */

export function simulateFootprint(currentInputs, overrides) {
  const merged = {
    transportation: { ...currentInputs.transportation, ...overrides.transportation },
    food: { ...currentInputs.food, ...overrides.food },
    energy: { ...currentInputs.energy, ...overrides.energy },
    waste: { ...currentInputs.waste, ...overrides.waste },
    shopping: { ...currentInputs.shopping, ...overrides.shopping },
  }
  return calculateFootprint(merged)
}
