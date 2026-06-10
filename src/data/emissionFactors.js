/**
 * Emission factors based on IPCC guidelines and EPA averages (kg CO₂e).
 * Sources: EPA GHG Equivalencies, DEFRA conversion factors, IPCC AR6.
 */

export const TRANSPORT_MODES = {
  car: { label: 'Car', factor: 0.21, unit: 'kg CO₂/km' },
  bike: { label: 'Bike', factor: 0, unit: 'kg CO₂/km' },
  walking: { label: 'Walking', factor: 0, unit: 'kg CO₂/km' },
  publicTransport: { label: 'Public Transport', factor: 0.05, unit: 'kg CO₂/km' },
  electricVehicle: { label: 'Electric Vehicle', factor: 0.05, unit: 'kg CO₂/km' },
}

export const FOOD_DIETS = {
  vegan: { label: 'Vegan', annualKg: 1500 },
  vegetarian: { label: 'Vegetarian', annualKg: 1800 },
  mixed: { label: 'Mixed Diet', annualKg: 2500 },
  nonVegetarian: { label: 'Non-Vegetarian', annualKg: 3500 },
}

export const ENERGY_FACTORS = {
  electricityPerKwh: 0.475,
  acPerHour: 0.12,
  householdSizeDivisor: true,
}

export const WASTE_FACTORS = {
  recycling: {
    never: { label: 'Never', multiplier: 1.0 },
    sometimes: { label: 'Sometimes', multiplier: 0.85 },
    often: { label: 'Often', multiplier: 0.7 },
    always: { label: 'Always', multiplier: 0.55 },
  },
  plastic: {
    low: { label: 'Low', annualKg: 80 },
    medium: { label: 'Medium', annualKg: 150 },
    high: { label: 'High', annualKg: 280 },
  },
  composting: {
    none: { label: 'None', reduction: 0 },
    partial: { label: 'Partial', reduction: 60 },
    full: { label: 'Full', reduction: 120 },
  },
  baseWasteKg: 400,
}

export const SHOPPING_FACTORS = {
  clothing: {
    minimal: { label: 'Minimal (1-2/year)', annualKg: 50 },
    moderate: { label: 'Moderate (5-8/year)', annualKg: 150 },
    frequent: { label: 'Frequent (12+/year)', annualKg: 350 },
  },
  electronics: {
    minimal: { label: 'Minimal (every 4+ years)', annualKg: 75 },
    moderate: { label: 'Moderate (every 2-3 years)', annualKg: 200 },
    frequent: { label: 'Frequent (yearly)', annualKg: 450 },
  },
}

export const BENCHMARKS = {
  globalAverageKg: 4800,
  sustainableTargetKg: 2000,
  categoryWeights: {
    transportation: 0.25,
    food: 0.25,
    energy: 0.2,
    waste: 0.15,
    shopping: 0.15,
  },
}

export const GRADE_THRESHOLDS = [
  { min: 90, grade: 'A+', label: 'Eco Champion' },
  { min: 80, grade: 'A', label: 'Sustainable' },
  { min: 65, grade: 'B', label: 'Improving' },
  { min: 45, grade: 'C', label: 'Moderate Impact' },
  { min: 0, grade: 'D', label: 'High Impact' },
]
