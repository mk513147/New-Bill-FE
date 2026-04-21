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
  Tabs,
} from '@chakra-ui/react'
import { createListCollection } from '@chakra-ui/react'
import { Plus, Trash2, X } from 'lucide-react'

import { useCustomers } from '@/hooks/useCustomer'
import { useProducts } from '@/hooks/useProducts'
import { useSaleActions } from '@/hooks/useSaleActions'
import { DateInputWithIcon } from '@/components/common/DateInputWithIcon'

type SaleFormItem = {
  productId: string
  quantity: string
  price: string
  discount: string
}

export interface SaleFormValues {
  customerId?: string
  customerName?: string
  invoiceNumber?: string
  saleDate?: string
  paidAmount?: string
  note?: string
  items: SaleFormItem[]
}

interface SaleModalProps {
  open: boolean
  onClose: () => void
}

const getTodayDate = () => {
  const now = new Date()
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
  return now.toISOString().slice(0, 10)
}

export default function SaleModal({ open, onClose }: SaleModalProps) {
  const [customerMode, setCustomerMode] = useState<'registered' | 'walkin'>('registered')
  const [formData, setFormData] = useState<SaleFormValues>({
    customerId: '',
    customerName: '',
    invoiceNumber: '',
    saleDate: '',
    paidAmount: '0',
    note: '',
    items: [{ productId: '', quantity: '1', price: '0', discount: '0' }],
  })

  const { data: customerData } = useCustomers({ page: 1, limit: 200 })
  const { data: productData } = useProducts({ page: 1, limit: 200 })
  const { createSale } = useSaleActions()

  const customers = customerData?.customers ?? []
  const products = productData?.products ?? []

  const customerCollection = useMemo(
    () =>
      createListCollection({
        items: customers.map((c: any) => ({
          label: `${c.name} (${c.mobileNumber})`,
          value: c._id,
        })),
      }),
    [customers],
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

  const productById = useMemo(
    () =>
      products.reduce<Record<string, any>>((acc, product) => {
        if (product?._id) acc[product._id] = product
        return acc
      }, {}),
    [products],
  )

  useEffect(() => {
    if (!open) return
    setCustomerMode('registered')
    setFormData({
      customerId: '',
      customerName: '',
      invoiceNumber: '',
      saleDate: getTodayDate(),
      paidAmount: '0',
      note: '',
      items: [{ productId: '', quantity: '1', price: '0', discount: '0' }],
    })
  }, [open])

  const totals = useMemo(() => {
    const summary = formData.items.reduce(
      (acc, item) => {
        const qty = Number(item.quantity || 0)
        const price = Number(item.price || 0)
        const discount = Number(item.discount || 0)

        const safeQty = Number.isFinite(qty) && qty > 0 ? qty : 0
        const safePrice = Number.isFinite(price) && price > 0 ? price : 0
        const safeDiscount = Number.isFinite(discount) && discount > 0 ? discount : 0
        const baseAmount = Math.max(0, safePrice - safeDiscount) * safeQty

        const product = productById[item.productId]
        const gstPercentage = Number(product?.gstPercentage || 0)
        const isGstInclusive = !!product?.gstInclusive
        const gstAmount =
          !isGstInclusive && gstPercentage > 0 ? (baseAmount * gstPercentage) / 100 : 0

        acc.subtotal += baseAmount
        acc.totalGst += gstAmount
        return acc
      },
      { subtotal: 0, totalGst: 0 },
    )

    const totalAmount = summary.subtotal + summary.totalGst
    const paidAmount = Number(formData.paidAmount || 0)
    const dueAmount = totalAmount - (Number.isFinite(paidAmount) ? paidAmount : 0)

    return {
      subtotal: summary.subtotal,
      totalGst: summary.totalGst,
      totalAmount,
      dueAmount,
    }
  }, [formData.items, formData.paidAmount, productById])

  function updateItem(index: number, key: keyof SaleFormItem, value: string) {
    setFormData((prev) => {
      const items = [...prev.items]
      items[index] = { ...items[index], [key]: value }
      return { ...prev, items }
    })
  }

  function addItem() {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { productId: '', quantity: '1', price: '0', discount: '0' }],
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
      ...(customerMode === 'registered' && formData.customerId
        ? { customerId: formData.customerId }
        : { customerName: formData.customerName?.trim() || 'Walk-in Customer' }),
      invoiceNumber: formData.invoiceNumber?.trim() || undefined,
      saleDate: formData.saleDate || undefined,
      paidAmount: Number(formData.paidAmount || 0),
      note: formData.note?.trim() || '',
      items: formData.items
        .filter((item) => item.productId && Number(item.quantity) > 0)
        .map((item) => ({
          productId: item.productId,
          quantity: Number(item.quantity),
          price: Number(item.price || 0),
          discount: Number(item.discount || 0),
        })),
    }

    createSale.mutate(payload, { onSuccess: onClose })
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
            maxW="860px"
            w="100%"
            maxH="90vh"
            border="1px solid"
            borderColor="gray.100"
          >
            <Dialog.Header px={1}>
              <Dialog.Title fontSize="xl" fontWeight="800" color="gray.900" letterSpacing="-0.02em">
                New Sale
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
                {/* Customer */}
                <Box border="1px solid" borderColor="gray.200" borderRadius="14px" p={3} bg="white">
                  <Text fontSize="sm" fontWeight="700" color="gray.800" mb={3}>
                    Customer
                  </Text>
                  <Tabs.Root
                    value={customerMode}
                    onValueChange={(d) => setCustomerMode(d.value as 'registered' | 'walkin')}
                    variant="enclosed"
                    size="sm"
                    mb={3}
                  >
                    <Tabs.List>
                      <Tabs.Trigger value="registered">Registered</Tabs.Trigger>
                      <Tabs.Trigger value="walkin">Walk-in</Tabs.Trigger>
                    </Tabs.List>
                  </Tabs.Root>

                  {customerMode === 'registered' ? (
                    <Select.Root
                      collection={customerCollection}
                      value={formData.customerId ? [formData.customerId] : []}
                      onValueChange={(details) =>
                        setFormData((prev) => ({ ...prev, customerId: details.value[0] || '' }))
                      }
                      positioning={{ strategy: 'fixed', hideWhenDetached: true }}
                    >
                      <Select.HiddenSelect />
                      <Select.Control>
                        <Select.Trigger>
                          <Select.ValueText placeholder="Select customer" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Select.Positioner>
                        <Select.Content bg="white">
                          {customerCollection.items.map((item) => (
                            <Select.Item item={item} key={item.value}>
                              {item.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Select.Root>
                  ) : (
                    <Input
                      value={formData.customerName}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, customerName: e.target.value }))
                      }
                      placeholder="Customer name (or leave blank for Walk-in)"
                      bg="white"
                      borderColor="gray.200"
                    />
                  )}
                </Box>

                {/* Invoice info */}
                <HStack gap={3} align="start" flexWrap="wrap">
                  <Field.Root flex="1" minW="180px">
                    <Field.Label color="gray.700" fontWeight="600">
                      Invoice Number
                    </Field.Label>
                    <Input
                      value={formData.invoiceNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, invoiceNumber: e.target.value }))
                      }
                      placeholder="Auto-generated if empty"
                      bg="white"
                      borderColor="gray.200"
                    />
                  </Field.Root>

                  <Field.Root flex="1" minW="180px">
                    <Field.Label color="gray.700" fontWeight="600">
                      Sale Date
                    </Field.Label>
                    <DateInputWithIcon
                      name="saleDate"
                      value={formData.saleDate || getTodayDate()}
                      onChange={(value) => setFormData((prev) => ({ ...prev, saleDate: value }))}
                    />
                  </Field.Root>
                </HStack>

                {/* Items */}
                <Box border="1px solid" borderColor="gray.200" borderRadius="14px" p={3} bg="white">
                  <HStack justify="space-between" mb={3}>
                    <Text fontSize="sm" fontWeight="700" color="gray.800">
                      Sale Items
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
                        <Field.Root flex="2" minW="200px">
                          <Field.Label fontSize="xs" color="gray.600">
                            Product
                          </Field.Label>
                          <Select.Root
                            collection={productCollection}
                            value={item.productId ? [item.productId] : []}
                            onValueChange={(details) => {
                              const selectedProductId = details.value[0] || ''
                              updateItem(index, 'productId', selectedProductId)

                              // Auto-fill price from product's sellingPrice
                              if (selectedProductId) {
                                const product = products.find(
                                  (p: any) => p._id === selectedProductId,
                                )
                                if (product) {
                                  updateItem(index, 'price', String(product.sellingPrice || 0))
                                }
                              }
                            }}
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

                        <Field.Root minW="90px">
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

                        <Field.Root minW="110px">
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

                        <Field.Root minW="110px">
                          <Field.Label fontSize="xs" color="gray.600">
                            Discount
                          </Field.Label>
                          <Input
                            type="number"
                            min={0}
                            value={item.discount}
                            onChange={(e) => updateItem(index, 'discount', e.target.value)}
                            bg="white"
                            borderColor="gray.200"
                          />
                        </Field.Root>

                        <Box minW="120px" pb={1}>
                          <Text fontSize="xs" color="gray.600" mb={1}>
                            GST
                          </Text>
                          <Text fontSize="sm" color="gray.800" fontWeight="600">
                            ₹
                            {(() => {
                              const product = productById[item.productId]
                              const gstPercentage = Number(product?.gstPercentage || 0)
                              const isGstInclusive = !!product?.gstInclusive
                              const qty = Number(item.quantity || 0)
                              const price = Number(item.price || 0)
                              const discount = Number(item.discount || 0)
                              const baseAmount = Math.max(0, price - discount) * Math.max(0, qty)
                              const gstAmount =
                                !isGstInclusive && gstPercentage > 0
                                  ? (baseAmount * gstPercentage) / 100
                                  : 0
                              return gstAmount.toFixed(2)
                            })()}
                          </Text>
                        </Box>

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

                {/* Payment + Note */}
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

                {/* Totals */}
                <VStack align="stretch" gap={1} p={3} borderRadius="12px" bg="gray.50">
                  <HStack justify="space-between">
                    <Text fontSize="sm" fontWeight="600" color="gray.700">
                      Subtotal: ₹{totals.subtotal.toFixed(2)}
                    </Text>
                    <Text fontSize="sm" fontWeight="600" color="gray.700">
                      GST: ₹{totals.totalGst.toFixed(2)}
                    </Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="sm" fontWeight="700" color="gray.900">
                      Total: ₹{totals.totalAmount.toFixed(2)}
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight="700"
                      color={
                        totals.dueAmount > 0
                          ? 'orange.600'
                          : totals.dueAmount < 0
                            ? 'blue.600'
                            : 'green.600'
                      }
                    >
                      {totals.dueAmount < 0 ? 'Advance' : 'Due'}: ₹
                      {Math.abs(totals.dueAmount).toFixed(2)}
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </Dialog.Body>

            <Dialog.Footer gap={3} justifyContent="flex-end">
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" width="50%" color="gray.700" borderColor="gray.300">
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button
                width="50%"
                bg="gray.950"
                color="white"
                loading={createSale.isPending}
                onClick={handleSubmit}
              >
                Create Sale
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
