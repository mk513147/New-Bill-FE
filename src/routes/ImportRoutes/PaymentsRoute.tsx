import { Payments } from '@/pages'
import { Route } from 'react-router-dom'

export const PaymentsRoute = () => {
  return <Route path="/payments" element={<Payments />} />
}
