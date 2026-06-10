const impactStyles = {
  High: 'bg-[color-mix(in_srgb,var(--color-error)_12%,transparent)] text-[var(--color-error)] border-[color-mix(in_srgb,var(--color-error)_20%,transparent)]',
  Medium: 'bg-[color-mix(in_srgb,var(--color-warning)_12%,transparent)] text-[var(--color-warning)] border-[color-mix(in_srgb,var(--color-warning)_20%,transparent)]',
  Low: 'bg-[color-mix(in_srgb,var(--color-success)_12%,transparent)] text-[var(--color-success)] border-[color-mix(in_srgb,var(--color-success)_20%,transparent)]',
}

export default function Badge({ children, impact, className = '' }) {
  const style = impact
    ? impactStyles[impact]
    : 'bg-[var(--surface-interactive)] text-[var(--text-secondary)] border-[var(--border-default)]'

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style} ${className}`}
    >
      {children}
    </span>
  )
}
