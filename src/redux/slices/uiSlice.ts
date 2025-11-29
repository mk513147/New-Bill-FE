import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  isLoading: boolean
  loadingMessage: string | null
}

const initialState: UIState = {
  isLoading: false,
  loadingMessage: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ loading: boolean; message?: string }>) => {
      state.isLoading = action.payload.loading
      state.loadingMessage = action.payload.message || null
    },
    clearLoading: (state) => {
      state.isLoading = false
      state.loadingMessage = null
    },
  },
})

export const { setLoading, clearLoading } = uiSlice.actions
export default uiSlice.reducer
