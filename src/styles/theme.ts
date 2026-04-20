import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  globalCss: {
    'html, body, #root': {
      margin: 0,
      padding: 0,
      color: 'gray.800',
      background: '#edf1f5',
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
    recipes: {
      button: {
        base: {
          fontWeight: '600',
          borderRadius: 'md',
          transitionProperty: 'all',
          transitionDuration: '200ms',
          transitionTimingFunction: 'ease-in-out',
          cursor: 'pointer',
          _disabled: {
            opacity: 0.5,
            cursor: 'not-allowed',
          },
        },
        variants: {
          solid: {
            _hover: {
              transform: 'translateY(-1px)',
            },
            _active: {
              transform: 'translateY(0)',
            },
          },
          outline: {
            border: '1px solid',
            _hover: {
              bg: 'gray.50',
            },
          },
          ghost: {
            bg: 'transparent',
            _hover: {
              bg: 'gray.100',
            },
          },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
