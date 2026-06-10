import { Link } from 'react-router-dom'
import { Eye, TrendingUp, Leaf, Repeat, ArrowRight } from 'lucide-react'
import Button from '../ui/Button'

const benefits = [
  {
    icon: Eye,
    title: 'Understand Your Footprint',
    description: 'See exactly where your emissions come from with detailed category breakdowns and visualizations.',
  },
  {
    icon: TrendingUp,
    title: 'Track Your Progress',
    description: 'Monitor improvements over time with historical data, trends, and achievement milestones.',
  },
  {
    icon: Leaf,
    title: 'Reduce Emissions',
    description: 'Follow data-driven recommendations ranked by impact to make the biggest difference.',
  },
  {
    icon: Repeat,
    title: 'Build Sustainable Habits',
    description: 'Transform one-time actions into lasting lifestyle changes with coaching and gamification.',
  },
]

export default function Benefits() {
  return (
    <section className="py-12 sm:py-20" aria-labelledby="benefits-heading">
      <div className="card p-6 sm:p-10 md:p-12">
        <div className="text-center mb-10 sm:mb-12">
          <p className="label text-[var(--brand-primary)] mb-2">Why CarbonWise</p>
          <h2 id="benefits-heading" className="heading-xl sm:text-3xl md:text-4xl">
            Built for <span className="gradient-text">Real Impact</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div className="inline-flex p-3.5 rounded-2xl bg-[color-mix(in_srgb,var(--brand-primary)_8%,transparent)] border border-[color-mix(in_srgb,var(--brand-primary)_12%,transparent)] mb-4">
                <benefit.icon className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--brand-primary)]" aria-hidden="true" />
              </div>
              <h3 className="heading-lg text-base sm:text-lg">{benefit.title}</h3>
              <p className="mt-2 body-sm text-muted">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 text-center">
          <Link to="/calculator">
            <Button size="lg">
              Start Your Assessment
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
