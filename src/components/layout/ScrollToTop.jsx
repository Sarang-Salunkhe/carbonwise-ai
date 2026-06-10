import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const prevPathname = useRef(pathname)
  const prevHash = useRef(hash)
  const isFirstMount = useRef(true)

  useEffect(() => {
    const pathnameChanged = prevPathname.current !== pathname
    const hashChanged = prevHash.current !== hash

    prevPathname.current = pathname
    prevHash.current = hash

    if (hash && (hashChanged || pathnameChanged || isFirstMount.current)) {
      const id = hash.replace('#', '')
      const timer = setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
      isFirstMount.current = false
      return () => clearTimeout(timer)
    }

    if (pathnameChanged && !hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    isFirstMount.current = false
  }, [pathname, hash])

  return null
}
