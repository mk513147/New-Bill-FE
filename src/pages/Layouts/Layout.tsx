import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DockNav from "@/components/dockNav";

const Layout = () => {
	const navigate = useNavigate();
	const isLoggedIn = localStorage.getItem("isLoggedIn");

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/dashboard");
		} else {
			navigate("/login");
		}
	}, []);

	return (
		<>
			<DockNav />
			<Outlet />
		</>
	);
};

export default Layout;
