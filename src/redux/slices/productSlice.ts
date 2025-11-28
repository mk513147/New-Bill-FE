import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ProductData {
  _id: string
  name: string
  price: number
  stock: number
  description?: string
  category?: string
}

interface ProductState {
  product: ProductData | null
}

const initialState: ProductState = {
  product: null,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<ProductData>) => {
      state.product = action.payload
    },

    updateProduct: (state, action: PayloadAction<Partial<ProductData>>) => {
      if (!state.product) return
      state.product = { ...state.product, ...action.payload }
    },

    resetProduct: (state) => {
      state.product = null
    },
  },
})

export const { setProduct, updateProduct, resetProduct } = productSlice.actions

export default productSlice.reducer
