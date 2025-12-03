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
import '@/styles/products.css'
import AdaptiveModal, { FieldConfig } from '@/components/common/AdaptiveModal.tsx'
import { useState } from 'react'

const addProductFields: FieldConfig[] = [
  { name: 'name', label: 'Product Name', type: 'text', required: true },
  {
    name: 'productQuantity',
    label: 'Quantity',
    type: 'number',
    required: true,
  },
  { name: 'purchasePrice', label: 'Purchase Price', type: 'number' },
  { name: 'sellingPrice', label: 'Selling Price', type: 'number' },
  { name: 'category', label: 'Category', type: 'text' },
  { name: 'supplierInfo', label: 'Supplier Info', type: 'text' },
  {
    name: 'paymentStatus',
    label: 'Payment Status',
    type: 'select',
    options: ['Paid', 'Pending'],
    defaultValue: 'Paid',
  },
]

const products = [
  {
    id: 1,
    name: 'Laptop',
    productQuantity: 10,
    purchasePrice: 200,
    sellingPrice: 250,
    maxDiscount: 15,
    minDiscount: 5,
    category: 'Electronics',
    supplierInfo: 'Tech World',
    dateOfPurchase: '2025-11-01',
    paymentStatus: 'Paid',
    discountOnBulk: '10% on 5+',
    damagedItems: 0,
    stock: 50,
  },
  {
    id: 2,
    name: 'Shoes',
    productQuantity: 20,
    purchasePrice: 100,
    sellingPrice: 150,
    maxDiscount: 20,
    minDiscount: 10,
    category: 'Fashion',
    supplierInfo: 'Nike India',
    dateOfPurchase: '2025-10-25',
    paymentStatus: 'Pending',
    discountOnBulk: '15% on 10+',
    damagedItems: 1,
    stock: 80,
  },
]

function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleAddProductSubmit(data: Record<string, any>) {
    console.log('New product:', data)
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
              placeholder="Search Products"
              border="none"
              _placeholder={{ color: 'gray.500' }}
              size="lg"
              flex="1"
            />
          </HStack>

          <HStack gap="4">
            <Avatar.Root bgColor="#0074E4" size="xl">
              <Avatar.Fallback name="Kaushal Raj" /> <Avatar.Image src="./image" />
            </Avatar.Root>
            <Stack>
              <Text fontWeight="medium">Kaushal Raj</Text>
              <Text color="fg.muted" textStyle="sm">
                Shop Name
              </Text>
            </Stack>
          </HStack>
        </Flex>

        {/* PRODUCTS TITLE + BUTTONS */}
        <Flex
          justifyContent="space-between"
          alignItems="center"
          width="full"
          mt={10}
          flexWrap="wrap"
          gap={4}
        >
          <Heading size="2xl" color={'gray.800'}>
            Products
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
                <span>Add product</span>
              </HStack>
            </Button>
          </HStack>
        </Flex>

        {/* TABLE SECTION */}
        <Box
          width="80%"
          bg="white"
          mt={6}
          rounded="lg"
          shadow="sm"
          overflow="hidden"
          color={'gray.800'}
          pb={3}
        >
          <Table.ScrollArea height="60vh">
            <Table.Root size="lg" color={'gray.800'} stickyHeader>
              <Table.Header>
                <Table.Row bg="white" borderBottom="2px solid" borderColor="gray.200">
                  <Table.ColumnHeader>Name</Table.ColumnHeader>
                  <Table.ColumnHeader>Quantity</Table.ColumnHeader>
                  <Table.ColumnHeader>Purchase Price</Table.ColumnHeader>
                  <Table.ColumnHeader>Selling Price</Table.ColumnHeader>
                  <Table.ColumnHeader>Max Discount</Table.ColumnHeader>
                  <Table.ColumnHeader>Min Discount</Table.ColumnHeader>
                  <Table.ColumnHeader>Category</Table.ColumnHeader>
                  <Table.ColumnHeader>Supplier Info</Table.ColumnHeader>
                  <Table.ColumnHeader>Date of Purchase</Table.ColumnHeader>
                  <Table.ColumnHeader>Payment Status</Table.ColumnHeader>
                  <Table.ColumnHeader>Discount on Bulk</Table.ColumnHeader>
                  <Table.ColumnHeader>Damaged Items</Table.ColumnHeader>
                  <Table.ColumnHeader>Stock</Table.ColumnHeader>
                  <Table.ColumnHeader>Actions</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {products.map((item) => (
                  <Table.Row
                    key={item.id}
                    bg="white"
                    borderBottom="2px solid"
                    borderColor="gray.200"
                  >
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.productQuantity}</Table.Cell>
                    <Table.Cell>₹{item.purchasePrice}</Table.Cell>
                    <Table.Cell>₹{item.sellingPrice}</Table.Cell>
                    <Table.Cell>{item.maxDiscount}%</Table.Cell>
                    <Table.Cell>{item.minDiscount}%</Table.Cell>
                    <Table.Cell>{item.category}</Table.Cell>
                    <Table.Cell>{item.supplierInfo}</Table.Cell>
                    <Table.Cell>{item.dateOfPurchase}</Table.Cell>
                    <Table.Cell>{item.paymentStatus}</Table.Cell>
                    <Table.Cell>{item.discountOnBulk}</Table.Cell>
                    <Table.Cell>{item.damagedItems}</Table.Cell>
                    <Table.Cell>{item.stock}</Table.Cell>
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
      </Flex>

      <AdaptiveModal
        isOpen={isModalOpen}
        title="Add New Product"
        fields={addProductFields}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddProductSubmit}
      />
    </>
  )
}

export default Products
