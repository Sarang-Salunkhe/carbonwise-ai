import { forwardRef } from 'react'

const variants = {
  primary:
    'gradient-brand text-white shadow-[var(--shadow-brand)] hover:opacity-90 active:scale-[0.98]',
  secondary:
    'bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border-default)] hover:bg-[var(--surface-interactive)] hover:border-[var(--border-strong)] active:scale-[0.98]',
  ghost:
    'text-[var(--text-secondary)] hover:bg-[var(--surface-interactive)] hover:text-[var(--text-primary)] active:scale-[0.98]',
  outline:
    'border border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[color-mix(in_srgb,var(--brand-primary)_8%,transparent)] active:scale-[0.98]',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base gap-2',
}

const Button = forwardRef(function Button(
  { children, variant = 'primary', size = 'md', className = '', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={`inline-flex items-center justify-center rounded-[var(--radius-md)] font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
})

export default Button
