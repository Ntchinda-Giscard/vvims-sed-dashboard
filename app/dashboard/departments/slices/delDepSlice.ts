
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  delDept: null,   
};

const delDeptSlice = createSlice({
  name: 'delDept',
  initialState,
  reducers: {
    deleteDeparment: (state, action) => {
      state.delDept = action.payload;  // payload should contain user data
    },
  },
});

export const { deleteDeparment } = delDeptSlice.actions;
export default delDeptSlice.reducer;