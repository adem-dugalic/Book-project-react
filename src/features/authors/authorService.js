import axios from 'axios';

const API_URL = 'http://localhost:4000/authors/';

//Get authors
const getAuthors = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

//Create author

const createAuthor = async (author, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(config);
  const response = await axios.post(API_URL, author, config);
  return response.data;
};

//Get a single author

const getAuthor = async (authorId) => {
  const response = await axios.get(API_URL + `${authorId}`);
  return [response.data];
};

//Edit a author
// be careful with author in this example authors has id:id and data:{}
const editAuthor = async (author, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_URL + `${author.id}`,
    author.data,
    config
  );
  return response.data;
};

//Delete a author

const deleteAuthor = async (authorId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    API_URL + `${authorId}`,
    config
  );
  return response.data;
};

//Get author books

const getAuthorBooks = async (authorId) => {
  const response = await axios.get(API_URL + `${authorId}/books`);
  return response.data;
};

//Add author book
// check!!!!
const addAuthorBooks = async (author, token) => {
  console.log('in service of author books', author);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL + `${author.id}/books`,
    author.idBooks,
    config
  );
  return response.data;
};

//Delete book author
//here books has idBook and idAuthor
const deleteAuthorBook = async (author, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    API_URL + `/${author.idBook}/authors/${author.idAuthor}`,
    config
  );
  return response.data;
};

const authorService = {
  getAuthor,
  getAuthorBooks,
  getAuthors,
  createAuthor,
  deleteAuthor,
  deleteAuthorBook,
  editAuthor,
  addAuthorBooks,
};

export default authorService;
