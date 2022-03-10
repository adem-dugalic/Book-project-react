import AddForm from '../../components/AddForm';
import Spinner from '../../components/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getAuthors,
  reset,
} from '../../features/authors/authorSlice';
import { useEffect } from 'react';

function AddBook() {
  const author = useSelector((state) => state.author);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (author.isError) {
      console.log(author.message);
    }
    if (!author.author?.length) dispatch(getAuthors());
  }, []);
  if (!author.authors?.length || author.isError) {
    return <h1>Cant get author</h1>;
  }

  if (author.isLoading) {
    return <Spinner />;
  }
  return (
    <div className="flex justify-center">
      <AddForm author={author} />
    </div>
  );
}

export default AddBook;
