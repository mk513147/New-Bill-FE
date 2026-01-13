import { PaymentsReceived } from '@/pages'
import { Route } from 'react-router-dom'

export const PaymentsReceivedRoute = () => {
  return <Route path="/payments-received" element={<PaymentsReceived />} />
}
