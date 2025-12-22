import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
  const isLoggedIn = localStorage.getItem('eb_logged_in') === 'true'

  if (!isLoggedIn) {
    localStorage.setItem('eb_logged_in', 'false')
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoutes
