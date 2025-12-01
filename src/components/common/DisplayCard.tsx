import { Box, Card, Heading } from '@chakra-ui/react'
import { TinyLineChart, TinyAreaChart, TinyBarChart } from '../charts'
import { useCountUp } from '@/hooks/useCountUp'

interface DisplayCardProps {
  title?: string
  highlight?: string | number
  description?: string
  graph?: boolean
  graphType?: 'line' | 'area' | 'bar'
  bgColor?: string
  textColor?: string
  animate?: boolean
}

const DisplayCard = ({
  title = '',
  highlight,
  description,
  graph = false,
  graphType = 'line',
  bgColor = 'white',
  textColor = 'gray.800',
  animate = false,
}: DisplayCardProps) => {
  const isNumber = typeof highlight === 'number'
  const animatedValue = animate && isNumber ? useCountUp(Number(highlight), 1500) : highlight
  return (
    <Card.Root
      w={graph ? { base: '100%', sm: '300px', md: '360px' } : '260px'}
      minH="140px"
      shadow="sm"
      bg={bgColor}
      color={textColor}
      borderRadius="lg"
      position="relative"
      overflow="hidden"
      p={4}
      transition="all 0.2s ease-in-out"
      _hover={{
        transform: 'scale(1.02)',
        boxShadow: 'md',
      }}
    >
      <Card.Body p={0}>
        <Card.Title mb="2">{title}</Card.Title>
        <Heading size="2xl">{animatedValue}</Heading>
        <Card.Description>{description}</Card.Description>
      </Card.Body>

      {graph && (
        <Box
          position="absolute"
          bottom="10px"
          right="10px"
          w={{ base: '70px', sm: '90px', md: '110px' }}
          h={{ base: '50px', sm: '60px', md: '70px' }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          pointerEvents="none"
        >
          {graphType === 'line' && <TinyLineChart />}
          {graphType === 'area' && <TinyAreaChart />}
          {graphType === 'bar' && <TinyBarChart />}
        </Box>
      )}
    </Card.Root>
  )
}

export default DisplayCard
