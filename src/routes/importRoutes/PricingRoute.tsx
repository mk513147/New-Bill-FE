import Pricing from '@/pages/Pricing/Pricing'
import { Route } from 'react-router-dom'

export const PricingRoute = () => {
  return <Route path="/pricing" element={<Pricing />} />
}
