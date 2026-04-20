import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const ScrollRestorationHandler = () => {
  const location = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    const key = location.key

    // Restore scroll on BACK/FORWARD
    if (navigationType === 'POP') {
      const savedY = sessionStorage.getItem(key)
      if (savedY) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedY))
        }, 0)
      }
    } else {
      window.scrollTo(0, 0)
    }

    // Save scroll continuously while scrolling
    const handleScroll = () => {
      sessionStorage.setItem(key, window.scrollY.toString())
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [location, navigationType])

  return null
}

export default ScrollRestorationHandler
