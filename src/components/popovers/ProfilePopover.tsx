import {
  Box,
  Text,
  HStack,
  VStack,
  Avatar,
  Separator,
  Button,
  Portal,
  Popover,
} from '@chakra-ui/react'
import { useProfile } from '@/hooks/useProfile'
import { useDispatch } from 'react-redux'
import { resetProfile } from '@/redux/slices/profileSlice'
import { setLoading, clearLoading } from '@/redux/slices/uiSlice'
import { logoutService } from '@/utils/utils'
import { useNavigate } from 'react-router-dom'

export const ProfilePopover = ({ trigger }: { trigger: React.ReactNode }) => {
  const { data } = useProfile()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const profile = data

  const handleLogout = async () => {
    dispatch(setLoading({ loading: true, message: 'Logging out...' }))
    try {
      await logoutService()
      dispatch(resetProfile())
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      dispatch(clearLoading())
    }
  }

  return (
    <Popover.Root positioning={{ placement: 'bottom-end', strategy: 'fixed' }}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>

      <Portal>
        <Popover.Positioner>
          <Popover.Content
            w="300px"
            bg="white"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="16px"
            shadow={'md'}
            overflow="hidden"
            p={0}
          >
            <Box p={4}>
              <HStack gap={3} align="start">
                <Avatar.Root size="md">
                  <Avatar.Fallback>{profile?.firstName?.[0] ?? 'U'}</Avatar.Fallback>
                </Avatar.Root>
                <Box flex="1">
                  <Text fontWeight="700" fontSize="sm">
                    {profile?.firstName} {profile?.lastName}
                  </Text>
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    {profile?.emailId}
                  </Text>
                </Box>
              </HStack>
            </Box>

            <Separator borderColor="gray.200" />

            <Box p={2}>
              <VStack align="stretch" gap={0}>
                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  fontSize="sm"
                  fontWeight="500"
                  color="gray.800"
                  h="36px"
                  px={3}
                  rounded="md"
                  onClick={() => navigate('/profile')}
                  _hover={{ bg: 'gray.100' }}
                >
                  My Account
                </Button>
                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  fontSize="sm"
                  fontWeight="500"
                  color="red.600"
                  h="36px"
                  px={3}
                  rounded="md"
                  _hover={{ bg: 'red.50' }}
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </VStack>
            </Box>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
