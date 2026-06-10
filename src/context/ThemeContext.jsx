import { useState, useEffect, useMemo, useCallback } from 'react'
import { ThemeContext } from './themeContextDef'

const THEME_KEY = 'carbonwise_theme'

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return (
      localStorage.getItem(THEME_KEY) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    )
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setThemeState((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  const setTheme = useCallback((t) => setThemeState(t), [])

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme, isDark: theme === 'dark' }),
    [theme, toggleTheme, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
