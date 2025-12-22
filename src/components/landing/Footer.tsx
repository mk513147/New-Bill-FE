import { Container, HStack, Text } from '@chakra-ui/react'

export function Footer() {
  return (
    <Container maxW="6xl" py={8}>
      <HStack justify="space-between">
        <Text fontWeight="bold">EBill</Text>
        <HStack gap={6} color="gray.500">
          <Text>Features</Text>
          <Text>Pricing</Text>
          <Text>Contact</Text>
        </HStack>
      </HStack>
    </Container>
  )
}
