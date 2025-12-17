import { useEffect, useState } from 'react'
import { Dialog, Portal, Button, Input, Field, CloseButton, useMediaQuery } from '@chakra-ui/react'
import { useProductActions } from '@/hooks/useProductActions'

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
      preventScroll
      size={isLarge ? 'lg' : 'full'}
      placement={isLarge ? 'center' : 'bottom'}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="white" rounded="lg" shadow="lg" p={4} maxW="600px" w="100%">
            <Dialog.Header px={1}>
              <Dialog.Title fontSize="2xl" fontWeight="700" color="gray.800">
                {mode === 'add' ? 'Add New Product' : 'Edit Product'}
              </Dialog.Title>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body pt={4}>
              <Field.Root mb={3}>
                <Field.Label>Product Name</Field.Label>
                <Input name="name" value={formData.name} onChange={handleChange} />
              </Field.Root>

              <Field.Root mb={3}>
                <Field.Label>SKU</Field.Label>
                <Input name="sku" value={formData.sku} onChange={handleChange} />
              </Field.Root>

              <Field.Root mb={3}>
                <Field.Label>Barcode</Field.Label>
                <Input name="barcode" value={formData.barcode} onChange={handleChange} />
              </Field.Root>

              <Field.Root mb={3}>
                <Field.Label>Category ID</Field.Label>
                <Input name="categoryId" value={formData.categoryId} onChange={handleChange} />
              </Field.Root>

              <Field.Root mb={3}>
                <Field.Label>Supplier ID</Field.Label>
                <Input name="supplierId" value={formData.supplierId} onChange={handleChange} />
              </Field.Root>

              <Field.Root mb={3}>
                <Field.Label>Purchase Price</Field.Label>
                <Input
                  name="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={handleChange}
                />
              </Field.Root>

              <Field.Root mb={3}>
                <Field.Label>Selling Price</Field.Label>
                <Input name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} />
              </Field.Root>

              <Field.Root mb={3}>
                <Field.Label>Unit</Field.Label>
                <Input name="unit" value={formData.unit} onChange={handleChange} />
              </Field.Root>

              <Field.Root mb={3}>
                <Field.Label>Tax (%)</Field.Label>
                <Input name="tax" value={formData.tax} onChange={handleChange} />
              </Field.Root>

              <Field.Root mb={3}>
                <Field.Label>Low Stock Alert</Field.Label>
                <Input
                  name="lowStockAlert"
                  value={formData.lowStockAlert}
                  onChange={handleChange}
                />
              </Field.Root>

              <Field.Root mb={3}>
                <Field.Label>Max Discount (%)</Field.Label>
                <Input name="maxDiscount" value={formData.maxDiscount} onChange={handleChange} />
              </Field.Root>

              <Field.Root mb={3}>
                <Field.Label>Min Discount (%)</Field.Label>
                <Input name="minDiscount" value={formData.minDiscount} onChange={handleChange} />
              </Field.Root>
            </Dialog.Body>

            <Dialog.Footer>
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
