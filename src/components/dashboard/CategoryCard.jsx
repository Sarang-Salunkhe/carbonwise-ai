import GlassCard from '../ui/GlassCard'

const categoryConfig = {
  transportation: { icon: '🚗', color: 'from-emerald-500 to-teal-500' },
  food: { icon: '🍽️', color: 'from-teal-500 to-cyan-500' },
  energy: { icon: '⚡', color: 'from-cyan-500 to-blue-500' },
  waste: { icon: '♻️', color: 'from-blue-500 to-indigo-500' },
  shopping: { icon: '🛍️', color: 'from-indigo-500 to-purple-500' },
}

const labels = {
  transportation: 'Transportation',
  food: 'Food',
  energy: 'Energy',
  waste: 'Waste',
  shopping: 'Shopping',
}

export default function CategoryCard({ category, value, total }) {
  const config = categoryConfig[category] || { icon: '📊', color: 'from-slate-500 to-slate-600' }
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0

  return (
    <GlassCard hover className="relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${config.color}`} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{labels[category]}</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {value.toLocaleString()}
            <span className="text-sm font-normal text-slate-500 ml-1">kg/yr</span>
          </p>
        </div>
        <span className="text-2xl" role="img" aria-hidden="true">{config.icon}</span>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Share of total</span>
          <span>{percentage}%</span>
        </div>
        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${config.color} rounded-full transition-all duration-700`}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </GlassCard>
  )
}
