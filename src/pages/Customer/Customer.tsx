import { Flex, HStack, Text, IconButton, Button, Box } from '@chakra-ui/react'

import { FaEdit, FaTrash } from '@/components/icons/index.ts'

import { useEffect, useState } from 'react'
import { useCustomers } from '@/hooks/useCustomer'

import CustomerDialog, { CustomerFormValues } from '@/components/modals/CustomerModal'
import { useCustomerActions } from '@/hooks/useCustomerActions'
import ConfirmDeleteDialog from '@/components/modals/ConfirmDelete'
import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { useDispatch } from 'react-redux'
import { Plus } from 'lucide-react'
import { TableActionsPopover } from '@/components/popovers/TableActionsPopover'
import { CommonTable } from '@/components/common/CommonTable'
import { FilterSelect } from '@/components/common/FilterSelect'
import type { SortKey } from '@/components/popovers/TableActionsPopover'

function Customers() {
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add')
  const [editId, setEditId] = useState<string | null>(null)
  const [editDefaults, setEditDefaults] = useState<CustomerFormValues>()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteName, setDeleteName] = useState('')
  // const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<SortKey | undefined>(undefined)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(undefined)

  const { deleteCustomer } = useCustomerActions(deleteId ?? '')

  const limit = 20

  const { data, isLoading } = useCustomers({
    page,
    limit,
    ...(sortBy && sortOrder ? { sortBy, sortOrder } : {}),
  })

  const customers = data?.customers ?? []
  const pagination = data?.pagination ?? {
    currentPage: 1,
    totalPages: 3,
    hasNextPage: false,
    hasPreviousPage: false,
  }

  const customerColumns = [
    {
      key: 'name',
      header: 'Contact Name',
      render: (c: any) => c.name,
    },
    {
      key: 'customerId',
      header: 'Customer ID',
      render: (c: any) => `BC${c._id.slice(-8).toUpperCase()}`,
    },
    {
      key: 'email',
      header: 'Email',
      render: (c: any) => c.email,
    },
    {
      key: 'address',
      header: 'Address',
      render: (c: any) => c.address,
    },
    {
      key: 'phone',
      header: 'Phone Number',
      render: (c: any) => c.mobileNumber,
    },
    {
      key: 'balance',
      header: 'Balance',
      render: (c: any) => c.balance,
    },
  ]

  const customerActions = [
    {
      label: 'Edit',
      icon: <FaEdit size="14px" color="#7C3AED" />,
      onClick: (item: any) => {
        setDialogMode('edit')
        setEditId(item._id)
        setEditDefaults({
          name: item.name,
          mobileNumber: item.mobileNumber,
          email: item.email,
          balance: item.balance,
          address: item.address,
        })
        setOpen(true)
      },
    },
    {
      label: 'Delete',
      icon: <FaTrash size="14px" color="#EF4444" />,
      onClick: (item: any) => {
        setDeleteId(item._id)
        setDeleteName(item.name)
        setDeleteOpen(true)
      },
    },
  ]

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      setHeader({
        title: 'Customers',
      }),
    )

    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])
  const [value, setValue] = useState<string[]>([])

  const customerFilters = [
    { label: 'All customers', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ]

  return (
    <>
      <Flex
        bg="gray.100"
        width="100%"
        height="100%"
        overflowX="auto"
        flexDir="column"
        pl={{ base: 3, sm: 2, md: 6 }}
        pr={{ base: 3, sm: 2, md: 6 }}
        pt={{ base: 3, sm: 4, md: 1 }}
        mb={3}
      >
        <Flex
          justify="space-between"
          align="center"
          mt={8}
          w="100%"
          gap={4}
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
        >
          <FilterSelect
            options={customerFilters}
            value={value}
            defaultValue={['all']}
            placeholder="All customers"
            onChange={setValue}
          />
          <HStack gap={2}>
            <IconButton
              aria-label="Add"
              colorPalette="blue"
              variant="solid"
              px={3}
              minW="unset"
              minH="unset"
              h="32px"
              onClick={() => {
                setDialogMode('add')
                setEditId(null)
                setEditDefaults(undefined)
                setOpen(true)
              }}
            >
              <HStack gap={1}>
                <Plus size={18} />
                <Text fontSize="sm" display={{ base: 'none', md: 'block' }}>
                  New
                </Text>
              </HStack>
            </IconButton>

            <HStack justify="space-between" h="32px" _hover={{ bg: 'gray.300' }}>
              <TableActionsPopover
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={(key, order) => {
                  // setPage(1)
                  setSortBy(key)
                  setSortOrder(order)
                }}
              />
            </HStack>
          </HStack>
        </Flex>

        <Box
          bg="white"
          mt={6}
          rounded="lg"
          shadow={'lightGray'}
          border="1px solid"
          borderColor="gray.100"
          w="100%"
          p={{ base: 2, md: 4 }}
        >
          <CommonTable
            columns={customerColumns}
            data={customers}
            isLoading={isLoading}
            rowKey={(c) => c._id}
            actions={customerActions}
          />
        </Box>

        <Flex
          justify="center"
          align="center"
          borderRadius="lg"
          mt={2}
          mb={2}
          p={2}
          bg={'white'}
          shadow="lightGray"
          gap={4}
          width="100%"
        >
          <Button
            onClick={() => setPage(pagination.currentPage - 1)}
            disabled={!pagination.hasPreviousPage}
            variant="outline"
            bg="white"
            rounded="lg"
          >
            <HStack>
              <Text color="gray.800">Previous</Text>
            </HStack>
          </Button>

          <HStack gap={2}>
            {Array.from({ length: pagination.totalPages }).map((_, index) => {
              const pg = index + 1
              return (
                <Button
                  key={pg}
                  onClick={() => setPage(pg)}
                  rounded="lg"
                  bg={pg === pagination.currentPage ? 'purple.100' : 'transparent'}
                  color={pg === pagination.currentPage ? 'purple.600' : 'gray.700'}
                  _hover={{ bg: 'purple.50' }}
                >
                  {pg}
                </Button>
              )
            })}
          </HStack>

          <Button
            onClick={() => setPage(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage}
            variant="outline"
            bg="white"
            rounded="lg"
          >
            <HStack>
              <Text color="gray.800">Next</Text>
            </HStack>
          </Button>
        </Flex>
      </Flex>

      <CustomerDialog
        open={open}
        onClose={() => setOpen(false)}
        mode={dialogMode}
        pubId={editId ?? undefined}
        defaultValues={editDefaults}
      />
      <ConfirmDeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete Customer"
        description={`Are you sure you want to delete "${deleteName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteCustomer.isPending}
        onConfirm={() => {
          deleteCustomer.mutate(undefined, {
            onSuccess: () => {
              setDeleteOpen(false)
            },
          })
        }}
      />
    </>
  )
}

export default Customers
