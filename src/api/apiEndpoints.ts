export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },

  MERCHANT: {
    PROFILE: '/auth/view',
  },

  CUSTOMERS: {
    BASE: '/customers/getCustomer',
    CREATE: '/customers/createCustomer',
    UPDATE: '/customers/updateCustomer',
    DELETE: '/customers/deleteCustomer',
  },

  PRODUCTS: {
    BASE: '/products/getProducts',
    CREATE: '/products/createProduct',
    UPDATE: '/products/updateProduct',
    DELETE: '/products/deleteProduct',
  },

  SUPPLIERS: {
    BASE: '/suppliers',
  },

  STAFF: {
    BASE: '/staff/list',
    CREATE: '/staff/create',
    UPDATE: '/staff/update',
    DELETE: '/staff/delete',
  },

  CATEGORY: {
    BASE: '/category/list',
    CREATE: '/category/create',
    UPDATE: '/category/update',
    DELETE: '/category/delete',
  },
}

export default API_ENDPOINTS
