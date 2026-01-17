import { Box, Portal, Select, createListCollection } from '@chakra-ui/react'
import { useMemo } from 'react'

export interface FilterOption {
  label: string
  value: string
}

interface FilterSelectProps {
  options: FilterOption[]
  value?: string[]
  defaultValue?: string[]
  placeholder?: string
  width?: string
  onChange?: (value: string[]) => void
}

export const FilterSelect = ({
  options,
  value,
  defaultValue,
  placeholder = 'Select option',
  width = '320px',
  onChange,
}: FilterSelectProps) => {
  const collection = useMemo(
    () =>
      createListCollection({
        items: options,
      }),
    [options],
  )

  return (
    <Box
      color="gray.800"
      whiteSpace="nowrap"
      bg="white"
      rounded="md"
      shadow="lighterGray"
      border="1px solid"
      borderColor="gray.100"
    >
      <Select.Root
        collection={collection}
        width={width}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(e) => onChange?.(e.value)}
        variant="subtle"
        size="sm"
      >
        <Select.HiddenSelect />

        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder={placeholder} color="gray.700" fontSize="md" />
          </Select.Trigger>

          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>

        <Portal>
          <Select.Positioner>
            <Select.Content bg="white" shadow="sm" color="gray.700">
              {collection.items.map((item) => (
                <Select.Item key={item.value} item={item} _hover={{ bg: 'gray.200' }}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Box>
  )
}
