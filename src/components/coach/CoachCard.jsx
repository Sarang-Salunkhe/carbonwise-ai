import { Lightbulb, Trophy, Target, Info } from 'lucide-react'
import GlassCard from '../ui/GlassCard'

const typeConfig = {
  welcome: { icon: Info, color: 'text-blue-500 bg-blue-500/10' },
  insight: { icon: Lightbulb, color: 'text-amber-500 bg-amber-500/10' },
  action: { icon: Target, color: 'text-emerald-500 bg-emerald-500/10' },
  celebration: { icon: Trophy, color: 'text-teal-500 bg-teal-500/10' },
  motivation: { icon: Lightbulb, color: 'text-cyan-500 bg-cyan-500/10' },
}

export default function CoachCard({ message }) {
  const config = typeConfig[message.type] || typeConfig.insight
  const Icon = config.icon

  return (
    <GlassCard className="flex gap-4">
      <div className={`flex-shrink-0 p-3 rounded-xl h-fit ${config.color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{message.message}</p>
      </div>
    </GlassCard>
  )
}
