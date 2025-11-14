import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DockNav from "@/components/DockNav.tsx";
import SideBar from "@/components/SideBar.tsx";
import { Flex } from "@chakra-ui/react";

const Layout = () => {
	// const navigate = useNavigate();
	// const isLoggedIn = localStorage.getItem("isLoggedIn");

	// useEffect(() => {
	// 	if (isLoggedIn) {
	// 		navigate("/dashboard");
	// 	} else {
	// 		navigate("/login");
	// 	}
	// }, []);

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
