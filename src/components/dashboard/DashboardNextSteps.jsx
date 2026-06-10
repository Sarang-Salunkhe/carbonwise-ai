import { Link } from 'react-router-dom'
import { FlaskConical, TrendingUp, ArrowRight } from 'lucide-react'
import GlassCard from '../ui/GlassCard'

const steps = [
  {
    to: '/simulator',
    icon: FlaskConical,
    title: 'What-If Simulator',
    description: 'Experiment with lifestyle changes and see projected emission savings.',
    color: 'text-blue-500 bg-blue-500/10',
  },
  {
    to: '/progress',
    icon: TrendingUp,
    title: 'Track Progress',
    description: 'Monitor your improvements over time and hit sustainability milestones.',
    color: 'text-teal-500 bg-teal-500/10',
  },
]

export default function DashboardNextSteps() {
  return (
    <section id="next-steps" className="scroll-mt-24" aria-labelledby="next-steps-heading">
      <h2 id="next-steps-heading" className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        Continue Your Journey
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {steps.map((step) => (
          <Link
            key={step.to}
            to={step.to}
            className="group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 rounded-2xl"
          >
            <GlassCard hover className="h-full flex items-start gap-4">
              <div className={`p-3 rounded-xl ${step.color}`}>
                <step.icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1">{step.description}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors flex-shrink-0 mt-1" aria-hidden="true" />
            </GlassCard>
          </Link>
        ))}
      </div>
    </section>
  )
}
