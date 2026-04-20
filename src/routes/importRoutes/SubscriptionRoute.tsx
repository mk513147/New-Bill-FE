import { Subscription } from '@/pages'
import { Route } from 'react-router-dom'

export const SubscriptionRoute = () => {
  return <Route path="/subscription" element={<Subscription />} />
}
