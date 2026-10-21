import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Contact } from '../../types';

axios.defaults.baseURL = 'https://connections-api.goit.global';

export const fetchContacts = createAsyncThunk<Contact[], void>(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Contact[]>('/contacts');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message || 'Failed to fetch contacts');
    }
  }
);

export const addContact = createAsyncThunk<Contact, { name: string; number: string }>(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post<Contact>('/contacts', contact);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message || 'Failed to add contact');
    }
  }
);

export const deleteContact = createAsyncThunk<string, string>(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data?.id || contactId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message || 'Failed to delete contact');
    }
  }
);
