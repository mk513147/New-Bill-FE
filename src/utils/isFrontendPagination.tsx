export const isFrontendPagination = (sortBy?: string, sortOrder?: 'asc' | 'desc') =>
  Boolean(sortBy && sortOrder)
