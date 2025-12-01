import { useEffect, useState } from 'react'

export const useCountUp = (end: number, duration = 600) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = end / (duration / 16.67)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setValue(end)
        clearInterval(timer)
      } else {
        setValue(Math.floor(start))
      }
    }, 16.67)

    return () => clearInterval(timer)
  }, [end, duration])

  return value
}
