import {
	Button,
	Box,
	Flex,
	VStack,
	Avatar,
	Stack,
	Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { API } from "@/apiCall/api";

const SideBar = () => {
	const navigate = useNavigate();

	const handleLogout = async () => {
		let { data } = await API.post("auth/logout");
		if (data.statusCode === 200) {
			localStorage.clear();
			navigate("/login");
		}
	};
	return (
		<Flex flexDir="column" height="100%" bgColor="#0075F2" p={5} align="center">
			<Box w="250px" p={5}>
				<VStack align="start" gap={4}>
					<Text cursor="pointer">Home</Text>
					<Text cursor="pointer">Analytics</Text>
					<Text cursor="pointer">Reports</Text>
					<Text cursor="pointer">Settings</Text>
					<Button colorPalette="red" onClick={handleLogout} mt={5}>
						Logout
					</Button>
				</VStack>
			</Box>
			<Avatar.Root bgColor="#00F2F2" size="lg">
				<Avatar.Fallback name={"Demo User"} />
				<Avatar.Image src="https://bit.ly/broken-link" />
			</Avatar.Root>
			<Stack gap="0">
				<Text fontWeight="medium">Demo User</Text>
				<Text color="fg.muted" textStyle="sm">
					demo.user@example.com
				</Text>
			</Stack>
		</Flex>
	);
};

export default SideBar;
