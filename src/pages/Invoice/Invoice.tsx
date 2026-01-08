import { TableColumn, CommonTable } from '@/components/common/CommonTable'
import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { Box, Flex, Text, Button, Stack, Separator } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

type InvoiceItem = {
  id: string
  name: string
  qty: number
  rate: number
}

const invoiceItems: InvoiceItem[] = [
  { id: '1', name: 'Printed T-Shirt', qty: 2, rate: 499 },
  { id: '2', name: 'Custom Mug', qty: 1, rate: 299 },
  { id: '3', name: 'Hoodie', qty: 1, rate: 999 },
]

const Invoice = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setHeader({ title: 'Invoice' }))
    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])

  const subtotal = invoiceItems.reduce((acc, item) => acc + item.qty * item.rate, 0)
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + tax

  const columns: TableColumn<InvoiceItem>[] = [
    {
      key: 'name',
      header: 'Item',
      width: '320px',
      render: (row) => row.name,
    },
    {
      key: 'qty',
      header: 'Qty',
      render: (row) => row.qty,
    },
    {
      key: 'rate',
      header: 'Rate',
      render: (row) => `₹${row.rate}`,
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (row) => `₹${row.qty * row.rate}`,
    },
  ]

  return (
    <Box w="100%" minH="100vh" bg="white" color="gray.900" p={6}>
      <Flex direction="column" h="100%">
        {/* Header */}
        <Flex justify="space-between" align="flex-start" mb={6}>
          <Box>
            <Text fontSize="2xl" fontWeight="600">
              Invoice
            </Text>
            <Text fontSize="sm" color="gray.600">
              Invoice #INV-1023
            </Text>
            <Text fontSize="sm" color="gray.600">
              Date: 21 Aug 2026
            </Text>
          </Box>

          <Stack direction="row" gap={2}>
            <Button
              size="sm"
              px={4}
              bg="white"
              color="gray.700"
              border="1px solid #E5E7EB"
              _hover={{ bg: '#F5F6FA' }}
              _active={{ bg: '#ECEFF4' }}
            >
              Download PDF
            </Button>

            <Button
              size="sm"
              px={4}
              bg="#2563EB"
              color="white"
              _hover={{ bg: '#1D4ED8' }}
              _active={{ bg: '#1E40AF' }}
            >
              Send Invoice
            </Button>
          </Stack>
        </Flex>

        <Separator mb={6} />

        {/* Billing Info */}
        <Flex justify="space-between" mb={8}>
          <Box>
            <Text fontWeight="500" mb={1}>
              Billed To
            </Text>
            <Text fontSize="sm">Rahul Agarwal</Text>
            <Text fontSize="sm" color="gray.600">
              Ratu Road, Ranchi
            </Text>
            <Text fontSize="sm" color="gray.600">
              rahul@gmail.com
            </Text>
          </Box>

          <Box textAlign="right">
            <Text fontWeight="500" mb={1}>
              From
            </Text>
            <Text fontSize="sm">EBILL Pvt Ltd</Text>
            <Text fontSize="sm" color="gray.600">
              Doranda, Ranchi
            </Text>
            <Text fontSize="sm" color="gray.600">
              support@ebill.com
            </Text>
          </Box>
        </Flex>

        {/* Table */}
        <Box flex="1">
          <CommonTable columns={columns} data={invoiceItems} rowKey={(row) => row.id} />
        </Box>

        {/* Totals */}
        <Flex justify="flex-end" mt={6}>
          <Box w="320px">
            <Flex justify="space-between" mb={2}>
              <Text fontSize="sm" color="gray.600">
                Subtotal
              </Text>
              <Text fontSize="sm">₹{subtotal}</Text>
            </Flex>

            <Flex justify="space-between" mb={2}>
              <Text fontSize="sm" color="gray.600">
                GST (18%)
              </Text>
              <Text fontSize="sm">₹{tax}</Text>
            </Flex>

            <Separator my={2} />

            <Flex justify="space-between">
              <Text fontWeight="600">Total</Text>
              <Text fontWeight="600">₹{total}</Text>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Invoice
