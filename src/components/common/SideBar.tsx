import {
  Box,
  Stack,
  HStack,
  IconButton,
  Button,
  Drawer,
  Portal,
  StackSeparator,
} from '@chakra-ui/react'

import { NavLink, useNavigate } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa'
import { API } from '@/api/api.ts'
import API_ENDPOINTS from '@/api/apiEndpoints.ts'
import { resetProfile } from '@/Redux/slices/profileSlice.ts'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { ToasterUtil } from './ToasterUtil.tsx'
import Loading from './Loading.tsx'
import {
  GrAnalytics,
  FaGear,
  RiMoneyRupeeCircleFill,
  FaWarehouse,
  SiBookstack,
  IoPeopleCircleSharp,
  BsLayoutSidebarInset,
  FaShop,
} from '@/components/icons/index.ts'

const navItems = [
  { label: 'Dashboard', icon: GrAnalytics, path: '/dashboard' },
  { label: 'Customers', icon: IoPeopleCircleSharp, path: '/customer' },
  { label: 'Products', icon: SiBookstack, path: '/products' },
  { label: 'Suppliers', icon: FaShop, path: '/suppliers' },
  { label: 'Stocks', icon: FaWarehouse, path: '/stocks' },
  { label: 'Payments', icon: RiMoneyRupeeCircleFill, path: '/payments' },
  { label: 'Settings', icon: FaGear, path: '/settings' },
]

const SideBar = () => {
  const toastFunc = ToasterUtil()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
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
      <Drawer.Root placement={'start'}>
        <Drawer.Trigger asChild>
          <Button variant="subtle" size="lg">
            <BsLayoutSidebarInset size={'50px'} />
          </Button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content rounded="md">
              <Drawer.Header mb={2}>
                <Drawer.Title>
                  <Box
                    width={'100%'}
                    fontSize={'4xl'}
                    textAlign={'center'}
                    bgGradient="linear-gradient(0deg,rgba(93, 34, 195, 1) 0%, rgba(45, 253, 243, 1) 100%)"
                    bgClip="text"
                    fontWeight="bold"
                  >
                    EBILL
                  </Box>
                </Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Stack separator={<StackSeparator />}>
                  {navItems.map((item) => (
                    <Box
                      key={item.label}
                      p={1}
                      _hover={{ bg: 'whiteAlpha.300' }}
                      cursor={'pointer'}
                    >
                      <NavLink to={item.path}>
                        <HStack gap={2}>
                          <item.icon size={'20px'} />
                          {item.label}
                        </HStack>
                      </NavLink>
                    </Box>
                  ))}
                </Stack>
              </Drawer.Body>
              <Drawer.Footer>
                <IconButton
                  onClick={() => handleLogout()}
                  disabled={loading}
                  bg="teal.500"
                  color="white"
                  _hover={{ bg: 'teal.600' }}
                  size="md"
                  borderRadius="full"
                >
                  <FaSignOutAlt />
                </IconButton>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  )
}

export default SideBar
