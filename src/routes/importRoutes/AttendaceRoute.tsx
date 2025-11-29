import { Attendance } from '@/pages'
import { Route } from 'react-router-dom'

export const AttendanceRoute = () => {
  return <Route path="/attendance" element={<Attendance />} />
}
