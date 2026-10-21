import type { RootState } from '../store';

export const getContacts = (state: RootState) => state.contacts.items;
export const getFilter = (state: RootState) => state.filter.filter;
export const loadingStatus = (state: RootState) => state.contacts.isLoading;
export const errorMesage = (state: RootState) => state.contacts.error;
