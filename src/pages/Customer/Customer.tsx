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
  Skeleton,
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
import DisplayCard from '@/components/common/DisplayCard'

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
  // console.log('Customer Data:', data)

  const customers = data ?? []
  const totalPages = data?.totalPages ?? 3

  function handleAddCustomerSubmit(data: Record<string, any>) {
    console.log('New Customer:', data)
    setIsModalOpen(false)
  }

  return (
    <>
      <Flex
        bg="white"
        width="100%"
        minH="100vh"
        overflowX="auto"
        flexDir="column"
        pl={{ base: 3, sm: 2, md: 6 }}
        pr={{ base: 3, sm: 2, md: 6 }}
        pt={{ base: 3, sm: 4, md: 1 }}
        mb={3}
      >
        <Heading size="3xl" color="gray.800" mt={{ base: 6, md: 1 }} mb={4}>
          Customers
        </Heading>

        <Flex
          gap={6}
          wrap="wrap"
          width={'100%'}
          alignItems={'center'}
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <DisplayCard
            title="Active Customers"
            highlight={100}
            description="↑ 12% vs last month"
            bgColor="#6730EC"
            textColor="white"
            animate={true}
          />

          <DisplayCard
            title="Inactive Customers"
            highlight={19}
            description="↑ 12% vs last month"
          />

          <DisplayCard title="Deleted Customer" highlight={10} description="↑ 12% vs last month" />
        </Flex>

        <Flex
          justify="space-between"
          align="center"
          mt={8}
          w="100%"
          gap={4}
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
        >
          <Heading size="xl" color="gray.800" whiteSpace="nowrap">
            Active Customer
          </Heading>
        </Flex>

        <Box
          bg="white"
          mt={6}
          rounded="lg"
          shadow={'lightGray'}
          border="1px solid"
          borderColor="gray.100"
          w="100%"
          maxW="1150px"
          p={{ base: 2, md: 4 }}
        >
          <Flex
            gap={3}
            justifyContent="space-between"
            mb={3}
            flexWrap={{ base: 'nowrap', md: 'wrap' }}
          >
            <HStack gap={2} flexShrink={0}>
              <HStack
                bg="white"
                rounded="md"
                px={2}
                py={1}
                border="1px solid"
                borderColor="gray.400"
                minW={{ base: '110px', md: '240px' }}
              >
                <IoIosSearch size="18px" color="#6b7280" />

                <Input
                  placeholder="Search"
                  border="none"
                  px={{ base: -1, md: 0 }}
                  fontSize={{ base: 'xs', md: 'sm' }}
                  w={{ base: '100px', md: 'auto' }}
                  _focus={{ outline: 'none', boxShadow: 'none' }}
                  _placeholder={{ color: 'gray.500' }}
                />
              </HStack>

              <Button
                bg="white"
                border="1px solid"
                borderColor="gray.400"
                _hover={{ bg: 'gray.50' }}
                px={{ base: 2, md: 4 }}
                height="36px"
              >
                <HStack gap={2}>
                  <FaFilter size="16px" />
                  <Text fontSize="sm" display={{ base: 'none', md: 'block' }}>
                    Filters
                  </Text>
                </HStack>
              </Button>
            </HStack>

            <HStack gap={2} flexShrink={0}>
              <Button
                bg="white"
                border="1px solid"
                borderColor="gray.400"
                px={{ base: 2, md: 5 }}
                height="36px"
                onClick={() => setIsModalOpen(true)}
                _hover={{ bg: 'gray.50' }}
              >
                <HStack gap={2}>
                  <FaPlusCircle size="16px" />
                  <Text fontSize="sm" display={{ base: 'none', md: 'block' }}>
                    Add New Customer
                  </Text>
                </HStack>
              </Button>

              <Button
                bg="#6730EC"
                color="white"
                px={{ base: 2, md: 4 }}
                height="36px"
                _hover={{ bg: '#5b29d8' }}
              >
                <HStack gap={2}>
                  <FaPrint size="16px" />
                  <Text fontSize="sm" display={{ base: 'none', md: 'block' }}>
                    Export
                  </Text>
                </HStack>
              </Button>
            </HStack>
          </Flex>

          <Box
            w="100%"
            maxW="100%"
            maxH="300px"
            overflow="auto"
            px={{ base: 1, md: 0 }}
            css={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            <Table.Root size="md" stickyHeader variant="outline">
              <Table.Header borderBottom="1px solid #E5E7EB">
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

              {isLoading ? (
                <Table.Body>
                  {[...Array(4)].map((_, i) => (
                    <Table.Row key={i} height="50px" border={0}>
                      <Table.Cell colSpan={6} p={1}>
                        <Box w="100%">
                          <Skeleton
                            height="20px"
                            width="100%"
                            variant="shine"
                            css={{
                              '--start-color': 'var(--chakra-colors-gray-200)',
                              '--end-color': 'var(--chakra-colors-gray-300)',
                            }}
                          />
                        </Box>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              ) : (
                <Table.Body>
                  {customers.map((item: any) => (
                    <Table.Row
                      key={item._id}
                      height="50px"
                      borderBottom="1px solid #bcbcbdff"
                      _hover={{ bg: '#F9FAFB' }}
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
              )}
            </Table.Root>
          </Box>
        </Box>

        <Flex
          justify="center"
          align="center"
          borderRadius={'lg'}
          mt={2}
          mb={2}
          p={2}
          shadow={'lightGray'}
          gap={4}
          width="100%"
        >
          <Button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            variant="outline"
            bg="white"
            rounded="lg"
          >
            <HStack>
              <Text color={'gray.800'}>Previous</Text>
            </HStack>
          </Button>

          <HStack gap={2}>
            {Array.from({ length: totalPages }).map((_, index) => {
              const pg = index + 1
              return (
                <Button
                  key={pg}
                  onClick={() => setPage(pg)}
                  rounded="lg"
                  bg={pg === page ? 'purple.100' : 'transparent'}
                  color={pg === page ? 'purple.600' : 'gray.700'}
                  _hover={{ bg: 'purple.50' }}
                >
                  {pg}
                </Button>
              )
            })}
          </HStack>

          <Button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            variant="outline"
            bg="white"
            rounded="lg"
          >
            <HStack>
              <Text color={'gray.800'}>Next</Text>
            </HStack>
          </Button>
        </Flex>
      </Flex>

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
