import { Staff } from '@/pages'
import { Route } from 'react-router-dom'

export const StaffRoute = () => {
  return <Route path="/staff" element={<Staff />} />
}
