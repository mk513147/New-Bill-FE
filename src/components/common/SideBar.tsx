import {
  Box,
  HStack,
  IconButton,
  Button,
  Drawer,
  Portal,
  useMediaQuery,
  CloseButton,
  Avatar,
  Input,
  VStack,
  Text,
} from '@chakra-ui/react'

import { NavLink, useNavigate } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa'
import { API } from '@/api/api'
import API_ENDPOINTS from '@/api/apiEndpoints'
import { resetProfile } from '@/redux/slices/profileSlice'
import { useDispatch } from 'react-redux'
import { ToasterUtil } from './ToasterUtil'
import {
  GrAnalytics,
  FaGear,
  RiMoneyRupeeCircleFill,
  FaWarehouse,
  SiBookstack,
  IoPeopleCircleSharp,
  BsLayoutSidebarInset,
  FaShop,
} from '@/components/icons'

const navItems = [
  { label: 'Dashboard', icon: GrAnalytics, path: '/dashboard' },
  { label: 'Customers', icon: IoPeopleCircleSharp, path: '/customer' },
  { label: 'Products', icon: SiBookstack, path: '/products' },
  { label: 'Suppliers', icon: FaShop, path: '/suppliers' },
  { label: 'Stocks', icon: FaWarehouse, path: '/stocks' },
  { label: 'Payments', icon: RiMoneyRupeeCircleFill, path: '/payments' },
  { label: 'Settings', icon: FaGear, path: '/settings' },
]

export const SideBar = () => {
  const toastFunc = ToasterUtil()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
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
  }

  const [isLarge] = useMediaQuery(['(min-width: 768px)'])

  return (
    <>
      {isLarge ? (
        <Box
          w="320px"
          h="100vh"
          bg="white"
          position="relative"
          borderRight="1px solid"
          borderColor="gray.200"
          p={5}
          display={{ base: 'none', md: 'block' }}
        >
          <Text
            fontSize="2xl"
            fontWeight="bold"
            bgGradient="linear-gradient(90deg, #5D22C3, #2DFDF3)"
            bgClip="text"
            mb={6}
            textAlign="left"
          >
            EBILL
          </Text>

          <Input
            placeholder="Search"
            mb={6}
            borderRadius="full"
            bg="gray.50"
            _focus={{ borderColor: 'purple.400' }}
          />

          <VStack align="stretch" gap={1}>
            {navItems.map((item) => (
              <NavLink to={item.path} key={item.label}>
                {({ isActive }) => (
                  <HStack
                    px={3}
                    py={2}
                    rounded="md"
                    cursor="pointer"
                    gap={3}
                    bg={isActive ? 'purple.50' : 'transparent'}
                    color={isActive ? 'purple.600' : 'gray.700'}
                    _hover={{ bg: 'purple.50' }}
                  >
                    <item.icon size="20px" />
                    <Text fontWeight={isActive ? 'semibold' : 'normal'}>{item.label}</Text>
                  </HStack>
                )}
              </NavLink>
            ))}
          </VStack>

          <Box position="absolute" bottom="20px" left="0" w="100%" px={5}>
            <HStack justify="space-between">
              <HStack>
                <Avatar.Root>
                  <Avatar.Fallback name="Segun Adebayo" />
                  <Avatar.Image src="https://i.pravatar.cc/100?img=5" />
                </Avatar.Root>
                <Box color="gray.700">
                  <Text>Olivia Rhye</Text>
                  <Text>Admin</Text>
                </Box>
              </HStack>

              <IconButton
                aria-label="logout"
                size="md"
                rounded="full"
                bg="white"
                shadow="sm"
                _hover={{ bg: 'gray.600' }}
                onClick={handleLogout}
              >
                {<FaSignOutAlt />}
              </IconButton>
            </HStack>
          </Box>
        </Box>
      ) : (
        <Drawer.Root placement={'start'}>
          <Drawer.Trigger asChild position={'absolute'} top="2" left="2">
            <Button variant="solid" size="sm">
              <BsLayoutSidebarInset />
            </Button>
          </Drawer.Trigger>
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content
                bg="white"
                position="relative"
                borderRight="1px solid"
                borderColor="gray.200"
              >
                <Drawer.Header>
                  <Drawer.Title>
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      bgGradient="linear-gradient(90deg, #5D22C3, #2DFDF3)"
                      bgClip="text"
                      mb={6}
                      textAlign="left"
                    >
                      EBILL
                    </Text>
                  </Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                  <VStack align="stretch" gap={1}>
                    {navItems.map((item) => (
                      <NavLink to={item.path} key={item.label}>
                        {({ isActive }) => (
                          <HStack
                            px={3}
                            py={2}
                            rounded="md"
                            cursor="pointer"
                            gap={3}
                            bg={isActive ? 'purple.50' : 'transparent'}
                            color={isActive ? 'purple.600' : 'gray.700'}
                            _hover={{ bg: 'purple.50' }}
                          >
                            <item.icon size="20px" />
                            <Text fontWeight={isActive ? 'semibold' : 'normal'}>{item.label}</Text>
                          </HStack>
                        )}
                      </NavLink>
                    ))}
                  </VStack>
                </Drawer.Body>
                <Drawer.Footer>
                  <HStack justifyContent="space-between" width="full">
                    <HStack>
                      <Avatar.Root>
                        <Avatar.Fallback name="Segun Adebayo" />
                        <Avatar.Image src="https://i.pravatar.cc/100?img=5" />
                      </Avatar.Root>
                      <Box color="gray.700">
                        <Text>Olivia Rhye</Text>
                        <Text>Admin</Text>
                      </Box>
                    </HStack>

                    <IconButton
                      aria-label="logout"
                      size="md"
                      rounded="full"
                      bg="white"
                      shadow="sm"
                      _hover={{ bg: 'gray.600' }}
                      onClick={handleLogout}
                    >
                      {<FaSignOutAlt />}
                    </IconButton>
                  </HStack>
                </Drawer.Footer>
                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      )}
    </>
  )
}
