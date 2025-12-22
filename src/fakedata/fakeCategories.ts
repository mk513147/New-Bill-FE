const ALL_CATEGORIES = [
  {
    _id: 'cat_001',
    name: 'Mobile Phones',
    parentCategory: 'Electronics',
    defaultTax: 18,
    defaultDiscount: 5,
    isActive: true,
  },
  {
    _id: 'cat_002',
    name: 'Laptop & Computers',
    parentCategory: 'Electronics',
    defaultTax: 18,
    defaultDiscount: 7,
    isActive: true,
  },
  {
    _id: 'cat_003',
    name: 'Mobile Accessories',
    parentCategory: 'Electronics',
    defaultTax: 18,
    defaultDiscount: 10,
    isActive: true,
  },
  {
    _id: 'cat_004',
    name: 'Home Appliances',
    parentCategory: 'Electronics',
    defaultTax: 18,
    defaultDiscount: 6,
    isActive: true,
  },
  {
    _id: 'cat_005',
    name: 'Groceries',
    parentCategory: '—',
    defaultTax: 5,
    defaultDiscount: 0,
    isActive: true,
  },
  {
    _id: 'cat_006',
    name: 'Packaged Foods',
    parentCategory: 'Groceries',
    defaultTax: 5,
    defaultDiscount: 2,
    isActive: true,
  },
  {
    _id: 'cat_007',
    name: 'Stationery',
    parentCategory: '—',
    defaultTax: 12,
    defaultDiscount: 3,
    isActive: true,
  },
  {
    _id: 'cat_008',
    name: 'Office Supplies',
    parentCategory: 'Stationery',
    defaultTax: 12,
    defaultDiscount: 5,
    isActive: true,
  },
  {
    _id: 'cat_009',
    name: 'Furniture',
    parentCategory: '—',
    defaultTax: 18,
    defaultDiscount: 8,
    isActive: true,
  },
  {
    _id: 'cat_010',
    name: 'Cleaning Supplies',
    parentCategory: '—',
    defaultTax: 18,
    defaultDiscount: 4,
    isActive: true,
  },
  {
    _id: 'cat_011',
    name: 'Electrical Accessories',
    parentCategory: 'Electronics',
    defaultTax: 18,
    defaultDiscount: 6,
    isActive: true,
  },
  {
    _id: 'cat_012',
    name: 'Personal Care',
    parentCategory: '—',
    defaultTax: 18,
    defaultDiscount: 5,
    isActive: false,
  },
]

export function getFakeCategories(limit: number, page: number) {
  const start = (page - 1) * limit
  const end = start + limit

  const sliced = ALL_CATEGORIES.slice(start, end)
  const totalPages = Math.ceil(ALL_CATEGORIES.length / limit)

  return {
    categories: sliced,
    pagination: {
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  }
}
