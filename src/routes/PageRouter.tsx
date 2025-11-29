import Auth from '@/pages/Layouts/Auth.tsx'
import Layout from '@/pages/Layouts/Layout.tsx'

import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'

import {
  LoginRoute,
  ForgotPasswordRoute,
  CustomerRoute,
  ProductRoute,
  DashboardRoute,
  ProfileRoute,
  StocksRoute,
  SuppliersRoute,
  PaymentsRoute,
  SettingsRoute,
} from './importRoutes/index'
import { useSelector } from 'react-redux'
import Loading from '@/components/common/Loading'

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
    {StocksRoute()}
    {SuppliersRoute()}
    {PaymentsRoute()}
    {SettingsRoute()}
  </>
)

const PageRouter = () => {
  const isLoading = useSelector((state: any) => state.ui.isLoading)
  return (
    <>
      {isLoading && <Loading />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />}>
            {authPages()}
          </Route>
          <Route element={<Layout />}>{pages()}</Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default PageRouter
