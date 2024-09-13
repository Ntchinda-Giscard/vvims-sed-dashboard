// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,  // To check if the user is authenticated
  userInfo: null,   
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;  // payload should contain user data
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;