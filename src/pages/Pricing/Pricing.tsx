import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Button,
  Badge,
  Spinner,
} from '@chakra-ui/react'
import { useSubscription } from '@/hooks/useSubscription'
import { useEffect, useState } from 'react'
import { API } from '@/api/api'
import API_ENDPOINTS from '@/api/apiEndpoints'
import { useNavigate } from 'react-router-dom'

const CheckIcon = () => (
  <Box
    as="span"
    bg="green.100"
    color="green.600"
    fontWeight="bold"
    fontSize="sm"
    display="inline-flex"
    alignItems="center"
    justifyContent="center"
    borderRadius="full"
    w="20px"
    h="20px"
  >
    ✓
  </Box>
)

interface PlanFeatures {
  exportImport: boolean
  advancedReports: boolean
  apiAccess: boolean
  prioritySupport: boolean
  customBranding: boolean
}

interface PlanLimits {
  maxProducts: number
  maxCustomers: number
  maxSuppliers: number
  maxStaff: number
  maxCategories: number
}

interface Plan {
  id: string
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
    currency: string
  }
  features: PlanFeatures
  limits: PlanLimits
  displayOrder: number
}

const PlanCard = ({ plan }: { plan: Plan }) => {
  const { subscription } = useSubscription()
  const isCurrentPlan = subscription?.currentPlan.id === plan.id

  const formatLimit = (value: number) => {
    return value === -1 ? 'Unlimited' : value.toString()
  }

  const formatPrice = (price: number) => {
    if (price === 0) return '₹0'
    return `₹${price}/mo`
  }

  const getBadge = () => {
    if (plan.id === 'premium') return { text: '⭐ Popular', color: 'purple' }
    if (plan.id === 'enterprise') return { text: '🏆 Best Value', color: 'orange' }
    if (plan.id === 'free_trial') return { text: '🎁 Trial', color: 'cyan' }
    return null
  }

  const badge = getBadge()

  const isPremiumOrEnterprise = plan.id === 'premium' || plan.id === 'enterprise'

  return (
    <Box
      borderWidth={isCurrentPlan ? '3px' : isPremiumOrEnterprise ? '2px' : '1px'}
      borderColor={isCurrentPlan ? 'blue.500' : isPremiumOrEnterprise ? 'purple.300' : 'gray.200'}
      borderRadius="2xl"
      p={6}
      pb={8}
      bg={isCurrentPlan ? 'blue.50' : 'white'}
      position="relative"
      transition="all 0.3s ease"
      transform={isPremiumOrEnterprise ? 'scale(1.02)' : 'scale(1)'}
      boxShadow={isPremiumOrEnterprise ? '2xl' : 'md'}
      _hover={{
        transform: 'translateY(-8px) scale(1.02)',
        shadow: '2xl',
        borderColor: isCurrentPlan ? 'blue.600' : 'purple.400',
      }}
    >
      {badge && (
        <Badge
          position="absolute"
          top="-12px"
          right="20px"
          colorScheme={badge.color}
          fontSize="xs"
          fontWeight="bold"
          px={4}
          py={2}
          borderRadius="full"
          textTransform="uppercase"
          letterSpacing="wider"
          boxShadow="md"
        >
          {badge.text}
        </Badge>
      )}

      {isCurrentPlan && (
        <Badge
          position="absolute"
          top="-12px"
          left="20px"
          colorScheme="blue"
          fontSize="xs"
          fontWeight="bold"
          px={4}
          py={2}
          borderRadius="full"
          textTransform="uppercase"
          letterSpacing="wider"
          boxShadow="md"
        >
          ✓ Active
        </Badge>
      )}

      <VStack align="start" gap={5} mt={badge || isCurrentPlan ? 6 : 2}>
        <VStack align="start" gap={2} w="full">
          <Heading size="xl" color={isPremiumOrEnterprise ? 'purple.600' : 'gray.800'}>
            {plan.name}
          </Heading>
          <HStack align="baseline">
            <Text fontSize="4xl" fontWeight="extrabold" color="blue.600">
              {formatPrice(plan.price.monthly)}
            </Text>
            {plan.price.monthly > 0 && (
              <Text fontSize="sm" color="gray.500">
                per month
              </Text>
            )}
          </HStack>
          <Text color="gray.600" fontSize="sm" minH="40px">
            {plan.description}
          </Text>
        </VStack>

        <Box w="full" pt={5} borderTopWidth="2px" borderColor="gray.100">
          <VStack align="start" gap={3} w="full">
            <HStack gap={2}>
              <Box w="4px" h="20px" bg="blue.500" borderRadius="full" />
              <Text fontWeight="bold" fontSize="sm" color="gray.700">
                RESOURCE LIMITS
              </Text>
            </HStack>
            <VStack align="start" gap={2.5} w="full" pl={3}>
              <HStack w="full" justify="space-between">
                <HStack gap={2}>
                  <CheckIcon />
                  <Text fontSize="sm" color="gray.700">
                    Products
                  </Text>
                </HStack>
                <Badge
                  colorScheme={plan.limits.maxProducts === -1 ? 'green' : 'gray'}
                  fontSize="xs"
                >
                  {formatLimit(plan.limits.maxProducts)}
                </Badge>
              </HStack>
              <HStack w="full" justify="space-between">
                <HStack gap={2}>
                  <CheckIcon />
                  <Text fontSize="sm" color="gray.700">
                    Customers
                  </Text>
                </HStack>
                <Badge
                  colorScheme={plan.limits.maxCustomers === -1 ? 'green' : 'gray'}
                  fontSize="xs"
                >
                  {formatLimit(plan.limits.maxCustomers)}
                </Badge>
              </HStack>
              <HStack w="full" justify="space-between">
                <HStack gap={2}>
                  <CheckIcon />
                  <Text fontSize="sm" color="gray.700">
                    Staff Members
                  </Text>
                </HStack>
                <Badge colorScheme={plan.limits.maxStaff === -1 ? 'green' : 'gray'} fontSize="xs">
                  {formatLimit(plan.limits.maxStaff)}
                </Badge>
              </HStack>
              <HStack w="full" justify="space-between">
                <HStack gap={2}>
                  <CheckIcon />
                  <Text fontSize="sm" color="gray.700">
                    Categories
                  </Text>
                </HStack>
                <Badge
                  colorScheme={plan.limits.maxCategories === -1 ? 'green' : 'gray'}
                  fontSize="xs"
                >
                  {formatLimit(plan.limits.maxCategories)}
                </Badge>
              </HStack>
              <HStack w="full" justify="space-between">
                <HStack gap={2}>
                  <CheckIcon />
                  <Text fontSize="sm" color="gray.700">
                    Suppliers
                  </Text>
                </HStack>
                <Badge
                  colorScheme={plan.limits.maxSuppliers === -1 ? 'green' : 'gray'}
                  fontSize="xs"
                >
                  {formatLimit(plan.limits.maxSuppliers)}
                </Badge>
              </HStack>
            </VStack>
          </VStack>

          <VStack align="start" gap={3} mt={5} w="full">
            <HStack gap={2}>
              <Box w="4px" h="20px" bg="purple.500" borderRadius="full" />
              <Text fontWeight="bold" fontSize="sm" color="gray.700">
                FEATURES INCLUDED
              </Text>
            </HStack>
            <VStack align="start" gap={2.5} w="full" pl={3}>
              {plan.features.exportImport && (
                <HStack gap={2}>
                  <CheckIcon />
                  <Text fontSize="sm" color="gray.700">
                    Export/Import Data
                  </Text>
                </HStack>
              )}
              {plan.features.advancedReports && (
                <HStack gap={2}>
                  <CheckIcon />
                  <Text fontSize="sm" color="gray.700">
                    Advanced Reports
                  </Text>
                </HStack>
              )}
              {plan.features.apiAccess && (
                <HStack gap={2}>
                  <CheckIcon />
                  <Text fontSize="sm" color="gray.700">
                    API Access
                  </Text>
                </HStack>
              )}
              {plan.features.prioritySupport && (
                <HStack gap={2}>
                  <CheckIcon />
                  <Text fontSize="sm" color="gray.700">
                    Priority Support
                  </Text>
                </HStack>
              )}
              {plan.features.customBranding && (
                <HStack gap={2}>
                  <CheckIcon />
                  <Text fontSize="sm" color="gray.700">
                    Custom Branding
                  </Text>
                </HStack>
              )}
            </VStack>
          </VStack>
        </Box>
      </VStack>
    </Box>
  )
}

