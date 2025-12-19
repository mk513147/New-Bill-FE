import { Container, Stack, Text } from '@chakra-ui/react'

export function TrustBar() {
  return (
    <Container maxW="6xl" py={6}>
      <Stack
        direction="row"
        gap={6}
        justify="center"
        align="center"
        flexWrap="wrap"
        textAlign="center"
      >
        <Text color="gray.500">100+ Businesses</Text>
        <Text color="gray.500">Secure Cloud Sync</Text>
        <Text color="gray.500">Real-Time Inventory</Text>
      </Stack>
    </Container>
  )
}
