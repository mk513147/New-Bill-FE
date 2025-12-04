import { useEffect, useState } from 'react'
import {
  Dialog,
  Portal,
  Button,
  Input,
  Field,
  HStack,
  NativeSelect,
  CloseButton,
} from '@chakra-ui/react'
import { useCustomerActions } from '@/hooks/useCustomerActions'

export interface CustomerFormValues {
  name: string
  mobileNumber: string
  email?: string
  state?: string
  pincode?: string
  address: string
}

interface CustomerDialogProps {
  open: boolean
  onClose: () => void
  mode: 'add' | 'edit'
  pubId?: string
  defaultValues?: CustomerFormValues
}

export default function CustomerDialog({
  open,
  onClose,
  mode,
  pubId,
  defaultValues,
}: CustomerDialogProps) {
  const [formData, setFormData] = useState<CustomerFormValues>({
    name: '',
    mobileNumber: '',
    email: '',
    state: '',
    pincode: '',
    address: '',
  })

  const { createCustomer, updateCustomer } = useCustomerActions(pubId ?? '')

  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues)
    } else {
      setFormData({
        name: '',
        mobileNumber: '',
        email: '',
        state: '',
        pincode: '',
        address: '',
      })
    }
  }, [defaultValues, mode])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit() {
    if (mode === 'add') {
      createCustomer.mutate(formData, {
        onSuccess: onClose,
      })
      return
    }

    updateCustomer.mutate(formData, {
      onSuccess: onClose,
    })
  }

  return (
    <Dialog.Root
      open={open}
      placement="center"
      onOpenChange={(details) => {
        if (!details.open) onClose()
      }}
      preventScroll
      size="lg"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="white" rounded="lg" shadow="lg" p={4} width="100%" maxW="600px">
            <Dialog.Header px={1}>
              <Dialog.Title fontSize="2xl" fontWeight="700" color="gray.800">
                {mode === 'add' ? 'Add New Customer' : 'Edit Customer'}
              </Dialog.Title>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body pt={4}>
              {/* Full Name */}
              <Field.Root mb={3}>
                <Field.Label>Full Name</Field.Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                />
              </Field.Root>

              {/* Phone */}
              <Field.Root mb={3}>
                <Field.Label>Phone Number</Field.Label>
                <Input
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="+1 955 000 0000"
                />
              </Field.Root>

              {/* Email */}
              <Field.Root mb={3}>
                <Field.Label>Email-ID</Field.Label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your Email-ID"
                />
              </Field.Root>

              {/* State + Pincode */}
              <HStack gap={4} mb={3}>
                <Field.Root flex={1}>
                  <Field.Label>State</Field.Label>

                  <NativeSelect.Root size="sm">
                    <NativeSelect.Field
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Select State"
                      aria-label="Select State"
                    >
                      <option value="">Select State</option>
                      <option value="MH">Maharashtra</option>
                      <option value="DL">Delhi</option>
                      <option value="UP">Uttar Pradesh</option>
                    </NativeSelect.Field>
                  </NativeSelect.Root>
                </Field.Root>

                <Field.Root flex={1}>
                  <Field.Label>Pincode</Field.Label>
                  <Input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter Pincode"
                  />
                </Field.Root>
              </HStack>

              {/* Address */}
              <Field.Root mb={3}>
                <Field.Label>Address</Field.Label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your Address"
                />
              </Field.Root>
            </Dialog.Body>

            <Dialog.Footer>
              <Button
                width="100%"
                bg="#6730EC"
                color="white"
                _hover={{ bg: '#5b29d8' }}
                loading={createCustomer.isPending || updateCustomer.isPending}
                onClick={handleSubmit}
              >
                {mode === 'add' ? 'Add Customer' : 'Save Changes'}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