const Pricing = () => {
  const { subscription } = useSubscription()
  const navigate = useNavigate()
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true)
        const response = await API.get(API_ENDPOINTS.SUBSCRIPTION.PLANS)
        if (response.status === 200) {
          const sortedPlans = response.data.data.sort(
            (a: Plan, b: Plan) => a.displayOrder - b.displayOrder,
          )
          setPlans(sortedPlans)
        }
      } catch (err: any) {
        console.error('Failed to fetch plans:', err)
        setError('Failed to load pricing plans. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])

  if (loading) {
    return (
      <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
        <VStack gap={4}>
          <Spinner size="xl" color="blue.500" />
          <Text color="gray.700" fontWeight="medium" fontSize="lg">
            Loading pricing plans...
          </Text>
        </VStack>
      </Box>
    )
  }

  if (error) {
    return (
      <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
        <VStack gap={4} bg="white" p={10} borderRadius="2xl" boxShadow="xl">
          <Text color="red.500" fontSize="lg" fontWeight="medium">
            {error}
          </Text>
          <Button
            colorScheme="blue"
            onClick={() => window.location.reload()}
            size="lg"
            _hover={{ transform: 'scale(1.05)' }}
          >
            🔄 Retry
          </Button>
        </VStack>
      </Box>
    )
  }

  return (
    <Box minH="100vh" bg="gray.50" position="relative" overflow="hidden">
      {/* Subtle decorative elements */}
      <Box
        position="absolute"
        top="-100px"
        right="-100px"
        w="400px"
        h="400px"
        bg="blue.50"
        borderRadius="full"
        opacity={0.5}
      />
      <Box
        position="absolute"
        bottom="-100px"
        left="-100px"
        w="350px"
        h="350px"
        bg="purple.50"
        borderRadius="full"
        opacity={0.5}
      />

      <Box position="relative" zIndex={1} py={16}>
        <Container maxW="7xl">
          {/* Back to Landing Button */}
          <Box mb={10} display="flex" justifyContent="center">
            <Button
              colorScheme="blue"
              size="md"
              px={8}
              borderRadius="full"
              fontWeight="600"
              onClick={() => navigate('/')}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s ease"
            >
              ← Go to Landing Page
            </Button>
          </Box>

          <VStack gap={4} mb={12}>
            <Badge
              colorScheme="blue"
              fontSize="sm"
              px={4}
              py={1}
              borderRadius="full"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              💎 Pricing Plans
            </Badge>
            <Heading size="2xl" textAlign="center" color="gray.800" fontWeight="bold">
              Simple, Transparent Pricing
            </Heading>

            <Text fontSize="md" textAlign="center" color="gray.600" maxW="600px">
              Upgrade anytime. No hidden charges. Choose a plan that scales with your business.
            </Text>

            {subscription && subscription.subscriptionStatus === 'expired' && (
              <Badge colorScheme="red" fontSize="md" px={6} py={3} borderRadius="xl" boxShadow="md">
                ⚠️ Your subscription has expired. Please contact admin to renew.
              </Badge>
            )}
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8} px={{ base: 4, md: 0 }}>
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </SimpleGrid>

          <Box
            mt={16}
            p={8}
            bg="white"
            borderRadius="2xl"
            textAlign="center"
            border="1px solid"
            borderColor="gray.200"
            boxShadow="xl"
          >
            <Heading size="lg" mb={3} color="gray.800">
              🎯 Need a Custom Plan?
            </Heading>
            <Text color="gray.600" mb={6} fontSize="md">
              Contact your administrator for enterprise solutions and custom pricing tailored to
              your needs.
            </Text>
            <Button
              colorScheme="blue"
              size="lg"
              borderRadius="xl"
              px={8}
              fontWeight="bold"
              _hover={{
                transform: 'scale(1.05)',
                boxShadow: '2xl',
              }}
              transition="all 0.3s"
            >
              📧 Contact Admin
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Pricing
