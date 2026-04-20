import { API } from '@/api/api'
import API_ENDPOINTS from '@/api/apiEndpoints'
import { ToasterUtil } from '@/components/common/ToasterUtil'
import { useProfile } from '@/hooks/useProfile'
import { useAuth } from '@/hooks/useAuth'
import {
  clearSubscriptionInactive,
  isInactiveSubscriptionStatus,
  SUBSCRIPTION_INACTIVE_MESSAGE,
} from '@/utils/subscriptionAccess'
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Separator,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import {
  ArrowRight,
  BadgeIndianRupee,
  CheckCircle2,
  Clock3,
  LogOut,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type PlanKey = 'weekly' | 'monthly'

const plans: Array<{
  key: PlanKey
  title: string
  price: string
  period: string
  accent: string
  highlight?: string
  summary: string
  features: string[]
}> = [
  {
    key: 'weekly',
    title: 'Weekly rescue',
    price: '200',
    period: 'per week',
    accent: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
    summary: 'Best when you need to reopen operations immediately.',
    features: ['Full app access', 'Live billing and stock APIs', 'Continue without data loss'],
  },
  {
    key: 'monthly',
    title: 'Monthly saver',
    price: '900',
    period: 'per month',
    accent: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
    highlight: 'Best value',
    summary: 'Lower effective weekly cost for a store that runs daily.',
    features: ['Priority continuity', 'Lower cost than weekly renewal', 'Best for active shops'],
  },
]

const Subscription = () => {
  const navigate = useNavigate()
  const toast = ToasterUtil()
  const { logout } = useAuth()
  const { data, refetch, isRefetching } = useProfile()
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>('monthly')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handlePlanCheckout = async (plan: PlanKey) => {
    setSelectedPlan(plan)
    setIsSubmitting(true)

    try {
      const response = await API.post(API_ENDPOINTS.AUTH.SUBSCRIPTION, {
        plan,
        billingCycle: plan,
        amount: plan === 'weekly' ? 200 : 900,
        currency: 'INR',
      })

      const checkoutUrl =
        response?.data?.data?.checkoutUrl ||
        response?.data?.data?.paymentUrl ||
        response?.data?.data?.url ||
        response?.data?.checkoutUrl ||
        response?.data?.paymentUrl ||
        response?.data?.url

      if (checkoutUrl && typeof checkoutUrl === 'string') {
        window.location.href = checkoutUrl
        return
      }

      toast(
        response?.data?.message ||
          'Subscription request created. Complete payment to unlock access.',
        'success',
      )
    } catch (error: any) {
      const message = error?.response?.data?.message

      if (message && message !== SUBSCRIPTION_INACTIVE_MESSAGE) {
        toast(message, 'error')
      } else {
        toast('Unable to start the subscription checkout right now.', 'error')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRefreshAccess = async () => {
    const result = await refetch()
    const nextStatus = result.data?.subscriptionStatus

    if (!isInactiveSubscriptionStatus(nextStatus)) {
      clearSubscriptionInactive()
      toast('Subscription activated. Redirecting to dashboard.', 'success')
      navigate('/dashboard', { replace: true })
      return
    }

    toast('Subscription is still inactive. Complete payment and try again.', 'warning')
  }

  const handleLoginToAnotherAccount = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      toast('Logged out successfully. Redirecting to login.', 'success')
      navigate('/login', { replace: true })
    } catch (error: any) {
      toast('Failed to logout. Please try again.', 'error')
      setIsLoggingOut(false)
    }
  }

  return (
    <Box
      minH="100vh"
      position="relative"
      overflow="hidden"
      bg="linear-gradient(180deg, #fff7ed 0%, #fffbeb 40%, #f8fafc 100%)"
    >
      <Box
        position="absolute"
        top="-120px"
        right="-80px"
        w="360px"
        h="360px"
        borderRadius="full"
        bg="rgba(249,115,22,0.18)"
        filter="blur(28px)"
      />
      <Box
        position="absolute"
        bottom="-140px"
        left="-90px"
        w="340px"
        h="340px"
        borderRadius="full"
        bg="rgba(20,184,166,0.18)"
        filter="blur(32px)"
      />

      <Flex minH="100vh" px={{ base: 5, md: 10 }} py={{ base: 8, md: 10 }} position="relative">
        <Grid
          templateColumns={{ base: '1fr', xl: '1.1fr 0.9fr' }}
          gap={8}
          w="full"
          alignItems="stretch"
        >
          <GridItem>
            <Box
              h="full"
              bg="rgba(15,23,42,0.94)"
              color="white"
              borderRadius="32px"
              px={{ base: 6, md: 10 }}
              py={{ base: 7, md: 10 }}
              boxShadow="0 30px 80px rgba(15,23,42,0.18)"
              position="relative"
              overflow="hidden"
            >
              <Box
                position="absolute"
                inset="0"
                bg="radial-gradient(circle at top right, rgba(251,146,60,0.22), transparent 32%), radial-gradient(circle at bottom left, rgba(45,212,191,0.18), transparent 28%)"
              />

              <VStack align="start" gap={6} position="relative">
                <Badge
                  borderRadius="full"
                  px={3}
                  py={1}
                  bg="whiteAlpha.200"
                  color="orange.200"
                  fontWeight="700"
                  letterSpacing="0.04em"
                >
                  Subscription Required
                </Badge>

                <VStack align="start" gap={3} maxW="680px">
                  <Heading
                    fontSize={{ base: '4xl', md: '6xl' }}
                    lineHeight="0.95"
                    letterSpacing="-0.04em"
                  >
                    Keep billing, inventory, and customer history live.
                  </Heading>
                  <Text fontSize={{ base: 'md', md: 'lg' }} color="whiteAlpha.800" maxW="620px">
                    Your workspace is authenticated, but feature access is locked because the
                    subscription is inactive. Renew a plan to reopen the full product without losing
                    store data.
                  </Text>
                </VStack>

                <HStack wrap="wrap" gap={3}>
                  <HStack bg="whiteAlpha.100" px={4} py={2} borderRadius="full">
                    <ShieldCheck size={16} />
                    <Text fontSize="sm">Secure account still active</Text>
                  </HStack>
                  <HStack bg="whiteAlpha.100" px={4} py={2} borderRadius="full">
                    <Clock3 size={16} />
                    <Text fontSize="sm">Access restores after payment confirmation</Text>
                  </HStack>
                </HStack>

                <Grid
                  templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
                  gap={4}
                  w="full"
                  mt={2}
                >
                  <Box bg="whiteAlpha.100" borderRadius="24px" p={5}>
                    <Text color="whiteAlpha.700" fontSize="sm" mb={2}>
                      Workspace
                    </Text>
                    <Text fontSize="2xl" fontWeight="700">
                      {data?.shopName || 'Ebill Store'}
                    </Text>
                  </Box>

                  <Box bg="whiteAlpha.100" borderRadius="24px" p={5}>
                    <Text color="whiteAlpha.700" fontSize="sm" mb={2}>
                      Current status
                    </Text>
                    <Badge colorPalette="orange" fontSize="sm" px={3} py={1} borderRadius="full">
                      {(data?.subscriptionStatus || 'Inactive').toString()}
                    </Badge>
                  </Box>

                  <Box bg="whiteAlpha.100" borderRadius="24px" p={5}>
                    <Text color="whiteAlpha.700" fontSize="sm" mb={2}>
                      Support
                    </Text>
                    <Text fontSize="lg" fontWeight="700">
                      Fast reactivation
                    </Text>
                  </Box>
                </Grid>

                <Box w="full" bg="whiteAlpha.100" borderRadius="28px" p={{ base: 5, md: 6 }}>
                  <HStack justify="space-between" align="start" mb={4}>
                    <Box>
                      <Text
                        color="orange.200"
                        textTransform="uppercase"
                        fontSize="xs"
                        letterSpacing="0.12em"
                      >
                        Why you are seeing this
                      </Text>
                      <Heading size="md" mt={2}>
                        Access is intentionally locked before business data mutates.
                      </Heading>
                    </Box>
                    <Sparkles size={20} />
                  </HStack>

                  <Stack gap={3}>
                    {[
                      'Sales, stock, invoice, and customer APIs are blocked until the plan is active.',
                      'Login, account identity, and renewal actions remain available so recovery is safe.',
                      'Once payment is confirmed, you can refresh access and continue from the same account.',
                    ].map((item) => (
                      <HStack key={item} align="start" gap={3}>
                        <CheckCircle2 size={18} color="#fdba74" style={{ marginTop: 2 }} />
                        <Text color="whiteAlpha.850">{item}</Text>
                      </HStack>
                    ))}
                  </Stack>
                </Box>
              </VStack>
            </Box>
          </GridItem>

          <GridItem>
            <Box
              h="full"
              bg="rgba(255,255,255,0.84)"
              backdropFilter="blur(24px)"
              borderRadius="32px"
              px={{ base: 5, md: 7 }}
              py={{ base: 6, md: 7 }}
              border="1px solid rgba(255,255,255,0.7)"
              boxShadow="0 24px 60px rgba(15,23,42,0.10)"
            >
              <VStack align="stretch" gap={5}>
                <Box>
                  <Text
                    textTransform="uppercase"
                    fontSize="xs"
                    letterSpacing="0.14em"
                    color="orange.600"
                    fontWeight="700"
                  >
                    Choose a plan
                  </Text>
                  <Heading fontSize={{ base: '3xl', md: '4xl' }} color="gray.900" mt={2}>
                    Restart access in one step.
                  </Heading>
                  <Text color="gray.600" mt={2}>
                    Pick the billing cycle that fits your store. Monthly is the better operating
                    cost.
                  </Text>
                </Box>

                <VStack align="stretch" gap={4}>
                  {plans.map((plan) => {
                    const isSelected = selectedPlan === plan.key

                    return (
                      <Box
                        key={plan.key}
                        borderRadius="28px"
                        p={5}
                        bg={isSelected ? 'gray.950' : 'white'}
                        color={isSelected ? 'white' : 'gray.900'}
                        borderWidth="1px"
                        borderColor={isSelected ? 'transparent' : 'orange.100'}
                        boxShadow={
                          isSelected
                            ? '0 18px 50px rgba(15,23,42,0.18)'
                            : '0 10px 30px rgba(15,23,42,0.05)'
                        }
                        transition="all 0.2s ease"
                      >
                        <HStack justify="space-between" align="start" mb={4}>
                          <VStack align="start" gap={1}>
                            <HStack>
                              <Text fontSize="xl" fontWeight="700">
                                {plan.title}
                              </Text>
                              {plan.highlight ? (
                                <Badge borderRadius="full" colorPalette="teal" px={2.5} py={1}>
                                  {plan.highlight}
                                </Badge>
                              ) : null}
                            </HStack>
                            <Text color={isSelected ? 'whiteAlpha.800' : 'gray.600'}>
                              {plan.summary}
                            </Text>
                          </VStack>

                          <Box px={3} py={2} borderRadius="20px" bg={plan.accent} color="white">
                            <HStack gap={1} align="end">
                              <BadgeIndianRupee size={18} />
                              <Text fontSize="3xl" fontWeight="800" lineHeight="1">
                                {plan.price}
                              </Text>
                            </HStack>
                            <Text fontSize="xs" mt={1}>
                              {plan.period}
                            </Text>
                          </Box>
                        </HStack>

                        <Stack gap={2} mb={5}>
                          {plan.features.map((feature) => (
                            <HStack key={feature} gap={3} align="start">
                              <CheckCircle2
                                size={16}
                                color={isSelected ? '#34d399' : '#f97316'}
                                style={{ marginTop: 2 }}
                              />
                              <Text color={isSelected ? 'whiteAlpha.900' : 'gray.700'}>
                                {feature}
                              </Text>
                            </HStack>
                          ))}
                        </Stack>

                        <Button
                          w="full"
                          size="lg"
                          bg={isSelected ? 'white' : 'gray.950'}
                          color={isSelected ? 'gray.950' : 'white'}
                          _hover={{ opacity: 0.92 }}
                          onClick={() => handlePlanCheckout(plan.key)}
                          loading={isSubmitting && selectedPlan === plan.key}
                        >
                          Continue with {plan.title}
                          <ArrowRight size={16} />
                        </Button>
                      </Box>
                    )
                  })}
                </VStack>

                <Separator />

                <Box borderRadius="24px" bg="orange.50" p={4}>
                  <HStack
                    justify="space-between"
                    align={{ base: 'start', md: 'center' }}
                    flexWrap="wrap"
                    gap={3}
                  >
                    <Box>
                      <Text fontWeight="700" color="gray.900">
                        Already paid?
                      </Text>
                      <Text color="gray.600" fontSize="sm">
                        Refresh your access after confirmation and we will reopen the app if the
                        plan is active.
                      </Text>
                    </Box>
                    <Button
                      variant="outline"
                      colorPalette="orange"
                      onClick={handleRefreshAccess}
                      loading={isRefetching}
                    >
                      I have renewed
                    </Button>
                  </HStack>
                </Box>

                <Separator />

                <Box borderRadius="24px" bg="blue.50" p={4}>
                  <HStack
                    justify="space-between"
                    align={{ base: 'start', md: 'center' }}
                    flexWrap="wrap"
                    gap={3}
                  >
                    <Box>
                      <Text fontWeight="700" color="gray.900">
                        Don't have a subscription?
                      </Text>
                      <Text color="gray.600" fontSize="sm">
                        Sign in with another account that has an active subscription.
                      </Text>
                    </Box>
                    <Button
                      variant="outline"
                      colorPalette="blue"
                      onClick={handleLoginToAnotherAccount}
                      loading={isLoggingOut}
                    >
                      <LogOut size={16} />
                      Login to another account
                    </Button>
                  </HStack>
                </Box>
              </VStack>
            </Box>
          </GridItem>
        </Grid>
      </Flex>
    </Box>
  )
}

export default Subscription
