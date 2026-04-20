import { Flex, HStack, Text, Button, Box, SimpleGrid, VStack, Badge } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Plus } from 'lucide-react'

import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { CommonTable } from '@/components/common/CommonTable'
import { ExpandableSearch } from '@/components/common/ExpandableSearch'
import PaymentModal from '@/components/modals/PaymentModal'

import { usePayment } from '@/hooks/usePayment'

const paymentTypeColor = {
  supplier: 'orange',
  customer: 'blue',
} as const

const Payments = () => {
  const dispatch = useDispatch()

  const [modalOpen, setModalOpen] = useState(false)
  const [defaultType, setDefaultType] = useState<'supplier' | 'customer'>('supplier')

  const [typeFilter, setTypeFilter] = useState<'all' | 'supplier' | 'customer'>('all')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  const [page, setPage] = useState(1)
  const limit = 20

  const { data: paymentData = [], isLoading } = usePayment()

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), 350)
    return () => clearTimeout(id)
  }, [search])

  useEffect(() => {
    dispatch(
      setHeader({
        title: 'Payments',
        subtitle: 'Track all supplier and customer payments',
      }),
    )

    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  const filteredPayments = useMemo(() => {
    const keyword = debouncedSearch.trim().toLowerCase()

    return paymentData.filter((p) => {
      if (typeFilter !== 'all' && p.paidToType !== typeFilter) return false

      if (!keyword) return true

      const haystack = [
        p.paidToType,
        p.supplierId?.name || '',
        p.customerId?.name || '',
        p.paymentMode,
        p.note || '',
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(keyword)
    })
  }, [paymentData, debouncedSearch, typeFilter])

  const payments = useMemo(() => {
    const start = (page - 1) * limit
    return filteredPayments.slice(start, start + limit)
  }, [filteredPayments, page])

  const pagination = {
    currentPage: page,
    totalPages: Math.max(1, Math.ceil(filteredPayments.length / limit)),
    hasNextPage: page * limit < filteredPayments.length,
    hasPreviousPage: page > 1,
  }

  const summary = {
    total: filteredPayments.length,
    showing: payments.length,
    activePage: pagination.currentPage,
    totalPages: pagination.totalPages,
  }

  const paymentColumns = [
    {
      key: 'paidToType',
      header: 'Type',
      width: '130px',
      render: (p: any) => (
        <Badge
          colorPalette={paymentTypeColor[p.paidToType as keyof typeof paymentTypeColor] || 'gray'}
          textTransform="capitalize"
        >
          {p.paidToType === 'supplier' ? 'Pay Supplier' : 'From Customer'}
        </Badge>
      ),
    },
    {
      key: 'entity',
      header: 'Entity',
      width: '200px',
      render: (p: any) => p.supplierId?.name || p.customerId?.name || '-',
    },
    {
      key: 'paymentDate',
      header: 'Payment Date',
      width: '160px',
      render: (p: any) =>
        p.paymentDate ? new Date(p.paymentDate).toLocaleDateString('en-IN') : '-',
    },
    {
      key: 'amount',
      header: 'Amount',
      width: '130px',
      render: (p: any) =>
        new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
        }).format(Number(p.amount || 0)),
    },
    {
      key: 'paymentMode',
      header: 'Payment Mode',
      width: '130px',
      render: (p: any) => (
        <Text fontSize="sm" textTransform="capitalize">
          {p.paymentMode || '-'}
        </Text>
      ),
    },
    {
      key: 'note',
      header: 'Note',
      width: '150px',
      render: (p: any) => (
        <Text fontSize="sm" noOfLines={1}>
          {p.note || '-'}
        </Text>
      ),
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
          <Box bg="white" border="1px solid" borderColor="gray.100" borderRadius="16px" p={3}>
            <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="0.06em">
              Total
            </Text>
            <Text mt={1} fontSize="xl" fontWeight="800" color="gray.900">
              {summary.total}
            </Text>
          </Box>
          <Box bg="white" border="1px solid" borderColor="gray.100" borderRadius="16px" p={3}>
            <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="0.06em">
              Showing
            </Text>
            <Text mt={1} fontSize="xl" fontWeight="800" color="gray.900">
              {summary.showing}
            </Text>
          </Box>
          <Box bg="white" border="1px solid" borderColor="gray.100" borderRadius="16px" p={3}>
            <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="0.06em">
              Page
            </Text>
            <Text mt={1} fontSize="xl" fontWeight="800" color="gray.900">
              {summary.activePage}
            </Text>
          </Box>
          <Box bg="white" border="1px solid" borderColor="gray.100" borderRadius="16px" p={3}>
            <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="0.06em">
              Total Pages
            </Text>
            <Text mt={1} fontSize="xl" fontWeight="800" color="gray.900">
              {summary.totalPages}
            </Text>
          </Box>
        </SimpleGrid>

        <Flex
          justify="space-between"
          align={{ base: 'stretch', md: 'center' }}
          mt={4}
          w="100%"
          gap={4}
          direction={{ base: 'column', md: 'row' }}
        >
          <HStack gap={2} align="center" flexWrap="wrap">
            <ExpandableSearch
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search payments..."
              expandedWidth="300px"
            />

            <HStack bg="white" border="1px solid" borderColor="gray.100" borderRadius="10px" p={1}>
              {(['all', 'supplier', 'customer'] as const).map((t) => (
                <Button
                  key={t}
                  size="sm"
                  variant={typeFilter === t ? 'solid' : 'ghost'}
                  bg={typeFilter === t ? 'gray.900' : 'transparent'}
                  color={typeFilter === t ? 'white' : 'gray.700'}
                  _hover={{ bg: typeFilter === t ? 'gray.900' : 'gray.100' }}
                  onClick={() => setTypeFilter(t)}
                  textTransform="capitalize"
                >
                  {t === 'all' ? 'All' : t === 'supplier' ? 'Supplier' : 'Customer'}
                </Button>
              ))}
            </HStack>
          </HStack>

          <HStack gap={2}>
            <Button
              bg="orange.500"
              color="white"
              h="38px"
              px={4}
              _hover={{ bg: 'orange.600' }}
              onClick={() => {
                setDefaultType('supplier')
                setModalOpen(true)
              }}
            >
              <HStack gap={1.5}>
                <Plus size={16} />
                <Text fontSize="sm" fontWeight="700">
                  Pay Supplier
                </Text>
              </HStack>
            </Button>

            <Button
              bg="blue.600"
              color="white"
              h="38px"
              px={4}
              _hover={{ bg: 'blue.700' }}
              onClick={() => {
                setDefaultType('customer')
                setModalOpen(true)
              }}
            >
              <HStack gap={1.5}>
                <Plus size={16} />
                <Text fontSize="sm" fontWeight="700">
                  Receive from Customer
                </Text>
              </HStack>
            </Button>
          </HStack>
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
            columns={paymentColumns}
            data={payments}
            isLoading={isLoading}
            rowKey={(p) => p._id}
            emptyMessage={debouncedSearch ? 'No payments match your search.' : 'No payments found.'}
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

          <Text fontSize="xs" color="gray.600">
            Showing {payments.length} of {filteredPayments.length} payments
          </Text>
        </VStack>
      </Flex>
      <PaymentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultType={defaultType}
      />
    </>
  )
}

export default Payments
