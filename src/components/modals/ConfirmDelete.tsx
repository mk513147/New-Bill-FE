import { Dialog, Portal, Button, Text, HStack } from '@chakra-ui/react'
import { X } from 'lucide-react'

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
                <Button
                  size="sm"
                  variant="ghost"
                  color="gray.500"
                  _hover={{
                    bg: 'gray.100',
                    color: 'gray.700',
                  }}
                >
                  <X size={16} />
                </Button>
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
              <HStack w="100%" justifyContent="flex-end" gap={3}>
                <Dialog.ActionTrigger asChild>
                  <Button
                    px={5}
                    py={2}
                    fontSize="sm"
                    fontWeight="500"
                    borderRadius="md"
                    bg="gray.100"
                    color="gray.700"
                    _hover={{ bg: 'gray.200' }}
                    _active={{ bg: 'gray.300' }}
                  >
                    {cancelText}
                  </Button>
                </Dialog.ActionTrigger>

                <Button
                  px={5}
                  py={2}
                  fontSize="sm"
                  fontWeight="600"
                  borderRadius="md"
                  bg="red.500"
                  color="white"
                  loading={loading}
                  onClick={onConfirm}
                  _hover={{ bg: 'red.600' }}
                  _active={{ bg: 'red.700' }}
                  _disabled={{ bg: 'red.300', cursor: 'not-allowed' }}
                >
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
