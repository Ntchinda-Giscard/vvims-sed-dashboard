// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deletePos: null,   
};

const authSlice = createSlice({
  name: 'deletePos',
  initialState,
  reducers: {
    deletePosition: (state, action) => {
      state.deletePos = action.payload;  // payload should contain user data
    },
  },
});

export const { deletePosition } = authSlice.actions;
export default authSlice.reducer;