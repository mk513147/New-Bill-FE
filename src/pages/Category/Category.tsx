import { Flex, HStack, Text, IconButton, Box, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { useDispatch } from 'react-redux'

import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { TableActionsPopover } from '@/components/popovers/TableActionsPopover'
import { CommonTable } from '@/components/common/CommonTable'
import { FilterSelect } from '@/components/common/FilterSelect'
import { FaEdit, FaTrash } from '@/components/icons'

import CategoryModal, { CategoryFormValues } from '@/components/modals/CategoryModal'
import ConfirmDeleteDialog from '@/components/modals/ConfirmDelete'
import { useAllCategories } from '@/hooks/useCategory'
import { useCategoryActions } from '@/hooks/useCategoryActions'

function Categories() {
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add')
  const [editId, setEditId] = useState<string | null>(null)
  const [editDefaults, setEditDefaults] = useState<CategoryFormValues>()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteName, setDeleteName] = useState('')
  const limit = 20

  const { deleteCategory } = useCategoryActions(deleteId ?? '')
  const { data, isLoading } = useAllCategories(limit, page)

  const categories = data?.categories ?? []
  const pagination = data?.pagination ?? {
    currentPage: 1,
    totalPages: 3,
    hasNextPage: false,
    hasPreviousPage: false,
  }

  useEffect(() => {
    dispatch(setHeader({ title: 'Categories' }))
    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])

  const [value, setValue] = useState<string[]>([])

  const categoryFilters = [{ label: 'All categories', value: 'all' }]

  const categoryColumns = [
    {
      key: 'name',
      header: 'Category Name',
      width: '250px',
      render: (c: any) => c.name.charAt(0).toUpperCase() + c.name.slice(1),
    },
    {
      key: 'categoryId',
      header: 'Category ID',
      width: '250px',
      render: (c: any) => `CAT${c._id.slice(-8).toUpperCase()}`,
    },
    {
      key: 'createdAt',
      header: 'Created At',
      width: '250px',
      render: (c: any) => new Date(c.createdAt).toLocaleDateString(),
    },
    {
      key: 'updatedAt',
      header: 'Updated At',
      width: '250px',
      render: (c: any) => new Date(c.updatedAt).toLocaleDateString(),
    },
  ]

  const categoryActions = [
    {
      label: 'Edit',
      icon: <FaEdit size="14px" color="#7C3AED" />,
      onClick: (item: any) => {
        setDialogMode('edit')
        setEditId(item._id)
        setEditDefaults({
          name: item.name,
        })
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
          <FilterSelect
            options={categoryFilters}
            value={value}
            defaultValue={['all']}
            placeholder="All categories"
            onChange={setValue}
          />

          <HStack gap={2}>
            <IconButton
              aria-label="Add"
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

            <HStack justify="space-between" h="32px" _hover={{ bg: 'gray.300' }}>
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
            columns={categoryColumns}
            data={categories}
            isLoading={isLoading}
            rowKey={(c) => c._id}
            actions={categoryActions}
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
        description={`Are you sure you want to delete "${deleteName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteCategory.isPending}
        onConfirm={() => {
          deleteCategory.mutate(undefined, {
            onSuccess: () => {
              setDeleteOpen(false)
            },
          })
        }}
      />
    </>
  )
}

export default Categories
