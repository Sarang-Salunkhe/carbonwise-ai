import { getScoreColor } from '../../utils/greenScore'

export default function CircularScore({ score = 0, grade, label, size = 160 }) {
  const strokeWidth = 10
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = getScoreColor(score)

  return (
    <div className="flex flex-col items-center" role="img" aria-label={`Green Score: ${score} out of 100, grade ${grade}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-200 dark:text-slate-700"
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
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-slate-900 dark:text-white">{score}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">/ 100</span>
        </div>
      </div>
      {grade && (
        <div className="mt-3 text-center">
          <p className="text-lg font-bold text-slate-900 dark:text-white">{grade}</p>
          {label && <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>}
        </div>
      )}
    </div>
  )
}
