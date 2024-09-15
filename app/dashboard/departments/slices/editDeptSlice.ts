
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editDept: null,   
};

const editDeptSlice = createSlice({
  name: 'editDept',
  initialState,
  reducers: {
    editDepartment: (state, action) => {
      state.editDept = action.payload;  // payload should contain user data
    },
  },
});

export const { editDepartment } = editDeptSlice.actions;
export default editDeptSlice.reducer;