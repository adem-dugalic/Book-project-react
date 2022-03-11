import axios from "axios";

const API_URL = "http://localhost:4000/books/";

//Get books
const getBooks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

//Create book

const createBook = async (book, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, book, config);
  return response.data;
};

//Get a single book

const getBook = async (bookId) => {
  const response = await axios.get(API_URL + `${bookId}`);
  return [response.data];
};

//Edit a book
// be careful with book in this example books has id:id and data:{}
const editBook = async (book, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(API_URL + `${book.isbn}`, book, config);
  return response.data;
};

//Delete a book

const deleteBook = async (bookId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + `${bookId}`, config);
  return response.data;
};

//Get book authors

const getBookAuthors = async (bookId) => {
  const response = await axios.get(API_URL + `${bookId}/authors`);
  return response.data;
};

//Add book authors
// here book has id:id and authors:[authors]
const addBookAuthors = async (book, token) => {
  console.log("in book service autors", book);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL + `${book.isbn}/authors`,
    book.idAuthors,
    config
  );
  return response.data;
};

//Delete book author
//here books has idBook and idAuthor
const deleteBookAuthor = async (book, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    API_URL + `${book.idBook}/authors/${book.idAuthor}`,
    config
  );
  return response.data;
};

const bookService = {
  getBook,
  getBookAuthors,
  getBooks,
  createBook,
  deleteBook,
  deleteBookAuthor,
  editBook,
  addBookAuthors,
};

export default bookService;
