
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editEmpl: null,   
};

const editEmployee = createSlice({
  name: 'delDept',
  initialState,
  reducers: {
    editEmployeeFunc: (state, action) => {
      state.editEmpl = action.payload;  // payload should contain user data
    },
  },
});

export const { editEmployeeFunc } = editEmployee.actions;
export default editEmployee.reducer;