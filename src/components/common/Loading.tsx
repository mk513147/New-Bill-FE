import { Box, Center, Spinner, VStack, Text } from '@chakra-ui/react'

const Loading = ({ text }: { text?: string }) => {
  return (
    <>
      <Box pos="absolute" inset="0" bg="bg/80" zIndex={1000}>
        <Center h="full">
          <VStack colorPalette="teal">
            <Spinner color="colorPalette.600" />
            <Text color="colorPalette.600">{text || 'Loading....'}</Text>
          </VStack>
        </Center>
      </Box>
    </>
  )
}

export default Loading
