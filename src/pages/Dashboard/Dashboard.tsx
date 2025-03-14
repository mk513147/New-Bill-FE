import { API } from "@/apiCall/api";
import { Button, Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    let { data } = await API.post("auth/logout");
    if (data.statusCode === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <Flex h="100vh" w="100vw">
      {/* Sidebar */}
      <Box w="250px" bg="gray.800" color="white" p={5}>
        <Heading size="md" mb={5}>
          Dashboard
        </Heading>
        <VStack align="start" spacing={4}>
          <Text cursor="pointer">Home</Text>
          <Text cursor="pointer">Analytics</Text>
          <Text cursor="pointer">Reports</Text>
          <Text cursor="pointer">Settings</Text>
          <Button colorPalette="red" onClick={handleLogout} mt={5}>
            Logout
          </Button>
        </VStack>
      </Box>

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
