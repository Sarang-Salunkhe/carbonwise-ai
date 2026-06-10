import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const LABELS = {
  transportation: 'Transport',
  food: 'Food',
  energy: 'Energy',
  waste: 'Waste',
  shopping: 'Shopping',
}

export default function EmissionBarChart({ breakdown }) {
  if (!breakdown) return null

  const data = Object.entries(breakdown).map(([key, value]) => ({
    name: LABELS[key] || key,
    emissions: value,
  }))

  return (
    <div className="w-full h-72" role="img" aria-label="Emission breakdown bar chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value) => [`${value.toLocaleString()} kg CO₂`, 'Annual']}
            contentStyle={{
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              borderRadius: '12px',
            }}
          />
          <Bar dataKey="emissions" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
