import Auth from "@/pages/Layouts/Auth.tsx";
import Layout from "@/pages/Layouts/Layout.tsx";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { pages } from "./LayoutRoutes.tsx";
import { authPages } from "./AuthRoutes.tsx";

function PageRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Auth />}>
					{authPages.map((page) => (
						<Route key={page.path} path={page.path} element={page.element} />
					))}
				</Route>
				<Route element={<Layout />}>
					{pages.map((page) => (
						<Route key={page.path} path={page.path} element={page.element} />
					))}
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default PageRouter;
