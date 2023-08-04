import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { baseApiUrl } from "../../config/config";
import { IAuthor, IAuthorsResponse } from "../../models/author";



export interface AuthorState {
  loading: boolean;
  authors: Array<IAuthor>;
  error: string | undefined;
}

const initialState: AuthorState = {
  loading: false,
  authors: [],
  error: undefined,
}

export const fetchAuthors = createAsyncThunk(
  "authors/fetchAuthors",
  () => {
    const res = fetch(`${baseApiUrl}/authors`, { method: 'GET' }).then(data => data.json()).then(data => data as IAuthorsResponse);    
    return res;
  }
)

const authorSlice = createSlice({
  name: 'authors',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAuthors.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAuthors.fulfilled, (state, action: PayloadAction<IAuthorsResponse>) => {
      state.loading = false;
      state.authors = action.payload.data;
    });
    builder.addCase(fetchAuthors.rejected, (state, action) => {
      state.loading = false;
      state.authors = [];
      state.error = action.error.message;
    });
  },
  reducers: {}
})
export const authorSelector = (state: RootState) => state.authorReducer;
export default authorSlice.reducer;