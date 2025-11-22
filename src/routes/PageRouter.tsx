import Auth from '@/pages/Layouts/Auth.tsx'
import Layout from '@/pages/Layouts/Layout.tsx'

import { Route, Routes, BrowserRouter } from 'react-router-dom'

import {
  LoginRoute,
  ForgotPasswordRoute,
  CustomerRoute,
  ProductRoute,
  DashboardRoute,
  ProfileRoute,
} from './index'

const authPages = () => (
  <>
    {LoginRoute()}
    {ForgotPasswordRoute()}
  </>
)
const pages = () => (
  <>
    {DashboardRoute()}
    {CustomerRoute()}
    {ProductRoute()}
    {ProfileRoute()}
  </>
)

const PageRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />}>
          {authPages()}
        </Route>
        <Route element={<Layout />}>{pages()}</Route>
      </Routes>
    </BrowserRouter>
  )
}

export default PageRouter
