import { Box, Grid, Text, VStack, Link, HStack } from '@chakra-ui/react'

export function DashBoardFooter() {
  return (
    <Box mt={10} bg="white" borderTop="1px solid" borderColor="gray.200" px={10} py={8}>
      <Grid templateColumns="2fr 1fr 1fr 1fr" gap={8}>
        <Box>
          <Text fontWeight="600" mb={2}>
            Manage your inventory on the go!
          </Text>
          <Text fontSize="sm" color="gray.600" mb={3}>
            Experience the ease of managing your inventory with the mobile app.
          </Text>

          <HStack gap={4}>
            <Box w="120px" h="240px" bg="gray.100" borderRadius="md" />
            <Box w="120px" h="120px" bg="gray.200" borderRadius="md" />
          </HStack>
        </Box>

        <VStack align="start" gap={2} colorPalette={'blue'}>
          <Text fontWeight="600">OTHER APPS</Text>
          <Link fontSize="sm" color="gray.700">
            Accounting Software
          </Link>
          <Link fontSize="sm">Ecommerce Software</Link>
          <Link fontSize="sm">Subscription Billing</Link>
        </VStack>

        <VStack align="start" gap={2} colorPalette={'blue'}>
          <Text fontWeight="600" color="gray.700">
            HELP & SUPPORT
          </Text>
          <Link fontSize="sm">Contact Support</Link>
          <Link fontSize="sm">Help Docs</Link>
          <Link fontSize="sm">FAQ</Link>
        </VStack>

        <VStack align="start" gap={2} colorPalette={'blue'}>
          <Text fontWeight="600" color="gray.700">
            QUICK LINKS
          </Text>
          <Link fontSize="sm">Getting Started</Link>
          <Link fontSize="sm">Mobile Apps</Link>
          <Link fontSize="sm">What’s New</Link>
        </VStack>
      </Grid>

      <Box mt={6} textAlign="center">
        <Text fontSize="xs" color="gray.700">
          © 2025 EBILL. All Rights Reserved.
        </Text>
      </Box>
    </Box>
  )
}
