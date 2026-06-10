import {
  TRANSPORT_MODES,
  FOOD_DIETS,
  ENERGY_FACTORS,
  WASTE_FACTORS,
  SHOPPING_FACTORS,
} from '../data/emissionFactors'

export function calculateTransportation({ mode, distancePerDay, daysPerWeek }) {
  const transport = TRANSPORT_MODES[mode] || TRANSPORT_MODES.car
  const weeklyKm = (distancePerDay || 0) * (daysPerWeek || 0)
  const annualKg = weeklyKm * 52 * transport.factor
  return Math.round(annualKg)
}

export function calculateFood({ diet }) {
  const food = FOOD_DIETS[diet] || FOOD_DIETS.mixed
  return food.annualKg
}

export function calculateEnergy({ monthlyElectricity, acHoursPerDay, householdSize }) {
  const size = Math.max(householdSize || 1, 1)
  const electricityAnnual = (monthlyElectricity || 0) * 12 * ENERGY_FACTORS.electricityPerKwh
  const acAnnual = (acHoursPerDay || 0) * 365 * ENERGY_FACTORS.acPerHour
  const total = (electricityAnnual + acAnnual) / size
  return Math.round(total)
}

export function calculateWaste({ recycling, plastic, composting }) {
  const recyclingData = WASTE_FACTORS.recycling[recycling] || WASTE_FACTORS.recycling.sometimes
  const plasticData = WASTE_FACTORS.plastic[plastic] || WASTE_FACTORS.plastic.medium
  const compostData = WASTE_FACTORS.composting[composting] || WASTE_FACTORS.composting.none

  const base = WASTE_FACTORS.baseWasteKg * recyclingData.multiplier
  const total = base + plasticData.annualKg - compostData.reduction
  return Math.max(Math.round(total), 50)
}

export function calculateShopping({ clothing, electronics }) {
  const clothingData = SHOPPING_FACTORS.clothing[clothing] || SHOPPING_FACTORS.clothing.moderate
  const electronicsData = SHOPPING_FACTORS.electronics[electronics] || SHOPPING_FACTORS.electronics.moderate
  return clothingData.annualKg + electronicsData.annualKg
}

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
