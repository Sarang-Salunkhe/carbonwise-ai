import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const prevPathname = useRef(pathname)
  const prevHash = useRef(hash)

  useEffect(() => {
    const pathnameChanged = prevPathname.current !== pathname
    const hashChanged = prevHash.current !== hash

    prevPathname.current = pathname
    prevHash.current = hash

    if (hash && hashChanged) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      return
    }

    if (pathnameChanged) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [pathname, hash])

  return null
}
