import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Auth = () => {
	const navigate = useNavigate();
	const isLoggedIn = localStorage.getItem("isLoggedIn");

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/dashboard");
		}
	}, [isLoggedIn, navigate]);

	return (
		<>
			<Outlet />
		</>
	);
};

export default Auth;
