import { Suppliers } from '@/pages'
import { Route } from 'react-router-dom'

export const SuppliersRoute = () => {
  return <Route path="/suppliers" element={<Suppliers />} />
}
