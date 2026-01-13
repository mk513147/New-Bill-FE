import { Bill } from '@/pages'
import { Route } from 'react-router-dom'

export const BillRoute = () => {
  return <Route path="/bill" element={<Bill />} />
}
