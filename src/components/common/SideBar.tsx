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
import { API } from '@/api/api.ts'
import API_ENDPOINTS from '@/api/apiEndpoints.ts'
import { resetProfile } from '@/redux/slices/profileSlice.ts'
import { useDispatch } from 'react-redux'
import { ToasterUtil } from './ToasterUtil'
import {
  BsLayoutSidebarInset,
  RxDashboard,
  RxPerson,
  RxBox,
  RxGear,
  RxQuestionMarkCircled,
  FiUsers,
  FiTruck,
  FiShoppingBag,
  MdInventory,
  MdCategory,
  MdOutlineSell,
  TbReportAnalytics,
  FaRegClipboard,
} from '@/components/icons'
import { clearLoading, setLoading } from '@/redux/slices/uiSlice'

const sections = [
  {
    title: 'Main',
    items: [
      { label: 'Dashboard', icon: RxDashboard, path: '/dashboard' },
      { label: 'Customers', icon: FiUsers, path: '/customer' },
      { label: 'Products', icon: RxBox, path: '/products' },
      { label: 'Suppliers', icon: FiTruck, path: '/suppliers' },
      { label: 'Stocks', icon: MdInventory, path: '/stocks' },
      { label: 'Payments', icon: TbReportAnalytics, path: '/payments' },
    ],
  },
  {
    title: 'Management',
    items: [
      { label: 'Category', icon: MdCategory, path: '/category' },
      { label: 'Purchase', icon: FiShoppingBag, path: '/purchase' },
      { label: 'Sales', icon: MdOutlineSell, path: '/sales' },
      { label: 'Staff', icon: RxPerson, path: '/staff' },
      { label: 'Attendance', icon: FaRegClipboard, path: '/attendance' },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'Settings', icon: RxGear, path: '/settings' },
      { label: 'Help', icon: RxQuestionMarkCircled, path: '/help' },
      { label: 'Profile', icon: RxPerson, path: '/profile' },
    ],
  },
]

export const SideBar = () => {
  const toastFunc = ToasterUtil()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(setLoading({ loading: true, message: 'Logging out...' }))
    try {
      const res = await API.post(API_ENDPOINTS.AUTH.LOGOUT)

      if (res.status !== 200) {
        throw new Error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
      toastFunc('Error logging out. Please try again.', 'error')
    } finally {
      dispatch(clearLoading())
    }

    localStorage.clear()
    dispatch(resetProfile())

    navigate('/login', { replace: true })
    toastFunc('Logged out Successfully', 'success')
  }

  const [isLarge] = useMediaQuery(['(min-width: 768px)'])

  return (
    <>
      {isLarge ? (
        <Box
          w="320px"
          h="100vh"
          bg="white"
          borderRight="1px solid"
          borderColor="gray.200"
          display={{ base: 'none', md: 'flex' }}
          flexDirection="column"
          position="relative"
          shadow={'sm'}
        >
          <Box
            flex="1"
            overflowY="auto"
            css={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
            p={5}
            pb="120px"
          >
            <Text
              fontSize="2xl"
              fontWeight="bold"
              bgGradient="linear-gradient(90deg, #5D22C3, #2DFDF3)"
              bgClip="text"
              mb={4}
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

            {sections.map((section) => (
              <Box key={section.title} mb={6}>
                <Text
                  fontSize="xs"
                  fontWeight="semibold"
                  color="gray.500"
                  mb={2}
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  {section.title}
                </Text>

                <VStack align="stretch" gap={1}>
                  {section.items.map((item) => (
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
              </Box>
            ))}

            <Box position="absolute" bottom="20px" left="0" w="100%" bg={'white'} px={5}>
              <HStack justify="space-between">
                <HStack>
                  <Avatar.Root>
                    <Avatar.Fallback name="Segun Adebayo" />
                    <Avatar.Image src="https://i.pravatar.cc/100?img=5" />
                  </Avatar.Root>

                  <Box color="gray.700">
                    <Text fontWeight="medium">Olivia Rhye</Text>
                    <Text fontSize="sm" color="gray.500">
                      Admin
                    </Text>
                  </Box>
                </HStack>

                <IconButton
                  aria-label="logout"
                  size="md"
                  rounded="full"
                  bg="white"
                  shadow="sm"
                  _hover={{ bg: 'gray.200' }}
                  onClick={handleLogout}
                >
                  <FaSignOutAlt />
                </IconButton>
              </HStack>
            </Box>
          </Box>
        </Box>
      ) : (
        <Drawer.Root placement="start" size="xs">
          <Drawer.Trigger asChild position="absolute" top="2" left="2">
            <Button variant="solid" size="sm">
              <BsLayoutSidebarInset />
            </Button>
          </Drawer.Trigger>

          <Portal>
            <Drawer.Backdrop />

            <Drawer.Positioner>
              <Drawer.Content
                bg="white"
                h="100vh"
                display="flex"
                flexDirection="column"
                borderRight="1px solid"
                borderColor="gray.200"
                position="relative"
              >
                <Drawer.Header pb={0}>
                  <Drawer.Title>
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      bgGradient="linear-gradient(90deg, #5D22C3, #2DFDF3)"
                      bgClip="text"
                      mb={4}
                    >
                      EBILL
                    </Text>
                  </Drawer.Title>
                </Drawer.Header>

                <Drawer.Body
                  flex="1"
                  overflowY="auto"
                  px={4}
                  pt={2}
                  pb="120px"
                  css={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': {
                      display: 'none',
                    },
                  }}
                >
                  {sections.map((section) => (
                    <Box key={section.title} mb={6}>
                      <Text
                        fontSize="xs"
                        fontWeight="semibold"
                        color="gray.500"
                        mb={2}
                        textTransform="uppercase"
                        letterSpacing="wide"
                      >
                        {section.title}
                      </Text>

                      <VStack align="stretch" gap={1}>
                        {section.items.map((item) => (
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
                                <Text fontWeight={isActive ? 'semibold' : 'normal'}>
                                  {item.label}
                                </Text>
                              </HStack>
                            )}
                          </NavLink>
                        ))}
                      </VStack>
                    </Box>
                  ))}
                </Drawer.Body>

                <Drawer.Footer
                  position="absolute"
                  bottom="0"
                  left="0"
                  w="100%"
                  bg="white"
                  borderTop="1px solid"
                  borderColor="gray.200"
                  py={3}
                >
                  <HStack justify="space-between" w="full">
                    <HStack>
                      <Avatar.Root>
                        <Avatar.Fallback name="Segun Adebayo" />
                        <Avatar.Image src="https://i.pravatar.cc/100?img=5" />
                      </Avatar.Root>

                      <Box>
                        <Text fontWeight="medium" color="gray.700">
                          Olivia Rhye
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          Admin
                        </Text>
                      </Box>
                    </HStack>

                    <IconButton
                      aria-label="logout"
                      size="md"
                      rounded="full"
                      bg="white"
                      shadow="sm"
                      _hover={{ bg: 'gray.200' }}
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt />
                    </IconButton>
                  </HStack>
                </Drawer.Footer>

                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm" position="absolute" top="4" right="4" />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      )}
    </>
  )
}
