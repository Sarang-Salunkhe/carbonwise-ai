import { Eye, TrendingUp, Leaf, Repeat } from 'lucide-react'

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
    <section className="py-16" aria-labelledby="benefits-heading">
      <div className="glass-strong rounded-3xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 id="benefits-heading" className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Why <span className="gradient-text">CarbonWise AI</span>?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 mb-4">
                <benefit.icon className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{benefit.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
