import type { RootState } from '../store';

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsError = (state: RootState) => state.auth.isAuthError;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
