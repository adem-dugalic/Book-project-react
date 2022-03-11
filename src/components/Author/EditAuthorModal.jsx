import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../features/books/bookSlice";
import {
  editAuthor,
  addAuthorBooks,
  deleteAuthorBook,
} from "../../features/authors/authorSlice";
function EditAuthorModal(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { books, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.book
  );

  useEffect(() => {
    if (!books.length) dispatch(getBooks());
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (data.firstName && props.id) {
      const authorData = {
        id: props.id,
        data: data,
      };
      dispatch(editAuthor(authorData));
      if (data.idBook.length)
        dispatch(
          addAuthorBooks({
            id: props.id,
            idBooks: { idBooks: data.idBook },
          })
        );
      dispatch(
        deleteAuthorBook({
          idAuthor: props.id,
          idBook: data.idBookRemove,
        })
      );
    }
  };

  return (
    <div className="overflow-y-hidden bg-gray-500 bg-opacity-25 shadow-2xl overflow-x-hidden fixed  left-0 z-50 justify-center items-center  md:inset-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative px-4 w-full max-w-2xl h-full md:h-auto left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
      >
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* <!-- Modal header --> */}
          <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
              Edit Author
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => props.setModal(false)}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div className="p-6 space-y-6">
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="firstName"
                id="firstName"
                defaultValue={props.data.firstName}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 
            border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 
            focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                required
                {...register("firstName")}
              />
              <label
                htmlFor="firstName"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
            -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 
            peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Author name
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="lastName"
                id="lastName"
                defaultValue={props.data.lastName}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 
            border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 
            focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                {...register("lastName")}
              />
              <label
                htmlFor="lastName"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 
            transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600
             peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
              peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Surname
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="image"
                id="image"
                defaultValue={props.data.image}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 
            border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 
            focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                required
                {...register("image")}
              />
              <label
                htmlFor="image"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
            -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 
            peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Image url
              </label>
            </div>
            <div className="grid xl:grid-cols-2 xl:gap-6">
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  name="dob"
                  id="dob"
                  defaultValue={props.data.dob}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 
              border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 
              focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  {...register("dob")}
                />
                <label
                  htmlFor="dob"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
              -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 
              peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
              peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Date of birth
                </label>
              </div>
            </div>
            <div className="grid xl:grid-cols-2 xl:gap-6">
              <div className="relative z-0 mb-6 w-full group">
                <label
                  htmlFor="books"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Remove an author
                </label>
                <select
                  id="booksR"
                  name="booksR"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
               dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
               dark:focus:border-blue-500"
                  {...register("idBookRemove")}
                >
                  {props.books?.map((item) => (
                    <option value={item.book.isbn} key={item.book.isbn}>
                      {item.book.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <label
                  htmlFor="books"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Add authors
                </label>
                <select
                  id="books"
                  name="books"
                  multiple={true}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
               dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
               dark:focus:border-blue-500"
                  {...register("idBook")}
                >
                  {books?.map((item) => (
                    <option value={item.isbn} key={item.isbn}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative z-0 mb-6 w-full group"></div>
            </div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Please use Control+LClick to select multiple
            </label>
          </div>
          {/* <!-- Modal footer --> */}
          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button
              data-modal-toggle="defaultModal"
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              I accept
            </button>
            <button
              onClick={() => props.setModal(false)}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditAuthorModal;
