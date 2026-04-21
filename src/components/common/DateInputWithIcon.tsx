import { Input, Box } from '@chakra-ui/react'
import { Calendar } from 'lucide-react'
import { useRef } from 'react'

export const DateInputWithIcon = ({
  name,
  value,
  onChange,
  width = '100%',
}: {
  name?: string
  value: string
  onChange: (v: string) => void
  width?: string
}) => {
  const ref = useRef<HTMLInputElement>(null)

  const openPicker = () => {
    if (!ref.current) return

    ref.current.focus()

    if (typeof ref.current.showPicker === 'function') {
      ref.current.showPicker()
    }
  }

  return (
    <Box
      position="relative"
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="12px"
      h="40px"
      display="flex"
      alignItems="center"
      overflow="hidden"
    >
      <Input
        ref={ref}
        name={name}
        type="date"
        w={width}
        h="100%"
        pr="44px"
        pl="12px"
        outline="none"
        border="none"
        borderRadius="0"
        bg="transparent"
        color="black"
        css={{
          '&::-webkit-calendar-picker-indicator': {
            opacity: 0,
            position: 'absolute',
            right: 0,
            width: '44px',
            height: '100%',
            cursor: 'pointer',
          },
          '&::-webkit-date-and-time-value': {
            textAlign: 'left',
          },
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <Box
        as="button"
        type="button"
        aria-label="Open calendar"
        position="absolute"
        right="0"
        top="0"
        h="100%"
        w="44px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="transparent"
        color="black"
        border="none"
        cursor="pointer"
        onMouseDown={(e) => e.preventDefault()}
        onClick={openPicker}
      >
        <Calendar size={16} />
      </Box>
    </Box>
  )
}
