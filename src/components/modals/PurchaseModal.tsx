import { useEffect, useMemo, useState } from 'react'
import {
  Dialog,
  Portal,
  Button,
  Input,
  Field,
  useMediaQuery,
  Select,
  VStack,
  HStack,
  Text,
  Box,
} from '@chakra-ui/react'
import { createListCollection } from '@chakra-ui/react'
import { Plus, Trash2, X } from 'lucide-react'

import { useSupplier } from '@/hooks/useSupplier'
import { useProducts } from '@/hooks/useProducts'
import { usePurchaseActions } from '@/hooks/usePurchaseActions'

type PurchaseFormItem = {
  productId: string
  quantity: string
  price: string
}

export interface PurchaseFormValues {
  supplierId?: string
  invoiceNumber?: string
  purchaseDate?: string
  paidAmount?: string
  note?: string
  items: PurchaseFormItem[]
}

interface PurchaseDialogProps {
  open: boolean
  onClose: () => void
  defaultValues?: PurchaseFormValues
}

export default function PurchaseModal({ open, onClose, defaultValues }: PurchaseDialogProps) {
  const [formData, setFormData] = useState<PurchaseFormValues>({
    supplierId: '',
    invoiceNumber: '',
    purchaseDate: '',
    paidAmount: '0',
    note: '',
    items: [{ productId: '', quantity: '1', price: '0' }],
  })

  const { data: suppliers = [] } = useSupplier()
  const { data: productData } = useProducts({ page: 1, limit: 50 })
  const { createPurchase } = usePurchaseActions()

  const products = productData?.products ?? []

  const supplierCollection = useMemo(
    () =>
      createListCollection({
        items: suppliers.map((s: any) => ({
          label: `${s.name} (${s.mobileNumber})`,
          value: s._id,
        })),
      }),
    [suppliers],
  )

  const productCollection = useMemo(
    () =>
      createListCollection({
        items: products.map((p: any) => ({
          label: `${p.name} (${p.unit || 'pcs'})`,
          value: p._id,
        })),
      }),
    [products],
  )

  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues)
      return
    }

    setFormData({
      supplierId: '',
      invoiceNumber: '',
      purchaseDate: '',
      paidAmount: '0',
      note: '',
      items: [{ productId: '', quantity: '1', price: '0' }],
    })
  }, [defaultValues, open])

  const totals = useMemo(() => {
    const totalAmount = formData.items.reduce((sum, item) => {
      const qty = Number(item.quantity || 0)
      const price = Number(item.price || 0)
      return sum + (Number.isFinite(qty) ? qty : 0) * (Number.isFinite(price) ? price : 0)
    }, 0)

    const paidAmount = Number(formData.paidAmount || 0)
    const dueAmount = totalAmount - (Number.isFinite(paidAmount) ? paidAmount : 0)

    return { totalAmount, dueAmount }
  }, [formData.items, formData.paidAmount])

  function updateItem(index: number, key: keyof PurchaseFormItem, value: string) {
    setFormData((prev) => {
      const items = [...prev.items]
      items[index] = { ...items[index], [key]: value }
      return { ...prev, items }
    })
  }

  function addItem() {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { productId: '', quantity: '1', price: '0' }],
    }))
  }

  function removeItem(index: number) {
    setFormData((prev) => {
      if (prev.items.length === 1) return prev
      return { ...prev, items: prev.items.filter((_, i) => i !== index) }
    })
  }

  function handleSubmit() {
    const payload = {
      supplierId: formData.supplierId?.trim() || undefined,
      invoiceNumber: formData.invoiceNumber?.trim() || undefined,
      purchaseDate: formData.purchaseDate || undefined,
      paidAmount: Number(formData.paidAmount || 0),
      note: formData.note?.trim() || '',
      items: formData.items
        .filter((item) => item.productId && Number(item.quantity) > 0)
        .map((item) => ({
          productId: item.productId,
          quantity: Number(item.quantity),
          price: Number(item.price || 0),
        })),
    }

    createPurchase.mutate(payload, { onSuccess: onClose })
  }

  const [isLarge] = useMediaQuery(['(min-width: 540px)'])

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => {
        if (!details.open) onClose()
      }}
      scrollBehavior="inside"
      size={isLarge ? 'xl' : 'full'}
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
            maxW="840px"
            w="100%"
            maxH="90vh"
            border="1px solid"
            borderColor="gray.100"
          >
            <Dialog.Header px={1}>
              <Dialog.Title fontSize="xl" fontWeight="800" color="gray.900" letterSpacing="-0.02em">
                Add Purchase
              </Dialog.Title>

              <Dialog.CloseTrigger asChild>
                <Button size="xs" variant="ghost" color="gray.400" p={1} minW="auto">
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
              <VStack align="stretch" gap={4}>
                <HStack gap={3} align="start" flexWrap="wrap">
                  <Field.Root flex="1" minW="220px">
                    <Field.Label color="gray.700" fontWeight="600">
                      Supplier
                    </Field.Label>
                    <Select.Root
                      collection={supplierCollection}
                      value={formData.supplierId ? [formData.supplierId] : []}
                      onValueChange={(details) =>
                        setFormData((prev) => ({ ...prev, supplierId: details.value[0] || '' }))
                      }
                      positioning={{ strategy: 'fixed', hideWhenDetached: true }}
                    >
                      <Select.HiddenSelect name="supplierId" />
                      <Select.Control>
                        <Select.Trigger>
                          <Select.ValueText placeholder="Optional supplier" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Select.Positioner>
                        <Select.Content bg="white">
                          {supplierCollection.items.map((item) => (
                            <Select.Item item={item} key={item.value}>
                              {item.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Select.Root>
                  </Field.Root>

                  <Field.Root flex="1" minW="180px">
                    <Field.Label color="gray.700" fontWeight="600">
                      Invoice Number
                    </Field.Label>
                    <Input
                      value={formData.invoiceNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, invoiceNumber: e.target.value }))
                      }
                      placeholder="Optional"
                      bg="white"
                      borderColor="gray.200"
                    />
                  </Field.Root>

                  <Field.Root flex="1" minW="180px">
                    <Field.Label color="gray.700" fontWeight="600">
                      Purchase Date
                    </Field.Label>
                    <Input
                      type="date"
                      value={formData.purchaseDate}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, purchaseDate: e.target.value }))
                      }
                      bg="white"
                      borderColor="gray.200"
                    />
                  </Field.Root>
                </HStack>

                <Box border="1px solid" borderColor="gray.200" borderRadius="14px" p={3} bg="white">
                  <HStack justify="space-between" mb={3}>
                    <Text fontSize="sm" fontWeight="700" color="gray.800">
                      Purchase Items
                    </Text>
                    <Button size="sm" variant="outline" onClick={addItem}>
                      <HStack gap={1}>
                        <Plus size={14} />
                        <Text fontSize="xs">Add Item</Text>
                      </HStack>
                    </Button>
                  </HStack>

                  <VStack align="stretch" gap={2}>
                    {formData.items.map((item, index) => (
                      <HStack key={index} gap={2} align="end" flexWrap="wrap">
                        <Field.Root flex="2" minW="220px">
                          <Field.Label fontSize="xs" color="gray.600">
                            Product
                          </Field.Label>
                          <Select.Root
                            collection={productCollection}
                            value={item.productId ? [item.productId] : []}
                            onValueChange={(details) =>
                              updateItem(index, 'productId', details.value[0] || '')
                            }
                            positioning={{ strategy: 'fixed', hideWhenDetached: true }}
                          >
                            <Select.HiddenSelect />
                            <Select.Control>
                              <Select.Trigger>
                                <Select.ValueText placeholder="Select product" />
                              </Select.Trigger>
                              <Select.IndicatorGroup>
                                <Select.Indicator />
                              </Select.IndicatorGroup>
                            </Select.Control>
                            <Select.Positioner>
                              <Select.Content bg="white">
                                {productCollection.items.map((collectionItem) => (
                                  <Select.Item item={collectionItem} key={collectionItem.value}>
                                    {collectionItem.label}
                                    <Select.ItemIndicator />
                                  </Select.Item>
                                ))}
                              </Select.Content>
                            </Select.Positioner>
                          </Select.Root>
                        </Field.Root>

                        <Field.Root minW="110px">
                          <Field.Label fontSize="xs" color="gray.600">
                            Qty
                          </Field.Label>
                          <Input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                            bg="white"
                            borderColor="gray.200"
                          />
                        </Field.Root>

                        <Field.Root minW="130px">
                          <Field.Label fontSize="xs" color="gray.600">
                            Price
                          </Field.Label>
                          <Input
                            type="number"
                            min={0}
                            value={item.price}
                            onChange={(e) => updateItem(index, 'price', e.target.value)}
                            bg="white"
                            borderColor="gray.200"
                          />
                        </Field.Root>

                        <Button
                          size="sm"
                          colorPalette="red"
                          variant="ghost"
                          onClick={() => removeItem(index)}
                          disabled={formData.items.length === 1}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </HStack>
                    ))}
                  </VStack>
                </Box>

                <HStack gap={3} align="start" flexWrap="wrap">
                  <Field.Root flex="1" minW="180px">
                    <Field.Label color="gray.700" fontWeight="600">
                      Paid Amount
                    </Field.Label>
                    <Input
                      type="number"
                      min={0}
                      value={formData.paidAmount}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, paidAmount: e.target.value }))
                      }
                      bg="white"
                      borderColor="gray.200"
                    />
                  </Field.Root>

                  <Field.Root flex="2" minW="220px">
                    <Field.Label color="gray.700" fontWeight="600">
                      Note
                    </Field.Label>
                    <Input
                      value={formData.note}
                      onChange={(e) => setFormData((prev) => ({ ...prev, note: e.target.value }))}
                      placeholder="Optional note"
                      bg="white"
                      borderColor="gray.200"
                    />
                  </Field.Root>
                </HStack>

                <HStack justify="space-between" p={3} borderRadius="12px" bg="gray.50">
                  <Text fontSize="sm" fontWeight="600" color="gray.700">
                    Total: INR {totals.totalAmount.toFixed(2)}
                  </Text>
                  <Text
                    fontSize="sm"
                    fontWeight="700"
                    color={totals.dueAmount > 0 ? 'orange.600' : 'green.600'}
                  >
                    Due: INR {totals.dueAmount.toFixed(2)}
                  </Text>
                </HStack>
              </VStack>
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
                width="50%"
                bg="gray.950"
                color="white"
                _hover={{ bg: 'gray.800' }}
                loading={createPurchase.isPending}
                onClick={handleSubmit}
              >
                Create Purchase
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
