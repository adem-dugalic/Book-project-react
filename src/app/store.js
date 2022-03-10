import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import bookReducer from "../features/books/bookSlice";
import authorReducer from "../features/authors/authorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    book: bookReducer,
    author: authorReducer,
  },
});
