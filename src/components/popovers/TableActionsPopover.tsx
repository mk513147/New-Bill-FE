import { Button, HStack, Popover, Separator, Text, VStack } from '@chakra-ui/react'
import {
  MoreHorizontal,
  ArrowUp,
  ArrowUpDown,
  Upload,
  Download,
  Settings,
  RotateCcw,
  Columns,
  ChevronRight,
} from 'lucide-react'
import { useState } from 'react'

export type SortKey = 'name' | 'balance' | 'totalPurchases' | 'createdAt' | 'updatedAt'

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'balance', label: 'Balance' },
  { key: 'totalPurchases', label: 'Total Purchases' },
  { key: 'createdAt', label: 'Created Time' },
  { key: 'updatedAt', label: 'Last Modified Time' },
]

type Props = {
  sortBy?: SortKey
  sortOrder?: 'asc' | 'desc'
  onSortChange: (key: SortKey, order: 'asc' | 'desc') => void
  onImport: () => void
  onExport: () => void
  onRefresh?: () => void
}

export function TableActionsPopover({
  sortBy,
  sortOrder,
  onSortChange,
  onImport,
  onExport,
  onRefresh,
}: Props) {
  const [sortOpen, setSortOpen] = useState(false)

  return (
    <Popover.Root positioning={{ placement: 'bottom-end', offset: { mainAxis: 8 } }}>
      <Popover.Trigger asChild>
        <Button variant="solid" size="sm" px="2">
          <MoreHorizontal size={18} />
        </Button>
      </Popover.Trigger>

      <Popover.Positioner>
        <Popover.Content w="260px" bg="white" borderRadius="lg" boxShadow="sm" p="2">
          <VStack align="stretch" gap="1">
            {/* SORT BY */}
            <Popover.Root
              open={sortOpen}
              onOpenChange={(e) => setSortOpen(e.open)}
              positioning={{ placement: 'left-start', offset: { mainAxis: 8 } }}
            >
              <Popover.Trigger asChild>
                <HStack
                  px="3"
                  py="2"
                  borderRadius="md"
                  cursor="pointer"
                  bg={sortOpen ? 'gray.100' : 'transparent'}
                  _hover={{ bg: 'gray.100' }}
                  onMouseEnter={() => setSortOpen(true)}
                  onMouseLeave={() => setSortOpen(false)}
                >
                  <ArrowUpDown size={16} />
                  <Text fontSize="sm">Sort by</Text>
                  <ChevronRight size={14} style={{ marginLeft: 'auto' }} />
                </HStack>
              </Popover.Trigger>

              <Popover.Positioner>
                <Popover.Content
                  w="220px"
                  bg="white"
                  borderRadius="lg"
                  boxShadow="sm"
                  p="2"
                  onMouseEnter={() => setSortOpen(true)}
                  onMouseLeave={() => setSortOpen(false)}
                >
                  <VStack align="stretch" gap="1">
                    {SORT_OPTIONS.map((item) => {
                      const active = sortBy === item.key

                      return (
                        <HStack
                          key={item.key}
                          px="3"
                          py="2"
                          borderRadius="md"
                          cursor="pointer"
                          bg={active ? 'blue.500' : 'transparent'}
                          color={active ? 'white' : 'gray.800'}
                          _hover={{
                            bg: active ? 'blue.500' : 'gray.100',
                          }}
                          onClick={() => {
                            const nextOrder =
                              sortBy === item.key && sortOrder === 'asc' ? 'desc' : 'asc'

                            onSortChange(item.key, nextOrder)
                            setSortOpen(false)
                          }}
                        >
                          <Text fontSize="sm">{item.label}</Text>

                          {active &&
                            (sortOrder === 'asc' ? (
                              <ArrowUp size={14} style={{ marginLeft: 'auto' }} />
                            ) : (
                              <ArrowUp
                                size={14}
                                style={{
                                  marginLeft: 'auto',
                                  transform: 'rotate(180deg)',
                                }}
                              />
                            ))}
                        </HStack>
                      )
                    })}
                  </VStack>
                </Popover.Content>
              </Popover.Positioner>
            </Popover.Root>

            <Separator my="1" />

            <ActionItem icon={Upload} label="Import" onClick={onImport} />
            <ActionItem icon={Download} label="Export" onClick={onExport} />
            <ActionItem icon={Settings} label="Preferences" />
            <ActionItem icon={RotateCcw} label="Refresh List" onClick={onRefresh} />
            <ActionItem icon={Columns} label="Reset Column Width" />
          </VStack>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}

function ActionItem({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ElementType
  label: string
  onClick?: () => void
}) {
  return (
    <HStack
      px="3"
      py="2"
      borderRadius="md"
      cursor="pointer"
      _hover={{ bg: 'gray.100' }}
      onClick={onClick}
    >
      <Icon size={16} />
      <Text fontSize="sm">{label}</Text>
    </HStack>
  )
}
