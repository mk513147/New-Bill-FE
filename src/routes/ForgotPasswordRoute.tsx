import { ForgotPassword } from '@/pages'
import { Route } from 'react-router-dom'

export const ForgotPasswordRoute = () => {
  return <Route path="/forgot-password" element={<ForgotPassword />} />
}
