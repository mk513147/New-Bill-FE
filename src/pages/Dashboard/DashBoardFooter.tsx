import { Box, Grid, Text, VStack, HStack } from '@chakra-ui/react'
import { ArrowRight, LifeBuoy, ShieldCheck, Smartphone } from 'lucide-react'

export function DashBoardFooter() {
  return (
    <Box
      mt={8}
      bg="rgba(255,255,255,0.8)"
      backdropFilter="blur(16px)"
      border="1px solid rgba(255,255,255,0.75)"
      borderRadius="30px"
      px={{ base: 5, md: 8 }}
      py={{ base: 6, md: 8 }}
      boxShadow="0 18px 50px rgba(15,23,42,0.06)"
    >
      <Grid templateColumns={{ base: '1fr', lg: '1.4fr 1fr 1fr 1fr' }} gap={8}>
        <Box>
          <Text fontWeight="700" fontSize="xl" color="gray.900" mb={2}>
            Run the store from one command center.
          </Text>
          <Text fontSize="sm" color="gray.600" mb={5} maxW="420px">
            Sales, stock, purchases, and due tracking are now visible in one responsive dashboard.
            Use this view as the daily operating cockpit.
          </Text>

          <HStack gap={3} align="stretch">
            <Box p={4} borderRadius="22px" bg="orange.50" minW="140px">
              <Smartphone size={18} color="#ea580c" />
              <Text mt={3} fontWeight="700" color="gray.900">
                Responsive first
              </Text>
              <Text mt={1} fontSize="sm" color="gray.600">
                Works across phones, tablets, and large dashboards.
              </Text>
            </Box>
            <Box p={4} borderRadius="22px" bg="teal.50" minW="140px">
              <ShieldCheck size={18} color="#0f766e" />
              <Text mt={3} fontWeight="700" color="gray.900">
                Safer ops
              </Text>
              <Text mt={1} fontSize="sm" color="gray.600">
                Subscription and auth state stay controlled centrally.
              </Text>
            </Box>
          </HStack>
        </Box>

        <VStack align="start" gap={2}>
          <Text fontWeight="700" color="gray.900">
            Operator focus
          </Text>
          <Text fontSize="sm" color="gray.600">
            Watch sales vs purchases daily.
          </Text>
          <Text fontSize="sm" color="gray.600">
            Track customer advances before dispatch.
          </Text>
          <Text fontSize="sm" color="gray.600">
            Spot stock pressure before billing stalls.
          </Text>
        </VStack>

        <VStack align="start" gap={2}>
          <Text fontWeight="700" color="gray.900">
            Support
          </Text>
          <HStack color="gray.600" fontSize="sm" align="start">
            <LifeBuoy size={15} />
            <Text>Need help interpreting a metric? Start with dues and stock value.</Text>
          </HStack>
          <HStack color="gray.600" fontSize="sm" align="start">
            <ArrowRight size={15} />
            <Text>Use the dashboard refresh when new sales or purchases are entered.</Text>
          </HStack>
        </VStack>

        <VStack align="start" gap={2}>
          <Text fontWeight="700" color="gray.900">
            Health notes
          </Text>
          <Text fontSize="sm" color="gray.600">
            Negative profit means invested capital is still higher than realized revenue.
          </Text>
          <Text fontSize="sm" color="gray.600">
            Advance-heavy customers can offset short-term collection pressure.
          </Text>
        </VStack>
      </Grid>

      <Box mt={6} textAlign="center">
        <Text fontSize="xs" color="gray.500">
          © 2026 EBILL. Live operational dashboard.
        </Text>
      </Box>
    </Box>
  )
}
