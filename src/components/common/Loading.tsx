import { Box, Center, Spinner, VStack, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

const Loading = () => {
  const { isLoading, loadingMessage } = useSelector((state: any) => state.ui)

  if (!isLoading) return null
  return (
    <>
      <Box pos="absolute" inset="0" bg="bg/80" zIndex={10000}>
        <Center h="full">
          <VStack colorPalette="teal">
            <Spinner color="colorPalette.600" />
            <Text color="colorPalette.600">{loadingMessage || 'Loading....'}</Text>
          </VStack>
        </Center>
      </Box>
    </>
  )
}

export default Loading
