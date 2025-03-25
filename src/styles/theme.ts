import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
	theme: {
		tokens: {
			colors: {
				primary: { value: "light" },
				secondary: { value: "dark" },
			},
		},
	},
});
