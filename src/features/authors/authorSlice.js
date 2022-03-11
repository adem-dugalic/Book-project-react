import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorService from "./authorService";

const initialState = {
  authors: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get authors

export const getAuthors = createAsyncThunk(
  "book/getAuthors",
  async (thunkAPI) => {
    try {
      return await authorService.getAuthors();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Create author

export const createAuthor = createAsyncThunk(
  "author/createAuthor",
  async (author, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      // console.log(thunkAPI.getState().auth.user);
      return await authorService.createAuthor(author, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get a single author

export const getAuthor = createAsyncThunk(
  "author/getAuthor",
  async (authorId, thunkAPI) => {
    try {
      return await authorService.getAuthor(authorId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Edit a author
// be careful with author in this example authors has id:id and data:{}
export const editAuthor = createAsyncThunk(
  "author/editAuthor",
  async (author, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await authorService.editAuthor(author, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete a author

export const deleteAuthor = createAsyncThunk(
  "author/deleteAuthor",
  async (authorId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await authorService.deleteAuthor(authorId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get author authors

export const getAuthorBooks = createAsyncThunk(
  "author/getAuthorBooks",
  async (authorId, thunkAPI) => {
    try {
      return await authorService.getAuthorBooks(authorId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Add author authors
// here author has id:id and authors:[authors]
export const addAuthorBooks = createAsyncThunk(
  "author/addAuthorBooks",
  async (author, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await authorService.addAuthorBooks(author, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete author author
//here author has idauthor and idAuthor

export const deleteAuthorBook = createAsyncThunk(
  "author/deleteAuthorBook",
  async (author, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await authorService.deleteAuthorBook(author, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuthors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAuthors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.authors = action.payload;
      })
      .addCase(getAuthors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.authors = null;
      })
      .addCase(createAuthor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAuthor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.authors.push(action.payload);
      })
      .addCase(createAuthor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.author = null;
      })
      .addCase(deleteAuthor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAuthor.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.authors = state.authors.filter(
          (author) => author.id !== action.payload.book.id
        );
      })
      .addCase(deleteAuthor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.author = null;
      })
      .addCase(getAuthor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAuthor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.authors = action.payload;
      })
      .addCase(getAuthor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.authors = null;
      })
      .addCase(editAuthor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAuthor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.authors = action.payload;
      })
      .addCase(editAuthor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.authors = null;
      })
      .addCase(addAuthorBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAuthorBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.authors = action.payload;
      })
      .addCase(addAuthorBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.authors = null;
      })
      .addCase(deleteAuthorBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAuthorBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.authors = action.payload;
      })
      .addCase(deleteAuthorBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.authors = null;
      });
  },
});

export const { reset } = authorSlice.actions;
export default authorSlice.reducer;
