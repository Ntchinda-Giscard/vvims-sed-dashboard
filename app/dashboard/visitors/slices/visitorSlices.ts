
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visitor: null,   
};

const visitorSlice = createSlice({
  name: 'visitor',
  initialState,
  reducers: {
    addVisitor: (state, action) => {
      state.visitor = action.payload;  // payload should contain user data
    },
  },
});

export const { addVisitor } = visitorSlice.actions;
export default visitorSlice.reducer;