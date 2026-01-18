import { Input, IconButton, Box } from '@chakra-ui/react'
import { Calendar } from 'lucide-react'
import { useRef } from 'react'

export const DateInputWithIcon = ({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) => {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <Box
      position="relative"
      bg="white"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      shadow="lighterGray"
    >
      <Input
        ref={ref}
        type="date"
        w="150px"
        pr="36px"
        outline={'none'}
        border={'none'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <IconButton
        aria-label="Open calendar"
        size="sm"
        position="absolute"
        right="6px"
        top="50%"
        transform="translateY(-50%)"
        onClick={() => {
          ref.current?.showPicker?.() || ref.current?.focus()
        }}
      >
        <Calendar size={16} />
      </IconButton>
    </Box>
  )
}
