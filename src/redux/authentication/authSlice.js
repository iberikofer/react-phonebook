import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';

const initialState = {
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
  extraReducers: {
    [register.fulfilled](state, { payload }) {
      state.isLoading = false;
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    [register.pending](state) {
      state.isLoading = true;
    },
    [register.rejected](state, { payload }) {
      state.isLoading = false;
      state.isAuthError = payload;
    },

    [logIn.fulfilled](state, { payload }) {
      state.isLoading = false;
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    [logIn.pending](state) {
      state.isLoading = true;
    },
    [logIn.rejected](state, { payload }) {
      state.isLoading = false;
      state.isAuthError = payload;
    },

    [logOut.fulfilled](state) {
      state.isLoading = false;
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
    [logOut.pending](state) {
      state.isLoading = true;
    },
    [logOut.rejected](state, { payload }) {
      state.isLoading = false;
      state.isAuthError = payload;
    },

    [refreshUser.fulfilled](state, { payload }) {
      state.user = payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
      state.isLoading = false;
    },
    [refreshUser.pending](state) {
      state.isRefreshing = true;
      state.isLoading = true;
    },
    [refreshUser.rejected](state) {
      state.isRefreshing = false;
      state.isLoading = false;
    },
  },
});

export const authReducer = authSlice.reducer;
