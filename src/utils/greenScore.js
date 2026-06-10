import { BENCHMARKS, GRADE_THRESHOLDS } from '../data/emissionFactors'

const CATEGORY_BENCHMARKS = {
  transportation: 1200,
  food: 2500,
  energy: 800,
  waste: 400,
  shopping: 300,
}

function categoryScore(annualKg, benchmark) {
  const ratio = annualKg / benchmark
  if (ratio <= 0.5) return 100
  if (ratio <= 0.75) return 90
  if (ratio <= 1.0) return 75
  if (ratio <= 1.25) return 60
  if (ratio <= 1.5) return 45
  if (ratio <= 2.0) return 30
  return 15
}

export function calculateGreenScore(breakdown) {
  const weights = BENCHMARKS.categoryWeights
  let weightedSum = 0

  for (const [category, weight] of Object.entries(weights)) {
    const kg = breakdown[category] || 0
    const benchmark = CATEGORY_BENCHMARKS[category]
    weightedSum += categoryScore(kg, benchmark) * weight
  }

  return Math.round(Math.min(100, Math.max(0, weightedSum)))
}

export function getGrade(score) {
  for (const threshold of GRADE_THRESHOLDS) {
    if (score >= threshold.min) {
      return { grade: threshold.grade, label: threshold.label }
    }
  }
  return { grade: 'D', label: 'High Impact' }
}

export function getScoreColor(score) {
  if (score >= 90) return '#10b981'
  if (score >= 80) return '#14b8a6'
  if (score >= 65) return '#06b6d4'
  if (score >= 45) return '#f59e0b'
  return '#ef4444'
}
