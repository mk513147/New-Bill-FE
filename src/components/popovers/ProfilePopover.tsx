import { Box, Text, HStack, VStack, Avatar, Separator, Button, Portal } from '@chakra-ui/react'
import { Popover } from '@chakra-ui/react'
import { LogOut, X } from 'lucide-react'
import { useProfile } from '@/hooks/useProfile'
import { useDispatch } from 'react-redux'
import { API } from '@/api/api'
import API_ENDPOINTS from '@/api/apiEndpoints'
import { resetProfile } from '@/redux/slices/profileSlice'
import { setLoading, clearLoading } from '@/redux/slices/uiSlice'

export const ProfilePopover = ({ trigger }: { trigger: React.ReactNode }) => {
  const { data } = useProfile()
  const dispatch = useDispatch()

  const profile = data

  console.log('profile data', profile)

  const handleLogout = async () => {
    dispatch(setLoading({ loading: true, message: 'Logging out...' }))
    try {
      const res = await API.post(API_ENDPOINTS.AUTH.LOGOUT)

      if (res.status !== 200) {
        throw new Error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      dispatch(clearLoading())
    }

    localStorage.clear()
    dispatch(resetProfile())
  }

  return (
    <Popover.Root positioning={{ placement: 'bottom-end', strategy: 'fixed' }}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>

      <Portal>
        <Popover.Positioner>
          <Popover.Content
            w="360px"
            p={4}
            bg="white"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="lg"
            boxShadow="sm"
            zIndex={2000}
          >
            <HStack justify="space-between" align="start">
              <HStack gap={3}>
                <Avatar.Root size="md">
                  <Avatar.Fallback>{profile?.firstName?.[0] ?? 'U'}</Avatar.Fallback>
                </Avatar.Root>

                <Box>
                  <Text fontWeight="semibold">
                    {profile?.firstName} {profile?.lastName}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {profile?.emailId}
                  </Text>
                </Box>
              </HStack>

              <Popover.CloseTrigger asChild>
                <Button variant="solid" colorPalette={'red'} size="sm">
                  <X size={14} />
                </Button>
              </Popover.CloseTrigger>
            </HStack>

            <Separator my={4} />
            <VStack gap={2} align={'start'}>
              <HStack gap={2}>
                <Text fontSize="sm" color="gray.800">
                  User ID:
                </Text>
                <Text>{profile?._id}</Text>
              </HStack>
              <HStack gap={2}>
                <Text fontSize="sm" color="gray.800">
                  Contact:
                </Text>
                <Text>{profile?.mobileNumber}</Text>
              </HStack>
              <HStack gap={2}>
                <Text fontSize="sm" color="gray.800">
                  Shop Name:
                </Text>
                <Text>{profile?.shopName}</Text>
              </HStack>
              <HStack gap={2}>
                <Text fontSize="sm" color="gray.800">
                  Subscription Status:
                </Text>
                <Text>{profile?.subscriptionStatus}</Text>
              </HStack>
            </VStack>

            <Separator my={4} />

            <VStack align="stretch" gap={2}>
              <Button
                variant="plain"
                justifyContent="flex-start"
                color="gray.800"
                fontWeight="medium"
                _hover={{
                  bg: 'gray.50',
                }}
              >
                My Account
              </Button>
              <Button
                variant="plain"
                justifyContent="space-between"
                color="red.600"
                fontWeight="medium"
                _hover={{
                  bg: 'red.50',
                  color: 'red.700',
                }}
                onClick={handleLogout}
              >
                Sign Out
                <LogOut size={16} />
              </Button>
            </VStack>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
