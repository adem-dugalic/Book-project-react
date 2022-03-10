import { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getBooks, reset } from '../features/books/bookSlice';
import Spinner from '../components/Spinner';
import { getAuthors } from '../features/authors/authorSlice';
import ListCards from '../components/ListCards';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { books, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.book);

  const {
    authors,
    isLoading: authorLoading,
    isError: authorError,
    isSuccess: authorSucc,
    message: authorMsg,
  } = useSelector((state) => state.author);

  useEffect(() => {
    if (isError || authorError) toast.error(message || authorMsg);
    dispatch(getBooks());
    dispatch(getAuthors());
    dispatch(reset());
  }, [isError, authorError, message, navigate, dispatch]);

  if (isLoading) {
    <Spinner />;
  }

  console.log(books);
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="">
        {books ? (
          <ListCards data={books} title={'Books'} />
        ) : (
          <h1>No books</h1>
        )}
      </div>
      <div className="">
        {authors ? (
          <ListCards data={authors} title={'Authors'} />
        ) : (
          <h1>No Authors</h1>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
