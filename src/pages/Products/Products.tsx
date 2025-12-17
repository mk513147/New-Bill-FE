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

import { FaFilter, FaPrint, FaPlusCircle, FaEdit, FaTrash, IoIosSearch } from '@/components/icons'

import { useEffect, useState } from 'react'
import DisplayCard from '@/components/common/DisplayCard'
import ConfirmDeleteDialog from '@/components/modals/ConfirmDelete'
import ProductDialog, { ProductFormValues } from '@/components/modals/ProductModal'
import { useAllProducts } from '@/hooks/useProducts'
import { useProductActions } from '@/hooks/useProductActions'
import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { useDispatch } from 'react-redux'

function Products() {
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add')
  const [editId, setEditId] = useState<string | null>(null)
  const [editDefaults, setEditDefaults] = useState<ProductFormValues>()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteName, setDeleteName] = useState('')

  const limit = 20

  const { data, isLoading } = useAllProducts(limit, page)
  const products = data?.products ?? []
  const pagination = data?.pagination ?? {
    currentPage: 1,
    totalPages: 3,
    hasNextPage: false,
    hasPreviousPage: false,
  }

  const { deleteProduct } = useProductActions(deleteId ?? '')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setHeader({ title: 'Products' }))
    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])

  return (
    <>
      <Flex bg="gray.100" minH="100vh" flexDir="column" px={6} pt={3}>
        <Flex gap={6} wrap="wrap">
          <DisplayCard
            title="Total Products"
            highlight={data?.pagination?.totalCount}
            bgColor="#6730EC"
            textColor="white"
            animate={true}
          />
          <DisplayCard title="Low Stock" highlight={8} animate={true} />
          <DisplayCard title="Out of Stock" highlight={2} animate={true} />
        </Flex>

        <Flex justify="space-between" align="center" mt={8}>
          <Heading size="xl">Products</Heading>
        </Flex>

        <Box bg="white" mt={6} rounded="lg" border="1px solid" borderColor="gray.100" p={4}>
          <Flex justify="space-between" mb={3} gap={3} flexWrap="wrap">
            <HStack>
              <HStack border="1px solid" borderColor="gray.400" px={2} py={1} rounded="md">
                <IoIosSearch size="18px" />
                <Input placeholder="Search" border="none" _focus={{ boxShadow: 'none' }} />
              </HStack>
              <Button border="1px solid" borderColor="gray.400">
                <FaFilter /> <Text ml={2}>Filters</Text>
              </Button>
            </HStack>

            <HStack>
              <Button
                border="1px solid"
                borderColor="gray.400"
                onClick={() => {
                  setDialogMode('add')
                  setEditId(null)
                  setEditDefaults(undefined)
                  setOpen(true)
                }}
              >
                <FaPlusCircle /> <Text ml={2}>Add Product</Text>
              </Button>
              <Button bg="#6730EC" color="white">
                <FaPrint /> <Text ml={2}>Export</Text>
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
            <Table.Root size="md" stickyHeader variant="line">
              <Table.Header borderBottom="1px solid #E5E7EB">
                <Table.Row bg="#f5f6faff">
                  <Table.ColumnHeader fontWeight="600" color="gray.600">
                    Product Name
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="600" color="gray.600">
                    SKU
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="600" color="gray.600">
                    Barcode
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="600" color="gray.600">
                    Category
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="600" color="gray.600">
                    Supplier
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="600" color="gray.600">
                    Purchase Price
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="600" color="gray.600">
                    Selling Price
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="600" color="gray.600">
                    Stock
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="600" color="gray.600">
                    Unit
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="600" color="gray.600">
                    Tax
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="600" color="gray.600">
                    Stock Alert
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="600" color="gray.600">
                    Maximun Discount
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="600" color="gray.600">
                    Minimum Discount
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
                  {products.map((item: any) => (
                    <Table.Row key={item._id} _hover={{ bg: 'gray.50' }}>
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell>{item.sku}</Table.Cell>
                      <Table.Cell>{item.barcode}</Table.Cell>
                      <Table.Cell>{item.categoryId}</Table.Cell>
                      <Table.Cell>{item.supplierId}</Table.Cell>
                      <Table.Cell>{item.purchasePrice}</Table.Cell>
                      <Table.Cell>{item.sellingPrice}</Table.Cell>
                      <Table.Cell>{item.stock}</Table.Cell>
                      <Table.Cell>{item.unit}</Table.Cell>
                      <Table.Cell>{item.tax}</Table.Cell>
                      <Table.Cell>{item.lowStockAlert}</Table.Cell>
                      <Table.Cell>{item.maxDiscount}</Table.Cell>
                      <Table.Cell>{item.minDiscount}</Table.Cell>
                      <Table.Cell>
                        <HStack>
                          <IconButton
                            aria-label="Edit"
                            variant="ghost"
                            size="sm"
                            _hover={{ bg: 'transparent', color: '#7C3AED' }}
                            onClick={() => {
                              setDialogMode('edit')
                              setEditId(item._id)
                              setEditDefaults(item)
                              setOpen(true)
                            }}
                          >
                            <FaEdit size="16px" color="#7C3AED" />
                          </IconButton>
                          <IconButton
                            aria-label="Delete"
                            variant="ghost"
                            size="sm"
                            _hover={{ bg: 'transparent', color: '#EF4444' }}
                            onClick={() => {
                              setDeleteId(item._id)
                              setDeleteName(item.name)
                              setDeleteOpen(true)
                            }}
                          >
                            <FaTrash size="16px" color="#EF4444" />
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
          borderRadius="lg"
          mt={2}
          mb={2}
          p={2}
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
            <HStack>
              <Text color="gray.800">Previous</Text>
            </HStack>
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
                  _hover={{ bg: 'purple.50' }}
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
            <HStack>
              <Text color="gray.800">Next</Text>
            </HStack>
          </Button>
        </Flex>
      </Flex>

      <ProductDialog
        open={open}
        onClose={() => setOpen(false)}
        mode={dialogMode}
        pubId={editId ?? undefined}
        defaultValues={editDefaults}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete Product"
        description={`Are you sure you want to delete "${deleteName}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteProduct.isPending}
        onConfirm={() => deleteProduct.mutate()}
      />
    </>
  )
}

export default Products
