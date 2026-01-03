import { useEffect, useState } from 'react'
import { Dialog, Portal, Button, Input, Field, useMediaQuery } from '@chakra-ui/react'
import { X } from 'lucide-react'
import { useCategoryActions } from '@/hooks/useCategoryActions'

export interface CategoryFormValues {
  name: string
  description?: string
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
    description: '',
  })

  const { createCategory, updateCategory } = useCategoryActions(pubId ?? '')

  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues)
    } else {
      setFormData({
        name: '',
        description: '',
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

    updateCategory.mutate(formData, {
      onSuccess: onClose,
    })
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
          <Dialog.Content bg="white" rounded="lg" shadow="lg" p={4} width="100%" maxW="600px">
            <Dialog.Header px={1}>
              <Dialog.Title fontSize="2xl" fontWeight="700" color="gray.800">
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

            <Dialog.Body pt={4}>
              <Field.Root mb={3}>
                <Field.Label>Category Name</Field.Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Category Name"
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Description</Field.Label>
                <Input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter Description"
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
                bg="#6730EC"
                color="white"
                width="50%"
                _hover={{ bg: '#5b29d8' }}
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
