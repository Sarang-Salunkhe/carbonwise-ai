import { memo, useMemo } from 'react'
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { getTooltipStyle, getGridColor, getAxisColor } from '../../data/chartTheme'

function ProgressChart({ history }) {
  const data = useMemo(
    () =>
      history?.map((entry) => ({
        name: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        footprint: entry.totalFootprint,
        score: entry.score,
      })) ?? [],
    [history],
  )

  if (!history || history.length === 0) {
    return (
      <div className="chart-container flex items-center justify-center text-muted body-sm px-4 text-center">
        Complete calculations to see your progress over time
      </div>
    )
  }

  const gridColor = getGridColor()
  const axisColor = getAxisColor()

  return (
    <div className="chart-container w-full" role="img" aria-label="Carbon footprint progress chart">
      <ResponsiveContainer width="100%" height="100%" debounce={50}>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity={0.2} />
              <stop offset="100%" stopColor="var(--brand-primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: axisColor }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 11, fill: axisColor }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip
            formatter={(value, name) => [
              name === 'footprint' ? `${Number(value).toLocaleString()} kg CO₂` : value,
              name === 'footprint' ? 'Footprint' : 'Green Score',
            ]}
            contentStyle={getTooltipStyle()}
          />
          <Area
            type="monotone"
            dataKey="footprint"
            stroke="var(--brand-primary)"
            fill="url(#progressGradient)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: 'var(--brand-primary)' }}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="var(--brand-accent)"
            strokeWidth={2}
            dot={{ r: 3, fill: 'var(--brand-accent)' }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default memo(ProgressChart)
