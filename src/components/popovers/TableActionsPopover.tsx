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

type SortKey = 'name' | 'company' | 'receivables' | 'unusedCredits' | 'createdAt' | 'updatedAt'

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'company', label: 'Company Name' },
  { key: 'receivables', label: 'Receivables' },
  { key: 'unusedCredits', label: 'Unused Credits' },
  { key: 'createdAt', label: 'Created Time' },
  { key: 'updatedAt', label: 'Last Modified Time' },
]

export function TableActionsPopover() {
  const [sortOpen, setSortOpen] = useState(false)
  const [activeSort, setActiveSort] = useState<SortKey>('name')

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
            {/* SORT BY (HOVER TRIGGER) */}
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

              {/* IMPORTANT: NO PORTAL HERE */}
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
                      const active = item.key === activeSort

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
                            setActiveSort(item.key)
                            setSortOpen(false)
                          }}
                        >
                          <Text fontSize="sm">{item.label}</Text>
                          {active && <ArrowUp size={14} style={{ marginLeft: 'auto' }} />}
                        </HStack>
                      )
                    })}
                  </VStack>
                </Popover.Content>
              </Popover.Positioner>
            </Popover.Root>

            <Separator my="1" />

            {/* OTHER ACTIONS */}
            <ActionItem icon={Upload} label="Import" />
            <ActionItem icon={Download} label="Export" />
            <ActionItem icon={Settings} label="Preferences" />
            <ActionItem icon={RotateCcw} label="Refresh List" />
            <ActionItem icon={Columns} label="Reset Column Width" />
          </VStack>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}

function ActionItem({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <HStack px="3" py="2" borderRadius="md" cursor="pointer" _hover={{ bg: 'gray.100' }}>
      <Icon size={16} />
      <Text fontSize="sm">{label}</Text>
    </HStack>
  )
}
