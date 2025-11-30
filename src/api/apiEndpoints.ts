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
    BASE: '/products',
  },

  SUPPLIERS: {
    BASE: '/suppliers',
  },
}

export default API_ENDPOINTS
