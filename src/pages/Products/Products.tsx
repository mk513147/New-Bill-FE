import {
  Avatar,
  Flex,
  HStack,
  Input,
  InputGroup,
  Stack,
  Text,
  ButtonGroup,
  Heading,
  IconButton,
  Pagination,
  Button,
  Table,
} from '@chakra-ui/react'

import {
  FaFilter,
  FaPrint,
  FaPlusCircle,
  FaEdit,
  FaTrash,
  LuChevronLeft,
  LuChevronRight,
  IoIosSearch,
} from '@/components/icons'
import '@/styles/products.css'
import AdaptiveModal, { FieldConfig } from '@/components/common/AdaptiveModal'
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
    // TODO: call API or update state
  }

  return (
    <>
      <Flex
        bgColor="gray.100"
        width="100vw"
        height="100vh"
        flexDirection={{ base: 'column', md: 'row', sm: 'column' }}
        overflow={'hidden'}
      >
        <Flex
          width={{ base: 'full', md: '80%', sm: 'full' }}
          height={{ base: '90%', md: 'full', sm: '90%' }}
          flexDirection="column"
          gap={10}
          padding={8}
        >
          <Flex
            justifyContent="space-between"
            width="full"
            alignItems="center"
            color="gray.800"
            gap={6}
          >
            <InputGroup
              startElement={<IoIosSearch color="blue" size="20px" />}
              bgColor="white"
              shadow="md"
              width="50%"
              rounded="full"
            >
              <Input
                placeholder="Search Products"
                outline="none"
                border="none"
                _placeholder={{ color: 'gray.500' }}
                size="lg"
              />
            </InputGroup>
            <HStack gap="4">
              <Avatar.Root bgColor="#0074E4" size="xl">
                <Avatar.Fallback name="Kaushal Raj" />
                <Avatar.Image src="./image" />
              </Avatar.Root>
              <Stack gap="0">
                <Text fontWeight="medium">Kaushal Raj</Text>
                <Text color="fg.muted" textStyle="sm">
                  Shop Name
                </Text>
              </Stack>
            </HStack>
          </Flex>

          <Flex justifyContent="space-between" width="full" alignItems="center" color="gray.800">
            <Heading size="3xl">Products</Heading>
            <HStack gap={15}>
              <Button bgColor="teal.400" color="white" variant="solid">
                <FaFilter />
                Filter
              </Button>
              <Button bgColor="teal.400" color="white" variant="solid">
                <FaPrint />
                Print
              </Button>
              <Button
                bgColor="#0074E4"
                color="white"
                variant="solid"
                size="lg"
                onClick={() => setIsModalOpen(true)}
              >
                Add product
                <FaPlusCircle />
              </Button>
            </HStack>
          </Flex>

          <Flex>
            <Stack
              width="full"
              gap="5"
              bgColor="white"
              shadow="sm"
              rounded="lg"
              overflow="hidden"
              pb="2"
            >
              <Table.ScrollArea rounded="md" height="sm">
                <Table.Root size="lg" stickyHeader color="gray.500" height="5" overflowY="scroll">
                  <Table.Header>
                    <Table.Row bgColor="white" borderBottomColor="gray.200" borderBottomWidth="3px">
                      <Table.ColumnHeader color="gray.600">Name</Table.ColumnHeader>
                      <Table.ColumnHeader color="gray.600">Quantity</Table.ColumnHeader>
                      <Table.ColumnHeader color="gray.600">Purchase Price</Table.ColumnHeader>
                      <Table.ColumnHeader color="gray.600">Selling Price</Table.ColumnHeader>
                      <Table.ColumnHeader color="gray.600">Max Discount</Table.ColumnHeader>
                      <Table.ColumnHeader color="gray.600">Min Discount</Table.ColumnHeader>
                      <Table.ColumnHeader color="gray.600">Category</Table.ColumnHeader>
                      <Table.ColumnHeader color="gray.600">Supplier Info</Table.ColumnHeader>
                      <Table.ColumnHeader color="gray.600">Date of Purchase</Table.ColumnHeader>
                      <Table.ColumnHeader color="gray.600">Payment Status</Table.ColumnHeader>
                      <Table.ColumnHeader color="gray.600">Discount on Bulk</Table.ColumnHeader>
                      <Table.ColumnHeader color="gray.600">Damaged Items</Table.ColumnHeader>
                      <Table.ColumnHeader color="gray.600">Stock</Table.ColumnHeader>
                      <Table.ColumnHeader color="gray.600">Actions</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {products.map((item) => (
                      <Table.Row
                        key={item.id}
                        bgColor="whiteAlpha.100"
                        borderBottomColor="gray.200"
                        borderBottomWidth="3px"
                      >
                        <Table.Cell color="gray.700">{item.name}</Table.Cell>
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
                          <HStack gap="2" justifyContent="center">
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
              {/* 
						<Pagination.Root count={products.length * 5} pageSize={5} page={1}>
							<ButtonGroup
								variant="ghost"
								size="sm"
								wrap="wrap"
								color="gray.500"
							>
								<Pagination.PrevTrigger asChild>
									<IconButton>
										<LuChevronLeft color="gray.500" />
									</IconButton>
								</Pagination.PrevTrigger>

								<Pagination.Items
									render={(page) => (
										<IconButton
											variant={{ base: "ghost", _selected: "outline" }}
										>
											{page.value}
										</IconButton>
									)}
								/>

								<Pagination.NextTrigger asChild>
									<IconButton>
										<LuChevronRight color="gray.500" />
									</IconButton>
								</Pagination.NextTrigger>
							</ButtonGroup>
						</Pagination.Root> */}
            </Stack>
          </Flex>
        </Flex>
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
