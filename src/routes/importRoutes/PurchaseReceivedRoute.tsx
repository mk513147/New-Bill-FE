import { PurchaseReceived } from '@/pages'
import { Route } from 'react-router-dom'

export const PurchaseReceivedRoute = () => {
  return <Route path="/purchase-received" element={<PurchaseReceived />} />
}
