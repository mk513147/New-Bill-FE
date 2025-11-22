import { Box, Center, Spinner } from '@chakra-ui/react'

const Loading = () => {
  return (
    <>
      <Box pos="absolute" inset="0" bg="bg/80" zIndex={1000}>
        <Center h="full">
          <Spinner color="teal.500" />
        </Center>
      </Box>
    </>
  )
}

export default Loading
