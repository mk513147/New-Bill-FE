import { Outlet } from "react-router-dom";
import DockNav from "@/components/DockNav";
import { Flex } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import SideBar from "@/components/SideBar";
import { Toaster } from "@/components/ToasterUtil";

const Layout = () => {
	const pageBg = useColorModeValue("light.menu.bg", "dark.menu.bg");
	const textColor = useColorModeValue("light.menu.text", "dark.menu.text");

	return (
		<Flex height="100vh" width="100vw" bg={pageBg} color={textColor}>
			<SideBar />
			<Outlet />
			<DockNav />
			<Toaster />
		</Flex>
	);
};

export default Layout;
