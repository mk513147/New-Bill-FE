import { Customer, Dashboard, Profile, Products } from "@/pages";

export const pages = [
	{ path: "/dashboard", element: <Dashboard /> },
	{ path: "/customer", element: <Customer /> },
	{ path: "/profile", element: <Profile /> },
	{ path: "/products", element: <Products /> },
];
