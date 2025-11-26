import { Settings } from '@/pages'
import { Route } from 'react-router-dom'

export const SettingsRoute = () => {
  return <Route path="/settings" element={<Settings />} />
}
