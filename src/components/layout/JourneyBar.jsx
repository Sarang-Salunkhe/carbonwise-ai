import { memo } from 'react'
import JourneySteps from '../ui/JourneySteps'

function JourneyBar({ pathname, hash, hasFootprint, historyLength, simulatorUsed }) {
  return (
    <JourneySteps
      compact
      currentPath={pathname}
      hash={hash}
      hasFootprint={hasFootprint}
      historyLength={historyLength}
      simulatorUsed={simulatorUsed}
    />
  )
}

export default memo(JourneyBar)
