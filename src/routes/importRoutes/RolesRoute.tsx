import { Roles } from '@/pages'
import { Route } from 'react-router-dom'

export const RolesRoute = () => {
  return <Route path="/roles" element={<Roles />} />
}
