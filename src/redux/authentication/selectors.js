export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectUser = state => state.auth.user;
export const selectIsError = state => state.auth.isAuthError;
export const selectIsLoading = state => state.auth.IsLoading;
export const selectIsRefreshing = state => state.auth.isRefreshing;
