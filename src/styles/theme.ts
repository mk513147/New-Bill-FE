import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
	theme: {
		tokens: {
			colors: {
				primary: { value: "light" },
				secondary: { value: "dark" },
			},
		},
		semanticTokens: {
			shadows: {
				custom: {
					value: {
						_light: "18px -10px 72px -25px rgba(232,232,232,1);",
						_dark: "0 32px 56px 0 rgba(0, 0, 0, 0.25)",
					},
				},
			},
		},
	},
});
