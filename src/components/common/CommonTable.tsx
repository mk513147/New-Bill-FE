import { Table, Box, Skeleton, HStack, Button } from '@chakra-ui/react'
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
// const ACTION_COLUMN_WIDTH = '120px'

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
            {[...Array(7)].map((_, i) => (
              <Table.Row key={i} height="50px" border={0}>
                <Table.Cell colSpan={6} p={1}>
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
              <Table.Row key={rowKey(row)} _hover={{ bg: '#f1f1f1ff' }}>
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
                  <Table.Cell verticalAlign="middle" textAlign="center">
                    <HStack gap={1} justify={'center'}>
                      {actions.map((action, i) => (
                        <Button
                          key={i}
                          onClick={() => action.onClick(row)}
                          style={{ color: action.color }}
                          size={'sm'}
                        >
                          {action.icon}
                        </Button>
                      ))}
                    </HStack>
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
