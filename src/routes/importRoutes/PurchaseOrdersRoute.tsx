import { PurchaseOrders } from '@/pages'
import { Route } from 'react-router-dom'

export const PurchaseOrdersRoute = () => {
  return <Route path="/purchase-orders" element={<PurchaseOrders />} />
}
