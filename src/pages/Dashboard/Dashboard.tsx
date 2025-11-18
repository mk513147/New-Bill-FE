import { setActiveTab } from "@/Redux/Slices/dockSlice";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveTab("home"));
  }, []);

  return (
    <Flex h="100vh" w="100vw">
      {/* Main Content */}
      <Box flex={1} p={5}>
        <Heading size="lg">Welcome to Dashboard</Heading>
        <Flex mt={5} gap={5}>
          <Box bg="blue.500" color="white" p={5} borderRadius="md" flex={1}>
            <Heading size="md">Users</Heading>
            <Text fontSize="xl">1,200</Text>
          </Box>
          <Box bg="green.500" color="white" p={5} borderRadius="md" flex={1}>
            <Heading size="md">Revenue</Heading>
            <Text fontSize="xl">$50,000</Text>
          </Box>
          <Box bg="purple.500" color="white" p={5} borderRadius="md" flex={1}>
            <Heading size="md">Orders</Heading>
            <Text fontSize="xl">320</Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Dashboard;
