import { Dialog, Portal, Button, CloseButton, Text, HStack } from '@chakra-ui/react'

interface ConfirmDeleteDialogProps {
  open: boolean
  onClose: () => void

  title?: string
  description?: string

  confirmText?: string
  cancelText?: string

  loading?: boolean
  onConfirm: () => void
}

export default function ConfirmDeleteDialog({
  open,
  onClose,

  title = 'Delete',
  description = 'Are you sure you want to delete this item? This action cannot be undone.',

  confirmText = 'Delete',
  cancelText = 'Cancel',

  loading = false,
  onConfirm,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => !e.open && onClose()}
      role="alertdialog"
      placement="center"
      preventScroll
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="white" rounded="lg" shadow="lg" p={4} maxW="420px" width="100%">
            {/* HEADER */}
            <Dialog.Header display="flex" justifyContent="space-between">
              <Dialog.Title fontSize="xl" fontWeight="700">
                {title}
              </Dialog.Title>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>

            {/* BODY */}
            <Dialog.Body>
              <Text fontSize="md" color="gray.700">
                {description}
              </Text>
            </Dialog.Body>

            {/* FOOTER */}
            <Dialog.Footer>
              <HStack w="100%" justifyContent="flex-end">
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">{cancelText}</Button>
                </Dialog.ActionTrigger>

                <Button colorPalette="red" loading={loading} onClick={onConfirm}>
                  {confirmText}
                </Button>
              </HStack>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
