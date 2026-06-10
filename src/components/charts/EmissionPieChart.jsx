import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const COLORS = ['#10b981', '#14b8a6', '#06b6d4', '#8b5cf6', '#f59e0b']

const LABELS = {
  transportation: 'Transportation',
  food: 'Food',
  energy: 'Energy',
  waste: 'Waste',
  shopping: 'Shopping',
}

export default function EmissionPieChart({ breakdown }) {
  if (!breakdown) return null

  const data = Object.entries(breakdown).map(([key, value]) => ({
    name: LABELS[key] || key,
    value,
  }))

  return (
    <div className="w-full h-72" role="img" aria-label="Emission breakdown pie chart">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value.toLocaleString()} kg CO₂`, 'Emissions']}
            contentStyle={{
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
