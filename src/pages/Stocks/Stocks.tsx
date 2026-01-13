import { Flex, HStack, Text, IconButton, Button, Box } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Plus } from 'lucide-react'

import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { CommonTable } from '@/components/common/CommonTable'
import { TableActionsPopover } from '@/components/popovers/TableActionsPopover'
import { FilterSelect } from '@/components/common/FilterSelect'
import type { SortKey } from '@/components/popovers/TableActionsPopover'

/* ------------------ Fake Stock Data ------------------ */

type Stock = {
  id: string
  name: string
  sku: string
  category: string
  quantity: number
  price: number
  status: 'In Stock' | 'Out of Stock'
}

const FAKE_STOCKS: Stock[] = [
  {
    id: '1',
    name: 'Printed T-Shirt',
    sku: 'SKU-TS-001',
    category: 'Apparel',
    quantity: 120,
    price: 499,
    status: 'In Stock',
  },
  {
    id: '2',
    name: 'Custom Mug',
    sku: 'SKU-MG-002',
    category: 'Accessories',
    quantity: 0,
    price: 299,
    status: 'Out of Stock',
  },
  {
    id: '3',
    name: 'Football Jersey',
    sku: 'SKU-JS-003',
    category: 'Sportswear',
    quantity: 42,
    price: 899,
    status: 'In Stock',
  },
]

/* ------------------ Component ------------------ */

const Stocks = () => {
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<SortKey | undefined>()
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>()
  const [filter, setFilter] = useState<string[]>(['all'])

  const limit = 20

  useEffect(() => {
    dispatch(setHeader({ title: 'Stocks' }))
    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])

  /* ------------------ Filtering + Sorting ------------------ */

  const filteredData = useMemo(() => {
    let data = [...FAKE_STOCKS]

    if (!filter.includes('all')) {
      data = data.filter((s) => filter.includes(s.status === 'In Stock' ? 'in' : 'out'))
    }

    if (sortBy && sortOrder) {
      data.sort((a: any, b: any) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1
        if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
    }

    return data
  }, [filter, sortBy, sortOrder])

  /* ------------------ Columns ------------------ */

  const stockColumns = [
    { key: 'name', header: 'Product Name', render: (s: Stock) => s.name },
    { key: 'sku', header: 'SKU', render: (s: Stock) => s.sku },
    { key: 'category', header: 'Category', render: (s: Stock) => s.category },
    {
      key: 'quantity',
      header: 'Quantity',
      render: (s: Stock) => s.quantity,
    },
    {
      key: 'price',
      header: 'Price',
      render: (s: Stock) => `₹${s.price}`,
    },
    {
      key: 'status',
      header: 'Status',
      render: (s: Stock) => (
        <Text fontWeight="medium" color={s.status === 'In Stock' ? 'green.600' : 'red.500'}>
          {s.status}
        </Text>
      ),
    },
  ]

  const stockFilters = [
    { label: 'All stock', value: 'all' },
    { label: 'In stock', value: 'in' },
    { label: 'Out of stock', value: 'out' },
  ]

  /* ------------------ Pagination (Fake) ------------------ */

  const totalPages = 1

  return (
    <Flex bg="gray.100" width="100%" height="100%" flexDir="column" px={6}>
      {/* Header Row */}
      <Flex justify="space-between" align="center" mt={8}>
        <FilterSelect
          options={stockFilters}
          value={filter}
          defaultValue={['all']}
          placeholder="All stock"
          onChange={setFilter}
        />

        <HStack gap={2}>
          <IconButton aria-label="Add Stock" colorPalette="blue" variant="solid" px={3} h="32px">
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
        <CommonTable
          columns={stockColumns}
          data={filteredData}
          isLoading={false}
          rowKey={(s) => s.id}
        />
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

export default Stocks
