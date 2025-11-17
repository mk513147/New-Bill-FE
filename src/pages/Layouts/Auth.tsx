import { useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Auth = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/dashboard");
		} else {
			navigate("/login");
		}
	}, [isAuthenticated]);

	return (
		<>
			<Outlet />
		</>
	);
};

export default Auth;
