import { Box, Input } from '@chakra-ui/react'
import { Search } from 'lucide-react'
import { ChangeEvent } from 'react'

interface ExpandableSearchProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  expandedWidth?: string
  height?: string
}

export const ExpandableSearch = ({
  value,
  onChange,
  placeholder = 'Search…',
  expandedWidth = '280px',
  height = '38px',
}: ExpandableSearchProps) => {
  return (
    <Box
      role="group"
      display="flex"
      alignItems="center"
      w={{ base: '32px', md: expandedWidth }}
      h={height}
      maxW={expandedWidth}
      border="1px solid"
      borderColor="gray.300"
      borderRadius="6px"
      bg="white"
      shadow="lighterGray"
      overflow="hidden"
      _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)' }}
    >
      <Box
        flexShrink={0}
        px="8px"
        color="gray.500"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Search size={16} />
      </Box>

      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        size="sm"
        h="32px"
        border="none"
        outline={'none'}
        px="0"
        _focus={{ boxShadow: 'none' }}
      />
    </Box>
  )
}
