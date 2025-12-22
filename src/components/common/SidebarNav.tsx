import { HStack, VStack, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { Accordion } from '@chakra-ui/react'
import { FaRegClipboard } from 'react-icons/fa'
import { FiUsers, FiTruck, FiShoppingBag } from 'react-icons/fi'
import {
  MdOutlineSell,
  MdReceiptLong,
  MdPayments,
  MdLocalShipping,
  MdCategory,
  MdCurrencyExchange,
  MdInventory,
} from 'react-icons/md'
import { RxBox, RxGear, RxPerson } from 'react-icons/rx'
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

export const SidebarNav = ({ onNavigate }: { onNavigate?: () => void }) => {
  return (
    <>
      <NavLink to="/dashboard" onClick={onNavigate}>
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
            <Text fontSize="sm" fontWeight={isActive ? 'semibold' : 'normal'}>
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
    </>
  )
}
