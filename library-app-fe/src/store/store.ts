import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './book/bookSlice';
import authorReducer from './author/authorSlice';

export const store = configureStore({
  reducer: {
    bookReducer,
    authorReducer
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;