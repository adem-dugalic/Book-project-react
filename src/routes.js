import Book from './pages/books/Book';
import Author from './pages/authors/Author';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AddBook from './pages/books/AddBook';
import AddAuthor from './pages/authors/AddAuthor';

export const MyRoutes = [
  { path: '/', component: Dashboard },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

export const MyRoutesProtected = [
  { path: '/book/:id', component: Book },
  { path: '/author/:id', component: Author },
  { path: '/addBook', component: AddBook },
  { path: '/addAuthor', component: AddAuthor },
];
