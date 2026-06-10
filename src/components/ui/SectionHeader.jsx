export default function SectionHeader({ title, subtitle, className = '', badge }) {
  return (
    <header className={`mb-6 sm:mb-8 ${className}`}>
      {badge && (
        <span className="inline-block label text-[var(--brand-primary)] mb-2">{badge}</span>
      )}
      <h2 className="heading-xl">{title}</h2>
      {subtitle && (
        <p className="mt-2 body-sm text-muted max-w-2xl">{subtitle}</p>
      )}
    </header>
  )
}
