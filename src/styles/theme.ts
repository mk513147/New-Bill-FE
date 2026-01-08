import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  globalCss: {
    'html, body': {
      margin: 0,
      padding: 0,
      color: 'gray.800',
    },
  },
  theme: {
    tokens: {
      colors: {
        brand: {
          '500': { value: 'tomato' },
        },
      },
      fonts: {
        body: {
          value: `'Poppins', system-ui, -apple-system, BlinkMacSystemFont, sans-serif`,
        },
      },
    },
    semanticTokens: {
      colors: {
        bg: { value: '#000000ff' },
        text: { value: '#000000' },
      },
      shadows: {
        lightGray: { value: '0px -1px 0px rgba(0, 0, 0, 0.03), 0px 6px 12px rgba(0, 0, 0, 0.21)' },
        lighterGray: {
          value: '0px -1px 0px rgba(0, 0, 0, 0.03), 0px 6px 12px rgba(0, 0, 0, 0.09)',
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
