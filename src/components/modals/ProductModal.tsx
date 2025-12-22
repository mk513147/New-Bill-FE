import { useEffect, useState } from 'react'
import {
  Dialog,
  Portal,
  Button,
  Input,
  Field,
  useMediaQuery,
  Select,
  SimpleGrid,
} from '@chakra-ui/react'
import { useProductActions } from '@/hooks/useProductActions'
import { createListCollection } from '@chakra-ui/react'
import { X } from 'lucide-react'

const unitCollection = createListCollection({
  items: [
    { label: 'Pieces', value: 'pcs' },
    { label: 'Box', value: 'box' },
    { label: 'Kilogram', value: 'kg' },
    { label: 'Litre', value: 'litre' },
    { label: 'Packet', value: 'packet' },
    { label: 'Dozen', value: 'dozen' },
    { label: 'Meter', value: 'meter' },
    { label: 'Other', value: 'other' },
  ],
})

export interface ProductFormValues {
  name: string
  sku: string
  barcode?: string
  categoryId?: string
  supplierId?: string
  purchasePrice?: string
  sellingPrice?: string
  unit?: string
  tax?: string
  lowStockAlert?: string
  maxDiscount?: string
  minDiscount?: string
}

interface ProductDialogProps {
  open: boolean
  onClose: () => void
  mode: 'add' | 'edit'
  pubId?: string
  defaultValues?: ProductFormValues
}

export default function ProductDialog({
  open,
  onClose,
  mode,
  pubId,
  defaultValues,
}: ProductDialogProps) {
  const [formData, setFormData] = useState<ProductFormValues>({
    name: '',
    sku: '',
    barcode: '',
    categoryId: '',
    supplierId: '',
    purchasePrice: '',
    sellingPrice: '',
    unit: '',
    tax: '',
    lowStockAlert: '',
    maxDiscount: '',
    minDiscount: '',
  })

  const { createProduct, updateProduct } = useProductActions(pubId ?? '')

  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues)
    } else {
      setFormData({
        name: '',
        sku: '',
        barcode: '',
        categoryId: '',
        supplierId: '',
        purchasePrice: '',
        sellingPrice: '',
        unit: '',
        tax: '',
        lowStockAlert: '',
        maxDiscount: '',
        minDiscount: '',
      })
    }
  }, [defaultValues, mode])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit() {
    if (mode === 'add') {
      createProduct.mutate(formData, { onSuccess: onClose })
      return
    }

    updateProduct.mutate(formData, { onSuccess: onClose })
  }

  const [isLarge] = useMediaQuery(['(min-width: 540px)'])

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => {
        if (!details.open) onClose()
      }}
      scrollBehavior="inside"
      size={isLarge ? 'lg' : 'full'}
      placement={isLarge ? 'center' : 'bottom'}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            bg="white"
            rounded="lg"
            shadow="lg"
            p={4}
            maxW="600px"
            w="100%"
            maxH="90vh"
          >
            <Dialog.Header px={1}>
              <Dialog.Title fontSize="2xl" fontWeight="700" color="gray.800">
                {mode === 'add' ? 'Add New Product' : 'Edit Product'}
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

            <Dialog.Body
              pt={4}
              overflowY="auto"
              css={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                <Field.Root>
                  <Field.Label>Product Name</Field.Label>
                  <Input name="name" value={formData.name} onChange={handleChange} />
                </Field.Root>

                <Field.Root>
                  <Field.Label>SKU</Field.Label>
                  <Input name="sku" value={formData.sku} onChange={handleChange} />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Barcode</Field.Label>
                  <Input name="barcode" value={formData.barcode} onChange={handleChange} />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Category ID</Field.Label>
                  <Input name="categoryId" value={formData.categoryId} onChange={handleChange} />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Supplier ID</Field.Label>
                  <Input name="supplierId" value={formData.supplierId} onChange={handleChange} />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Purchase Price</Field.Label>
                  <Input
                    name="purchasePrice"
                    value={formData.purchasePrice}
                    onChange={handleChange}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Selling Price</Field.Label>
                  <Input
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handleChange}
                  />
                </Field.Root>

                {/* UNIT SELECT */}
                <Field.Root>
                  <Field.Label>Unit</Field.Label>

                  <Select.Root
                    collection={unitCollection}
                    value={formData.unit ? [formData.unit] : []}
                    onValueChange={(details) =>
                      setFormData((prev) => ({ ...prev, unit: details.value[0] }))
                    }
                    positioning={{ strategy: 'fixed', hideWhenDetached: true }}
                  >
                    <Select.HiddenSelect name="unit" />

                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder="Select unit" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>

                    <Select.Positioner>
                      <Select.Content bg={'white'}>
                        {unitCollection.items.map((item) => (
                          <Select.Item item={item} key={item.value}>
                            {item.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Select.Root>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Tax (%)</Field.Label>
                  <Input name="tax" value={formData.tax} onChange={handleChange} />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Low Stock Alert</Field.Label>
                  <Input
                    name="lowStockAlert"
                    value={formData.lowStockAlert}
                    onChange={handleChange}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Max Discount (%)</Field.Label>
                  <Input name="maxDiscount" value={formData.maxDiscount} onChange={handleChange} />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Min Discount (%)</Field.Label>
                  <Input name="minDiscount" value={formData.minDiscount} onChange={handleChange} />
                </Field.Root>
              </SimpleGrid>
            </Dialog.Body>

            <Dialog.Footer gap={3} justifyContent="flex-end">
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  minW="120px"
                  width={'50%'}
                  color="gray.700"
                  borderColor="gray.300"
                  _hover={{ bg: 'gray.100' }}
                >
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button
                width="100%"
                bg="#6730EC"
                color="white"
                _hover={{ bg: '#5b29d8' }}
                loading={createProduct.isPending || updateProduct.isPending}
                onClick={handleSubmit}
              >
                {mode === 'add' ? 'Add Product' : 'Save Changes'}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
