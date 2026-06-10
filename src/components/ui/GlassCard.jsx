import { forwardRef } from 'react'

const GlassCard = forwardRef(function GlassCard(
  { children, className = '', hover = false, padding = 'default', ...props },
  ref,
) {
  const paddingClass = padding === 'sm' ? 'p-4' : padding === 'lg' ? 'p-8' : 'p-5 sm:p-6'

  return (
    <div
      ref={ref}
      className={`card ${paddingClass} ${
        hover ? 'card-interactive cursor-default' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})

export default GlassCard
