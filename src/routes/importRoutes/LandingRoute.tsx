import { Landing } from '@/pages'
import { isAuthenticated } from '@/utils/authSession'
import { Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

export const LandingRoute = () => {
  const isLoggedIn = isAuthenticated()

  if (isLoggedIn) {
    return <Route path="/" element={<Navigate to="/dashboard" replace />} />
  }

  return <Route path="/" element={<Landing />} />
}
