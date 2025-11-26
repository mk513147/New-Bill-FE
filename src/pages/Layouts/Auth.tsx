import { useEffect } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { useProfile } from '@/hooks/useProfile'
import { useDispatch } from 'react-redux'
import { setProfile, resetProfile } from '@/Redux/Slices/profileSlice'
import { Toaster, ToasterUtil } from '@/components/common/ToasterUtil'

const Auth = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const toast = ToasterUtil()

  const { data, isLoading, isError } = useProfile()
  const isLoggedIn = localStorage.getItem('eb_logged_in') === 'true'
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!isLoggedIn || !token) {
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

    if (isLoading) return

    if (data) {
      dispatch(setProfile(data))
      return
    }

    if (isError) {
      localStorage.removeItem('token')
      localStorage.setItem('eb_logged_in', 'false')
      dispatch(resetProfile())
      toast('session expired', 'error')
      navigate('/login', { replace: true })
    }
  }, [isLoggedIn, token, data, isError, isLoading, location.pathname])

  return (
    <>
      <Outlet />
      <Toaster />
    </>
  )
}

export default Auth
