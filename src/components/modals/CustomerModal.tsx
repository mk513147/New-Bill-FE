import { useEffect, useState } from 'react'
import { Dialog, Portal, Button, Input, Field, CloseButton, useMediaQuery } from '@chakra-ui/react'
import { useCustomerActions } from '@/hooks/useCustomerActions'

export interface CustomerFormValues {
  name: string
  mobileNumber: string
  email?: string
  address?: string
  balance?: string
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
    address: '',
    balance: '',
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
        address: '',
        balance: '',
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

  const [isLarge] = useMediaQuery(['(min-width: 540px)'])

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => {
        if (!details.open) onClose()
      }}
      preventScroll
      size={isLarge ? 'lg' : 'full'}
      placement={isLarge ? 'center' : 'bottom'} //
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

              <Field.Root flex={1}>
                <Field.Label>Balance</Field.Label>
                <Input
                  name="balance"
                  value={formData.balance}
                  onChange={handleChange}
                  placeholder="Enter Balance"
                />
              </Field.Root>

              <Field.Root flex={1}>
                <Field.Label>Address</Field.Label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter Address"
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
