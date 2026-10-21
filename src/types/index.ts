export interface User {
  name: string | null;
  email: string | null;
}

export interface AuthState {
  user: User;
  token: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  isAuthError: boolean | string;
  isRefreshing: boolean;
}

export interface Contact {
  id: string;
  name: string;
  number: string;
  _id?: string;
}

export interface ContactsState {
  items: Contact[];
  isLoading: boolean;
  error: string | null;
}

export interface FilterState {
  filter: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
