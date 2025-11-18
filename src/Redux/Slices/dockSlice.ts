import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DockState {
  activeTab: string;
  isHidden: boolean;
}

const initialState: DockState = {
  activeTab: "dashboard",
  isHidden: false,
};

const dockSlice = createSlice({
  name: "dock",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setDockHidden: (state, action: PayloadAction<boolean>) => {
      state.isHidden = action.payload;
    },
  },
});

export const { setActiveTab, setDockHidden } = dockSlice.actions;
export default dockSlice.reducer;
