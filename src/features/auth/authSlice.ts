import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
	loginUserAPI,
	logoutUserAPI,
	LoginCredentials,
	LoginResponse,
} from "./authAPI";

export interface AuthState {
	user: LoginResponse["user"] | null;
	token: string | null;
	loading: boolean;
	error: string | null;
	isAuthenticated: boolean;
}

const initialState: AuthState = {
	user: null,
	token: null,
	loading: false,
	error: null,
	isAuthenticated: false,
};

export const loginUser = createAsyncThunk<
	LoginResponse,
	LoginCredentials,
	{ rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
	try {
		const response = await loginUserAPI(credentials);
		return response.data;
	} catch (err: any) {
		return rejectWithValue(err.response?.data?.message || "Login failed");
	}
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
	"auth/logout",
	async (_, { rejectWithValue }) => {
		try {
			await logoutUserAPI();
		} catch (err: any) {
			return rejectWithValue(err.response?.data?.message || "Logout failed");
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		resetAuth: (state) => {
			state.user = null;
			state.token = null;
			state.isAuthenticated = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				loginUser.fulfilled,
				(state, action: PayloadAction<LoginResponse>) => {
					state.loading = false;
					state.user = action.payload.user;
					state.token = action.payload.token;
					state.isAuthenticated = true;
				}
			)
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Login failed";
			})

			.addCase(logoutUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.loading = false;
				state.user = null;
				state.token = null;
				state.isAuthenticated = false;
				localStorage.removeItem("token");
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Logout failed";
			});
	},
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
