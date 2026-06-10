import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import Benefits from '../components/landing/Benefits'
import JourneySteps from '../components/ui/JourneySteps'
import { useCarbon } from '../hooks/useCarbon'

export default function LandingPage() {
  const { state } = useCarbon()

  return (
    <>
      <Hero />
      <section id="how-it-works" className="scroll-mt-24">
        <JourneySteps
          hasFootprint={!!state.currentFootprint}
          historyLength={state.history.length}
          simulatorUsed={state.simulatorUsed}
        />
      </section>
      <Features />
      <Benefits />
    </>
  )
}
