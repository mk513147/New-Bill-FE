import { Flex, HStack, Text, IconButton, Button, Box } from '@chakra-ui/react'

import { FaEdit, FaTrash } from '@/components/icons'

import { useEffect, useMemo, useRef, useState } from 'react'

import ConfirmDeleteDialog from '@/components/modals/ConfirmDelete'
import ProductDialog, { ProductFormValues } from '@/components/modals/ProductModal'
import { useProducts } from '@/hooks/useProducts'
import { useProductActions } from '@/hooks/useProductActions'
import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { useDispatch } from 'react-redux'
import { SortKey, TableActionsPopover } from '@/components/popovers/TableActionsPopover'
import { Plus } from 'lucide-react'
import { CommonTable } from '@/components/common/CommonTable'
import { useProductImport } from '@/hooks/useProductImport'
import { useProductExport } from '@/hooks/useProductExport'
import { useQueryClient } from '@tanstack/react-query'
import { isFrontendPagination } from '@/utils/isFrontendPagination'
import { ExpandableSearch } from '@/components/common/ExpandableSearch'
import { FilterSelect } from '@/components/common/FilterSelect'

function Products() {
  const [open, setOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add')
  const [editId, setEditId] = useState<string | null>(null)
  const [editDefaults, setEditDefaults] = useState<ProductFormValues>()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteName, setDeleteName] = useState('')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  const [sortBy, setSortBy] = useState<SortKey | undefined>(undefined)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(undefined)

  const { deleteProduct } = useProductActions(deleteId ?? '')
  const importProducts = useProductImport()
  const exportProducts = useProductExport()
  const queryClient = useQueryClient()

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [page, setPage] = useState(1)
  const limit = 20

  const frontend = isFrontendPagination(sortBy, sortOrder)

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), 400)
    return () => clearTimeout(id)
  }, [search])

  const { data, isLoading } = useProducts({
    search: debouncedSearch || undefined,
    ...(frontend ? { sortBy, sortOrder } : { page, limit }),
  })

  const rawProducts = data?.products ?? []

  const products = useMemo(() => {
    if (!frontend) return rawProducts

    const start = (page - 1) * limit
    return rawProducts.slice(start, start + limit)
  }, [rawProducts, page, limit, frontend])

  const pagination = frontend
    ? {
        currentPage: page,
        totalPages: Math.max(1, Math.ceil(rawProducts.length / limit)),
        hasNextPage: page * limit < rawProducts.length,
        hasPreviousPage: page > 1,
      }
    : (data?.pagination ?? {
        currentPage: 1,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      })

  useEffect(() => {
    setPage(1)
  }, [sortBy, sortOrder, search])

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
      render: (p: any) => p.categoryId?.name ?? '—',
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

  const [value, setValue] = useState<string[]>([])

  const productFilters = [
    { label: 'All Products', value: 'all' },
    { label: 'Low Stock', value: 'active' },
    { label: 'Out of Stock', value: 'inactive' },
  ]

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    importProducts.mutate(file)
    e.target.value = ''
  }

  const handleExportClick = () => {
    exportProducts.mutate({
      page,
      limit,
      ...(sortBy && sortOrder ? { sortBy, sortOrder } : {}),
    })
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        hidden
        onChange={handleFileChange}
      />
      <Flex bg="gray.100" width="100%" height="100%" overflowX="auto" flexDir="column" px={6}>
        <Flex justify="space-between" align="center" mt={8} w="100%" gap={4}>
          <HStack gap={2}>
            <ExpandableSearch
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Products"
            />

            {/* Filter */}
            <FilterSelect
              options={productFilters}
              value={value}
              defaultValue={['all']}
              placeholder="All Products"
              onChange={setValue}
              width="200px"
            />
          </HStack>
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

            <TableActionsPopover
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={(key, order) => {
                setPage(1)
                setSortBy(key)
                setSortOrder(order)
              }}
              onImport={handleImportClick}
              onExport={handleExportClick}
              onRefresh={() => queryClient.invalidateQueries({ queryKey: ['customers'] })}
            />
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
