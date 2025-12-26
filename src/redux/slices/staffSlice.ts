import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface StaffData {
  _id: string
  adminId: string
  name: string
  mobileNumber: string
  role: string
  baseSalary: number
  joinDate: string
}

interface StaffState {
  staff: StaffData | null
}

const initialState: StaffState = {
  staff: null,
}

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    setStaff: (state, action: PayloadAction<StaffData>) => {
      state.staff = action.payload
    },

    updateStaff: (state, action: PayloadAction<Partial<Omit<StaffData, '_id'>>>) => {
      if (!state.staff) return
      state.staff = { ...state.staff, ...action.payload }
    },

    resetStaff: (state) => {
      state.staff = null
    },
  },
})

export const { setStaff, updateStaff, resetStaff } = staffSlice.actions

export default staffSlice.reducer
