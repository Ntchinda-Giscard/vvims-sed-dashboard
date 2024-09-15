
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editPos: null,   
};

const editPosSlice = createSlice({
  name: 'editPos',
  initialState,
  reducers: {
    editPosition: (state, action) => {
      state.editPos = action.payload;  // payload should contain user data
    },
  },
});

export const { editPosition } = editPosSlice.actions;
export default editPosSlice.reducer;