// Card.tsx
import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

export function Card({ children }: { children: ReactNode }) {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      p={3} // 🔴 reduce padding
      boxShadow="none" // 🔴 no shadow
    >
      {children}
    </Box>
  )
}
