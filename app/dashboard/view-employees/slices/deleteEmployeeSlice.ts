
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deleteEmpl: null,   
};

const deleteEmployeeSlice = createSlice({
  name: 'delDept',
  initialState,
  reducers: {
    deleteEmployeeFunc: (state, action) => {
      state.deleteEmpl = action.payload;  // payload should contain user data
    },
  },
});

export const { deleteEmployeeFunc } = deleteEmployeeSlice.actions;
export default deleteEmployeeSlice.reducer;