import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RegisterCredentials, LoginCredentials, AuthResponse, User } from '../../types';
import type { RootState } from '../store';

axios.defaults.baseURL = 'https://connections-api.goit.global';

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk<AuthResponse, RegisterCredentials>(
  'auth/registration',
  async (credentials, thunkAPI) => {
    try {
      const result = await axios.post<AuthResponse>('users/signup', credentials);
      setAuthHeader(result.data.token);
      return result.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error?.message || 'Registration failed');
    }
  }
);

export const logIn = createAsyncThunk<AuthResponse, LoginCredentials>(
  'auth/logIn',
  async (credentials, thunkAPI) => {
    try {
      const result = await axios.post<AuthResponse>('users/login', credentials);
      setAuthHeader(result.data.token);
      return result.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error?.message || 'Login failed');
    }
  }
);

export const logOut = createAsyncThunk<void, void>(
  'auth/logOut',
  async (_, thunkAPI) => {
    try {
      await axios.post('users/logout');
      clearAuthHeader();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message || 'Logout failed');
    }
  }
);

export const refreshUser = createAsyncThunk<User, void, { state: RootState }>(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to refresh user');
    }

    try {
      setAuthHeader(persistedToken);
      const result = await axios.get<User>('users/current');
      return result.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message || 'Refresh failed');
    }
  }
);
