import { Dashboard } from '@/pages'
import { Route } from 'react-router-dom'

export const DashboardRoute = () => {
  return <Route path="/dashboard" element={<Dashboard />} />
}
