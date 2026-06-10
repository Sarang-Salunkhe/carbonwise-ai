export default function GlassCard({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`glass rounded-2xl p-6 ${hover ? 'transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-0.5' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
