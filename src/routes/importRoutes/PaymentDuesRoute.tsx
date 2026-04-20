import { PaymentDues } from '@/pages'
import { Route } from 'react-router-dom'

export const PaymentDuesRoute = () => {
  return <Route path="/payments/dues" element={<PaymentDues />} />
}
