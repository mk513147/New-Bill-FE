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
  LandingRoute,
  PriceListRoute,
  InvoiceRoute,
  SalesOrderRoute,
  SalesReturnRoute,
  AttendanceRoute,
  StaffRoute,
  PurchaseRoute,
  SalesRoute,
  CategoryRoute,
  HelpRoute,
  PaymentsReceivedRoute,
  DeliveryReceiptsRoute,
  PackagingRoute,
  ShipmentsRoute,
  PurchaseOrdersRoute,
  PurchaseReceivedRoute,
  BillRoute,
  CreditsRoute,
  RolesRoute,
} from './importRoutes/index'
import { useSelector } from 'react-redux'
import Loading from '@/components/common/Loading'

import { Toaster } from '@/components/ui/toaster'
import ProtectedRoutes from './ProtectedRoutes'

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
    {PurchaseRoute()}
    {StaffRoute()}
    {SalesRoute()}
    {CategoryRoute()}
    {HelpRoute()}
    {AttendanceRoute()}
    {PriceListRoute()}
    {InvoiceRoute()}
    {SalesOrderRoute()}
    {SalesReturnRoute()}
    {PaymentsReceivedRoute()}
    {DeliveryReceiptsRoute()}
    {PackagingRoute()}
    {ShipmentsRoute()}
    {PurchaseOrdersRoute()}
    {PurchaseReceivedRoute()}
    {BillRoute()}
    {CreditsRoute()}
    {RolesRoute()}
  </>
)

const PageRouter = () => {
  const isLoading = useSelector((state: any) => state.ui.isLoading)
  return (
    <>
      {isLoading && <Loading />}
      <BrowserRouter>
        <Routes>
          {LandingRoute()}

          <Route element={<Auth />}>{authPages()}</Route>

          <Route element={<ProtectedRoutes />}>
            <Route element={<Layout />}>{pages()}</Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>

      <Toaster />
    </>
  )
}

export default PageRouter
