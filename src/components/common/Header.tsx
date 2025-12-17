import { Box, Flex, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

export const Header = () => {
  const { title, subtitle } = useSelector((state: any) => state.header)

  if (!title) return null

  return (
    <Box
      h="64px"
      px={6}
      borderBottom="1px solid"
      borderColor="gray.200"
      bg="white"
      position="sticky"
      top={0}
      zIndex={999}
    >
      <Flex h="100%" direction="column" justify="center">
        <Text fontSize="xl" fontWeight="bold">
          {title}
        </Text>
        {subtitle && (
          <Text fontSize="sm" color="gray.500">
            {subtitle}
          </Text>
        )}
      </Flex>
    </Box>
  )
}
