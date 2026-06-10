export default function SectionHeader({ title, subtitle, className = '' }) {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">{subtitle}</p>
      )}
    </div>
  )
}
