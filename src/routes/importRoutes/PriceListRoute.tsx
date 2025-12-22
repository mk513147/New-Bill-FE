import { PriceList } from '@/pages'
import { Route } from 'react-router-dom'

export const PriceListRoute = () => {
  return <Route path="/price-list" element={<PriceList />} />
}
