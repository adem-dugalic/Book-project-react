import { FaBook, FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

function BookListCard(props) {
  return (
    <div className="relative text-green-600">
      <div className="flex justify-center items-center h-20">
        {/* prop for author or books */}
        <h2 className="text-2xl">{props.title}</h2>
      </div>
      <div className="relative grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 h-full mr-3 ml-3">
        {props.title === "Books"
          ? props?.data.map((item) => (
              <div className="" key={item.isbn}>
                <Link
                  to={`/book/${item.isbn}`}
                  className="lg:w-70 w-60 h-35 min-w-full md:h-45 max-h-full p-10 grid grid-cols-1
                   bg-gray-700 hover:bg-gray-600 rounded-md"
                >
                  <div className="justify-center flex items-center">
                    <FaBook size="80" />
                  </div>
                  <div className="justify-center flex text-white">
                    <h6 className="text-center pt-5">{item.title}</h6>
                  </div>
                </Link>
              </div>
            ))
          : props?.data.map((item) => (
              <div
                className="md:w-60 lg:w-70 w-60 h-35 min-w-full md:h-45 max-h-full"
                key={item.id}
              >
                <Link
                  to={`/author/${item.id}`}
                  className="w-full h-full p-10 grid grid-cols-1  bg-gray-700 hover:bg-gray-600 rounded-md"
                >
                  <div className="justify-center flex items-center">
                    <FaUserEdit size="80" />
                  </div>
                  <div className="justify-center flex text-white">
                    <h6 className="text-center pt-5">{item.firstName}</h6>
                  </div>
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
}

export default BookListCard;
