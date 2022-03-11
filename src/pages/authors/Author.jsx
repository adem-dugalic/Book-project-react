import { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createAuthor,
  deleteAuthor,
  getAuthor,
  reset,
} from "../../features/authors/authorSlice";
import _ from "lodash";
import { toast } from "react-toastify";
import AuthorInfo from "../../components/Author/AuthorInfo";
import Spinner from "../../components/Spinner";

function Author() {
  const { id } = useParams();
  //For auth
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const author = useSelector((state) =>
    _.find(state.author.authors, { id: id })
  );

  const {
    // book: books,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.author);

  useEffect(() => {
    if (isSuccess && message) toast.success(message);
    //For auth
    // if (!user) {
    //   navigate('/login');
    // }

    if (!author) {
      dispatch(getAuthor(id));
    }

    dispatch(reset());
  }, [navigate, dispatch, id, author]);

  const deleteAnAuthor = async () => {
    dispatch(deleteAuthor(id));
    if (isSuccess) toast.success(message || "Author deleted!");
    navigate("/");
  };

  if (isLoading) <Spinner />;

  return (
    <div className="h-full">
      {author ? (
        <AuthorInfo
          id={id}
          data={author}
          isSuccess={isSuccess}
          isError={isError}
          isLoading={isLoading}
          deleteAnAuthor={deleteAnAuthor}
        />
      ) : (
        <>
          <h1>No author</h1>
        </>
      )}

      <AuthorInfo />
    </div>
  );
}

export default Author;
