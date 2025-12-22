const ALL_SUPPLIERS = [
  {
    _id: 'sup_001',
    name: 'Reliance Wholesale Ltd',
    supplierCode: 'SUP-001',
    phone: '9876543210',
    gstNumber: '27AABCR1718E1Z6',
    openingBalance: 25000,
    isActive: true,
  },
  {
    _id: 'sup_002',
    name: 'Tata Consumer Products',
    supplierCode: 'SUP-002',
    phone: '9123456789',
    gstNumber: '27AAACT2727Q1Z2',
    openingBalance: 0,
    isActive: true,
  },
  {
    _id: 'sup_003',
    name: 'Samsung India Electronics',
    supplierCode: 'SUP-003',
    phone: '9988776655',
    gstNumber: '29AAECS1234F1Z3',
    openingBalance: 42000,
    isActive: true,
  },
  {
    _id: 'sup_004',
    name: 'LG Electronics India',
    supplierCode: 'SUP-004',
    phone: '9000011111',
    gstNumber: '27AAACL4567K1Z8',
    openingBalance: 18000,
    isActive: true,
  },
  {
    _id: 'sup_005',
    name: 'Local Kirana Distributor',
    supplierCode: 'SUP-005',
    phone: '9898989898',
    gstNumber: '',
    openingBalance: -3500,
    isActive: true,
  },
  {
    _id: 'sup_006',
    name: 'Metro Stationery Mart',
    supplierCode: 'SUP-006',
    phone: '9765432109',
    gstNumber: '27BBBCD8899L1Z1',
    openingBalance: 8000,
    isActive: true,
  },
  {
    _id: 'sup_007',
    name: 'Wholesaler Hub Pvt Ltd',
    supplierCode: 'SUP-007',
    phone: '9654321098',
    gstNumber: '24AACWH5566M1Z4',
    openingBalance: 12000,
    isActive: true,
  },
  {
    _id: 'sup_008',
    name: 'Office Needs India',
    supplierCode: 'SUP-008',
    phone: '9012345678',
    gstNumber: '27AAACO7788P1Z9',
    openingBalance: 0,
    isActive: false,
  },
  {
    _id: 'sup_009',
    name: 'Bright Electricals',
    supplierCode: 'SUP-009',
    phone: '9345678123',
    gstNumber: '29AABCE3344J1Z7',
    openingBalance: 6700,
    isActive: true,
  },
  {
    _id: 'sup_010',
    name: 'Urban Furniture Co',
    supplierCode: 'SUP-010',
    phone: '9090909090',
    gstNumber: '27AAACU9988R1Z5',
    openingBalance: 15500,
    isActive: true,
  },
  {
    _id: 'sup_011',
    name: 'CleanCare Supplies',
    supplierCode: 'SUP-011',
    phone: '9822334455',
    gstNumber: '27AACCC4455D1Z6',
    openingBalance: 2300,
    isActive: true,
  },
  {
    _id: 'sup_012',
    name: 'Personal Care Distributors',
    supplierCode: 'SUP-012',
    phone: '9911223344',
    gstNumber: '',
    openingBalance: 0,
    isActive: true,
  },
]

export function getFakeSuppliers(limit: number, page: number) {
  const start = (page - 1) * limit
  const end = start + limit

  const sliced = ALL_SUPPLIERS.slice(start, end)
  const totalPages = Math.ceil(ALL_SUPPLIERS.length / limit)

  return {
    suppliers: sliced,
    pagination: {
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  }
}
