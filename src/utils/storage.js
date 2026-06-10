const STORAGE_KEY = 'carbonwise_ai_data'

export const DEFAULT_INPUTS = {
  transportation: {
    mode: 'car',
    distancePerDay: 20,
    daysPerWeek: 5,
  },
  food: {
    diet: 'mixed',
  },
  energy: {
    monthlyElectricity: 200,
    acHoursPerDay: 4,
    householdSize: 3,
  },
  waste: {
    recycling: 'sometimes',
    plastic: 'medium',
    composting: 'none',
  },
  shopping: {
    clothing: 'moderate',
    electronics: 'moderate',
  },
}

const DEFAULT_STATE = {
  inputs: DEFAULT_INPUTS,
  history: [],
  currentFootprint: null,
  currentScore: 0,
  currentGrade: null,
  simulatorUsed: false,
  achievements: [],
  lastUpdated: null,
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_STATE }
    const parsed = JSON.parse(raw)
    return {
      ...DEFAULT_STATE,
      ...parsed,
      inputs: { ...DEFAULT_INPUTS, ...parsed.inputs },
    }
  } catch {
    return { ...DEFAULT_STATE }
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...state,
      lastUpdated: new Date().toISOString(),
    }))
  } catch (e) {
    console.error('Failed to save state:', e)
  }
}

export function addHistoryEntry(state, entry) {
  const history = [...state.history, entry].slice(-24)
  return { ...state, history }
}
