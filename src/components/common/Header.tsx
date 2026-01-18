import { Box, Flex, Text, IconButton, HStack, Separator, Avatar } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { Plus, Bell, Settings } from 'lucide-react'
import { ProfilePopover } from '@/components/popovers/ProfilePopover'
import { NotificationsPopover } from '@/components/popovers/NotificationsPopover'
import { AddPopover } from '@/components/popovers/AddPopover'
import { SettingsPopover } from '@/components/popovers/SettingsPopover'
import CustomerDialog from '@/components/modals/CustomerModal'
import ProductDialog from '../modals/ProductModal'
import CategoryModal from '../modals/CategoryModal'
import InvoiceModal from '../modals/InvoiceModal'
import StockModal from '../modals/StockModal'
import BillModal from '../modals/BillModal'
import { useState } from 'react'

type AddEntity = 'customer' | 'product' | 'invoice' | 'category' | 'stock' | 'bill' | null

export const Header = () => {
  const [openEntity, setOpenEntity] = useState<AddEntity>(null)
  const { title } = useSelector((state: any) => state.header)

  if (!title) return null

  return (
    <Box
      h="56px"
      px={6}
      bg="white"
      borderBottomWidth="1px"
      borderColor="gray.200"
      position="sticky"
      top={0}
      zIndex={999}
      css={{
        '@media print': {
          display: 'none',
        },
      }}
    >
      <Flex h="100%" align="center" justify="space-between">
        <Text
          fontSize={{ base: 'xl', md: '2xl' }}
          fontWeight="700"
          color="gray.900"
          lineHeight="1.2"
          letterSpacing="-0.02em"
        >
          {title}
        </Text>

        <HStack gap={3}>
          <Separator orientation="vertical" h="24px" />

          <AddPopover
            trigger={
              <IconButton
                aria-label="Add"
                colorPalette="blue"
                p="6px"
                minW="unset"
                minH="unset"
                w="32px"
                h="32px"
              >
                <Plus size={18} />
              </IconButton>
            }
            onAddCustomer={() => setOpenEntity('customer')}
            onAddProduct={() => setOpenEntity('product')}
            onAddInvoice={() => setOpenEntity('invoice')}
            onAddCategory={() => setOpenEntity('category')}
            onAddStock={() => setOpenEntity('stock')}
            onAddBill={() => setOpenEntity('bill')}
          />

          <NotificationsPopover
            trigger={
              <IconButton
                aria-label="Notifications"
                color="gray.800"
                _hover={{ bg: 'gray.100', color: 'gray.900' }}
              >
                <Bell size={18} />
              </IconButton>
            }
          />
          <SettingsPopover
            trigger={
              <IconButton
                aria-label="Settings"
                color="gray.800"
                _hover={{ bg: 'gray.100', color: 'gray.900' }}
              >
                <Settings size={18} />
              </IconButton>
            }
          />

          <ProfilePopover
            trigger={
              <Box as="span">
                <Avatar.Root size="sm" cursor="pointer">
                  <Avatar.Fallback>U</Avatar.Fallback>
                </Avatar.Root>
              </Box>
            }
          />
        </HStack>
      </Flex>
      {/* CUSTOMER */}
      <CustomerDialog
        open={openEntity === 'customer'}
        mode="add"
        onClose={() => setOpenEntity(null)}
      />

      {/* PRODUCT */}
      <ProductDialog
        open={openEntity === 'product'}
        mode="add"
        onClose={() => setOpenEntity(null)}
      />

      {/* INVOICE */}
      <InvoiceModal
        open={openEntity === 'invoice'}
        mode="add"
        onClose={() => setOpenEntity(null)}
      />
      <StockModal open={openEntity === 'stock'} mode="add" onClose={() => setOpenEntity(null)} />
      <BillModal open={openEntity === 'bill'} mode="add" onClose={() => setOpenEntity(null)} />

      <CategoryModal
        open={openEntity === 'category'}
        mode="add"
        onClose={() => setOpenEntity(null)}
      />
    </Box>
  )
}
