import { toSafeInteger } from 'lodash';
import { useEffect } from 'react';
import { Fragment, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import EditAuthorModal from './EditAuthorModal';

function AuthorInfo(props) {
  const [modal, setModal] = useState(false);

  useEffect(() => {}, []);

  if (!props.data) {
    return null;
  }

  return (
    <Fragment>
      <div className="relative text-center mt-10 mb-10 text-green-400 flex justify-center h-full">
        <div className="relative w-1/2 h-full">
          <div className="relative w-full h-1/4 grid grid-cols-2">
            <div className="">
              <h2 className="text-3xl mt-3">
                {props.data.firstName + ' ' + props.data.lastName}
              </h2>
            </div>
            <div className="">
              <button
                className="p-2 text-red-500 hover:bg-gray-600 bg-gray-700 rounded-2xl mr-5"
                onClick={() => props.deleteAnAuthor()}
              >
                <AiOutlineDelete size={40} />
              </button>
              <button
                className="p-2 text-cyan-500 hover:bg-gray-600 bg-gray-700 rounded-2xl"
                data-modal-toggle="defaultModal"
                onClick={() => setModal(!modal)}
              >
                <FiEdit size={40} />
              </button>
            </div>
          </div>
          <div className="relative w-full h-full flex flex-col text-left text-xl">
            <p>
              Date of birth:{' '}
              <span className="text-white">{props.data.dob}</span>
            </p>
            <p>
              Image url:{' '}
              <span className="text-white">{props.data.image}</span>
            </p>
            <p>
              Books:{' '}
              {props.data.books?.map((item) => (
                <span key={item.book.isbn} className="text-white">
                  <br />
                  {'- '}
                  {item.book.title}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
      {modal ? (
        <EditAuthorModal
          id={props.id}
          setModal={setModal}
          authors={props.data.books}
          data={props.data}
        />
      ) : (
        ''
      )}
    </Fragment>
  );
}

export default AuthorInfo;
