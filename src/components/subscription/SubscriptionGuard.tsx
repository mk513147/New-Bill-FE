import Loading from '@/components/common/Loading'
import { useProfile } from '@/hooks/useProfile'
import {
  clearSubscriptionInactive,
  isInactiveSubscriptionStatus,
  isSubscriptionLocked,
  SUBSCRIPTION_ROUTE,
} from '@/utils/subscriptionAccess'
import { Box, Center, Spinner, Text, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const SubscriptionGuard = () => {
  const location = useLocation()
  const { data, isLoading, isFetched } = useProfile()
  const subscriptionStatus = data?.subscriptionStatus
  const isInactive = isSubscriptionLocked(subscriptionStatus)

  useEffect(() => {
    if (isFetched && !isInactiveSubscriptionStatus(subscriptionStatus)) {
      clearSubscriptionInactive()
    }
  }, [isFetched, subscriptionStatus])

  if (isLoading) {
    return (
      <>
        <Loading />
        <Box minH="100vh" bg="gray.950">
          <Center minH="100vh">
            <VStack gap={3} color="whiteAlpha.900">
              <Spinner size="lg" color="orange.300" />
              <Text fontSize="sm">Checking your subscription access...</Text>
            </VStack>
          </Center>
        </Box>
      </>
    )
  }

  if (isInactive && location.pathname !== SUBSCRIPTION_ROUTE) {
    return <Navigate to={SUBSCRIPTION_ROUTE} replace state={{ from: location }} />
  }

  if (!isInactive && location.pathname === SUBSCRIPTION_ROUTE) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default SubscriptionGuard
