import { Provider as ReduxProvider } from "react-redux";
import { Provider as UIProvider } from "@/components/ui/provider";

import { store } from "./app/store.ts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ReduxProvider store={store}>
			<QueryClientProvider client={queryClient}>
				<UIProvider>
					<App />
				</UIProvider>
			</QueryClientProvider>
		</ReduxProvider>
	</StrictMode>
);
