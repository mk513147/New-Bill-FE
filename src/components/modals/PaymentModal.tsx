import { useEffect, useMemo, useState } from 'react'
import {
  Dialog,
  Portal,
  Button,
  Input,
  Field,
  useMediaQuery,
  Select,
  Text,
  HStack,
  Box,
  Badge,
} from '@chakra-ui/react'
import { createListCollection } from '@chakra-ui/react'
import { X } from 'lucide-react'

import { useSupplier } from '@/hooks/useSupplier'
import { useCustomers } from '@/hooks/useCustomer'
import { usePaymentActions } from '@/hooks/usePaymentActions'

type PaymentType = 'supplier' | 'customer'
type PaymentMode = 'cash' | 'upi' | 'bank' | 'other'

interface PaymentModalProps {
  open: boolean
  onClose: () => void
  defaultType?: PaymentType
  defaultEntityId?: string
}

const paymentModes: PaymentMode[] = ['cash', 'upi', 'bank', 'other']

export default function PaymentModal({
  open,
  onClose,
  defaultType,
  defaultEntityId,
}: PaymentModalProps) {
  const [paidToType, setPaidToType] = useState<PaymentType>(defaultType ?? 'supplier')
  const [entityId, setEntityId] = useState<string>(defaultEntityId ?? '')
  const [amount, setAmount] = useState('')
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('cash')
  const [note, setNote] = useState('')

  const { data: suppliers = [] } = useSupplier()
  const { data: customerData } = useCustomers({ limit: 200 })
  const customers = customerData?.customers ?? customerData ?? []

  const { createPayment } = usePaymentActions()

  const [isLarge] = useMediaQuery(['(min-width: 540px)'])

  useEffect(() => {
    if (open) {
      setPaidToType(defaultType ?? 'supplier')
      setEntityId(defaultEntityId ?? '')
      setAmount('')
      setPaymentMode('cash')
      setNote('')
    }
  }, [open, defaultType, defaultEntityId])

  const typeCollection = useMemo(
    () =>
      createListCollection({
        items: [
          { label: 'Pay to Supplier', value: 'supplier' },
          { label: 'Receive from Customer', value: 'customer' },
        ],
      }),
    [],
  )

  const supplierCollection = useMemo(
    () =>
      createListCollection({
        items: suppliers.map((s) => ({
          label: `${s.name} — ₹${(s.pendingAmount ?? 0).toLocaleString('en-IN')} due`,
          value: s._id,
        })),
      }),
    [suppliers],
  )

  const customerCollection = useMemo(
    () =>
      createListCollection({
        items: (Array.isArray(customers) ? customers : []).map((c: any) => ({
          label: `${c.name} (${c.mobileNumber})`,
          value: c._id,
        })),
      }),
    [customers],
  )

  const modeCollection = useMemo(
    () =>
      createListCollection({
        items: paymentModes.map((m) => ({ label: m.toUpperCase(), value: m })),
      }),
    [],
  )

  const selectedSupplier = suppliers.find((s) => s._id === entityId)
  const selectedCustomer = Array.isArray(customers)
    ? (customers as any[]).find((c: any) => c._id === entityId)
    : null

  function handleSubmit() {
    const parsedAmount = Number(amount)
    if (!entityId || !parsedAmount) return

    const payload: any = {
      paidToType,
      amount: parsedAmount,
      paymentMode,
      note: note.trim(),
    }

    if (paidToType === 'supplier') payload.supplierId = entityId
    else payload.customerId = entityId

    createPayment.mutate(payload, { onSuccess: onClose })
  }

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
            maxW="520px"
            border="1px solid"
            borderColor="gray.100"
          >
            <Dialog.Header px={1}>
              <Dialog.Title fontSize="xl" fontWeight="800" color="gray.900" letterSpacing="-0.02em">
                Record Payment
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <Button
                  size="xs"
                  variant="ghost"
                  color="gray.400"
                  p={1}
                  minW="auto"
                  _hover={{ bg: 'transparent', color: 'gray.600' }}
                >
                  <X size={14} />
                </Button>
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body pt={4}>
              {/* Payment Type */}
              <Field.Root mb={3}>
                <Field.Label color="gray.700" fontWeight="600">
                  Payment Type
                </Field.Label>
                <Select.Root
                  collection={typeCollection}
                  value={[paidToType]}
                  onValueChange={(e) => {
                    setPaidToType(e.value[0] as PaymentType)
                    setEntityId('')
                  }}
                  positioning={{ strategy: 'fixed', hideWhenDetached: true }}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger bg="white" borderColor="gray.200">
                      <Select.ValueText placeholder="Select type" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Select.Positioner>
                    <Select.Content bg="white">
                      {typeCollection.items.map((item) => (
                        <Select.Item key={item.value} item={item}>
                          {item.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Select.Root>
              </Field.Root>

              {/* Entity selector */}
              <Field.Root mb={3}>
                <Field.Label color="gray.700" fontWeight="600">
                  {paidToType === 'supplier' ? 'Supplier' : 'Customer'}
                </Field.Label>
                {paidToType === 'supplier' ? (
                  <Select.Root
                    collection={supplierCollection}
                    value={entityId ? [entityId] : []}
                    onValueChange={(e) => setEntityId(e.value[0] ?? '')}
                    positioning={{ strategy: 'fixed', hideWhenDetached: true }}
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger bg="white" borderColor="gray.200">
                        <Select.ValueText placeholder="Select supplier" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Select.Positioner>
                      <Select.Content bg="white">
                        {supplierCollection.items.map((item) => (
                          <Select.Item key={item.value} item={item}>
                            {item.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Select.Root>
                ) : (
                  <Select.Root
                    collection={customerCollection}
                    value={entityId ? [entityId] : []}
                    onValueChange={(e) => setEntityId(e.value[0] ?? '')}
                    positioning={{ strategy: 'fixed', hideWhenDetached: true }}
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger bg="white" borderColor="gray.200">
                        <Select.ValueText placeholder="Select customer" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Select.Positioner>
                      <Select.Content bg="white">
                        {customerCollection.items.map((item) => (
                          <Select.Item key={item.value} item={item}>
                            {item.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Select.Root>
                )}
              </Field.Root>

              {/* Balance info */}
              {paidToType === 'supplier' && selectedSupplier && (
                <Box
                  mb={3}
                  px={3}
                  py={2}
                  bg="orange.50"
                  borderRadius="10px"
                  border="1px solid"
                  borderColor="orange.100"
                >
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">
                      Pending due to supplier
                    </Text>
                    <Badge colorPalette="orange" fontSize="sm">
                      ₹{(selectedSupplier.pendingAmount ?? 0).toLocaleString('en-IN')}
                    </Badge>
                  </HStack>
                </Box>
              )}

              {paidToType === 'customer' && selectedCustomer && (
                <Box
                  mb={3}
                  px={3}
                  py={2}
                  bg="blue.50"
                  borderRadius="10px"
                  border="1px solid"
                  borderColor="blue.100"
                >
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">
                      Customer balance
                    </Text>
                    <Badge colorPalette="blue" fontSize="sm">
                      ₹{(selectedCustomer.balance ?? 0).toLocaleString('en-IN')}
                    </Badge>
                  </HStack>
                </Box>
              )}

              {/* Amount */}
              <Field.Root mb={3}>
                <Field.Label color="gray.700" fontWeight="600">
                  Amount (₹)
                </Field.Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  bg="white"
                  borderColor="gray.200"
                  min={1}
                />
              </Field.Root>

              {/* Payment Mode */}
              <Field.Root mb={3}>
                <Field.Label color="gray.700" fontWeight="600">
                  Payment Mode
                </Field.Label>
                <Select.Root
                  collection={modeCollection}
                  value={[paymentMode]}
                  onValueChange={(e) => setPaymentMode(e.value[0] as PaymentMode)}
                  positioning={{ strategy: 'fixed', hideWhenDetached: true }}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger bg="white" borderColor="gray.200">
                      <Select.ValueText />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Select.Positioner>
                    <Select.Content bg="white">
                      {modeCollection.items.map((item) => (
                        <Select.Item key={item.value} item={item}>
                          {item.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Select.Root>
              </Field.Root>

              {/* Note */}
              <Field.Root>
                <Field.Label color="gray.700" fontWeight="600">
                  Note (optional)
                </Field.Label>
                <Input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note..."
                  bg="white"
                  borderColor="gray.200"
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
                width="50%"
                bg={paidToType === 'supplier' ? 'orange.500' : 'blue.600'}
                color="white"
                _hover={{ opacity: 0.9 }}
                loading={createPayment.isPending}
                onClick={handleSubmit}
                disabled={!entityId || !amount || Number(amount) <= 0}
              >
                {paidToType === 'supplier' ? 'Pay Supplier' : 'Record Receipt'}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
