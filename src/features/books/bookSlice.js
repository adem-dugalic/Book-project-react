import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookService from "./bookService";

const initialState = {
  books: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get books

export const getBooks = createAsyncThunk("book/getBooks", async (thunkAPI) => {
  try {
    return await bookService.getBooks();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

//Create book

export const createBook = createAsyncThunk(
  "book/createBook",
  async (book, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      // console.log(thunkAPI.getState().auth.user);
      return await bookService.createBook(book, token);
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

//Get a single book

export const getBook = createAsyncThunk(
  "book/getBook",
  async (bookId, thunkAPI) => {
    try {
      return await bookService.getBook(bookId);
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

//Edit a book
// be careful with book in this example books has id:id and data:{}
export const editBook = createAsyncThunk(
  "book/editBook",
  async (book, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await bookService.editBook(book, token);
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

//Delete a book

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (bookId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await bookService.deleteBook(bookId, token);
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

//Get book authors

export const getBookAuthors = createAsyncThunk(
  "book/getBookAuthors",
  async (bookId, thunkAPI) => {
    try {
      return await bookService.getBookAuthors(bookId);
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

//Add book authors
// here book has id:id and authors:[authors]
export const addBookAuthors = createAsyncThunk(
  "book/addBookAuthors",
  async (book, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await bookService.addBookAuthors(book, token);
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

//Delete book author
//here book has idBook and idAuthor

export const deleteBookAuthor = createAsyncThunk(
  "book/deleteBookAuthor",
  async (book, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await bookService.deleteBookAuthor(book, token);
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

export const bookSlice = createSlice({
  name: "book",
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
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.books = null;
      })
      .addCase(createBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books.push(action.payload);
      })
      .addCase(createBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.book = null;
      })
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.books = state.books.filter(
          (book) => book.isbn !== action.payload.book.isbn
        );
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.book = null;
      })
      .addCase(getBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(getBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.books = null;
      })
      .addCase(editBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(editBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.books = null;
      })
      .addCase(addBookAuthors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBookAuthors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(addBookAuthors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.books = null;
      })
      .addCase(deleteBookAuthor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBookAuthor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(deleteBookAuthor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.books = null;
      });
  },
});

export const { reset } = bookSlice.actions;
export default bookSlice.reducer;
