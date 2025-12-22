import { Flex, HStack, Text, Heading, IconButton, Button, Box } from '@chakra-ui/react'

import { FaEdit, FaTrash } from '@/components/icons'

import { useEffect, useState } from 'react'

import ConfirmDeleteDialog from '@/components/modals/ConfirmDelete'
import ProductDialog, { ProductFormValues } from '@/components/modals/ProductModal'
import { useAllProducts } from '@/hooks/useProducts'
import { useProductActions } from '@/hooks/useProductActions'
import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { useDispatch } from 'react-redux'
import { TableActionsPopover } from '@/components/popovers/TableActionsPopover'
import { Plus } from 'lucide-react'
import { CommonTable } from '@/components/common/CommonTable'

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
  const { deleteProduct } = useProductActions(deleteId ?? '')

  const { data, isLoading } = useAllProducts(limit, page)
  const products = data?.products ?? []
  const pagination = data?.pagination ?? {
    currentPage: 1,
    totalPages: 3,
    hasNextPage: false,
    hasPreviousPage: false,
  }

  const productColumns = [
    {
      key: 'name',
      header: 'Product Name',
      render: (p: any) => p.name,
    },
    {
      key: 'barcode',
      header: 'Barcode',
      render: (p: any) => p.barcode,
    },
    {
      key: 'category',
      header: 'Category',
      render: (p: any) => p.categoryId,
    },
    {
      key: 'sellingPrice',
      header: 'Selling Price',
      render: (p: any) => p.sellingPrice,
    },
    {
      key: 'unit',
      header: 'Unit',
      render: (p: any) => p.unit,
    },
    {
      key: 'maxDiscount',
      header: 'Maximum Discount',
      width: '100px',

      render: (p: any) => p.maxDiscount,
    },
    {
      key: 'minDiscount',
      header: 'Minimum Discount',
      width: '100px',
      render: (p: any) => p.minDiscount,
    },
  ]

  const productActions = [
    {
      label: 'Edit',
      icon: <FaEdit size="16px" color="#7C3AED" />,
      onClick: (item: any) => {
        setDialogMode('edit')
        setEditId(item._id)
        setEditDefaults(item)
        setOpen(true)
      },
    },
    {
      label: 'Delete',
      icon: <FaTrash size="16px" color="#EF4444" />,
      onClick: (item: any) => {
        setDeleteId(item._id)
        setDeleteName(item.name)
        setDeleteOpen(true)
      },
    },
  ]

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setHeader({ title: 'Products' }))
    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])

  return (
    <>
      <Flex
        bg="gray.100"
        width="100%"
        height="100%"
        overflowX="auto"
        flexDir="column"
        pl={{ base: 3, sm: 2, md: 6 }}
        pr={{ base: 3, sm: 2, md: 6 }}
        pt={{ base: 3, sm: 4, md: 1 }}
        mb={3}
      >
        <Flex
          justify="space-between"
          align="center"
          mt={8}
          w="100%"
          gap={4}
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
        >
          <Heading size="xl" color="gray.800" whiteSpace="nowrap">
            Products
          </Heading>

          <HStack gap={2}>
            <IconButton
              aria-label="Add Product"
              colorPalette="blue"
              variant="solid"
              px={3}
              minW="unset"
              minH="unset"
              h="32px"
              onClick={() => {
                setDialogMode('add')
                setEditId(null)
                setEditDefaults(undefined)
                setOpen(true)
              }}
            >
              <HStack gap={1}>
                <Plus size={18} />
                <Text fontSize="sm" display={{ base: 'none', md: 'block' }}>
                  New
                </Text>
              </HStack>
            </IconButton>

            <HStack h="32px" _hover={{ bg: 'gray.300' }}>
              <TableActionsPopover />
            </HStack>
          </HStack>
        </Flex>

        <Box
          bg="white"
          mt={6}
          rounded="lg"
          shadow="lightGray"
          border="1px solid"
          borderColor="gray.100"
          w="100%"
          p={{ base: 2, md: 4 }}
        >
          <CommonTable
            columns={productColumns}
            data={products}
            isLoading={isLoading}
            rowKey={(p) => p._id}
            actions={productActions}
          />
        </Box>

        <Flex
          justify="center"
          align="center"
          borderRadius="lg"
          mt={2}
          mb={2}
          p={2}
          bg={'white'}
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
