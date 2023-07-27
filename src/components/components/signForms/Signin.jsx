/** @format */

import React, { useState } from 'react';
import InputField from '../inputField/InputField';
import { useFormik } from 'formik';
import { signInSchema } from '../schema/Schema';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../util/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconType from '../icon/IconType';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

const initialValues = {
  email: '',
  password: '',
};
const Signin = () => {
  const { signIn, signinMsg, signinErrMsg } = useAuth();
  const navigate = useNavigate();
  // const location = useLocation();
  // const redirectPath = location.state.path || '/';

  const [showPassword, setShowPassword] = useState(false);

  const {
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      if (values) {
        const { email, password } = values;
        let response = await signIn(email, password);
        if (response) {
          toast.success(signinMsg.message);
          await new Promise((resolve) => setTimeout(resolve, 1500));
          navigate('/', { replace: true });
        } else {
          toast.error(signinErrMsg.message);
        }
      }
    },
  });

  return (
    <div className='min-h-screen flex justify-center items-center mx-auto px-10 md:px-0'>
      <form
        onSubmit={handleSubmit}
        className='max-w-3xl w-full bg-white rounded-lg'>
        <legend className='my-5 text-center font-semibold text-3xl text-violet-700'>
          Sign In
        </legend>
        <div className='border-t-2 border-gray-900/10 mt-4'>
          <fieldset className='mb-5 mt-5'>
            <div className='mb-2'>
              <label
                htmlFor='email'
                className='block text-xl font-semibold leading-6 text-gray-900'>
                Email address
              </label>
              <div className='mt-2'>
                <InputField
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg font-semibold sm:leading-6 ${
                    errors.email && touched.email
                      ? 'ring-red-600 ring-[0.15rem]'
                      : ''
                  }`}
                />
              </div>
            </div>
            {errors.email && touched.email && (
              <small className='text-xl block text-red-600'>
                {errors.email}
              </small>
            )}
          </fieldset>

          <fieldset>
            <div className='mb-3'>
              <label
                htmlFor='password'
                className='block text-xl font-semibold leading-6 text-gray-900'>
                Password
              </label>
              <div className='mt-2 relative'>
                <InputField
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  autoComplete='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg font-semibold sm:leading-6 ${
                    errors.password && touched.password
                      ? 'ring-red-600 ring-[0.15rem]'
                      : ''
                  }`}
                />
                <IconType
                  iconType={showPassword ? faEyeSlash : faEye}
                  onClick={() => setShowPassword(!showPassword)}
                  className={`eye-icon absolute top-[50%] translate-y-[-50%] right-4 cursor-pointer text-xl ${
                    showPassword ? 'text-gray-700' : 'text-gray-500'
                  } `}
                />
              </div>
            </div>
            {errors.password && touched.password && (
              <small className='text-xl block text-red-600'>
                {errors.password}
              </small>
            )}
          </fieldset>
        </div>

        <div className='mt-6'>
          <button
            type='submit'
            disabled={isSubmitting}
            className='rounded-md w-full bg-indigo-600 px-3 py-3 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70'>
            {isSubmitting ? <span>Signing in...</span> : <span>Sign in</span>}
          </button>
        </div>
        <p className='mt-4 text-xl font-semibold'>
          Don't have an account ?
          <Link to='/auth/signup' className='text-[#167ece] ml-2'>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
