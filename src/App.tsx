import PageRouter from "./routes/PageRouter.tsx";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "./Redux/store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme.ts";

const queryClient = new QueryClient();
const App = () => {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ReduxProvider store={store}>
					<ChakraProvider theme={theme}>
						<PageRouter />
					</ChakraProvider>
				</ReduxProvider>
			</QueryClientProvider>
		</>
	);
};

export default App;
