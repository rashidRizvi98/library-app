
// src/features/user/userSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { baseApiUrl } from "../../config/config";

export interface IBook {
  id: string;
  name: string;
  isbn: string;
  author: any;
}

export interface BookState {
  loading: boolean;
  books: Array<IBook>;
  error: string | undefined;
}

const initialState: BookState = {
  loading: false,
  books: [],
  error: undefined,
}

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  () => {
    const res = fetch(`${baseApiUrl}/books`, { method: 'GET' }).then(data => data.json());
    return res;
  }
)
const bookSlice = createSlice({
  name: 'books',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Array<IBook>>) => {
      state.loading = false;
      state.books = action.payload;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      state.books = [];
      state.error = action.error.message;
    });
  },
  reducers: {}
})
export const bookSelector = (state: RootState) => state.bookReducer;
export default bookSlice.reducer;