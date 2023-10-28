import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InternationlizationState = {
  lng: string;
};

const initialState = {
  lng: 'en',
} as InternationlizationState;

export const internationlization = createSlice({
  name: 'internationlization',
  initialState,
  reducers: {
    reset: () => initialState,
    updateLanguage: (state, action: PayloadAction<string>) => {
      state.lng = action.payload;
    },
  },
});

export const {
  updateLanguage,
  reset,
} = internationlization.actions;
export default internationlization.reducer;
