import { SalesOrder } from '@/pages'

import { Route } from 'react-router-dom'

export const SalesOrderRoute = () => {
  return <Route path="/sales-orders" element={<SalesOrder />} />
}
