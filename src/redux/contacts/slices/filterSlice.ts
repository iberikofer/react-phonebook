import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FilterState } from '../../../types';

const initialState: FilterState = {
  filter: '',
};

const filterSlice = createSlice({
  name: 'FILTER',
  initialState,
  reducers: {
    setFilter: (state, { payload }: PayloadAction<string>) => {
      state.filter = payload.trim();
    },
  },
});

export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
