import { getScoreColor } from '../../utils/greenScore'

export default function CircularScore({ score = 0, grade, label, size = 160 }) {
  const strokeWidth = size > 130 ? 10 : 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = getScoreColor(score)

  return (
    <div
      className="flex flex-col items-center"
      role="img"
      aria-label={`Green Score: ${score} out of 100${grade ? `, grade ${grade}` : ''}`}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--border-default)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="metric-value text-2xl sm:text-3xl">{score}</span>
          <span className="text-xs text-muted">/ 100</span>
        </div>
      </div>
      {grade && (
        <div className="mt-3 text-center">
          <p className="heading-lg">{grade}</p>
          {label && <p className="text-sm text-muted mt-0.5">{label}</p>}
        </div>
      )}
    </div>
  )
}
