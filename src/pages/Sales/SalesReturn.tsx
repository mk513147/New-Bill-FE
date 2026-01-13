import { Flex, HStack, Text, IconButton, Button, Box } from '@chakra-ui/react'
import { FaEdit, FaTrash } from '@/components/icons'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { Plus } from 'lucide-react'
import { TableActionsPopover } from '@/components/popovers/TableActionsPopover'
import { CommonTable } from '@/components/common/CommonTable'
import { FilterSelect } from '@/components/common/FilterSelect'

import type { SortKey } from '@/components/popovers/TableActionsPopover'
const fakeSalesReturns = [
  {
    _id: '1',
    returnNumber: 'SR1001',
    customer: 'John Doe',
    date: '2024-06-01',
    amount: 120.5,
    status: 'Processed',
    reason: 'Damaged item',
  },
  {
    _id: '2',
    returnNumber: 'SR1002',
    customer: 'Jane Smith',
    date: '2024-06-03',
    amount: 75.0,
    status: 'Pending',
    reason: 'Wrong item',
  },
  {
    _id: '3',
    returnNumber: 'SR1003',
    customer: 'Bob Lee',
    date: '2024-06-05',
    amount: 200.0,
    status: 'Processed',
    reason: 'Customer changed mind',
  },
]

function SalesReturn() {
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add')
  const [editId, setEditId] = useState<string | null>(null)
  const [editDefaults, setEditDefaults] = useState<any>()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteName, setDeleteName] = useState('')

  const [sortBy, setSortBy] = useState<SortKey | undefined>(undefined)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(undefined)
  const [value, setValue] = useState<string[]>([])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setHeader({ title: 'Sales Returns' }))
    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])

  const salesReturnColumns = [
    { key: 'returnNumber', header: 'Return No.', render: (r: any) => r.returnNumber },
    { key: 'customer', header: 'Customer', render: (r: any) => r.customer },
    { key: 'date', header: 'Date', render: (r: any) => r.date },
    { key: 'amount', header: 'Amount', render: (r: any) => r.amount },
    { key: 'status', header: 'Status', render: (r: any) => r.status },
    { key: 'reason', header: 'Reason', render: (r: any) => r.reason },
  ]

  const salesReturnActions = [
    {
      label: 'Edit',
      icon: <FaEdit size="14px" color="#7C3AED" />,
      onClick: (item: any) => {
        setDialogMode('edit')
        setEditId(item._id)
        setEditDefaults(item)
        setOpen(true)
      },
    },
    {
      label: 'Delete',
      icon: <FaTrash size="14px" color="#EF4444" />,
      onClick: (item: any) => {
        setDeleteId(item._id)
        setDeleteName(item.returnNumber)
        setDeleteOpen(true)
      },
    },
  ]

  const salesReturnFilters = [
    { label: 'All', value: 'all' },
    { label: 'Processed', value: 'processed' },
    { label: 'Pending', value: 'pending' },
  ]

  // Fake pagination
  const limit = 10
  const totalPages = 1
  const currentPage = 1

  return (
    <>
      <Flex bg="gray.100" width="100%" height="100%" flexDir="column" px={6}>
        <Flex justify="space-between" align="center" mt={8} w="100%">
          <FilterSelect
            options={salesReturnFilters}
            value={value}
            defaultValue={['all']}
            placeholder="All"
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
              onImport={() => {}}
              onExport={() => {}}
              onRefresh={() => {}}
            />
          </HStack>
        </Flex>

        <Box bg="white" mt={6} rounded="lg" p={4}>
          <CommonTable
            columns={salesReturnColumns}
            data={fakeSalesReturns}
            isLoading={false}
            rowKey={(r) => r._id}
            actions={salesReturnActions}
          />
        </Box>

        <Flex justify="center" mt={4} gap={2}>
          <Button onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </Button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const pg = i + 1
            return (
              <Button
                key={pg}
                bg={pg === currentPage ? 'purple.100' : 'transparent'}
                onClick={() => setPage(pg)}
              >
                {pg}
              </Button>
            )
          })}

          <Button onClick={() => setPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </Button>
        </Flex>
      </Flex>
      {/* Placeholders for modals/dialogs */}
    </>
  )
}

export default SalesReturn
