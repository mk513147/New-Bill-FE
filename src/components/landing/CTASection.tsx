import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react'

export function CTASection() {
  return (
    <Box py={{ base: 16, md: 20 }}>
      <Container maxW="6xl" textAlign="center">
        <Heading size={{ base: 'lg', md: 'xl' }} mb={4}>
          Take Control of Your Inventory
        </Heading>

        <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600" mb={6}>
          Stop guessing. Start managing everything with EBill.
        </Text>

        <Stack align="center">
          <Button size="lg" colorScheme="purple" width={{ base: '100%', sm: 'auto' }}>
            Start Free
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}
