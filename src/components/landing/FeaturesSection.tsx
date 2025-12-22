import { Box, Container, Heading, SimpleGrid, Text } from '@chakra-ui/react'

type Feature = {
  title: string
  desc: string
}

const features: Feature[] = [
  {
    title: 'Real-Time Inventory Tracking',
    desc: 'Always know what is in stock with automatic quantity updates.',
  },
  {
    title: 'Smart Billing',
    desc: 'Create invoices quickly with tax, discounts, and totals handled automatically.',
  },
  {
    title: 'Supplier Management',
    desc: 'Maintain supplier records, purchases, and outstanding payments.',
  },
  {
    title: 'Customer Ledger',
    desc: 'Track customer balances, payments, and credit history.',
  },
  {
    title: 'Reports & Analytics',
    desc: 'View sales, profit, and stock reports to make better decisions.',
  },
  {
    title: 'Secure Role-Based Access',
    desc: 'Control who can view, edit, or manage critical business data.',
  },
]

export function FeaturesSection() {
  return (
    <Box py={{ base: 14, md: 20 }}>
      <Container maxW="6xl">
        <Heading size={{ base: 'lg', md: 'xl' }} mb={10} textAlign={{ base: 'center', md: 'left' }}>
          Everything You Need
        </Heading>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={6}>
          {features.map((f) => (
            <Box key={f.title} p={6} borderWidth="1px" rounded="xl" bg="white">
              <Heading size="md" mb={2}>
                {f.title}
              </Heading>
              <Text fontSize="sm" color="gray.600">
                {f.desc}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
