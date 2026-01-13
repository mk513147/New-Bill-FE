import { Shipments } from '@/pages'
import { Route } from 'react-router-dom'

export const ShipmentsRoute = () => {
  return <Route path="/shipments" element={<Shipments />} />
}
