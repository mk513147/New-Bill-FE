import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react'

export function HeroSection() {
  return (
    <Box bg="gray.50" py={{ base: 14, md: 24 }}>
      <Container maxW="6xl">
        <Stack
          gap={6}
          align={{ base: 'center', md: 'flex-start' }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          <Heading size={{ base: 'xl', md: '2xl' }}>EBill</Heading>

          <Text fontSize={{ base: 'md', md: 'xl' }} color="gray.600" maxW="2xl">
            Smart inventory, billing, and business tracking — built for modern small businesses.
          </Text>

          <Stack
            direction={{ base: 'column', sm: 'row' }}
            gap={4}
            width={{ base: '100%', sm: 'auto' }}
          >
            <Button size="lg" colorScheme="purple" width={{ base: '100%', sm: 'auto' }}>
              Start Free
            </Button>
            <Button size="lg" variant="outline" width={{ base: '100%', sm: 'auto' }}>
              View Demo
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
