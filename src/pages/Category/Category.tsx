import { Flex, HStack, Text, IconButton, Button, Box } from '@chakra-ui/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useQueryClient } from '@tanstack/react-query'

import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { TableActionsPopover } from '@/components/popovers/TableActionsPopover'
import { CommonTable } from '@/components/common/CommonTable'
import { FilterSelect } from '@/components/common/FilterSelect'
import { ExpandableSearch } from '@/components/common/ExpandableSearch'

import { FaEdit, FaTrash } from '@/components/icons'
import CategoryModal, { CategoryFormValues } from '@/components/modals/CategoryModal'
import ConfirmDeleteDialog from '@/components/modals/ConfirmDelete'

import { useCategory } from '@/hooks/useCategory'
import { useCategoryActions } from '@/hooks/useCategoryActions'
import { useCategoryImport } from '@/hooks/useCategoryImport'
import { useCategoryExport } from '@/hooks/useCategoryExport'

import { isFrontendPagination } from '@/utils/isFrontendPagination'

function Categories() {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add')
  const [editId, setEditId] = useState<string | null>(null)
  const [editDefaults, setEditDefaults] = useState<CategoryFormValues>()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteName, setDeleteName] = useState('')

  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  const [sortBy, setSortBy] = useState<string>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const [page, setPage] = useState(1)
  const limit = 20

  const frontend = isFrontendPagination(sortBy, sortOrder)

  const { deleteCategory } = useCategoryActions(deleteId ?? '')
  const importCategories = useCategoryImport()
  const exportCategories = useCategoryExport()

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), 400)
    return () => clearTimeout(id)
  }, [search])

  const { data, isLoading } = useCategory({
    search: debouncedSearch || undefined,
    ...(frontend ? { sortBy, sortOrder } : { page, limit }),
  })

  const rawCategories = data?.categories ?? []

  const categories = useMemo(() => {
    if (!frontend) return rawCategories
    const start = (page - 1) * limit
    return rawCategories.slice(start, start + limit)
  }, [rawCategories, page, limit, frontend])

  const pagination = frontend
    ? {
        currentPage: page,
        totalPages: Math.max(1, Math.ceil(rawCategories.length / limit)),
        hasNextPage: page * limit < rawCategories.length,
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
  }, [search, sortBy, sortOrder])

  useEffect(() => {
    dispatch(setHeader({ title: 'Categories' }))
    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])

  const categoryColumns = [
    {
      key: 'name',
      header: 'Category Name',
      render: (c: any) => (typeof c.name === 'string' ? c.name : (c.name?.name ?? '-')),
    },
    {
      key: 'categoryId',
      header: 'Category ID',
      render: (c: any) => `CAT${c._id.slice(-8).toUpperCase()}`,
    },
    {
      key: 'createdAt',
      header: 'Created At',
      render: (c: any) => (c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '-'),
    },
    {
      key: 'updatedAt',
      header: 'Updated At',
      render: (c: any) => (c.updatedAt ? new Date(c.updatedAt).toLocaleDateString() : '-'),
    },
  ]

  const categoryActions = [
    {
      label: 'Edit',
      icon: <FaEdit size="14px" color="#7C3AED" />,
      onClick: (item: any) => {
        setDialogMode('edit')
        setEditId(item._id)
        setEditDefaults({ name: item.name })
        setOpen(true)
      },
    },
    {
      label: 'Delete',
      icon: <FaTrash size="14px" color="#EF4444" />,
      onClick: (item: any) => {
        setDeleteId(item._id)
        setDeleteName(item.name)
        setDeleteOpen(true)
      },
    },
  ]

  const CATEGORY_SORT_OPTIONS = [
    { key: 'name', label: 'Name' },
    { key: 'createdAt', label: 'Created Time' },
    { key: 'updatedAt', label: 'Last Modified Time' },
  ]

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    importCategories.mutate(file)
    e.target.value = ''
  }

  const handleExportClick = () => {
    exportCategories.mutate({
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

      <Flex bg="gray.100" w="100%" h="100%" flexDir="column" px={6}>
        {/* Top Bar */}
        <Flex justify="space-between" align="center" mt={8}>
          <HStack gap={2}>
            <ExpandableSearch
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories…"
            />

            <FilterSelect
              options={[{ label: 'All categories', value: 'all' }]}
              value={['all']}
              defaultValue={['all']}
              placeholder="All categories"
              onChange={() => {}}
              width="200px"
            />
          </HStack>

          <HStack gap={2}>
            <IconButton
              aria-label="Add"
              colorPalette="blue"
              h="32px"
              px={3}
              onClick={() => {
                setDialogMode('add')
                setEditId(null)
                setEditDefaults(undefined)
                setOpen(true)
              }}
            >
              <HStack gap={1}>
                <Plus size={18} />
                <Text fontSize="sm">New</Text>
              </HStack>
            </IconButton>

            <TableActionsPopover
              sortBy={sortBy}
              sortOrder={sortOrder}
              sortOptions={CATEGORY_SORT_OPTIONS}
              onSortChange={(key, order) => {
                setPage(1)
                setSortBy(key)
                setSortOrder(order)
              }}
              onImport={handleImportClick}
              onExport={handleExportClick}
              onRefresh={() => queryClient.invalidateQueries({ queryKey: ['categories'] })}
            />
          </HStack>
        </Flex>

        {/* Table */}
        <Box bg="white" mt={6} rounded="lg" shadow="lightGray" p={4}>
          <CommonTable
            columns={categoryColumns}
            data={categories}
            isLoading={isLoading}
            rowKey={(c) => c._id}
            actions={categoryActions}
          />
        </Box>

        {/* Pagination */}
        <Flex justify="center" align="center" mt={2} gap={4} bg="white" p={2}>
          <Button
            onClick={() => setPage(pagination.currentPage - 1)}
            disabled={!pagination.hasPreviousPage}
          >
            Previous
          </Button>

          {Array.from({ length: pagination.totalPages }).map((_, i) => {
            const pg = i + 1
            return (
              <Button
                key={pg}
                bg={pg === pagination.currentPage ? 'purple.100' : 'transparent'}
                onClick={() => setPage(pg)}
              >
                {pg}
              </Button>
            )
          })}

          <Button
            onClick={() => setPage(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage}
          >
            Next
          </Button>
        </Flex>
      </Flex>

      {/* Modals */}
      <CategoryModal
        open={open}
        onClose={() => setOpen(false)}
        mode={dialogMode}
        pubId={editId ?? undefined}
        defaultValues={editDefaults}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete Category"
        description={`Are you sure you want to delete "${deleteName}"?`}
        loading={deleteCategory.isPending}
        onConfirm={() =>
          deleteCategory.mutate(undefined, {
            onSuccess: () => setDeleteOpen(false),
          })
        }
      />
    </>
  )
}

export default Categories
