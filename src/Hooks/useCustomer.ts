import API_ENDPOINTS from '@/Api/apiEndpoints'
import { createCrudHooks } from './createCrudHooks'

export const customerHooks = createCrudHooks(API_ENDPOINTS.CUSTOMERS.BASE, 'customers')
