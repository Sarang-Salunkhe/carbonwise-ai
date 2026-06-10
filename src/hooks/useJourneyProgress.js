import { useContext, useMemo } from 'react'
import { CarbonResultsContext } from '../context/carbonContextDef'

/**
 * Subscribes only to results context — Layout won't re-render when calculator inputs change.
 */
export function useJourneyProgress() {
  const results = useContext(CarbonResultsContext)
  if (!results) throw new Error('useJourneyProgress must be used within CarbonProvider')

  return useMemo(
    () => ({
      hasFootprint: !!results.currentFootprint,
      historyLength: results.history.length,
      simulatorUsed: results.simulatorUsed,
    }),
    [results.currentFootprint, results.history.length, results.simulatorUsed],
  )
}
