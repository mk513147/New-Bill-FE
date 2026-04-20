import { Avatar, Box, Flex, HStack, Text, Stack, VStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { ProfilePopover } from '@/components/popovers/ProfilePopover'
import type { RootState } from '@/redux/store'
import { useProfile } from '@/hooks/useProfile'

export const Header = () => {
  const { title, subtitle } = useSelector((state: RootState) => state.header)
  const { data: profile } = useProfile()

  const shopName = profile?.shopName || 'Ebill Workspace'
  const userName = [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') || 'Operator'

  if (!title) return null

  return (
    <Box
      px={{ base: 4, md: 6 }}
      py={{ base: 1.5, md: 2 }}
      bg="rgba(255,250,245,0.72)"
      backdropFilter="blur(18px)"
      borderBottomWidth="1px"
      borderColor="whiteAlpha.800"
      position="sticky"
      top={0}
      zIndex={999}
      css={{
        '@media print': {
          display: 'none',
        },
      }}
    >
      <Box
        position="relative"
        overflow="hidden"
        borderRadius={{ base: '20px', md: '22px' }}
        border="1px solid rgba(255,255,255,0.9)"
        bg="linear-gradient(135deg, rgba(255,255,255,0.86) 0%, rgba(255,247,237,0.92) 45%, rgba(240,253,250,0.88) 100%)"
        boxShadow="0 14px 36px rgba(15,23,42,0.06)"
      >
        <Box
          position="absolute"
          inset="0"
          bg="radial-gradient(circle at top right, rgba(249,115,22,0.16), transparent 28%), radial-gradient(circle at bottom left, rgba(20,184,166,0.12), transparent 24%)"
          pointerEvents="none"
        />

        <Flex
          position="relative"
          align={{ base: 'start', lg: 'center' }}
          justify="space-between"
          direction={{ base: 'column', lg: 'row' }}
          gap={{ base: 2.5, lg: 3 }}
          px={{ base: 3.5, md: 4 }}
          py={{ base: 2.5, md: 2.5 }}
        >
          <Stack gap={1.5} flex="1" minW={0}>
            <Box>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                fontWeight="900"
                color="gray.950"
                lineHeight="1"
                letterSpacing="-0.05em"
              >
                {title}
              </Text>
              <Text mt={0.5} fontSize="xs" color="gray.600" maxW="720px" noOfLines={1}>
                {subtitle || `Operational view for ${userName}.`}
              </Text>
            </Box>
          </Stack>

          <VStack align={{ base: 'stretch', lg: 'end' }} gap={1.5} w={{ base: '100%', lg: 'auto' }}>
            <ProfilePopover
              trigger={
                <Box as="span">
                  <HStack
                    gap={2}
                    p={0.75}
                    pl={{ base: 0.75, md: 1.25 }}
                    borderRadius="999px"
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    boxShadow="0 8px 20px rgba(15,23,42,0.06)"
                    cursor="pointer"
                  >
                    <Avatar.Root size="sm" borderWidth="2px" borderColor="orange.100">
                      <Avatar.Fallback>{profile?.firstName?.[0] ?? 'U'}</Avatar.Fallback>
                    </Avatar.Root>
                  </HStack>
                </Box>
              }
            />
          </VStack>
        </Flex>
      </Box>
    </Box>
  )
}
