import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

export default function ProgressChart({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="h-72 flex items-center justify-center text-slate-500 dark:text-slate-400">
        Complete calculations to see your progress over time
      </div>
    )
  }

  const data = history.map((entry, i) => ({
    name: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    footprint: entry.totalFootprint,
    score: entry.score,
    index: i + 1,
  }))

  return (
    <div className="w-full h-72" role="img" aria-label="Carbon footprint progress chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value, name) => [
              name === 'footprint' ? `${value.toLocaleString()} kg CO₂` : value,
              name === 'footprint' ? 'Footprint' : 'Green Score',
            ]}
            contentStyle={{
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              borderRadius: '12px',
            }}
          />
          <Area
            type="monotone"
            dataKey="footprint"
            stroke="#10b981"
            fill="url(#progressGradient)"
            strokeWidth={2}
          />
          <Line type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
