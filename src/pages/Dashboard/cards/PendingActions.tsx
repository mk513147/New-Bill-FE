import { Box, Text, VStack, HStack, Tabs, Separator } from '@chakra-ui/react'
import { ShoppingCart, Package, Archive, ChevronRight } from 'lucide-react'
import { Card } from '../Card'

type Item = {
  label: string
  value: string | number
}

function Section({ icon, title, items }: { icon: React.ReactNode; title: string; items: Item[] }) {
  return (
    <Box>
      {/* Section header */}
      <HStack gap={2} mb={1}>
        {icon}
        <Text fontSize="xs" fontWeight="600" letterSpacing="0.04em" color="gray.800">
          {title}
        </Text>
      </HStack>

      <Separator my={2} borderColor="gray.200" css={{ '--divider-border-width': '1px' }} />

      {/* Rows */}
      <VStack gap={2} align="stretch">
        {items.map((item) => (
          <HStack key={item.label} justify="space-between" align="center" py={1}>
            <HStack gap={2}>
              <ChevronRight size={14} color="#94A3B8" />
              <Text fontSize="sm" color="gray.700">
                {item.label}
              </Text>
            </HStack>

            <Text fontSize="sm" fontWeight="600" color="gray.800">
              {item.value}
            </Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  )
}

export function PendingActions() {
  return (
    <Card>
      {/* 🔑 Fixed-height container */}
      <Box h="520px" display="flex" flexDirection="column">
        <Tabs.Root
          defaultValue="pending"
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* Tabs */}
          <Tabs.List bg="gray.100" borderRadius="md" p={1} mb={3}>
            <Tabs.Trigger
              value="pending"
              fontSize="sm"
              px={3}
              py={1}
              borderRadius="sm"
              color="gray.600"
              _selected={{
                bg: 'white',
                color: 'gray.900',
                fontWeight: '600',
              }}
            >
              Pending Actions
            </Tabs.Trigger>

            <Tabs.Trigger
              value="recent"
              fontSize="sm"
              px={3}
              py={1}
              borderRadius="sm"
              color="gray.600"
              _selected={{
                bg: 'white',
                color: 'gray.900',
                fontWeight: '600',
              }}
            >
              Recent Activities
            </Tabs.Trigger>
          </Tabs.List>

          {/* 🔑 Scrollable content */}
          <Tabs.Content value="pending" style={{ flex: 1, overflow: 'hidden' }}>
            <Box
              flex="1"
              overflowY="auto"
              pr={2}
              css={{
                '&::-webkit-scrollbar': { width: '4px' },
                '&::-webkit-scrollbar-thumb': {
                  background: '#CBD5E0',
                  borderRadius: '4px',
                },
              }}
            >
              <VStack gap={4} align="stretch">
                <Section
                  title="SALES"
                  icon={<ShoppingCart size={16} color="#F97316" />}
                  items={[
                    { label: 'To Be Packed', value: '51.000' },
                    { label: 'To Be Shipped', value: '40.000' },
                    { label: 'To Be Delivered', value: '52.000' },
                    { label: 'To Be Invoiced', value: '97.000' },
                  ]}
                />

                <Section
                  title="PURCHASES"
                  icon={<Package size={16} color="#F97316" />}
                  items={[
                    { label: 'To Be Received', value: '62.00' },
                    { label: 'Receive In Progress', value: 0 },
                  ]}
                />

                <Section
                  title="INVENTORY"
                  icon={<Archive size={16} color="#F97316" />}
                  items={[
                    { label: 'Below Reorder Level', value: 0 },
                    { label: 'Unconfirmed Items', value: 0 },
                  ]}
                />
              </VStack>
            </Box>
          </Tabs.Content>

          {/* Recent tab */}
          <Tabs.Content value="recent">
            <Text fontSize="sm" color="gray.500">
              No recent activities
            </Text>
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Card>
  )
}
