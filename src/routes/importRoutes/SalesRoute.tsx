import { Sales } from '@/pages'
import { Route } from 'react-router-dom'

export const SalesRoute = () => {
  return <Route path="/sales" element={<Sales />} />
}
