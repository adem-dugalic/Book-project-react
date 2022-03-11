/* eslint-disable no-undef */
import { toSafeInteger } from "lodash";
import { useEffect } from "react";
import { Fragment, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import EditModal from "../EditModal";

function BookInfo(props) {
  const [modal, setModal] = useState(false);

  useEffect(() => {}, []);

  if (!props.data) {
    return null;
  }

  return (
    <Fragment>
      <div className="relative text-center mt-10 mb-10 text-green-400 flex justify-center h-full">
        <div className="relative w-3/4 sm:w-1/2 h-full">
          <div className="relative w-full h-1/4 grid grid-cols-2">
            <div className="">
              <h2 className="text-3xl mt-3">{props.data.title}</h2>
            </div>
            <div className="flex ml-10 h-1/2 flex-col sm:flex-row sm:ml-0">
              <button
                className="p-2 h-14 mt-3 w-14 text-red-500 hover:bg-gray-600 bg-gray-700 rounded-2xl mr-0 sm:mr-5"
                onClick={() => props.deleteABook()}
              >
                <AiOutlineDelete size={40} />
              </button>
              <button
                className="p-2 h-14 w-14 mt-3 text-cyan-500 hover:bg-gray-600 bg-gray-700 rounded-2xl"
                data-modal-toggle="defaultModal"
                onClick={() => setModal(!modal)}
              >
                <FiEdit size={40} />
              </button>
            </div>
          </div>
          <div className="flex">
            <div className="flex-auto">
              <img src={`${props.data.image}`}></img>
            </div>
            <div className="relative w-full h-full flex flex-col text-center text-xl">
              <p>
                Published:{" "}
                <span className="text-white">{props.data.published}</span>{" "}
              </p>
              <p>
                Pages: <span className="text-white">{props.data.pages}</span>
              </p>
              <p>
                IsBn: <span className="text-white">{props.data.isbn}</span>
              </p>
              <p>
                Authors:
                {props.data.authors?.map((item) => (
                  <span key={item.author.id} className="text-white">
                    <br />
                    {"- "}
                    {item.author.firstName}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
      {modal ? (
        <EditModal
          setModal={setModal}
          authors={props.data.authors}
          data={props.data}
        />
      ) : (
        ""
      )}
    </Fragment>
  );
}

export default BookInfo;
