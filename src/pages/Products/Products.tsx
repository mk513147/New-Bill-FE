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
  const products = data ?? []
  const totalPages = data?.totalPages ?? 1

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
          <DisplayCard title="Total Products" highlight={products.length} />
          <DisplayCard title="Low Stock" highlight={8} />
          <DisplayCard title="Out of Stock" highlight={2} />
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

          <Box maxH="350px" overflow="auto">
            <Table.Root stickyHeader variant="outline">
              <Table.Header>
                <Table.Row bg="#F5F6FA">
                  <Table.ColumnHeader>Product Name</Table.ColumnHeader>
                  <Table.ColumnHeader>SKU</Table.ColumnHeader>
                  <Table.ColumnHeader>Barcode</Table.ColumnHeader>
                  <Table.ColumnHeader>Category</Table.ColumnHeader>
                  <Table.ColumnHeader>Purchase Price</Table.ColumnHeader>
                  <Table.ColumnHeader>Selling Price</Table.ColumnHeader>
                  <Table.ColumnHeader>Stock Alert</Table.ColumnHeader>
                  <Table.ColumnHeader>Actions</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>

              {isLoading ? (
                <Table.Body>
                  {[...Array(4)].map((_, i) => (
                    <Table.Row key={i}>
                      <Table.Cell colSpan={8}>
                        <Skeleton height="20px" />
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
                      <Table.Cell>{item.purchasePrice}</Table.Cell>
                      <Table.Cell>{item.sellingPrice}</Table.Cell>
                      <Table.Cell>{item.lowStockAlert}</Table.Cell>
                      <Table.Cell>
                        <HStack>
                          <IconButton
                            aria-label="Edit"
                            variant="ghost"
                            onClick={() => {
                              setDialogMode('edit')
                              setEditId(item._id)
                              setEditDefaults(item)
                              setOpen(true)
                            }}
                          >
                            <FaEdit />
                          </IconButton>
                          <IconButton
                            aria-label="Delete"
                            variant="ghost"
                            onClick={() => {
                              setDeleteId(item._id)
                              setDeleteName(item.name)
                              setDeleteOpen(true)
                            }}
                          >
                            <FaTrash />
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

        <Flex justify="center" mt={4} gap={3}>
          <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </Button>
          <Button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
            Next
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
