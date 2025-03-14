import { Flex, IconButton, Center, Box, Spinner } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
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
	const bgColor = useColorModeValue("gray.900", "gray.800");
	const iconColor = useColorModeValue("gray.400", "gray.300");
	const hoverBorderColor = useColorModeValue("white", "gray.500");
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
				bg={bgColor}
				py={2}
				px={4}
				justifyContent="space-around"
				alignItems="center"
				boxShadow="lg"
				zIndex={100}
				borderRadius="lg"
				width="80%"
				maxW="400px"
			>
				{navItems.map(({ label, icon, path }) => (
					<NavLink key={path} to={path} style={{ textDecoration: "none" }}>
						{({ isActive }) => (
							<IconButton
								aria-label={label}
								onClick={() => navigate(path)}
								color={isActive ? "white" : iconColor}
								variant="ghost"
								_hover={{ border: "2px solid", borderColor: hoverBorderColor }}
								size="lg"
							>
								{icon}
							</IconButton>
						)}
					</NavLink>
				))}
			</Flex>
			<IconButton
				position="absolute"
				bottom={4}
				right={3}
				py={2}
				px={2}
				zIndex={100}
				onClick={handleLogout}
				variant="surface"
				_hover={{ border: "2px solid", borderColor: hoverBorderColor }}
				size="lg"
			>
				<FaSignOutAlt />
			</IconButton>

			<Toaster />
		</>
	);
};

export default DockNav;
