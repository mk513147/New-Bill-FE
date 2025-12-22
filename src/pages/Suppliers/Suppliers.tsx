import { Flex, HStack, Text, Heading, IconButton, Button, Box, Badge } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { useDispatch } from 'react-redux'

import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { TableActionsPopover } from '@/components/popovers/TableActionsPopover'
import { CommonTable } from '@/components/common/CommonTable'
import { FaEdit, FaTrash } from '@/components/icons'
import { getFakeSuppliers } from '@/fakedata/fakeSuppliers'

function Suppliers() {
  const dispatch = useDispatch()
  const limit = 10
  const [page, setPage] = useState(1)

  const { suppliers, pagination } = getFakeSuppliers(limit, page)

  useEffect(() => {
    dispatch(setHeader({ title: 'Suppliers' }))
    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])

  const supplierColumns = [
    {
      key: 'name',
      header: 'Supplier Name',
      render: (s: any) => s.name,
    },
    {
      key: 'code',
      header: 'Supplier Code',
      render: (s: any) => s.supplierCode,
    },
    {
      key: 'phone',
      header: 'Phone',
      render: (s: any) => s.phone,
    },
    {
      key: 'gst',
      header: 'GST Number',
      render: (s: any) => s.gstNumber || '—',
    },
    {
      key: 'balance',
      header: 'Opening Balance',
      render: (s: any) => s.openingBalance,
    },
    {
      key: 'status',
      header: 'Status',
      render: (s: any) => (
        <Badge colorPalette={s.isActive ? 'green' : 'red'}>
          {s.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
  ]

  const supplierActions = [
    {
      label: 'Edit',
      icon: <FaEdit size="14px" color="#7C3AED" />,
      onClick: (item: any) => console.log('Edit supplier', item),
    },
    {
      label: 'Delete',
      icon: <FaTrash size="14px" color="#EF4444" />,
      onClick: (item: any) => console.log('Delete supplier', item),
    },
  ]

  return (
    <Flex
      bg="gray.100"
      width="100%"
      height="100%"
      flexDir="column"
      pl={{ base: 3, md: 6 }}
      pr={{ base: 3, md: 6 }}
      pt={{ base: 3, md: 1 }}
      mb={3}
    >
      <Flex justify="space-between" align="center" mt={8}>
        <Heading size="xl" color="gray.800">
          Suppliers
        </Heading>

        <HStack gap={2}>
          <IconButton aria-label="Add" colorPalette="blue" h="32px" px={3}>
            <HStack gap={1}>
              <Plus size={18} />
              <Text fontSize="sm">New</Text>
            </HStack>
          </IconButton>
          <HStack h="32px" _hover={{ bg: 'gray.300' }}>
            <TableActionsPopover />
          </HStack>
        </HStack>
      </Flex>

      <Box bg="white" mt={6} rounded="lg" shadow="lightGray" p={4}>
        <CommonTable
          columns={supplierColumns}
          data={suppliers}
          rowKey={(s) => s._id}
          actions={supplierActions}
        />
      </Box>

      <Flex
        justify="center"
        align="center"
        borderRadius="lg"
        mt={2}
        mb={2}
        p={2}
        bg="white"
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
          <Text color="gray.800">Previous</Text>
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
          <Text color="gray.800">Next</Text>
        </Button>
      </Flex>
    </Flex>
  )
}

export default Suppliers
