import { Flex, HStack, Text, IconButton, Button, Box } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Plus } from 'lucide-react'

import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { CommonTable } from '@/components/common/CommonTable'
import { TableActionsPopover } from '@/components/popovers/TableActionsPopover'
import { FilterSelect } from '@/components/common/FilterSelect'
import type { SortKey } from '@/components/popovers/TableActionsPopover'

/* ------------------ Fake Bill Data ------------------ */

type BillItem = {
  id: string
  billNumber: string
  supplier: string
  poNumber: string
  billDate: string
  dueDate: string
  amount: number
  status: 'Unpaid' | 'Paid' | 'Overdue'
}

const FAKE_BILLS: BillItem[] = [
  {
    id: '1',
    billNumber: 'BILL-2026-001',
    supplier: 'ABC Packaging Ltd',
    poNumber: 'PO-2026-001',
    billDate: '2026-01-10',
    dueDate: '2026-01-20',
    amount: 5950,
    status: 'Paid',
  },
  {
    id: '2',
    billNumber: 'BILL-2026-002',
    supplier: 'XYZ Textiles',
    poNumber: 'PO-2026-002',
    billDate: '2026-01-14',
    dueDate: '2026-01-25',
    amount: 10800,
    status: 'Unpaid',
  },
  {
    id: '3',
    billNumber: 'BILL-2026-003',
    supplier: 'National Plastics',
    poNumber: 'PO-2026-003',
    billDate: '2026-01-15',
    dueDate: '2026-01-22',
    amount: 9000,
    status: 'Overdue',
  },
]

/* ------------------ Component ------------------ */

const Bill = () => {
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<SortKey | undefined>()
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>()
  const [filter, setFilter] = useState<string[]>(['all'])

  const limit = 20

  useEffect(() => {
    dispatch(setHeader({ title: 'Bills' }))
    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])

  /* ------------------ Filtering + Sorting ------------------ */

  const data = useMemo(() => {
    let rows = [...FAKE_BILLS]

    if (!filter.includes('all')) {
      rows = rows.filter((b) =>
        filter.includes(
          b.status === 'Paid' ? 'paid' : b.status === 'Overdue' ? 'overdue' : 'unpaid',
        ),
      )
    }

    if (sortBy && sortOrder) {
      rows.sort((a: any, b: any) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1
        if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
    }

    return rows
  }, [filter, sortBy, sortOrder])

  /* ------------------ Columns ------------------ */

  const billColumns = [
    {
      key: 'billNumber',
      header: 'Bill Number',
      render: (b: BillItem) => b.billNumber,
    },
    {
      key: 'supplier',
      header: 'Supplier',
      render: (b: BillItem) => b.supplier,
    },
    {
      key: 'poNumber',
      header: 'PO Number',
      render: (b: BillItem) => b.poNumber,
    },
    {
      key: 'billDate',
      header: 'Bill Date',
      render: (b: BillItem) => b.billDate,
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      render: (b: BillItem) => b.dueDate,
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (b: BillItem) => `₹${b.amount}`,
    },
    {
      key: 'status',
      header: 'Status',
      render: (b: BillItem) => (
        <Text
          fontWeight="medium"
          color={
            b.status === 'Paid' ? 'green.600' : b.status === 'Overdue' ? 'red.500' : 'orange.500'
          }
        >
          {b.status}
        </Text>
      ),
    },
  ]

  const billFilters = [
    { label: 'All bills', value: 'all' },
    { label: 'Paid', value: 'paid' },
    { label: 'Unpaid', value: 'unpaid' },
    { label: 'Overdue', value: 'overdue' },
  ]

  const totalPages = 1

  return (
    <Flex bg="gray.100" width="100%" height="100%" flexDir="column" px={6}>
      {/* Header Row */}
      <Flex justify="space-between" align="center" mt={8}>
        <FilterSelect
          options={billFilters}
          value={filter}
          defaultValue={['all']}
          placeholder="All bills"
          onChange={setFilter}
        />

        <HStack gap={2}>
          <IconButton aria-label="Add Bill" colorPalette="blue" variant="solid" px={3} h="32px">
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
            onRefresh={() => {
              /* fake refresh */
            }}
            onImport={function (): void {
              throw new Error('Function not implemented.')
            }}
            onExport={function (): void {
              throw new Error('Function not implemented.')
            }}
          />
        </HStack>
      </Flex>

      {/* Table */}
      <Box bg="white" mt={6} rounded="lg" p={4}>
        <CommonTable columns={billColumns} data={data} isLoading={false} rowKey={(b) => b.id} />
      </Box>

      {/* Pagination */}
      <Flex justify="center" mt={4} gap={2}>
        <Button disabled>Previous</Button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <Button key={i} bg="purple.100">
            {i + 1}
          </Button>
        ))}
        <Button disabled>Next</Button>
      </Flex>
    </Flex>
  )
}

export default Bill
