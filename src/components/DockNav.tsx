import { Flex, IconButton, Center, Box, Spinner } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUsers, FaSignOutAlt } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { FaDungeon, FaShop } from "react-icons/fa6";
import { useState } from "react";
import { API } from "@/apiCall/api.ts";

const navItems = [
	{ label: "Home", icon: <FaDungeon />, path: "/dashboard" },
	{ label: "Products", icon: <AiOutlineProduct />, path: "/products" },
	{ label: "Customer", icon: <FaShop />, path: "/customer" },
	{ label: "Profile", icon: <FaUsers />, path: "/profile" },
];
import { ToasterUtil, Toaster } from "@/components/ToasterUtil";

const DockNav = () => {
	const toastFunc = ToasterUtil();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const handleLogout = async () => {
		setLoading(true);
		try {
			await API.post("/auth/logout");
			localStorage.removeItem("isLoggedIn");
			navigate("/login");
		} catch (error: any) {
			console.error("Logout error:", error.response?.data || error.message);
			toastFunc("Failed to logout. Please try again.", "error");
		} finally {
			setLoading(false);
		}
	};

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
				position="fixed"
				bottom={4}
				left="50%"
				transform="translateX(-50%)"
				bg="white"
				py={3}
				px={4}
				justifyContent="space-around"
				alignItems="center"
				boxShadow="xl"
				zIndex={100}
				borderRadius="full"
				width="85%"
				maxW="420px"
				border="1px solid"
				borderColor="gray.200"
			>
				{navItems.map(({ label, icon, path }) => (
					<NavLink key={path} to={path} style={{ textDecoration: "none" }}>
						{({ isActive }) => (
							<IconButton
								aria-label={label}
								onClick={() => navigate(path)}
								color={isActive ? "white" : "teal.500"}
								bg={isActive ? "teal.500" : "transparent"}
								variant="ghost"
								_hover={{ bg: "teal.400" }}
								size="lg"
								borderRadius="full"
							>
								{icon}
							</IconButton>
						)}
					</NavLink>
				))}
			</Flex>
			<IconButton
				position="fixed"
				bottom={4}
				right={5}
				py={3}
				px={3}
				zIndex={100}
				onClick={handleLogout}
				bg="teal.500"
				color="white"
				_hover={{ bg: "teal.600" }}
				size="lg"
				borderRadius="full"
			>
				<FaSignOutAlt />
			</IconButton>

			<Toaster />
		</>
	);
};

export default DockNav;
