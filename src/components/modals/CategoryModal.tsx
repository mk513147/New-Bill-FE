import { useEffect, useState } from 'react'
import { Dialog, Portal, Button, Input, Field, useMediaQuery } from '@chakra-ui/react'
import { X } from 'lucide-react'
import { useCategoryActions } from '@/hooks/useCategoryActions'

export interface CategoryFormValues {
  name: string
}

interface CategoryDialogProps {
  open: boolean
  onClose: () => void
  mode: 'add' | 'edit'
  pubId?: string
  defaultValues?: CategoryFormValues
}

export default function CategoryModal({
  open,
  onClose,
  mode,
  pubId,
  defaultValues,
}: CategoryDialogProps) {
  const [formData, setFormData] = useState<CategoryFormValues>({
    name: '',
  })

  const { createCategory, updateCategory } = useCategoryActions()

  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues)
    } else {
      setFormData({
        name: '',
      })
    }
  }, [defaultValues, mode])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit() {
    if (mode === 'add') {
      createCategory.mutate(formData, {
        onSuccess: onClose,
      })
      return
    }

    if (!pubId) return

    updateCategory.mutate(
      { categoryId: pubId, payload: formData },
      {
        onSuccess: onClose,
      },
    )
  }

  const [isLarge] = useMediaQuery(['(min-width: 540px)'])

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => {
        if (!details.open) onClose()
      }}
      preventScroll
      size={isLarge ? 'lg' : 'full'}
      placement={isLarge ? 'center' : 'bottom'}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            bg="linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)"
            rounded="2xl"
            shadow="xl"
            p={4}
            width="100%"
            maxW="560px"
            border="1px solid"
            borderColor="gray.100"
          >
            <Dialog.Header px={1}>
              <Dialog.Title fontSize="xl" fontWeight="800" color="gray.900" letterSpacing="-0.02em">
                {mode === 'add' ? 'Add New Category' : 'Edit Category'}
              </Dialog.Title>

              <Dialog.CloseTrigger asChild>
                <Button
                  size="xs"
                  variant="ghost"
                  color="gray.400"
                  p={1}
                  minW="auto"
                  _hover={{
                    bg: 'transparent',
                    color: 'gray.600',
                  }}
                >
                  <X size={14} />
                </Button>
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body pt={4} zIndex={2000}>
              <Field.Root mb={3}>
                <Field.Label color="gray.700" fontWeight="600">
                  Category Name
                </Field.Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Category Name"
                  bg="white"
                  borderColor="gray.200"
                  _focus={{
                    borderColor: 'gray.500',
                    boxShadow: '0 0 0 1px var(--chakra-colors-gray-500)',
                  }}
                />
              </Field.Root>
            </Dialog.Body>

            <Dialog.Footer gap={3} justifyContent="flex-end">
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  minW="120px"
                  width="50%"
                  color="gray.700"
                  borderColor="gray.300"
                  _hover={{ bg: 'gray.100' }}
                >
                  Cancel
                </Button>
              </Dialog.ActionTrigger>

              <Button
                minW="160px"
                bg="gray.950"
                color="white"
                width="50%"
                _hover={{ bg: 'gray.800' }}
                loading={createCategory.isPending || updateCategory.isPending}
                onClick={handleSubmit}
              >
                {mode === 'add' ? 'Add Category' : 'Save Changes'}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
