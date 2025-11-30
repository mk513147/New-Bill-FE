import {
  Flex,
  HStack,
  Input,
  Text,
  Heading,
  IconButton,
  Button,
  Table,
  Box,
  Card,
  VStack,
} from '@chakra-ui/react'

import {
  FaFilter,
  FaPrint,
  FaPlusCircle,
  FaEdit,
  FaTrash,
  IoIosSearch,
} from '@/components/icons/index.ts'

import AdaptiveModal, { FieldConfig } from '@/components/common/AdaptiveModal.tsx'
import { useState } from 'react'
import { useAllCustomers } from '@/hooks/useCustomer'

const addCustomerFields: FieldConfig[] = [
  { name: 'name', label: 'Customer Name', type: 'text', required: true },
  { name: 'mobileNumber', label: 'Mobile Number', type: 'text', required: true },
  { name: 'address', label: 'Address', type: 'text', required: true },
  { name: 'amount', label: 'Amount', type: 'number', required: true },
  { name: 'companyName', label: 'Company Name', type: 'text' },
  {
    name: 'type',
    label: 'Customer Type',
    type: 'select',
    options: ['Regular', 'Premium', 'Wholesale'],
    defaultValue: 'Regular',
  },
]

function Customers() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [page, setPage] = useState(1)
  const limit = 20

  const { data, isLoading } = useAllCustomers(limit, page)
  console.log('Customer Data:', data)

  const customers = data ?? []
  const totalPages = data?.totalPages ?? 3

  function handleAddCustomerSubmit(data: Record<string, any>) {
    console.log('New Customer:', data)
    setIsModalOpen(false)
  }

  return (
    <>
      <Flex bg="white" minH="100vh" flexDir="column" p={6}>
        {/* PAGE TITLE */}
        <Heading size="3xl" color="gray.800" mb={4}>
          Customers
        </Heading>

        {/* STATS SECTION */}
        <Flex gap={6} wrap="wrap">
          <Card.Root w="260px" shadow="sm" bg="#6730EC" color="white" borderRadius="lg">
            <Card.Body>
              <Text fontSize="lg">Active Customers</Text>
              <Heading size="2xl">100</Heading>
              <Text fontSize="sm" opacity={0.9}>
                ↑ 12% vs last month
              </Text>
            </Card.Body>
          </Card.Root>

          <Card.Root w="260px" shadow="sm" borderRadius="lg" color="gray.800" bg="white">
            <Card.Body>
              <Text fontSize="lg">Inactive Customers</Text>
              <Heading size="2xl">19</Heading>
              <Text fontSize="sm">↑ 12% vs last month</Text>
            </Card.Body>
          </Card.Root>

          <Card.Root w="260px" shadow="sm" borderRadius="lg" color="gray.800" bg="white">
            <Card.Body>
              <Text fontSize="lg">Deleted Customers</Text>
              <Heading size="2xl">10</Heading>
              <Text fontSize="sm">↑ 12% vs last month</Text>
            </Card.Body>
          </Card.Root>
        </Flex>

        {/* ACTIVE CUSTOMER HEADER */}
        <Flex justify="space-between" align="center" mt={8} w="100%" gap={4} flexWrap="nowrap">
          {/* Title */}
          <Heading size="xl" color="gray.800" whiteSpace="nowrap">
            Active Customer
          </Heading>

          {/* Right Controls */}
        </Flex>

        {/* TABLE */}
        <Box
          bg="white"
          mt={6}
          rounded="lg"
          shadow="sm"
          border="1px solid"
          borderColor="gray.200"
          p={4}
        >
          {/* Top Controls */}
          <Flex gap={3} justifyContent={'space-between'} mb={3}>
            {/* Search */}
            <HStack gap={2}>
              <HStack
                bg="white"
                rounded="md"
                px={3}
                py={1}
                border="1px solid"
                borderColor="gray.400"
                minW="260px"
              >
                <IoIosSearch size="22px" color="#6b7280" />
                <Input
                  placeholder="Search"
                  border="none"
                  _focus={{ outline: 'none', boxShadow: 'none' }}
                  _placeholder={{ color: 'gray.500' }}
                />
              </HStack>

              {/* Filters */}
              <Button
                bg="white"
                border="1px solid "
                borderColor="gray.400"
                _hover={{ bg: 'gray.50' }}
                px={4}
                height="38px"
              >
                <HStack gap={2}>
                  <FaFilter size="14px" />
                  <Text fontSize="sm">Filters</Text>
                </HStack>
              </Button>
            </HStack>

            <HStack gap={2}>
              {/* Add New */}
              <Button
                bg="white"
                border="1px solid "
                borderColor="gray.400"
                px={5}
                height="38px"
                onClick={() => setIsModalOpen(true)}
                _hover={{ bg: 'gray.50' }}
              >
                <HStack gap={2}>
                  <FaPlusCircle size="15px" />
                  <Text fontSize="sm">Add New Customer</Text>
                </HStack>
              </Button>

              {/* Export */}
              <Button bg="#6730EC" color={'white'} px={4} height="38px" _hover={{ bg: '#5b29d8' }}>
                <HStack gap={2}>
                  <FaPrint size="14px" />
                  <Text fontSize="sm">Export</Text>
                </HStack>
              </Button>
            </HStack>
          </Flex>

          {/* Table */}
          <Box
            w="100%"
            overflowX="auto"
            maxW="100%"
            maxH={'300px'}
            css={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            <Table.Root size="md" stickyHeader minW="980px">
              <Table.Header>
                <Table.Row bg="#F5F6FA">
                  <Table.ColumnHeader fontWeight="600" color="gray.600">
                    Contact Name
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="600" color="gray.600">
                    Customer ID
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="600" color="gray.600">
                    Email
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="600" color="gray.600">
                    Address
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="600" color="gray.600">
                    Phone Number
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="600" color="gray.600">
                    Actions
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {customers.map((item: any) => (
                  <Table.Row
                    key={item._id}
                    _hover={{ bg: 'gray.50' }}
                    borderBottom="1px solid"
                    borderColor="gray.100"
                    height="60px"
                  >
                    <Table.Cell>
                      <Text fontSize="sm">{item.name}</Text>
                    </Table.Cell>

                    <Table.Cell>
                      <Text fontSize="sm">BC{item._id.slice(-8).toUpperCase()}</Text>
                    </Table.Cell>

                    <Table.Cell>
                      <Text fontSize="sm">{item.email}</Text>
                    </Table.Cell>

                    <Table.Cell>
                      <Text fontSize="sm">{item.address}</Text>
                    </Table.Cell>

                    <Table.Cell>
                      <Text fontSize="sm">{item.mobileNumber}</Text>
                    </Table.Cell>

                    <Table.Cell>
                      <HStack gap={4}>
                        <IconButton
                          aria-label="Edit"
                          size="sm"
                          variant="ghost"
                          _hover={{ bg: 'transparent', color: '#7C3AED' }}
                        >
                          {<FaEdit size="16px" color="#7C3AED" />}
                        </IconButton>

                        <IconButton
                          aria-label="Delete"
                          size="sm"
                          variant="ghost"
                          _hover={{ bg: 'transparent', color: '#EF4444' }}
                        >
                          {<FaTrash size="16px" color="#EF4444" />}
                        </IconButton>
                      </HStack>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Box>

        {/* PAGINATION */}
        <Flex justify="center" align="center" mt={4} gap={4}>
          <Button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            variant="outline"
            bg="white"
            color={'gray.800'}
          >
            Previous
          </Button>

          <HStack gap={2}>
            {Array.from({ length: totalPages }).map((_, index) => (
              <Button
                key={index}
                onClick={() => setPage(index + 1)}
                bg={page === index + 1 ? '#6730EC' : 'gray.200'}
                color={page === index + 1 ? 'white' : 'black'}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>

          <Button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            variant="outline"
            bg="white"
            color={'gray.800'}
          >
            Next
          </Button>
        </Flex>
      </Flex>

      {/* ADD CUSTOMER MODAL */}
      <AdaptiveModal
        isOpen={isModalOpen}
        title="Add New Customer"
        fields={addCustomerFields}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCustomerSubmit}
      />
    </>
  )
}

export default Customers
