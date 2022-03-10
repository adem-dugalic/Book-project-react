import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  createBook,
  deleteBook,
  getBook,
  reset,
} from '../../features/books/bookSlice';
import _ from 'lodash';
import { toast } from 'react-toastify';
import BookInfo from '../../components/Book/BookInfo';
import Spinner from '../../components/Spinner';
function Book() {
  const { id } = useParams();
  //For auth
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const book = useSelector((state) =>
    _.find(state.book.books, { isbn: id })
  );

  const {
    // book: books,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.book);

  useEffect(() => {
    if (isSuccess && message) toast.success(message);
    //For auth
    if (!user) {
      navigate('/login');
    }

    if (!book) {
      dispatch(getBook(id));
    }

    dispatch(reset());
  }, [user, navigate, dispatch, id, book]);

  const deleteABook = async () => {
    dispatch(deleteBook(id));
    if (isSuccess) toast.success(message || 'Book deleted!');
    navigate('/');
  };

  if (isLoading) <Spinner />;
  return (
    <div className="h-full">
      {book ? (
        <BookInfo
          data={book}
          isSuccess={isSuccess}
          isError={isError}
          isLoading={isLoading}
          deleteABook={deleteABook}
        />
      ) : (
        <>
          <h1>No book</h1>
        </>
      )}

      <BookInfo />
    </div>
  );
}

export default Book;
