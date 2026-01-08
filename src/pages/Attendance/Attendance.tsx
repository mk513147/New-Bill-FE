import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Flex, Heading, Text, Badge, Button, Portal, Popover } from '@chakra-ui/react'
import { TableColumn, CommonTable } from '@/components/common/CommonTable'
import DisplayCard from '@/components/common/DisplayCard'
import { CalendarDays } from 'lucide-react'
import { Calendar } from '@/components/common/Calendar'

type AttendanceStatus = 'present' | 'absent' | 'half'

interface AttendanceRow {
  id: string
  name: string
  date: string
  status: AttendanceStatus
  hours: number
}

const DATA: AttendanceRow[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    date: '2026-01-01',
    status: 'present',
    hours: 8,
  },
  {
    id: '2',
    name: 'Ankit Verma',
    date: '2026-01-01',
    status: 'half',
    hours: 4,
  },
  {
    id: '3',
    name: 'Neha Singh',
    date: '2026-01-01',
    status: 'absent',
    hours: 0,
  },
]

const columns: TableColumn<AttendanceRow>[] = [
  {
    key: 'name',
    header: 'Name',
    render: (row) => row.name,
    width: '220px',
  },
  {
    key: 'date',
    header: 'Date',
    render: (row) => row.date,
    width: '160px',
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => {
      const palette = row.status === 'present' ? 'green' : row.status === 'half' ? 'yellow' : 'red'

      const label =
        row.status === 'present' ? 'Present' : row.status === 'half' ? 'Half Day' : 'Absent'

      return (
        <Badge variant="subtle" colorPalette={palette}>
          {label}
        </Badge>
      )
    },
    width: '160px',
  },
  {
    key: 'hours',
    header: 'Hours',
    render: (row) => row.hours,
    width: '120px',
  },
]

const Attendance = () => {
  const dispatch = useDispatch()
  const [date, setDate] = useState<Date | undefined>()
  useEffect(() => {
    dispatch(
      setHeader({
        title: 'Attendance',
      }),
    )

    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])
  return (
    <Box bg="gray.50" minH="100vh" p={6}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading size="lg" color="gray.900">
            Attendance
          </Heading>
          <Text color="gray.600">Daily attendance overview for staff</Text>
        </Box>

        <Popover.Root>
          <Popover.Trigger asChild>
            <Button
              variant="solid"
              bg="white"
              color="gray.900"
              _hover={{ bg: 'gray.50' }}
              _disabled={{
                color: 'gray.400',
                cursor: 'not-allowed',
              }}
              gap={2}
              shadow={'lightGray'}
            >
              <CalendarDays size={16} color="currentColor" />
              {date
                ? date.toLocaleDateString('default', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })
                : 'Select date'}
            </Button>
          </Popover.Trigger>

          <Portal>
            <Popover.Positioner>
              <Popover.Content
                bg="white"
                border="1px solid"
                borderColor="gray.200"
                rounded="md"
                p={3}
                shadow="lightGray"
              >
                <Calendar value={date} onChange={setDate} />
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      </Flex>

      {/* Summary Cards */}
      <Flex dir="row" gap={4} mb={6}>
        <DisplayCard title="Total Present" highlight={22} animate />
        <DisplayCard title="Total Absent" highlight={3} animate />
        <DisplayCard title="Half Days" highlight={5} animate />
        <DisplayCard title="Attendance Rate" highlight={94} animate graph graphType="bar" />
      </Flex>

      {/* Table */}
      <Box
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        rounded="lg"
        p={4}
        shadow={'lightGray'}
      >
        <Heading size="md" mb={4} color="gray.900">
          Attendance Log
        </Heading>

        <CommonTable columns={columns} data={DATA} rowKey={(row) => row.id} />
      </Box>
    </Box>
  )
}

export default Attendance
