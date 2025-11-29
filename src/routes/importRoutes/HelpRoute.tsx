import { Help } from '@/pages'
import { Route } from 'react-router-dom'

export const HelpRoute = () => {
  return <Route path="/help" element={<Help />} />
}
