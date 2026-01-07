import { Invoice } from '@/pages'

import { Route } from 'react-router-dom'

export const InvoiceRoute = () => {
  return <Route path="/invoice" element={<Invoice />} />
}
