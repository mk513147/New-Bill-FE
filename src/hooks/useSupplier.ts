import API_ENDPOINTS from '@/api/apiEndpoints'
import { createCrudHooks } from './createCrudHooks'

export const supplierHooks = createCrudHooks(API_ENDPOINTS.SUPPLIERS.BASE, 'suppliers')
