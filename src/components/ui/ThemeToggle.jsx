import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="p-2 rounded-[var(--radius-md)] bg-[var(--surface-elevated)] border border-[var(--border-default)] hover:bg-[var(--surface-interactive)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="w-[18px] h-[18px] text-[var(--color-warning)]" aria-hidden="true" />
      ) : (
        <Moon className="w-[18px] h-[18px] text-[var(--text-secondary)]" aria-hidden="true" />
      )}
    </button>
  )
}
