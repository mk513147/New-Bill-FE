// import RequireAuth from "@/features/hooks/requireAuth.tsx";
import {
	Dashboard,
	Customer,
	Products,
	Profile,
	Login,
} from "../pages/index.ts";
import Auth from "@/pages/Layouts/Auth.tsx";
import Layout from "@/pages/Layouts/Layout.tsx";

import { Route, Routes, BrowserRouter } from "react-router-dom";

function PageRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Auth />}>
					<Route path="/login" element={<Login />} />
					{/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
				</Route>
				<Route element={<Layout />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/customer" element={<Customer />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/products" element={<Products />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default PageRouter;
