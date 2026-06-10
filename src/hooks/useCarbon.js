import { useContext, useMemo } from 'react'
import {
  CarbonInputsContext,
  CarbonResultsContext,
  CarbonActionsContext,
} from '../context/carbonContextDef'

export function useCarbonInputs() {
  const inputs = useContext(CarbonInputsContext)
  if (!inputs) throw new Error('useCarbonInputs must be used within CarbonProvider')
  return inputs
}

export function useCarbonResults() {
  const results = useContext(CarbonResultsContext)
  if (!results) throw new Error('useCarbonResults must be used within CarbonProvider')
  return results
}

export function useCarbonActions() {
  const actions = useContext(CarbonActionsContext)
  if (!actions) throw new Error('useCarbonActions must be used within CarbonProvider')
  return actions
}

export function useCarbonState() {
  const inputs = useCarbonInputs()
  const results = useCarbonResults()
  return useMemo(() => ({ inputs, ...results }), [inputs, results])
}

export function useCarbon() {
  const state = useCarbonState()
  const actions = useCarbonActions()
  return { state, ...actions }
}
