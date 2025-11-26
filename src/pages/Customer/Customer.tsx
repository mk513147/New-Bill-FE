import {
  Avatar,
  Flex,
  HStack,
  Input,
  Stack,
  Text,
  Heading,
  IconButton,
  Button,
  Table,
  Box,
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

interface Customer {
  id: number
  name: string
  mobileNumber: string
  address: string
  amount: number
  companyName: string
  type: string
}

const customersData: Customer[] = [
  {
    id: 1,
    name: 'Aman Gupta',
    mobileNumber: '9876543210',
    address: 'New Delhi, India',
    amount: 15000,
    companyName: 'Boat India Pvt. Ltd.',
    type: 'Premium',
  },
  {
    id: 2,
    name: 'Riya Sharma',
    mobileNumber: '9998887776',
    address: 'Mumbai, India',
    amount: 8000,
    companyName: 'Reliance Retail',
    type: 'Regular',
  },
]

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
  const [customers, setCustomers] = useState(customersData)

  function handleAddCustomerSubmit(data: Record<string, any>) {
    console.log('New Customer:', data)
    setIsModalOpen(false)
  }

  return (
    <>
      <Flex
        bgColor="gray.100"
        width="100vw"
        minH="100vh"
        flexDirection="column"
        overflow="hidden"
        p={{ base: 4, md: 6 }}
      >
        {/* SEARCH + USER SECTION */}
        <Flex
          justifyContent="space-between"
          width="full"
          alignItems="center"
          color="gray.800"
          gap={4}
          flexWrap="wrap"
        >
          <HStack bg="white" shadow="md" width={{ base: '100%', md: '45%' }} rounded="full" px={4}>
            <Box color="blue">
              <IoIosSearch size="20px" />
            </Box>

            <Input
              placeholder="Search Customers"
              border="none"
              _placeholder={{ color: 'gray.500' }}
              size="lg"
              flex="1"
            />
          </HStack>

          <HStack gap="4">
            <Avatar.Root bgColor="#0074E4" size="xl">
              <Avatar.Fallback name="Kaushal Raj" />
              <Avatar.Image src="./image" />
            </Avatar.Root>

            <Stack>
              <Text fontWeight="medium">Kaushal Raj</Text>
              <Text color="fg.muted" textStyle="sm">
                Shop Name
              </Text>
            </Stack>
          </HStack>
        </Flex>

        {/* CUSTOMERS TITLE + BUTTONS */}
        <Flex
          justifyContent="space-between"
          alignItems="center"
          width="full"
          mt={10}
          flexWrap="wrap"
          gap={4}
        >
          <Heading size="2xl" color="gray.800">
            Customers
          </Heading>

          <HStack gap={4} flexWrap="wrap">
            <Button bgColor="teal.400" color="white">
              <HStack gap={3}>
                <FaFilter />
                <span>Filter</span>
              </HStack>
            </Button>

            <Button bgColor="teal.400" color="white">
              <HStack gap={3}>
                <FaPrint />
                <span>Print</span>
              </HStack>
            </Button>

            <Button bgColor="#0074E4" color="white" size="lg" onClick={() => setIsModalOpen(true)}>
              <HStack gap={3}>
                <FaPlusCircle />
                <span>Add customer</span>
              </HStack>
            </Button>
          </HStack>
        </Flex>

        {/* TABLE SECTION */}
        <Box
          width="100%"
          bg="white"
          mt={6}
          rounded="lg"
          shadow="sm"
          overflow="hidden"
          color="gray.800"
          pb={3}
        >
          <Box overflowX="auto" width="100%">
            <Table.ScrollArea height="60vh">
              <Table.Root size="lg" stickyHeader>
                <Table.Header>
                  <Table.Row bg="white" borderBottom="2px solid" borderColor="gray.200">
                    <Table.ColumnHeader>Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Mobile Number</Table.ColumnHeader>
                    <Table.ColumnHeader>Address</Table.ColumnHeader>
                    <Table.ColumnHeader>Amount</Table.ColumnHeader>
                    <Table.ColumnHeader>Company Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Type</Table.ColumnHeader>
                    <Table.ColumnHeader>Actions</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {customers.map((item) => (
                    <Table.Row
                      key={item.id}
                      bg="white"
                      borderBottom="2px solid"
                      borderColor="gray.200"
                    >
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell>{item.mobileNumber}</Table.Cell>
                      <Table.Cell>{item.address}</Table.Cell>
                      <Table.Cell>₹{item.amount}</Table.Cell>
                      <Table.Cell>{item.companyName}</Table.Cell>
                      <Table.Cell>{item.type}</Table.Cell>

                      <Table.Cell>
                        <HStack gap={2}>
                          <IconButton aria-label="Edit" size="sm" colorScheme="yellow">
                            <FaEdit />
                          </IconButton>
                          <IconButton aria-label="Delete" size="sm" colorScheme="red">
                            <FaTrash />
                          </IconButton>
                        </HStack>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Table.ScrollArea>
          </Box>
        </Box>
      </Flex>

      {/* CUSTOMER MODAL */}
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
