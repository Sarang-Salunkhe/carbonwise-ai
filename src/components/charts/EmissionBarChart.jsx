import { memo, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getChartColors, getTooltipStyle, getGridColor, getAxisColor } from '../../data/chartTheme'

const LABELS = {
  transportation: 'Transport',
  food: 'Food',
  energy: 'Energy',
  waste: 'Waste',
  shopping: 'Shopping',
}

function EmissionBarChart({ breakdown }) {
  const colors = getChartColors()
  const gridColor = getGridColor()
  const axisColor = getAxisColor()

  const data = useMemo(
    () =>
      breakdown
        ? Object.entries(breakdown).map(([key, value]) => ({
            name: LABELS[key] || key,
            emissions: value,
          }))
        : [],
    [breakdown],
  )

  if (!breakdown || data.length === 0) return null

  return (
    <div className="chart-container w-full" role="img" aria-label="Emission breakdown bar chart">
      <ResponsiveContainer width="100%" height="100%" debounce={50}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: axisColor }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: axisColor }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip
            formatter={(value) => [`${Number(value).toLocaleString()} kg CO₂`, 'Annual']}
            contentStyle={getTooltipStyle()}
            cursor={{ fill: 'color-mix(in srgb, var(--brand-primary) 6%, transparent)' }}
          />
          <Bar
            dataKey="emissions"
            fill={colors[0]}
            radius={[6, 6, 0, 0]}
            maxBarSize={48}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default memo(EmissionBarChart)
