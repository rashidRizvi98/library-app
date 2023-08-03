// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './book/bookSlice';

export const store = configureStore({
  reducer: {
    bookReducer
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;