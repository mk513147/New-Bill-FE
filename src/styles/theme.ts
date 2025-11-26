import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          '500': { value: 'tomato' },
        },
      },
    },
    semanticTokens: {
      colors: {
        bg: { value: '#ffffff' },
        text: { value: '#000000' },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
