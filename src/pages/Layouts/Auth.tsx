import { useEffect } from 'react'
import { isAuthenticated } from '@/utils/authSession'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'

const Auth = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isLoggedIn = isAuthenticated()

  useEffect(() => {
    if (isLoggedIn && location.pathname === '/login') {
      navigate('/dashboard', { replace: true })
    }
  }, [isLoggedIn, location.pathname])

  return (
    <>
      <Outlet />
    </>
  )
}

export default Auth
