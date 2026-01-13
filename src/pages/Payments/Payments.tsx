import { Flex, HStack, Text, IconButton, Button, Box } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Plus } from 'lucide-react'

import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { CommonTable } from '@/components/common/CommonTable'
import { TableActionsPopover } from '@/components/popovers/TableActionsPopover'
import { FilterSelect } from '@/components/common/FilterSelect'
import type { SortKey } from '@/components/popovers/TableActionsPopover'

/* ------------------ Fake Payments Data ------------------ */

type Payment = {
  id: string
  paymentNumber: string
  supplier: string
  billNumber: string
  paymentDate: string
  amount: number
  mode: 'Cash' | 'UPI' | 'Bank Transfer'
  status: 'Completed' | 'Pending' | 'Failed'
}

const FAKE_PAYMENTS: Payment[] = [
  {
    id: '1',
    paymentNumber: 'PAY-2026-001',
    supplier: 'ABC Packaging Ltd',
    billNumber: 'BILL-2026-001',
    paymentDate: '2026-01-18',
    amount: 5950,
    mode: 'Bank Transfer',
    status: 'Completed',
  },
  {
    id: '2',
    paymentNumber: 'PAY-2026-002',
    supplier: 'XYZ Textiles',
    billNumber: 'BILL-2026-002',
    paymentDate: '2026-01-22',
    amount: 5000,
    mode: 'UPI',
    status: 'Pending',
  },
  {
    id: '3',
    paymentNumber: 'PAY-2026-003',
    supplier: 'National Plastics',
    billNumber: 'BILL-2026-003',
    paymentDate: '2026-01-23',
    amount: 9000,
    mode: 'Cash',
    status: 'Failed',
  },
]

/* ------------------ Component ------------------ */

const Payments = () => {
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<SortKey | undefined>()
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>()
  const [filter, setFilter] = useState<string[]>(['all'])

  const limit = 20

  useEffect(() => {
    dispatch(setHeader({ title: 'Payments' }))
    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])

  /* ------------------ Filtering + Sorting ------------------ */

  const data = useMemo(() => {
    let rows = [...FAKE_PAYMENTS]

    if (!filter.includes('all')) {
      rows = rows.filter((p) =>
        filter.includes(
          p.status === 'Completed' ? 'completed' : p.status === 'Failed' ? 'failed' : 'pending',
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

  const paymentColumns = [
    {
      key: 'paymentNumber',
      header: 'Payment No.',
      render: (p: Payment) => p.paymentNumber,
    },
    {
      key: 'supplier',
      header: 'Supplier',
      render: (p: Payment) => p.supplier,
    },
    {
      key: 'billNumber',
      header: 'Bill No.',
      render: (p: Payment) => p.billNumber,
    },
    {
      key: 'paymentDate',
      header: 'Payment Date',
      render: (p: Payment) => p.paymentDate,
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (p: Payment) => `₹${p.amount}`,
    },
    {
      key: 'mode',
      header: 'Payment Mode',
      render: (p: Payment) => p.mode,
    },
    {
      key: 'status',
      header: 'Status',
      render: (p: Payment) => (
        <Text
          fontWeight="medium"
          color={
            p.status === 'Completed'
              ? 'green.600'
              : p.status === 'Failed'
                ? 'red.500'
                : 'orange.500'
          }
        >
          {p.status}
        </Text>
      ),
    },
  ]

  const paymentFilters = [
    { label: 'All payments', value: 'all' },
    { label: 'Completed', value: 'completed' },
    { label: 'Pending', value: 'pending' },
    { label: 'Failed', value: 'failed' },
  ]

  const totalPages = 1

  return (
    <Flex bg="gray.100" width="100%" height="100%" flexDir="column" px={6}>
      {/* Header Row */}
      <Flex justify="space-between" align="center" mt={8}>
        <FilterSelect
          options={paymentFilters}
          value={filter}
          defaultValue={['all']}
          placeholder="All payments"
          onChange={setFilter}
        />

        <HStack gap={2}>
          <IconButton aria-label="Add Payment" colorPalette="blue" variant="solid" px={3} h="32px">
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
        <CommonTable columns={paymentColumns} data={data} isLoading={false} rowKey={(p) => p.id} />
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

export default Payments
