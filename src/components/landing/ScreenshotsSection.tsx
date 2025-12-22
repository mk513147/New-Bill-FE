import { Box, Container, Heading, Text } from '@chakra-ui/react'

export function ScreenshotsSection() {
  return (
    <Box bg="gray.50" py={20}>
      <Container maxW="6xl">
        <Heading mb={4}>Product Preview</Heading>
        <Text color="gray.600">Dashboard, inventory, and reports preview coming here.</Text>
      </Container>
    </Box>
  )
}
