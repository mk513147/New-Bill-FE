import { configureStore } from '@reduxjs/toolkit'
import profileReducer from '@/Redux/slices/profileSlice'
import dockReducer from '@/Redux/slices/dockSlice'
import customerReducer from '@/Redux/slices/customerSlice'
import productReducer from '@/Redux/slices/productSlice'

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
