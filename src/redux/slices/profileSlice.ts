import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ProfileData {
  _id: string
  firstName: string
  lastName: string
  emailId: string
  mobileNumber: string
  shopName: string
  archiveDay: number
}

interface ProfileState {
  profile: ProfileData | null
}

const initialState: ProfileState = {
  profile: null,
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileData>) => {
      state.profile = action.payload
    },

    updateFullProfile: (state, action: PayloadAction<ProfileData>) => {
      state.profile = { ...state.profile, ...action.payload }
    },

    resetProfile: (state) => {
      state.profile = null
    },
  },
})

export const { setProfile, updateFullProfile, resetProfile } = profileSlice.actions

export default profileSlice.reducer
