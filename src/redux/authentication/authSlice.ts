import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';
import type { AuthState, AuthResponse, User } from '../../types';

const initialState: AuthState = {
  user: { name: null, email: null },
  token: null,
  isLoading: false,
  isLoggedIn: false,
  isAuthError: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.isAuthError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true;
        state.isAuthError = false;
      })
      .addCase(register.fulfilled, (state, { payload }: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.isAuthError = false;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthError = (payload as string) || true;
      })
      .addCase(logIn.pending, state => {
        state.isLoading = true;
        state.isAuthError = false;
      })
      .addCase(logIn.fulfilled, (state, { payload }: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.isAuthError = false;
      })
      .addCase(logIn.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthError = (payload as string) || true;
      })
      .addCase(logOut.pending, state => {
        state.isLoading = true;
        state.isAuthError = false;
      })
      .addCase(logOut.fulfilled, state => {
        state.isLoading = false;
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isAuthError = false;
      })
      .addCase(logOut.rejected, state => {
        state.isLoading = false;
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isAuthError = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
        state.isLoading = true;
        state.isAuthError = false;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }: PayloadAction<User>) => {
        state.user = payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isLoading = false;
        state.isAuthError = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
        state.isLoading = false;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;
