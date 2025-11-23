import { Login } from '@/pages'
import { Route } from 'react-router-dom'

export const LoginRoute = () => {
  return <Route path="/login" element={<Login />} />
}
