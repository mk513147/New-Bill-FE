import { Profile } from '@/pages'
import { Route } from 'react-router-dom'

export const ProfileRoute = () => {
  return <Route path="/profile" element={<Profile />} />
}
