import AddAuthorForm from "../../components/Author/AddAuthorForm";
import Spinner from "../../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { getBooks, reset } from "../../features/books/bookSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

function AddAuthor() {
  const book = useSelector((state) => state.book);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (book.isError) {
      toast.error(book.message);
    }
    if (!book.book?.length) dispatch(getBooks());
  }, []);
  if (!book.books?.length || book.isError) {
    return <h1>Cant get book</h1>;
  }

  if (book.isLoading) {
    return <Spinner />;
  }
  return (
    <div className="flex justify-center">
      <AddAuthorForm book={book} />
    </div>
  );
}

export default AddAuthor;
