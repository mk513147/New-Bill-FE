import { Card } from '../Card'
import { HStack, Text } from '@chakra-ui/react'
import { SimpleAreaChart } from '@/components/charts'

export function SalesOrderSummary() {
  return (
    <Card>
      <HStack justify="space-between" mb={3}>
        <Text fontWeight="600">Sales Order Summary</Text>
        <Text fontSize="sm" color="gray.500">
          This Month
        </Text>
      </HStack>

      <SimpleAreaChart />
    </Card>
  )
}
