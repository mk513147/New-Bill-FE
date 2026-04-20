import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Text,
  Badge,
  Button,
  Portal,
  Popover,
} from '@chakra-ui/react'
import { CommonTable } from '@/components/common/CommonTable'
import { CalendarDays, Users } from 'lucide-react'
import { Calendar } from '@/components/common/Calendar'

import { useAttendanceByDate } from '@/hooks/useAttendance'
import { useAttendanceActions } from '@/hooks/useAttendanceActions'
import { useAllStaff } from '@/hooks/useStaff'

const statusColor = {
  present: 'green',
  absent: 'red',
  leave: 'yellow',
} as const

const toDateStr = (d: Date) => d.toISOString().split('T')[0]

const Attendance = () => {
  const dispatch = useDispatch()
  const [date, setDate] = useState<Date>(new Date())
  const [calOpen, setCalOpen] = useState(false)

  const dateStr = toDateStr(date)

  const { data: records = [], isLoading } = useAttendanceByDate(dateStr)
  const { data: allStaff = [] } = useAllStaff()
  const { markAttendance, bulkMarkAttendance } = useAttendanceActions()

  useEffect(() => {
    dispatch(setHeader({ title: 'Attendance', subtitle: 'Daily attendance log for all staff' }))
    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])

  // Merge staff list with today's attendance records
  const rows = useMemo(() => {
    const map = new Map(records.map((r) => [r.staffId._id, r]))
    return allStaff.map((s) => {
      const rec = map.get(s._id)
      return {
        _id: s._id,
        name: s.name,
        role: s.role,
        status: rec?.status ?? null,
        checkIn: rec?.checkIn,
        checkOut: rec?.checkOut,
        attendanceId: rec?._id,
      }
    })
  }, [allStaff, records])

  const presentCount = rows.filter((r) => r.status === 'present').length
  const absentCount = rows.filter((r) => r.status === 'absent').length
  const leaveCount = rows.filter((r) => r.status === 'leave').length
  const unmarkedCount = rows.filter((r) => r.status === null).length

  const handleMark = (staffId: string, status: 'present' | 'absent' | 'leave') => {
    markAttendance.mutate({ staffId, status, date: dateStr })
  }

  const handleBulkPresent = () => {
    const unmarked = rows.filter((r) => r.status === null)
    if (!unmarked.length) return
    bulkMarkAttendance.mutate({
      date: dateStr,
      records: unmarked.map((r) => ({ staffId: r._id, status: 'present' })),
    })
  }

  const columns = [
    {
      key: 'name',
      header: 'Name',
      width: '200px',
      render: (row: any) => row.name,
    },
    {
      key: 'role',
      header: 'Role',
      width: '140px',
      render: (row: any) => row.role || '-',
    },
    {
      key: 'status',
      header: 'Status',
      width: '130px',
      render: (row: any) =>
        row.status ? (
          <Badge colorPalette={statusColor[row.status as keyof typeof statusColor]}>
            {String(row.status).toUpperCase()}
          </Badge>
        ) : (
          <Badge colorPalette="gray">NOT MARKED</Badge>
        ),
    },
    {
      key: 'checkIn',
      header: 'Check In',
      width: '120px',
      render: (row: any) =>
        row.checkIn
          ? new Date(row.checkIn).toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
            })
          : '-',
    },
    {
      key: 'checkOut',
      header: 'Check Out',
      width: '120px',
      render: (row: any) =>
        row.checkOut
          ? new Date(row.checkOut).toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
            })
          : '-',
    },
    {
      key: 'actions',
      header: 'Mark',
      width: '260px',
      render: (row: any) => (
        <HStack gap={1}>
          <Button
            size="xs"
            bg={row.status === 'present' ? 'green.500' : 'white'}
            color={row.status === 'present' ? 'white' : 'green.700'}
            border="1px solid"
            borderColor="green.300"
            _hover={{ bg: 'green.50' }}
            onClick={() => handleMark(row._id, 'present')}
          >
            Present
          </Button>
          <Button
            size="xs"
            bg={row.status === 'absent' ? 'red.500' : 'white'}
            color={row.status === 'absent' ? 'white' : 'red.600'}
            border="1px solid"
            borderColor="red.200"
            _hover={{ bg: 'red.50' }}
            onClick={() => handleMark(row._id, 'absent')}
          >
            Absent
          </Button>
          <Button
            size="xs"
            bg={row.status === 'leave' ? 'yellow.400' : 'white'}
            color={row.status === 'leave' ? 'white' : 'yellow.700'}
            border="1px solid"
            borderColor="yellow.300"
            _hover={{ bg: 'yellow.50' }}
            onClick={() => handleMark(row._id, 'leave')}
          >
            Leave
          </Button>
        </HStack>
      ),
    },
  ]

  return (
    <Flex
      bg="linear-gradient(180deg, #eef2f6 0%, #e8edf3 48%, #e2e8f0 100%)"
      width="100%"
      height="100%"
      flexDir="column"
      px={{ base: 4, md: 6 }}
      py={{ base: 4, md: 5 }}
    >
      {/* Summary Cards */}
      <SimpleGrid columns={{ base: 2, md: 4 }} gap={3}>
        {[
          { label: 'Present', value: presentCount },
          { label: 'Absent', value: absentCount },
          { label: 'On Leave', value: leaveCount },
          { label: 'Not Marked', value: unmarkedCount },
        ].map((card) => (
          <Box
            key={card.label}
            bg="white"
            border="1px solid"
            borderColor="gray.100"
            borderRadius="16px"
            p={3}
          >
            <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="0.06em">
              {card.label}
            </Text>
            <Text mt={1} fontSize="xl" fontWeight="800" color="gray.900">
              {card.value}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      {/* Controls */}
      <Flex
        justify="space-between"
        align={{ base: 'stretch', md: 'center' }}
        mt={4}
        gap={3}
        direction={{ base: 'column', md: 'row' }}
      >
        {/* Date Picker */}
        <Popover.Root open={calOpen} onOpenChange={(d) => setCalOpen(d.open)}>
          <Popover.Trigger asChild>
            <Button
              bg="white"
              color="gray.900"
              border="1px solid"
              borderColor="gray.200"
              _hover={{ bg: 'gray.50' }}
              h="38px"
              gap={2}
            >
              <CalendarDays size={16} />
              {date.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
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
                shadow="lg"
              >
                <Calendar
                  value={date}
                  onChange={(d) => {
                    if (d) {
                      setDate(d)
                      setCalOpen(false)
                    }
                  }}
                />
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>

        {/* Bulk mark present */}
        {unmarkedCount > 0 && (
          <Button
            bg="green.600"
            color="white"
            h="38px"
            px={4}
            _hover={{ bg: 'green.700' }}
            loading={bulkMarkAttendance.isPending}
            onClick={handleBulkPresent}
          >
            <HStack gap={1.5}>
              <Users size={16} />
              <Text fontSize="sm" fontWeight="700">
                Mark All Unmarked Present
              </Text>
            </HStack>
          </Button>
        )}
      </Flex>

      {/* Table */}
      <Box
        bg="rgba(255,255,255,0.86)"
        mt={6}
        rounded="2xl"
        shadow="lightGray"
        border="1px solid"
        borderColor="whiteAlpha.800"
        w="100%"
        p={{ base: 2, md: 4 }}
      >
        <CommonTable
          columns={columns}
          data={rows}
          isLoading={isLoading}
          rowKey={(r) => r._id}
          emptyMessage="No staff found. Add staff first."
        />
      </Box>
    </Flex>
  )
}

export default Attendance
