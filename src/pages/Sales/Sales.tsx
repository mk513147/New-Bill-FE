import { Flex, HStack, Text, Button, Box, SimpleGrid, VStack, Badge } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { useDispatch } from 'react-redux'

import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { CommonTable } from '@/components/common/CommonTable'
import { ExpandableSearch } from '@/components/common/ExpandableSearch'
import { FilterSelect } from '@/components/common/FilterSelect'
import { FaEdit, FaTrash } from '@/components/icons'
import { FiDownload } from 'react-icons/fi'
import ConfirmDeleteDialog from '@/components/modals/ConfirmDelete'
import { API } from '@/api/api'
import { API_ENDPOINTS } from '@/api/apiEndpoints'
import SaleModal from '@/components/modals/SaleModal'
import SalePaymentModal from '@/components/modals/SalePaymentModal'

import { useSales } from '@/hooks/useSale'
import { useSaleActions } from '@/hooks/useSaleActions'

const paymentStatusColor = {
  pending: 'orange',
  partial: 'yellow',
  paid: 'green',
  advance: 'blue',
} as const

function Sales() {
  const dispatch = useDispatch()

  const [createOpen, setCreateOpen] = useState(false)
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [activeSaleId, setActiveSaleId] = useState<string | null>(null)
  const [activePaidAmount, setActivePaidAmount] = useState<number>(0)
  const [activeNote, setActiveNote] = useState('')

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteName, setDeleteName] = useState('')

  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  const [paymentFilter, setPaymentFilter] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const limit = 20

  const { data: salesData = [], isLoading } = useSales()
  const { deleteSale } = useSaleActions()

  const paymentFilterOptions = [
    { label: 'All Status', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Partial', value: 'partial' },
    { label: 'Paid', value: 'paid' },
    { label: 'Advance', value: 'advance' },
  ]

  const downloadInvoice = async (saleId: string, invoiceNumber: string) => {
    try {
      const response = await API.get(`${API_ENDPOINTS.SALE.GET_BY_ID}/${saleId}/invoice`, {
        responseType: 'blob',
      })
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
      const link = document.createElement('a')
      link.href = url
      link.download = `${invoiceNumber || saleId}.pdf`
      link.click()
      window.URL.revokeObjectURL(url)
    } catch {
      // toast shown by interceptor
    }
  }

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), 350)
    return () => clearTimeout(id)
  }, [search])

  useEffect(() => {
    dispatch(
      setHeader({
        title: 'Sales',
        subtitle: 'Track sale invoices, customer dues, and stock outflow history',
      }),
    )
    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  const filteredSales = useMemo(() => {
    const keyword = debouncedSearch.trim().toLowerCase()

    let filtered = salesData

    // Apply search filter
    if (keyword) {
      filtered = filtered.filter((s) => {
        const haystack = [
          s.invoiceNumber,
          s.customerName || '',
          s.customerId?.name || '',
          s.paymentStatus,
          s.note || '',
        ]
          .join(' ')
          .toLowerCase()

        return haystack.includes(keyword)
      })
    }

    // Apply payment status filter
    if (paymentFilter.length > 0 && !paymentFilter.includes('all')) {
      filtered = filtered.filter((s) => paymentFilter.includes(s.paymentStatus || ''))
    }

    return filtered
  }, [salesData, debouncedSearch, paymentFilter])

  const sales = useMemo(() => {
    const start = (page - 1) * limit
    return filteredSales.slice(start, start + limit)
  }, [filteredSales, page])

  const pagination = {
    currentPage: page,
    totalPages: Math.max(1, Math.ceil(filteredSales.length / limit)),
    hasNextPage: page * limit < filteredSales.length,
    hasPreviousPage: page > 1,
  }

  const summary = {
    total: filteredSales.length,
    showing: sales.length,
    activePage: pagination.currentPage,
    totalPages: pagination.totalPages,
  }

  const saleColumns = [
    {
      key: 'invoiceNumber',
      header: 'Invoice',
      width: '160px',
      render: (s: any) => s.invoiceNumber || '-',
    },
    {
      key: 'customer',
      header: 'Customer',
      width: '200px',
      render: (s: any) => s.customerName || s.customerId?.name || 'Walk-in',
    },
    {
      key: 'saleDate',
      header: 'Sale Date',
      width: '140px',
      render: (s: any) => (s.saleDate ? new Date(s.saleDate).toLocaleDateString('en-IN') : '-'),
    },
    {
      key: 'items',
      header: 'Items',
      width: '80px',
      render: (s: any) => s.items?.length ?? 0,
    },
    {
      key: 'totalAmount',
      header: 'Total',
      width: '130px',
      render: (s: any) =>
        new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
        }).format(Number(s.totalAmount || 0)),
    },
    {
      key: 'paidAmount',
      header: 'Paid',
      width: '130px',
      render: (s: any) =>
        new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
        }).format(Number(s.paidAmount || 0)),
    },
    {
      key: 'dueAmount',
      header: 'Due',
      width: '130px',
      render: (s: any) =>
        new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
        }).format(Number(s.dueAmount || 0)),
    },
    {
      key: 'paymentStatus',
      header: 'Status',
      width: '120px',
      render: (s: any) => (
        <Badge
          colorPalette={
            paymentStatusColor[s.paymentStatus as keyof typeof paymentStatusColor] || 'gray'
          }
        >
          {String(s.paymentStatus || '-').toUpperCase()}
        </Badge>
      ),
    },
  ]

  const saleActions = [
    {
      label: 'Download Invoice',
      icon: <FiDownload size="14px" color="#0f172a" />,
      onClick: (item: any) => downloadInvoice(item._id, item.invoiceNumber),
    },
    {
      label: 'Update Payment',
      icon: <FaEdit size="14px" color="#0f172a" />,
      onClick: (item: any) => {
        setActiveSaleId(item._id)
        setActivePaidAmount(item.paidAmount || 0)
        setActiveNote(item.note || '')
        setPaymentOpen(true)
      },
    },
    {
      label: 'Delete',
      icon: <FaTrash size="14px" color="#EF4444" />,
      onClick: (item: any) => {
        setDeleteId(item._id)
        setDeleteName(item.invoiceNumber || item._id)
        setDeleteOpen(true)
      },
    },
  ]

  return (
    <>
      <Flex
        bg="linear-gradient(180deg, #eef2f6 0%, #e8edf3 48%, #e2e8f0 100%)"
        width="100%"
        height="100%"
        flexDir="column"
        px={{ base: 4, md: 6 }}
        py={{ base: 4, md: 5 }}
      >
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={3}>
          {[
            { label: 'Total', value: summary.total },
            { label: 'Showing', value: summary.showing },
            { label: 'Page', value: summary.activePage },
            { label: 'Total Pages', value: summary.totalPages },
          ].map((card) => (
            <Box
              key={card.label}
              bg="white"
              border="1px solid"
              borderColor="gray.100"
              borderRadius="16px"
              p={3}
            >
              <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="0.06em">
                {card.label}
              </Text>
              <Text mt={1} fontSize="xl" fontWeight="800" color="gray.900">
                {card.value}
              </Text>
            </Box>
          ))}
        </SimpleGrid>

        <Flex
          justify="space-between"
          align={{ base: 'stretch', md: 'center' }}
          mt={4}
          w="100%"
          gap={4}
          direction={{ base: 'column', md: 'row' }}
        >
          <HStack gap={2} flex={1} minW={0}>
            <ExpandableSearch
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sales..."
              expandedWidth="300px"
            />
            <FilterSelect
              options={paymentFilterOptions}
              value={paymentFilter}
              defaultValue={['all']}
              placeholder="Filter by status"
              width="200px"
              onChange={setPaymentFilter}
            />
          </HStack>

          <Button
            bg="gray.950"
            color="white"
            h="38px"
            px={4}
            _hover={{ bg: 'gray.800' }}
            onClick={() => setCreateOpen(true)}
          >
            <HStack gap={1.5}>
              <Plus size={18} />
              <Text fontSize="sm" fontWeight="700">
                Add Sale
              </Text>
            </HStack>
          </Button>
        </Flex>

        <Box
          bg="rgba(255,255,255,0.86)"
          mt={6}
          rounded="2xl"
          shadow="lightGray"
          border="1px solid"
          borderColor="whiteAlpha.800"
          w="100%"
          p={{ base: 2, md: 4 }}
        >
          <CommonTable
            columns={saleColumns}
            data={sales}
            isLoading={isLoading}
            rowKey={(s) => s._id}
            actions={saleActions}
            emptyMessage={debouncedSearch ? 'No sales match your search.' : 'No sales found.'}
          />
        </Box>

        <VStack
          justify="center"
          align="center"
          mt={3}
          p={3}
          bg="rgba(255,255,255,0.86)"
          borderRadius="18px"
          border="1px solid"
          borderColor="whiteAlpha.800"
          gap={2}
          width="100%"
          flexWrap="wrap"
        >
          <HStack gap={2} flexWrap="wrap" justify="center">
            <Button
              onClick={() => setPage(pagination.currentPage - 1)}
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              _hover={{ bg: 'gray.50' }}
              disabled={!pagination.hasPreviousPage}
            >
              Previous
            </Button>

            {Array.from({ length: pagination.totalPages }).map((_, i) => {
              const pg = i + 1
              return (
                <Button
                  key={pg}
                  bg={pg === pagination.currentPage ? 'gray.900' : 'white'}
                  color={pg === pagination.currentPage ? 'white' : 'gray.800'}
                  border="1px solid"
                  borderColor={pg === pagination.currentPage ? 'gray.900' : 'gray.200'}
                  _hover={{ bg: pg === pagination.currentPage ? 'gray.900' : 'gray.100' }}
                  onClick={() => setPage(pg)}
                >
                  {pg}
                </Button>
              )
            })}

            <Button
              onClick={() => setPage(pagination.currentPage + 1)}
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              _hover={{ bg: 'gray.50' }}
              disabled={!pagination.hasNextPage}
            >
              Next
            </Button>
          </HStack>
        </VStack>
      </Flex>

      <SaleModal open={createOpen} onClose={() => setCreateOpen(false)} />

      <SalePaymentModal
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        saleId={activeSaleId ?? undefined}
        defaultPaidAmount={activePaidAmount}
        defaultNote={activeNote}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => {
          if (deleteId) deleteSale.mutate(deleteId)
          setDeleteOpen(false)
        }}
        itemName={deleteName}
      />
    </>
  )
}

export default Sales
