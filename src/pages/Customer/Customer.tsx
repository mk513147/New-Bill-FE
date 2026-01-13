import { Flex, HStack, Text, IconButton, Button, Box } from '@chakra-ui/react'

import { FaEdit, FaTrash } from '@/components/icons/index.ts'
import { useEffect, useRef, useState } from 'react'
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

import { useCustomerImport } from '@/hooks/useCustomerImport'
import { useCustomerExport } from '@/hooks/useCustomerExport'
import { useQueryClient } from '@tanstack/react-query'

function Customers() {
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add')
  const [editId, setEditId] = useState<string | null>(null)
  const [editDefaults, setEditDefaults] = useState<CustomerFormValues>()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteName, setDeleteName] = useState('')
  const [sortBy, setSortBy] = useState<SortKey | undefined>(undefined)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(undefined)

  const { deleteCustomer } = useCustomerActions(deleteId ?? '')
  const importCustomers = useCustomerImport()
  const exportCustomers = useCustomerExport()
  const queryClient = useQueryClient()

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const limit = 20

  const { data, isLoading } = useCustomers({
    page,
    limit,
    ...(sortBy && sortOrder ? { sortBy, sortOrder } : {}),
  })

  const customers = data?.customers ?? []
  const pagination = data?.pagination ?? {
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  }

  const customerColumns = [
    { key: 'name', header: 'Contact Name', render: (c: any) => c.name },
    {
      key: 'customerId',
      header: 'Customer ID',
      render: (c: any) => `BC${c._id.slice(-8).toUpperCase()}`,
    },
    { key: 'email', header: 'Email', render: (c: any) => c.email },
    { key: 'address', header: 'Address', render: (c: any) => c.address },
    { key: 'phone', header: 'Phone Number', render: (c: any) => c.mobileNumber },
    { key: 'balance', header: 'Balance', render: (c: any) => c.balance },
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
    dispatch(setHeader({ title: 'Customers' }))
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

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    importCustomers.mutate(file)
    e.target.value = ''
  }

  const handleExportClick = () => {
    exportCustomers.mutate({
      page,
      limit,
      ...(sortBy && sortOrder ? { sortBy, sortOrder } : {}),
    })
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        hidden
        onChange={handleFileChange}
      />

      <Flex bg="gray.100" width="100%" height="100%" flexDir="column" px={6}>
        <Flex justify="space-between" align="center" mt={8} w="100%">
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
                <Text fontSize="sm">New</Text>
              </HStack>
            </IconButton>

            <TableActionsPopover
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={(key, order) => {
                setPage(1)
                setSortBy(key)
                setSortOrder(order)
              }}
              onImport={handleImportClick}
              onExport={handleExportClick}
              onRefresh={() => queryClient.invalidateQueries({ queryKey: ['customers'] })}
            />
          </HStack>
        </Flex>

        <Box bg="white" mt={6} rounded="lg" p={4}>
          <CommonTable
            columns={customerColumns}
            data={customers}
            isLoading={isLoading}
            rowKey={(c) => c._id}
            actions={customerActions}
          />
        </Box>

        <Flex justify="center" mt={4} gap={2}>
          <Button
            onClick={() => setPage(pagination.currentPage - 1)}
            disabled={!pagination.hasPreviousPage}
          >
            Previous
          </Button>

          {Array.from({ length: pagination.totalPages }).map((_, i) => {
            const pg = i + 1
            return (
              <Button
                key={pg}
                bg={pg === pagination.currentPage ? 'purple.100' : 'transparent'}
                onClick={() => setPage(pg)}
              >
                {pg}
              </Button>
            )
          })}

          <Button
            onClick={() => setPage(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage}
          >
            Next
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
        description={`Are you sure you want to delete "${deleteName}"?`}
        loading={deleteCustomer.isPending}
        onConfirm={() => {
          deleteCustomer.mutate(undefined, {
            onSuccess: () => setDeleteOpen(false),
          })
        }}
      />
    </>
  )
}

export default Customers
