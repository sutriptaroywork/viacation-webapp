import { configureStore } from '@reduxjs/toolkit';
import internationlizationSlice from './features/internationlizationSlice';

export const store = configureStore({
  reducer: { internationlizationSlice },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;