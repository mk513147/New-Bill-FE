import { Customer } from '@/pages'
import { Route } from 'react-router-dom'

export const CustomerRoute = () => {
  return <Route path="/customer" element={<Customer />} />
}
