import { Box, Flex, Text, IconButton, HStack, Separator, Avatar } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { Plus, Bell, Settings } from 'lucide-react'
import { ProfilePopover } from '@/components/popovers/ProfilePopover'
import { NotificationsPopover } from '@/components/popovers/NotificationsPopover'

export const Header = () => {
  const { title } = useSelector((state: any) => state.header)

  if (!title) return null

  return (
    <Box
      h="56px"
      px={6}
      bg="white"
      borderBottomWidth="1px"
      borderColor="gray.200"
      position="sticky"
      top={0}
      zIndex={999}
    >
      <Flex h="100%" align="center" justify="space-between">
        <Text
          fontSize={{ base: 'xl', md: '2xl' }}
          fontWeight="700"
          color="gray.900"
          lineHeight="1.2"
          letterSpacing="-0.02em"
        >
          {title}
        </Text>

        <HStack gap={3}>
          <Separator orientation="vertical" h="24px" />

          <IconButton
            aria-label="Add"
            colorPalette="blue"
            variant="solid"
            p="6px"
            minW="unset"
            minH="unset"
            w="32px"
            h="32px"
          >
            <Plus size={18} />
          </IconButton>

          <NotificationsPopover
            trigger={
              <IconButton
                aria-label="Notifications"
                color="gray.800"
                _hover={{ bg: 'gray.100', color: 'gray.900' }}
              >
                <Bell size={18} />
              </IconButton>
            }
          />

          <IconButton
            aria-label="Settings"
            variant="ghost"
            color="gray.800"
            _hover={{ bg: 'gray.100', color: 'gray.900' }}
          >
            <Settings size={18} />
          </IconButton>

          <ProfilePopover
            trigger={
              <Box as="span">
                <Avatar.Root size="sm" cursor="pointer">
                  <Avatar.Fallback>U</Avatar.Fallback>
                </Avatar.Root>
              </Box>
            }
          />
        </HStack>
      </Flex>
    </Box>
  )
}
