import { configureStore } from '@reduxjs/toolkit'
import profileReducer from '@/redux/slices/profileSlice'
import dockReducer from '@/redux/slices/dockSlice'
import customerReducer from '@/redux/slices/customerSlice'
import productReducer from '@/redux/slices/productSlice'

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    dock: dockReducer,
    customer: customerReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
