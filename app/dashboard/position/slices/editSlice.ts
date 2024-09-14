// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editPos: null,   
};

const authSlice = createSlice({
  name: 'editPos',
  initialState,
  reducers: {
    editPosition: (state, action) => {
      state.editPos = action.payload;  // payload should contain user data
    },
  },
});

export const { editPosition } = authSlice.actions;
export default authSlice.reducer;