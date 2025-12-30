import { Table, Box, Skeleton, HStack, Button, Popover, Portal, VStack } from '@chakra-ui/react'
import { MoreVertical } from 'lucide-react'
type RowAction<T> = {
  label: string
  icon: React.ReactNode
  color?: string
  onClick: (row: T) => void
}

export type TableColumn<T> = {
  key: string
  header: string
  render: (row: T) => React.ReactNode
  width?: string
}

type CommonTableProps<T> = {
  columns: TableColumn<T>[]
  data: T[]
  rowKey: (row: T) => string
  isLoading?: boolean
  actions?: RowAction<T>[]
}

const DEFAULT_COLUMN_WIDTH = '160px'
const ACTION_COLUMN_WIDTH = '80px'

export function CommonTable<T>({
  columns,
  data,
  rowKey,
  isLoading = false,
  actions,
}: CommonTableProps<T>) {
  return (
    <Box
      w="100%"
      maxW="100%"
      maxH="480px"
      height={'480px'}
      overflow="auto"
      css={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      <Table.Root size="md" stickyHeader variant="line" tableLayout="fixed">
        <Table.Header borderBottom="1px solid #E5E7EB">
          <Table.Row bg="#F5F6FA">
            {columns.map((c) => (
              <Table.ColumnHeader
                key={c.key}
                fontWeight="600"
                color="gray.600"
                verticalAlign="middle"
                textAlign="center"
                width={c.width ?? DEFAULT_COLUMN_WIDTH}
                maxW={c.width ?? DEFAULT_COLUMN_WIDTH}
              >
                {c.header}
              </Table.ColumnHeader>
            ))}
            {actions && (
              <Table.ColumnHeader
                fontWeight="600"
                color="gray.600"
                verticalAlign="middle"
                textAlign="center"
              >
                Actions
              </Table.ColumnHeader>
            )}
          </Table.Row>
        </Table.Header>

        {isLoading ? (
          <Table.Body>
            {[...Array(10)].map((_, i) => (
              <Table.Row key={i} height="50px" border={0} bg="white">
                <Table.Cell colSpan={8}>
                  <Box w="100%">
                    <Skeleton
                      height="20px"
                      width="100%"
                      variant="shine"
                      css={{
                        '--start-color': 'var(--chakra-colors-gray-200)',
                        '--end-color': 'var(--chakra-colors-gray-300)',
                      }}
                    />
                  </Box>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        ) : (
          <Table.Body>
            {data.map((row) => (
              <Table.Row key={rowKey(row)} bg="white" _hover={{ bg: '#f6f6f6ff' }}>
                {columns.map((c) => (
                  <Table.Cell
                    key={c.key}
                    width={c.width ?? DEFAULT_COLUMN_WIDTH}
                    maxW={c.width ?? DEFAULT_COLUMN_WIDTH}
                    verticalAlign="middle"
                    textAlign="center"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {c.render?.(row)}
                  </Table.Cell>
                ))}

                {actions && (
                  <Table.Cell verticalAlign="middle" textAlign="center" width={ACTION_COLUMN_WIDTH}>
                    <Popover.Root positioning={{ placement: 'bottom-end' }}>
                      <Popover.Trigger asChild>
                        <Button size="sm" variant="solid" bg={'transparent'}>
                          <MoreVertical />
                        </Button>
                      </Popover.Trigger>

                      <Portal>
                        <Popover.Positioner>
                          <Popover.Content w="160px" bg={'white'} shadow={'lightGray'}>
                            <Popover.Body p={1}>
                              <VStack gap={1} align="stretch">
                                {actions.map((action, i) => (
                                  <Button
                                    key={i}
                                    onClick={() => action.onClick(row)}
                                    size="sm"
                                    justifyContent="flex-start"
                                    width="100%"
                                    color="gray.600"
                                    _hover={{ bg: 'gray.100' }}
                                  >
                                    <HStack gap={2}>
                                      {action.icon}
                                      {action.label}
                                    </HStack>
                                  </Button>
                                ))}
                              </VStack>
                            </Popover.Body>
                          </Popover.Content>
                        </Popover.Positioner>
                      </Portal>
                    </Popover.Root>
                  </Table.Cell>
                )}
              </Table.Row>
            ))}
          </Table.Body>
        )}
      </Table.Root>
    </Box>
  )
}
