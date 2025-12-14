import { useEffect } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetProfile } from '@/redux/slices/profileSlice'
import { Toaster, ToasterUtil } from '@/components/common/ToasterUtil'

const Auth = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const toast = ToasterUtil()

  const isLoggedIn = localStorage.getItem('eb_logged_in') === 'true'

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem('eb_logged_in', 'false')
      dispatch(resetProfile())

      if (location.pathname !== '/login') {
        navigate('/login', { replace: true })
        toast('session expired', 'error')
      }
      return
    }

    if (isLoggedIn && location.pathname === '/login') {
      navigate('/dashboard', { replace: true })
    }
  }, [isLoggedIn, location])

  return (
    <>
      <Outlet />
      <Toaster />
    </>
  )
}

export default Auth
