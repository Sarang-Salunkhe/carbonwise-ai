import { useState, useCallback, useEffect } from 'react'
import { CarbonContext } from './carbonContextDef'
import { loadState, saveState, addHistoryEntry } from '../utils/storage'
import { calculateFootprint } from '../utils/carbonCalculator'
import { calculateGreenScore, getGrade } from '../utils/greenScore'
import { checkAchievements } from '../utils/achievements'

export function CarbonProvider({ children }) {
  const [state, setState] = useState(() => {
    const loaded = loadState()
    return { ...loaded, achievements: checkAchievements(loaded) }
  })

  useEffect(() => {
    saveState(state)
  }, [state])

  const updateInputs = useCallback((section, data) => {
    setState((prev) => ({
      ...prev,
      inputs: {
        ...prev.inputs,
        [section]: { ...prev.inputs[section], ...data },
      },
    }))
  }, [])

  const setInputs = useCallback((inputs) => {
    setState((prev) => ({ ...prev, inputs }))
  }, [])

  const calculate = useCallback(() => {
    const footprint = calculateFootprint(state.inputs)
    const score = calculateGreenScore(footprint.breakdown)
    const grade = getGrade(score)

    setState((prev) => {
      const entry = {
        totalFootprint: footprint.totalFootprint,
        breakdown: footprint.breakdown,
        score,
        grade: grade.grade,
        date: new Date().toISOString(),
      }
      const withHistory = addHistoryEntry(prev, entry)
      const newState = {
        ...withHistory,
        currentFootprint: footprint,
        currentScore: score,
        currentGrade: grade,
      }
      newState.achievements = checkAchievements(newState)
      return newState
    })

    return footprint
  }, [state.inputs])

  const markSimulatorUsed = useCallback(() => {
    setState((prev) => {
      const newState = { ...prev, simulatorUsed: true }
      newState.achievements = checkAchievements(newState)
      return newState
    })
  }, [])

  return (
    <CarbonContext.Provider value={{
      state,
      updateInputs,
      setInputs,
      calculate,
      markSimulatorUsed,
    }}>
      {children}
    </CarbonContext.Provider>
  )
}
