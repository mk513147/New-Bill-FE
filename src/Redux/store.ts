import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../Redux/Slices/profileSlice";
import dockReducer from "../Redux/Slices/dockSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    dock: dockReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
