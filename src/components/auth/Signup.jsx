import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { selectLoggedInUser, createUserAsync } from './authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { CircularProgress } from '@mui/material';
import { useAxios } from '../../utils/axios';

export default function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const instance = useAxios();
  const [cookies, setCookies] = useCookies(["token"]);
  const user = useSelector(selectLoggedInUser);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



  useEffect(() => {
    if (cookies && cookies.token) {
      navigate("/")
    }
  }, [cookies]);


  // useEffect(() => {
  //   if (user?.success) {
  //     console.log(user, "hjfdsfsj")
  //     setCookies("token", user.token);
  //     localStorage.setItem("isAdmin", false);
  //     localStorage.setItem("userId", user.user._id);
  //     localStorage.setItem("token", user.token);
  //     toast(" User Signup Successful")
  //     navigate("/")
  //   }
  // }, [user])



  return (
    <>
      {/* {user && <Navigate to="/" replace={true}></Navigate>} */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://cdn.pixabay.com/photo/2018/08/29/17/07/ecommerce-3640321_1280.jpg"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a New Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit(async (data) => {
              setLoading(true)
              console.log(data, "dfkasldjfksd")
              try {
                const res = await instance.post("/register", data)
                if (res.data) {
                  setCookies("token", res.data.token);
                  localStorage.setItem("isAdmin", false);
                  localStorage.setItem("userId", res.data.user._id);
                  localStorage.setItem("token", res.data.token);
                  toast(" User Register Successful")
                  navigate("/")
                  setLoading(false)
                }

              } catch (error) {
                toast.error("Invalid email or password ")
                setLoading(false)
                console.log(error)

              }
              console.log(data, "sjkdfahasdk");
            })}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Enter Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  {...register('name', {
                    required: 'name is required',
                    // pattern: {
                    //   value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    //   message: 'email not valid',
                    // },
                  })}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email', {
                    required: 'email is required',
                    // pattern: {
                    //   value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    //   message: 'email not valid',
                    // },
                  })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>


            <div>
              <label
                htmlFor="referral"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Referral Code
              </label>
              <div className="mt-2">
                <input
                  id="referral"
                  {...register('referral', {
                    // required: 'email is required',
                    // pattern: {
                    //   value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    //   message: 'email not valid',
                    // },
                  })}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {/* {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )} */}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register('password', {
                    required: 'password is required',
                    // pattern: {
                    //   value:
                    //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                    //   message: `- at least 8 characters\n
                    //   - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                    //   - Can contain special characters`,
                    // },
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  {...register('confirmPassword', {
                    required: 'confirm password is required',
                    validate: (value, formValues) =>
                      value === formValues.password || 'password not matching',
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div> */}

            <div>
              {loading ? <CircularProgress /> : <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>}
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a Member?{' '}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
