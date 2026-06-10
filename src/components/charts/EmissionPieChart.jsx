import { memo, useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { getChartColors, getTooltipStyle } from '../../data/chartTheme'
import { useTheme } from '../../hooks/useTheme'

const LABELS = {
  transportation: 'Transport',
  food: 'Food',
  energy: 'Energy',
  waste: 'Waste',
  shopping: 'Shopping',
}

function EmissionPieChart({ breakdown }) {
  const { theme } = useTheme()
  const colors = getChartColors()

  const data = useMemo(
    () =>
      breakdown
        ? Object.entries(breakdown).map(([key, value]) => ({
            name: LABELS[key] || key,
            value,
          }))
        : [],
    [breakdown],
  )

  if (!breakdown || data.length === 0) return null

  return (
    <div className="chart-container w-full" role="img" aria-label="Emission breakdown pie chart">
      <div className="sr-only">
        <table>
          <caption>Emission breakdown by category</caption>
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Emissions (kg CO₂/yr)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.value.toLocaleString()} kg CO₂</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ResponsiveContainer width="100%" height="100%" debounce={50}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius="45%"
            outerRadius="72%"
            paddingAngle={2}
            dataKey="value"
            isAnimationActive={false}
          >
            {data.map((_, index) => (
              <Cell key={`${theme}-${index}`} fill={colors[index % colors.length]} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${Number(value).toLocaleString()} kg CO₂`, 'Emissions']}
            contentStyle={getTooltipStyle()}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default memo(EmissionPieChart)
