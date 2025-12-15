import { useEffect } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'

const Auth = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isLoggedIn = localStorage.getItem('eb_logged_in') === 'true'

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
