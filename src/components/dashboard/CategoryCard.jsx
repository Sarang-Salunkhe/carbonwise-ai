import GlassCard from '../ui/GlassCard'

const categoryConfig = {
  transportation: { icon: '🚗', color: 'var(--chart-1)' },
  food: { icon: '🍽️', color: 'var(--chart-2)' },
  energy: { icon: '⚡', color: 'var(--chart-3)' },
  waste: { icon: '♻️', color: 'var(--chart-4)' },
  shopping: { icon: '🛍️', color: 'var(--chart-5)' },
}

const labels = {
  transportation: 'Transportation',
  food: 'Food',
  energy: 'Energy',
  waste: 'Waste',
  shopping: 'Shopping',
}

export default function CategoryCard({ category, value, total }) {
  const config = categoryConfig[category] || { icon: '📊', color: 'var(--text-muted)' }
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0

  return (
    <GlassCard hover className="relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: config.color }} />
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="label text-muted truncate">{labels[category]}</p>
          <p className="metric-value text-xl sm:text-2xl mt-1">
            {value.toLocaleString()}
            <span className="text-xs font-normal text-muted ml-1">kg/yr</span>
          </p>
        </div>
        <span className="text-xl sm:text-2xl flex-shrink-0" role="img" aria-hidden="true">{config.icon}</span>
      </div>
      <div className="mt-3 sm:mt-4">
        <div className="flex justify-between text-xs text-muted mb-1.5">
          <span>Share</span>
          <span>{percentage}%</span>
        </div>
        <div className="h-1.5 bg-[var(--surface-interactive)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${percentage}%`, background: config.color }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${labels[category]} share of total emissions`}
          />
        </div>
      </div>
    </GlassCard>
  )
}
