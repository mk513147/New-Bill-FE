import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { system } from "@/styles/theme.ts";

export function Provider(props: { children: React.ReactNode }) {
	return (
		<ChakraProvider value={system}>
			<ThemeProvider attribute="class">{props.children}</ThemeProvider>
		</ChakraProvider>
	);
}
