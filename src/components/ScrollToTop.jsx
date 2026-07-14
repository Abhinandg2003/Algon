import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const ScrollToTop = ({ lenisRef }) => {
  const { pathname } = useLocation()

  useEffect(() => {
    if (lenisRef?.current) {
      // 🔥 reset scroll using Lenis
      lenisRef.current.scrollTo(0, { immediate: true })
    } else {
      // fallback
      window.scrollTo(0, 0)
    }
  }, [pathname, lenisRef])

  return null
}

export default ScrollToTop