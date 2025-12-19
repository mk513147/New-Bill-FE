import { Container, Heading, SimpleGrid, Text } from '@chakra-ui/react'
const audience: string[] = [
  'Retail Shop Owners',
  'Wholesale Distributors',
  'Small Warehouses',
  'Manufacturing Units',
  'Pharmacies',
  'Grocery & Kirana Stores',
  'Startups & MSMEs',
  'Service Businesses',
]

export function AudienceSection() {
  return (
    <Container maxW="6xl" py={{ base: 14, md: 20 }}>
      <Heading size={{ base: 'lg', md: 'xl' }} mb={8} textAlign="center">
        Built For
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={4}>
        {audience.map((item) => (
          <Text key={item} fontWeight="medium" textAlign="center">
            {item}
          </Text>
        ))}
      </SimpleGrid>
    </Container>
  )
}
