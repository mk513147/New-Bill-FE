import { useQuery } from '@tanstack/react-query'
import { API } from '@/api/api'
import { API_ENDPOINTS } from '@/api/apiEndpoints'

export type AttendanceStatus = 'present' | 'absent' | 'leave'

export type AttendanceRecord = {
  _id: string
  staffId: {
    _id: string
    name: string
    mobileNumber: string
    role: string
    salaryPerWeek: number
    baseSalary: number
  }
  date: string
  status: AttendanceStatus
  checkIn?: string
  checkOut?: string
}

export type WeeklySummaryEntry = {
  staffId: string
  name: string
  mobileNumber: string
  role: string
  weeklyRate: number
  perDayRate: number
  attendance: { present: number; absent: number; leave: number }
  payableDays: number
  payableAmount: number
}

export type WeeklySummary = {
  weekStart: string
  weekEnd: string
  totals: {
    staffCount: number
    totalWeeklyRate: number
    totalPayable: number
    totalPresentDays: number
    totalAbsentDays: number
    totalLeaveDays: number
  }
  summary: WeeklySummaryEntry[]
}

export const useAttendanceByDate = (date: string) =>
  useQuery<AttendanceRecord[]>({
    queryKey: ['attendance', 'date', date],
    queryFn: async () => {
      const res = await API.get(API_ENDPOINTS.ATTENDANCE.DATE, { params: { date } })
      return res?.data?.data ?? []
    },
    enabled: !!date,
  })

export const useWeeklySalarySummary = (weekStart?: string) =>
  useQuery<WeeklySummary | null>({
    queryKey: ['attendance', 'weekly', weekStart ?? 'current'],
    queryFn: async () => {
      const res = await API.get(API_ENDPOINTS.ATTENDANCE.WEEKLY_SALARY, {
        params: weekStart ? { weekStart } : {},
      })
      return res?.data?.data ?? null
    },
  })
