import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

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

	return <Outlet />;
};

export default Layout;
