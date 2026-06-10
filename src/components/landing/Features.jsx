import { BarChart3, Brain, Gauge, FlaskConical, MessageCircle } from 'lucide-react'
import GlassCard from '../ui/GlassCard'

const features = [
  {
    icon: BarChart3,
    title: 'Carbon Tracking',
    description: 'Measure your footprint across transportation, food, energy, waste, and shopping with science-backed emission factors.',
  },
  {
    icon: Brain,
    title: 'Personalized Insights',
    description: 'Get tailored recommendations based on your lifestyle data, prioritized by impact and feasibility.',
  },
  {
    icon: Gauge,
    title: 'Green Score',
    description: 'A simple 0–100 score with letter grades that makes sustainability progress tangible and motivating.',
  },
  {
    icon: FlaskConical,
    title: 'What-If Simulator',
    description: 'Experiment with lifestyle changes and see projected emission reductions before committing.',
  },
  {
    icon: MessageCircle,
    title: 'Sustainability Coach',
    description: 'An intelligent assistant that analyzes your data and delivers contextual coaching messages.',
  },
]

export default function Features() {
  return (
    <section className="py-12 sm:py-20" aria-labelledby="features-heading">
      <div className="text-center mb-10 sm:mb-14 px-4">
        <p className="label text-[var(--brand-primary)] mb-2">Platform Features</p>
        <h2 id="features-heading" className="heading-xl sm:text-3xl md:text-4xl">
          Everything You Need to <span className="gradient-text">Go Green</span>
        </h2>
        <p className="mt-3 body-sm text-muted max-w-2xl mx-auto">
          A complete toolkit for understanding and reducing your environmental impact
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {features.map((feature, i) => (
          <GlassCard
            key={feature.title}
            hover
            className="animate-slide-up"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div className="inline-flex p-2.5 rounded-[var(--radius-md)] bg-[color-mix(in_srgb,var(--brand-primary)_10%,transparent)]">
              <feature.icon className="w-5 h-5 text-[var(--brand-primary)]" aria-hidden="true" />
            </div>
            <h3 className="mt-4 heading-lg">{feature.title}</h3>
            <p className="mt-2 body-sm text-muted leading-relaxed">{feature.description}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  )
}
