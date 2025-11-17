import {
	Box,
	Flex,
	VStack,
	Avatar,
	Stack,
	Text,
	HStack,
	IconButton,
	Center,
	Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useEffect } from "react";
import { ToasterUtil, Toaster } from "@/components/ToasterUtil";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logoutUser } from "../features/auth/authSlice";

const SideBar = () => {
	const toastFunc = ToasterUtil();
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const { loading, error, isAuthenticated } = useAppSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (!isAuthenticated) {
			console.log("Auth state:", isAuthenticated);
			navigate("/login");
		}
		if (error) {
			toastFunc(error, "error");
			console.log(error);
		}
	}, [isAuthenticated, error]);

	return (
		<>
			{loading && (
				<Box pos="absolute" inset="0" bg="bg/80" zIndex={1000}>
					<Center h="full">
						<Spinner color="teal.500" />
					</Center>
				</Box>
			)}
			<Flex
				flexDir="column"
				height="100%"
				bgColor="#ffffffff"
				p={5}
				align="center"
				justify="space-between"
				color="gray.600"
				maxW="25%"
				minW="18%"
				shadow="lg"
			>
				<Box w="250px" p={5}>
					<VStack align="start" gap={4}>
						<Text cursor="pointer">Home</Text>
						<Text cursor="pointer">Analytics</Text>
						<Text cursor="pointer">Reports</Text>
						<Text cursor="pointer">Settings</Text>
					</VStack>
				</Box>
				<HStack>
					<Avatar.Root bgColor="#00F2F2" size="sm">
						<Avatar.Fallback name={"Demo User"} />
						<Avatar.Image src="https://bit.ly/broken-link" />
					</Avatar.Root>
					<Stack gap="0">
						<Text fontWeight="sm">Demo User</Text>
						<Text color="fg.muted" textStyle="sm">
							demo.user@example.com
						</Text>
					</Stack>
					<IconButton
						onClick={() => dispatch(logoutUser())}
						disabled={loading}
						bg="teal.500"
						color="white"
						_hover={{ bg: "teal.600" }}
						size="md"
						borderRadius="full"
					>
						<FaSignOutAlt />
					</IconButton>
				</HStack>
			</Flex>
			<Toaster />
		</>
	);
};

export default SideBar;
