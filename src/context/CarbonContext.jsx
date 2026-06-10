import { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import {
  CarbonInputsContext,
  CarbonResultsContext,
  CarbonActionsContext,
} from './carbonContextDef'
import { loadState, saveState, DEFAULT_INPUTS } from '../utils/storage'
import { calculateFootprint } from '../utils/carbonCalculator'
import { calculateGreenScore, getGrade } from '../utils/greenScore'
import { checkAchievements } from '../utils/achievements'

const SAVE_DEBOUNCE_MS = 500

function loadInitial() {
  const loaded = loadState()
  const results = {
    history: loaded.history,
    currentFootprint: loaded.currentFootprint,
    currentScore: loaded.currentScore,
    currentGrade: loaded.currentGrade,
    simulatorUsed: loaded.simulatorUsed,
    achievements: checkAchievements(loaded),
  }
  return {
    inputs: { ...DEFAULT_INPUTS, ...loaded.inputs },
    results,
  }
}

function serializeForSave(inputs, results) {
  return JSON.stringify({ inputs, ...results })
}

export function CarbonProvider({ children }) {
  const initialData = useMemo(() => loadInitial(), [])
  const [inputs, setInputsState] = useState(initialData.inputs)
  const [results, setResults] = useState(initialData.results)

  const snapshotRef = useRef({ inputs: initialData.inputs, results: initialData.results })
  const lastSerializedRef = useRef(serializeForSave(initialData.inputs, initialData.results))
  const saveTimeoutRef = useRef(null)

  useEffect(() => {
    snapshotRef.current = { inputs, results }
  }, [inputs, results])

  const scheduleSave = useCallback(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    saveTimeoutRef.current = setTimeout(() => {
      const { inputs: i, results: r } = snapshotRef.current
      const serialized = serializeForSave(i, r)
      if (serialized === lastSerializedRef.current) return
      lastSerializedRef.current = serialized
      saveState({ inputs: i, ...r })
    }, SAVE_DEBOUNCE_MS)
  }, [])

  useEffect(() => {
    scheduleSave()
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    }
  }, [inputs, results, scheduleSave])

  const updateInputs = useCallback((section, data) => {
    setInputsState((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }))
  }, [])

  const setInputs = useCallback((next) => {
    setInputsState(next)
  }, [])

  const calculate = useCallback(() => {
    let footprint = null
    setResults((prev) => {
      const currentInputs = snapshotRef.current.inputs
      footprint = calculateFootprint(currentInputs)
      const score = calculateGreenScore(footprint.breakdown)
      const grade = getGrade(score)

      const entry = {
        totalFootprint: footprint.totalFootprint,
        breakdown: footprint.breakdown,
        score,
        grade: grade.grade,
        date: new Date().toISOString(),
      }
      const history = [...prev.history, entry].slice(-24)
      const next = {
        ...prev,
        history,
        currentFootprint: footprint,
        currentScore: score,
        currentGrade: grade,
        simulatorUsed: prev.simulatorUsed,
      }
      next.achievements = checkAchievements(next)
      return next
    })
    return footprint
  }, [])

  const markSimulatorUsed = useCallback(() => {
    setResults((prev) => {
      if (prev.simulatorUsed) return prev
      const next = { ...prev, simulatorUsed: true }
      next.achievements = checkAchievements(next)
      return next
    })
  }, [])

  const actions = useMemo(
    () => ({ updateInputs, setInputs, calculate, markSimulatorUsed }),
    [updateInputs, setInputs, calculate, markSimulatorUsed],
  )

  return (
    <CarbonInputsContext.Provider value={inputs}>
      <CarbonResultsContext.Provider value={results}>
        <CarbonActionsContext.Provider value={actions}>
          {children}
        </CarbonActionsContext.Provider>
      </CarbonResultsContext.Provider>
    </CarbonInputsContext.Provider>
  )
}
