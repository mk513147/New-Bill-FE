// import { API } from "@/apiCall/api";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

function Dashboard() {
	return (
		<Flex h="100vh" w="100vw" bgColor="gray.100" color="gray.800">
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
