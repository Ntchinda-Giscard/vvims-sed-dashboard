
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editAgen: null,   
};

const editAgencySlice = createSlice({
  name: 'editAgen',
  initialState,
  reducers: {
    editAgency: (state, action) => {
      state.editAgen = action.payload;  // payload should contain user data
    },
  },
});

export const { editAgency } = editAgencySlice.actions;
export default editAgencySlice.reducer;