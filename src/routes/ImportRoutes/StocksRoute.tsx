import { Stocks } from '@/pages'
import { Route } from 'react-router-dom'

export const StocksRoute = () => {
  return <Route path="/stocks" element={<Stocks />} />
}
