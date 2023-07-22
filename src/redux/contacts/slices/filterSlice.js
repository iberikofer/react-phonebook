import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: '',
};

const filterSlice = createSlice({
  name: 'FILTER',
  initialState,
  reducers: {
    setFilter: (state, { payload }) => {
      state.filter = payload.trim();
    },
  },
});

export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
