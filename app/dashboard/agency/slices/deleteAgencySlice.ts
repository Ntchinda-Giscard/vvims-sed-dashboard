
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deleteAgen: null,   
};

const deleteAgencySlice = createSlice({
  name: 'deleteAgen',
  initialState,
  reducers: {
    deleteAgency: (state, action) => {
      state.deleteAgen = action.payload;  // payload should contain user data
    },
  },
});

export const { deleteAgency } = deleteAgencySlice.actions;
export default deleteAgencySlice.reducer;