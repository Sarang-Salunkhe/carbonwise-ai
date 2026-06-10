export const CHART_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
]

export const CHART_COLORS_HEX = {
  light: ['#059669', '#0d9488', '#0891b2', '#6366f1', '#d97706'],
  dark: ['#34d399', '#2dd4bf', '#22d3ee', '#818cf8', '#fbbf24'],
}

export function getChartColors() {
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  return isDark ? CHART_COLORS_HEX.dark : CHART_COLORS_HEX.light
}

export function getTooltipStyle() {
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  return {
    background: isDark ? 'rgba(24, 24, 27, 0.96)' : 'rgba(255, 255, 255, 0.96)',
    border: `1px solid ${isDark ? '#3f3f46' : '#e2e8f0'}`,
    borderRadius: '10px',
    boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 20px rgba(15,23,42,0.08)',
    color: isDark ? '#fafafa' : '#0f172a',
    fontSize: '13px',
  }
}

export function getGridColor() {
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  return isDark ? '#27272a' : '#e2e8f0'
}

export function getAxisColor() {
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  return isDark ? '#71717a' : '#64748b'
}
