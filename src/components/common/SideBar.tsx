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
  VStack,
  Text,
  Separator,
  Accordion,
} from '@chakra-ui/react'

import { NavLink } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa'
import { API } from '@/api/api.ts'
import API_ENDPOINTS from '@/api/apiEndpoints.ts'
import { resetProfile } from '@/redux/slices/profileSlice.ts'
import { useDispatch } from 'react-redux'
import { ToasterUtil } from './ToasterUtil'
import {
  BsLayoutSidebarInset,
  RxPerson,
  RxBox,
  RxGear,
  FiUsers,
  FiTruck,
  FiShoppingBag,
  MdInventory,
  MdCategory,
  MdOutlineSell,
  MdCurrencyExchange,
  FaRegClipboard,
  RxHome,
  MdLocalShipping,
  MdPayments,
  MdReceiptLong,
} from '@/components/icons'
import { clearLoading, setLoading } from '@/redux/slices/uiSlice'

const sections = [
  {
    value: 'sales',
    label: 'Sales',
    icon: MdOutlineSell,
    items: [
      { label: 'Customers', path: '/customer', icon: FiUsers },
      { label: 'Invoices', path: '/invoice', icon: MdReceiptLong },
      { label: 'Sales Returns', path: '/sales-returns', icon: MdReceiptLong },
      { label: 'Payments Received', path: '/payments-received', icon: MdPayments },
      { label: 'Sales Orders', path: '/sales-orders', icon: MdReceiptLong },
      { label: 'Delivery Receipts', path: '/delivery-receipts', icon: MdLocalShipping },
    ],
  },
  {
    value: 'items',
    label: 'Items',
    icon: RxBox,
    items: [
      { label: 'Products', path: '/products', icon: RxBox },
      { label: 'Category', path: '/category', icon: MdCategory },
      { label: 'Suppliers', path: '/suppliers', icon: FiTruck },
      { label: 'Price List', path: '/price-list', icon: MdCurrencyExchange },
    ],
  },
  {
    value: 'inventory',
    label: 'Inventory',
    icon: MdInventory,
    items: [
      { label: 'Stock', path: '/stock', icon: MdInventory },
      { label: 'Packaging', path: '/packaging', icon: FiShoppingBag },
      { label: 'Shipments', path: '/shipments', icon: MdLocalShipping },
    ],
  },
  {
    value: 'purchases',
    label: 'Purchases',
    icon: FiShoppingBag,
    items: [
      { label: 'Purchase Orders', path: '/purchase-orders', icon: MdReceiptLong },
      { label: 'Purchase Received', path: '/purchase-received', icon: MdReceiptLong },
      { label: 'Bills', path: '/bills', icon: MdReceiptLong },
      { label: 'Payments', path: '/vendor-payments', icon: MdPayments },
      { label: 'Credits', path: '/credits', icon: MdPayments },
    ],
  },
  {
    value: 'settings',
    label: 'Settings',
    icon: RxGear,
    items: [
      { label: 'General', path: '/settings/general', icon: RxGear },
      { label: 'Brand Logo', path: '/settings/brand', icon: RxBox },
      { label: 'Invoice', path: '/settings/invoice', icon: MdReceiptLong },
      { label: 'Notifications', path: '/settings/notifications', icon: FaRegClipboard },
      { label: 'Payments', path: '/settings/payments', icon: MdPayments },
      { label: 'Contact', path: '/settings/contact', icon: FiUsers },
    ],
  },
  {
    value: 'staff',
    label: 'Staff',
    icon: RxPerson,
    items: [
      { label: 'Roles', path: '/roles', icon: RxPerson },
      { label: 'Staff', path: '/staff', icon: FiUsers },
      { label: 'Attendance', path: '/attendance', icon: FaRegClipboard },
    ],
  },
]

export const SideBar = () => {
  const toastFunc = ToasterUtil()

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

    toastFunc('Logged out Successfully', 'success')
  }

  const [isLarge] = useMediaQuery(['(min-width: 768px)'])

  return (
    <>
      {isLarge ? (
        <Box
          w="280px"
          h="100vh"
          bg="linear-gradient(180deg, #0F172A 0%, #1E293B 100%)"
          display={{ base: 'none', md: 'flex' }}
          flexDirection="column"
          position="relative"
          shadow={'none'}
        >
          <Box position="sticky" top="0" zIndex="1" p={3}>
            <Text fontSize="2xl" fontWeight="bold" color="white" mb={3}>
              EBILL
            </Text>
            <Separator borderColor="whiteAlpha.300" />
          </Box>
          <Box
            flex="1"
            overflowY="auto"
            p={5}
            pb="120px"
            css={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            <NavLink to="/dashboard">
              {({ isActive }) => (
                <HStack
                  px={3}
                  py={2}
                  mb={3}
                  rounded="md"
                  cursor="pointer"
                  gap={3}
                  bg={isActive ? 'whiteAlpha.200' : 'transparent'}
                  color="white"
                  _hover={{ bg: 'whiteAlpha.200' }}
                >
                  <RxHome size={16} />
                  <Text fontWeight={isActive ? 'semibold' : 'normal'} fontSize={'sm'}>
                    Home
                  </Text>
                </HStack>
              )}
            </NavLink>
            <Accordion.Root collapsible defaultValue={['home']} variant="plain" size="sm">
              {sections.map((section) => (
                <Accordion.Item key={section.value} value={section.value}>
                  <Accordion.ItemTrigger
                    px={2}
                    py={2}
                    rounded="md"
                    color="white"
                    _open={{ bg: 'whiteAlpha.200' }}
                    _hover={{ bg: 'whiteAlpha.200' }}
                  >
                    <HStack flex="1" gap={2}>
                      {section.icon && <section.icon size={16} />}
                      <Text fontSize="sm" fontWeight="semibold" color="white">
                        {section.label}
                      </Text>
                    </HStack>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>

                  <Accordion.ItemContent>
                    <Accordion.ItemBody px={0}>
                      <VStack align="stretch" gap={1}>
                        {section.items.map((item) => (
                          <NavLink key={item.path} to={item.path}>
                            {({ isActive }) => (
                              <HStack
                                px={4}
                                py={2}
                                rounded="md"
                                bg={isActive ? 'whiteAlpha.200' : 'transparent'}
                                color="whiteAlpha.900"
                                _hover={{ bg: 'whiteAlpha.200' }}
                              >
                                {item.icon && <item.icon size={16} />}
                                <Text fontSize="sm">{item.label}</Text>
                              </HStack>
                            )}
                          </NavLink>
                        ))}
                      </VStack>
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              ))}
            </Accordion.Root>
            <Box position="absolute" bottom="20px" left="0" w="100%" px={5}>
              <IconButton
                aria-label="logout"
                size="md"
                rounded="full"
                position={'absolute'}
                bottom={0}
                right={2}
                bg="whiteAlpha.200"
                color="white"
                _hover={{ bg: 'whiteAlpha.300' }}
                shadow="sm"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
              </IconButton>
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
                  {/* {sections.map((section) => (
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
                  ))} */}
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
