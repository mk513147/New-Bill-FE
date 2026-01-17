import { useEffect, useState } from 'react'
import { Dialog, Portal, Button, Input, Field, useMediaQuery } from '@chakra-ui/react'
import { X } from 'lucide-react'

export interface BillFormValues {
  billNumber: string
  supplierName: string
  amount: string
}

interface BillDialogProps {
  open: boolean
  onClose: () => void
  mode: 'add' | 'edit'
  defaultValues?: BillFormValues
}

export default function BillModal({ open, onClose, mode, defaultValues }: BillDialogProps) {
  const [formData, setFormData] = useState<BillFormValues>({
    billNumber: '',
    supplierName: '',
    amount: '',
  })

  useEffect(() => {
    if (defaultValues) setFormData(defaultValues)
    else {
      setFormData({
        billNumber: '',
        supplierName: '',
        amount: '',
      })
    }
  }, [defaultValues, mode])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit() {
    onClose()
  }

  const [isLarge] = useMediaQuery(['(min-width: 540px)'])

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(d) => !d.open && onClose()}
      preventScroll
      size={isLarge ? 'lg' : 'full'}
      placement={isLarge ? 'center' : 'bottom'}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="white" rounded="lg" shadow="lg" p={4} width="100%" maxW="600px">
            <Dialog.Header px={1}>
              <Dialog.Title fontSize="2xl" fontWeight="700">
                {mode === 'add' ? 'Add Bill' : 'Edit Bill'}
              </Dialog.Title>

              <Dialog.CloseTrigger asChild>
                <Button size="xs" variant="ghost" p={1} minW="auto">
                  <X size={14} />
                </Button>
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body pt={4}>
              <Field.Root mb={3}>
                <Field.Label>Bill Number</Field.Label>
                <Input name="billNumber" value={formData.billNumber} onChange={handleChange} />
              </Field.Root>

              <Field.Root mb={3}>
                <Field.Label>Supplier Name</Field.Label>
                <Input name="supplierName" value={formData.supplierName} onChange={handleChange} />
              </Field.Root>

              <Field.Root>
                <Field.Label>Amount</Field.Label>
                <Input name="amount" value={formData.amount} onChange={handleChange} />
              </Field.Root>
            </Dialog.Body>

            <Dialog.Footer gap={3} justifyContent="flex-end">
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" width="50%">
                  Cancel
                </Button>
              </Dialog.ActionTrigger>

              <Button bg="#6730EC" color="white" width="50%" onClick={handleSubmit}>
                {mode === 'add' ? 'Add Bill' : 'Save Changes'}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
