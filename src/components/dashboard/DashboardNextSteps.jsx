import { Link } from 'react-router-dom'
import { FlaskConical, TrendingUp, ArrowRight } from 'lucide-react'
import GlassCard from '../ui/GlassCard'

const steps = [
  {
    to: '/simulator',
    icon: FlaskConical,
    title: 'What-If Simulator',
    description: 'Experiment with lifestyle changes and see projected emission savings.',
    accent: 'var(--color-info)',
  },
  {
    to: '/progress',
    icon: TrendingUp,
    title: 'Track Progress',
    description: 'Monitor your improvements over time and hit sustainability milestones.',
    accent: 'var(--brand-secondary)',
  },
]

export default function DashboardNextSteps() {
  return (
    <section id="next-steps" className="scroll-mt-20" aria-labelledby="next-steps-heading">
      <h2 id="next-steps-heading" className="heading-lg mb-4 sm:mb-6">Continue Your Journey</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {steps.map((step) => (
          <Link
            key={step.to}
            to={step.to}
            className="group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] rounded-[var(--radius-xl)]"
          >
            <GlassCard hover className="h-full flex items-start gap-3 sm:gap-4">
              <div
                className="p-2.5 sm:p-3 rounded-[var(--radius-md)] flex-shrink-0"
                style={{ background: `color-mix(in srgb, ${step.accent} 10%, transparent)` }}
              >
                <step.icon className="w-5 h-5" style={{ color: step.accent }} aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="heading-lg text-base group-hover:text-[var(--brand-primary)] transition-colors">
                  {step.title}
                </h3>
                <p className="body-sm text-muted mt-1">{step.description}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted group-hover:text-[var(--brand-primary)] transition-colors flex-shrink-0 mt-0.5" aria-hidden="true" />
            </GlassCard>
          </Link>
        ))}
      </div>
    </section>
  )
}
