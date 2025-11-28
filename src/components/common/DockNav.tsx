import { Flex } from '@chakra-ui/react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  FaTableList,
  FaShop,
  FaUsers,
  FaUser,
  FaChevronLeft,
  FaArrowRightToBracket,
} from 'react-icons/fa6'
import { useState } from 'react'
import { API } from '@/api/api.ts'
import API_ENDPOINTS from '@/api/apiEndpoints.ts'
import { resetProfile } from '@/redux/slices/profileSlice.ts'
import { useDispatch } from 'react-redux'
import { ToasterUtil } from './ToasterUtil.tsx'
import Loading from './Loading.tsx'

const navItems = [
  { label: 'Home', icon: FaShop, path: '/dashboard' },
  { label: 'Products', icon: FaTableList, path: '/products' },
  { label: 'Customer', icon: FaUsers, path: '/customer' },
  { label: 'Profile', icon: FaUser, path: '/profile' },
]

const DockNav = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [collapsed, setCollapsed] = useState(false)
  const activeItem = navItems.find((i) => i.path === location.pathname)
  const toastFunc = ToasterUtil()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    setLoading(true)

    try {
      const res = await API.post(API_ENDPOINTS.AUTH.LOGOUT)

      if (res.status !== 200) {
        throw new Error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
      toastFunc('Error logging out. Please try again.', 'error')
    }

    localStorage.clear()
    dispatch(resetProfile())
    navigate('/login', { replace: true })

    setLoading(false)
  }

  return (
    <>
      {loading && <Loading />}
      {/* SINGLE ACTIVE ICON (Collapsed Mode) */}
      {collapsed && activeItem && (
        <Flex
          position="fixed"
          bottom={30}
          left={20}
          alignItems="center"
          justifyContent="center"
          bg="rgba(255,255,255,0.6)"
          backdropFilter="blur(20px)"
          borderRadius="full"
          p={4}
          boxShadow="0px 8px 30px rgba(0,0,0,0.25)"
          zIndex={300}
          cursor="pointer"
          transition="all 0.35s ease"
          onClick={() => setCollapsed(false)}
        >
          <activeItem.icon size={26} color="#0d9488" />
        </Flex>
      )}

      {/* MAIN DOCK - MAC STYLE */}
      <Flex
        position="fixed"
        bottom={6}
        left="50%"
        transform={`translateX(-50%) ${
          collapsed ? 'translateY(40px) scale(0.2)' : 'translateY(0) scale(1)'
        }`}
        opacity={collapsed ? 0 : 1}
        transition="all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)"
        bg="rgba(255,255,255,0.55)"
        backdropFilter="blur(20px)"
        px={5}
        py={3}
        borderRadius="2xl"
        boxShadow="0 10px 35px rgba(0,0,0,0.2)"
        border="1px solid rgba(255,255,255,0.4)"
        zIndex={200}
        width="70%"
        maxW="420px"
        justifyContent="space-between"
        alignItems="center"
      >
        {navItems.map(({ icon: Icon, path }) => {
          const isActive = location.pathname === path
          return (
            <NavLink key={path} to={path}>
              <Flex
                p={3}
                borderRadius="full"
                bg={isActive ? 'teal.500' : 'transparent'}
                boxShadow={isActive ? '0px 2px 12px rgba(0,0,0,0.25)' : 'none'}
                transition="0.2s"
                onClick={() => navigate(path)}
                cursor="pointer"
              >
                <Icon size={22} color={isActive ? 'white' : '#0d9488'} />
              </Flex>
            </NavLink>
          )
        })}

        <Flex
          p={3}
          borderRadius="full"
          bg="rgba(255,255,255,0.5)"
          boxShadow="0px 2px 10px rgba(0,0,0,0.15)"
          cursor="pointer"
          onClick={handleLogout}
        >
          <FaArrowRightToBracket size={20} color="#dc2626" />
        </Flex>
        {/* COLLAPSE BUTTON */}
        <Flex
          p={3}
          borderRadius="full"
          bg="rgba(255,255,255,0.5)"
          boxShadow="0px 2px 10px rgba(0,0,0,0.15)"
          cursor="pointer"
          onClick={() => setCollapsed(true)}
        >
          <FaChevronLeft size={20} color="#0d9488" />
        </Flex>
      </Flex>
    </>
  )
}

export default DockNav
