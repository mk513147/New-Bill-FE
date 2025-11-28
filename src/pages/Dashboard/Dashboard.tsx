import { setActiveTab } from '@/Redux/Slices/dockSlice'
import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  SimpleAreaChart,
  SimpleBarChart,
  PieChartWithPaddingAngle,
  LineBarAreaComposedChart,
} from '@/components/charts'

function Dashboard() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setActiveTab('home'))
  }, [])
  return (
    <Box w="100%" h="100%" overflowY="auto" p={5}>
      <Heading size="lg">Welcome to Dashboard</Heading>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={5} mt={5}>
        <Box bg="blue.500" color="white" p={5} borderRadius="md">
          <Heading size="md">Users</Heading>
          <Text fontSize="xl">1,200</Text>
        </Box>

        <Box bg="green.500" color="white" p={5} borderRadius="md">
          <Heading size="md">Revenue</Heading>
          <Text fontSize="xl">$50,000</Text>
        </Box>

        <Box bg="purple.500" color="white" p={5} borderRadius="md">
          <Heading size="md">Orders</Heading>
          <Text fontSize="xl">320</Text>
        </Box>
      </Grid>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={5} mt={10}>
        <GridItem colSpan={2} bg="white" p={4} borderRadius="md" shadow="sm">
          <SimpleBarChart />
        </GridItem>

        <GridItem colSpan={2} bg="white" p={4} borderRadius="md" shadow="sm">
          <SimpleAreaChart />
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 1 }} bg="white" p={4} borderRadius="md" shadow="sm">
          <PieChartWithPaddingAngle />
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 1 }} bg="white" p={4} borderRadius="md" shadow="sm">
          <LineBarAreaComposedChart />
        </GridItem>
      </Grid>
    </Box>
  )
}

export default Dashboard
