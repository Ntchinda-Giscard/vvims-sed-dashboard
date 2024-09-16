
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  delServ: null,   
};

const delServSlice = createSlice({
  name: 'delServ',
  initialState,
  reducers: {
    deleteService: (state, action) => {
      state.delServ = action.payload;  // payload should contain user data
    },
  },
});

export const { deleteService } = delServSlice.actions;
export default delServSlice.reducer;