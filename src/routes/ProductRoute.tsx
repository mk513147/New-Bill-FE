import { Products } from '@/pages'
import { Route } from 'react-router-dom'

export const ProductRoute = () => {
  return <Route path="/products" element={<Products />} />
}
