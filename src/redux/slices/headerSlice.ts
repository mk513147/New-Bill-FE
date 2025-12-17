import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type HeaderState = {
  title: string
  subtitle?: string
  actions?: 'NONE' | 'CUSTOM'
}

const initialState: HeaderState = {
  title: '',
  subtitle: '',
  actions: 'NONE',
}

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setHeader: (__, action: PayloadAction<HeaderState>) => action.payload,
    clearHeader: () => initialState,
  },
})

export const { setHeader, clearHeader } = headerSlice.actions
export default headerSlice.reducer
