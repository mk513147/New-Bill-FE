import {
	Dashboard,
	Customer,
	Products,
	Profile,
	Login,
} from "../pages/index.ts";

import { Route, Routes, BrowserRouter } from "react-router-dom";

function PageRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/customer" element={<Customer />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/products" element={<Products />} />
			</Routes>
		</BrowserRouter>
	);
}

export default PageRouter;
