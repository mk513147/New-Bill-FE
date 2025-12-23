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
        table: {
          headerBg: { value: '#FFFFFF' },
          headerText: { value: '#6B7280' },
          headerBorder: { value: '#E5E7EB' },
          rowBorder: { value: '#c6c8cbff' },
          rowHover: { value: '#b7bbbeff' },
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

        tableHeaderBg: { value: '{colors.table.headerBg}' },
        tableHeaderText: { value: '{colors.table.headerText}' },
        tableHeaderBorder: { value: '{colors.table.headerBorder}' },
        tableRowBorder: { value: '{colors.table.rowBorder}' },
        tableRowHoverBg: { value: '{colors.table.rowHover}' },
      },
      shadows: {
        lightGray: { value: '0px -1px 0px rgba(0, 0, 0, 0.03), 0px 6px 12px rgba(0, 0, 0, 0.21)' },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
