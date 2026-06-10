import { BarChart3, Brain, Gauge, FlaskConical, MessageCircle } from 'lucide-react'
import GlassCard from '../ui/GlassCard'

const features = [
  {
    icon: BarChart3,
    title: 'Carbon Tracking',
    description: 'Measure your footprint across transportation, food, energy, waste, and shopping with science-backed emission factors.',
    color: 'text-emerald-500 bg-emerald-500/10',
  },
  {
    icon: Brain,
    title: 'Personalized Insights',
    description: 'Get tailored recommendations based on your lifestyle data, prioritized by impact and feasibility.',
    color: 'text-teal-500 bg-teal-500/10',
  },
  {
    icon: Gauge,
    title: 'Green Score',
    description: 'A simple 0-100 score with letter grades that makes sustainability progress tangible and motivating.',
    color: 'text-cyan-500 bg-cyan-500/10',
  },
  {
    icon: FlaskConical,
    title: 'What-If Simulator',
    description: 'Experiment with lifestyle changes and see projected emission reductions before committing.',
    color: 'text-blue-500 bg-blue-500/10',
  },
  {
    icon: MessageCircle,
    title: 'Sustainability Coach',
    description: 'An intelligent assistant that analyzes your data and delivers contextual coaching messages.',
    color: 'text-indigo-500 bg-indigo-500/10',
  },
]

export default function Features() {
  return (
    <section className="py-16" aria-labelledby="features-heading">
      <div className="text-center mb-12">
        <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Everything You Need to <span className="gradient-text">Go Green</span>
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          A complete toolkit for understanding and reducing your environmental impact
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <GlassCard key={feature.title} hover className="animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className={`inline-flex p-3 rounded-xl ${feature.color}`}>
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  )
}
