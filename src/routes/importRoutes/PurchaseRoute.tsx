import { Purchase } from '@/pages'
import { Route } from 'react-router-dom'

export const PurchaseRoute = () => {
  return <Route path="/purchase" element={<Purchase />} />
}
