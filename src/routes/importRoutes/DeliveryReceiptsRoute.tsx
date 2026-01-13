import { DeliveryReceipts } from '@/pages'
import { Route } from 'react-router-dom'

export const DeliveryReceiptsRoute = () => {
  return <Route path="/delivery-receipts" element={<DeliveryReceipts />} />
}
