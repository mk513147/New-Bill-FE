import { isAuthenticated } from '@/utils/authSession'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoutes = () => {
  const location = useLocation()
  const isLoggedIn = isAuthenticated()

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoutes
