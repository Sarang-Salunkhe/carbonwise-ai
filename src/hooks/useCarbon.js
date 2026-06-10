import { useContext } from 'react'
import { CarbonContext } from '../context/carbonContextDef'

export function useCarbon() {
  const ctx = useContext(CarbonContext)
  if (!ctx) throw new Error('useCarbon must be used within CarbonProvider')
  return ctx
}
