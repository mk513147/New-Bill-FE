import { Box, Container, Heading, SimpleGrid, Text } from '@chakra-ui/react'

export function HowItWorks() {
  return (
    <Box bg="gray.50" py={{ base: 14, md: 20 }}>
      <Container maxW="6xl">
        <Heading size={{ base: 'lg', md: 'xl' }} mb={10} textAlign="center">
          How EBill Works
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
          <Box textAlign={{ base: 'center', md: 'left' }}>
            <Heading size="md">1. Add Inventory</Heading>
            <Text color="gray.600">Set up products and suppliers in minutes.</Text>
          </Box>

          <Box textAlign={{ base: 'center', md: 'left' }}>
            <Heading size="md">2. Track Transactions</Heading>
            <Text color="gray.600">Sales and purchases auto-update stock.</Text>
          </Box>

          <Box textAlign={{ base: 'center', md: 'left' }}>
            <Heading size="md">3. Monitor & Grow</Heading>
            <Text color="gray.600">Analyze reports and optimize decisions.</Text>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
