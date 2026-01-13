import { Box, Text, VStack, HStack, Portal } from '@chakra-ui/react'
import { Popover } from '@chakra-ui/react'
import { UserPlus, Package, FileText, Tags, Layers, Receipt } from 'lucide-react'

type AddAction = {
  label: string
  icon: React.ReactNode
  onClick: () => void
}

export const AddPopover = ({ trigger }: { trigger: React.ReactNode }) => {
  const actions: AddAction[] = [
    { label: 'Customer', icon: <UserPlus size={16} />, onClick: () => {} },
    { label: 'Product', icon: <Package size={16} />, onClick: () => {} },
    { label: 'Invoice', icon: <FileText size={16} />, onClick: () => {} },
    { label: 'Category', icon: <Tags size={16} />, onClick: () => {} },
    { label: 'Stock', icon: <Layers size={16} />, onClick: () => {} },
    { label: 'Bill', icon: <Receipt size={16} />, onClick: () => {} },
  ]

  return (
    <Popover.Root positioning={{ placement: 'bottom-end', strategy: 'fixed' }}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>

      <Portal>
        <Popover.Positioner>
          <Popover.Content
            w="220px"
            bg="white"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="lg"
            shadow="lightGray"
            p={2}
          >
            <VStack align="stretch" gap={1}>
              {actions.map((action) => (
                <HStack
                  key={action.label}
                  px={3}
                  py={2}
                  borderRadius="md"
                  cursor="pointer"
                  _hover={{ bg: 'gray.50' }}
                  onClick={action.onClick}
                >
                  <Box color="gray.600">{action.icon}</Box>
                  <Text fontSize="sm" fontWeight="500" color="gray.800">
                    {action.label}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
