import { Outlet } from "react-router-dom";
import DockNav from "@/components/DockNav.tsx";
import SideBar from "@/components/SideBar.tsx";
import { Flex } from "@chakra-ui/react";

const Layout = () => {
	return (
		<>
			<Flex flexDir="row" height="100vh" width="100vw">
				<SideBar />
				<DockNav />
				<Outlet />
			</Flex>
		</>
	);
};

export default Layout;
