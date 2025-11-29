import { Category } from '@/pages'
import { Route } from 'react-router-dom'

export const CategoryRoute = () => {
  return <Route path="/category" element={<Category />} />
}
