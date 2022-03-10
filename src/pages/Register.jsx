import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { useForm } from 'react-hook-form';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.auth);

  const {
    register: register2,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [
    user,
    isError,
    isLoading,
    isSuccess,
    message,
    navigate,
    dispatch,
  ]);

  const onSubmit = (data) => {
    if (data.password === data.cPassword) {
      dispatch(register(data));
    } else {
      toast.error('Passwords do not match');
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="w-full flex justify-center flex-col">
        <section className="w-full flex flex-col items-center justify-center p-10">
          <h1 className="text-3xl text-green-500">
            <FaUser /> Register
          </h1>
          <p className="text-xl text-white">
            register for first time
          </p>
        </section>
        <section className="w-full flex justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2 flex flex-col"
          >
            <div className="mb-4">
              <label
                className="block text-green-500 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-green-500"
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                {...register2('email')}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-green-500 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-green-500"
                type="name"
                id="name"
                name="name"
                placeholder="Enter your name"
                {...register2('name')}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-green-500 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                {...register2('password')}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-green-500 text-sm font-bold mb-2"
                htmlFor="cPassword"
              >
                Confirm password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
                type="password"
                id="cPassword"
                name="cPassword"
                placeholder="Enter cPassword"
                {...register2('cPassword')}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-gray-800 hover:bg-gray-700 text-green-500 font-bold py-2 px-4 rounded"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default Register;
