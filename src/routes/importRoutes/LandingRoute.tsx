import { Landing } from '@/pages'
import { Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

export const LandingRoute = () => {
  const isLoggedIn = localStorage.getItem('eb_logged_in') === 'true'

  if (isLoggedIn) {
    return <Route path="/" element={<Navigate to="/dashboard" replace />} />
  }

  return <Route path="/" element={<Landing />} />
}
