import { HStack, Text, Box } from '@chakra-ui/react'
import { Card } from '../Card'

export function TopSellingItems() {
  return (
    <Card>
      <HStack justify="space-between" mb={3}>
        <Text fontWeight="600">Top Selling Items</Text>
        <Text fontSize="sm" color="gray.500">
          This Month
        </Text>
      </HStack>

      <HStack gap={4} overflowX="auto">
        {['Coffee Table', 'Storage Cabinet', 'Queen Size Bed', 'Sofa', 'Patio Dining Set'].map(
          (item) => (
            <Box minW="150px" border="1px solid" borderColor="gray.300" borderRadius="md" p={2}>
              <Box h="48px" bg="gray.100" borderRadius="sm" mb={2} />

              <Text fontSize="sm" fontWeight="500">
                {item}
              </Text>

              <Text fontSize="sm" fontWeight="600">
                40 Ltr
              </Text>

              <Text fontSize="xs" color="green.500">
                ▲ 40%
              </Text>
            </Box>
          ),
        )}
      </HStack>
    </Card>
  )
}
