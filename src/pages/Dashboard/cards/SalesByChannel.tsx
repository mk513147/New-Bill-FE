import { Text, HStack } from '@chakra-ui/react'
import { Card } from '../Card'
import { SimpleBarChart } from '@/components/charts'

export function SalesByChannel() {
  return (
    <Card>
      <HStack justify="space-between" mb={3}>
        <Text fontWeight="600">Sales By Channel</Text>
        <Text fontSize="sm" color="gray.500">
          This Month
        </Text>
      </HStack>

      <Text fontSize="sm" color="gray.500">
        Total Sales
      </Text>
      <Text fontWeight="700" mb={3}>
        Rs. 2,779.16
      </Text>

      <SimpleBarChart />
    </Card>
  )
}
