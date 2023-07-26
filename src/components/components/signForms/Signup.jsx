/** @format */

import { useState } from 'react';
import { useFormik } from 'formik';
import { basicSchema } from '../schema/Schema';
import { useAuth } from '../../util/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../inputField/InputField';
import IconType from '../icon/IconType';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const { signUp, signupMsg, signupErrMsg } = useAuth();
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
    validationSchema: basicSchema,
    onSubmit: async (values) => {
      const { confirmPassword, ...rest } = values;
      if (rest) {
        let response = await signUp(rest);
        if (response) {
          toast.success(signupMsg);
          await new Promise((resolve) => setTimeout(resolve, 1500));
          navigate('/auth/signin', { replace: true });
        } else {
          toast.error(signupErrMsg.message);
        }
      }
    },
  });
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form
        onSubmit={handleSubmit}
        className='flex-shrink-0 max-w-3xl w-full mx-auto bg-white rounded-lg'>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <legend className='my-5 text-center font-semibold text-3xl text-violet-700'>
              Sign Up
            </legend>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='col-span-full'>
                <fieldset className='mb-2'>
                  <label
                    htmlFor='Username'
                    className='block text-xl font-semibold  leading-6 text-gray-900'>
                    Username
                  </label>
                  <div className='mt-2'>
                    <InputField
                      type='text'
                      name='username'
                      id='username'
                      autoComplete='given-name'
                      placeholder='Enter your username here...'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-semibold sm:leading-6 ${
                        errors.username && touched.username
                          ? 'ring-red-600 ring-[0.15rem]'
                          : ''
                      }`}
                    />
                  </div>
                </fieldset>
                {errors.username && touched.username && (
                  <small className='text-xl block text-red-600'>
                    {errors.username}
                  </small>
                )}
              </div>

              <div className='col-span-full'>
                <fieldset className='mb-2'>
                  <label
                    htmlFor='email'
                    className='block text-xl font-semibold  leading-6 text-gray-900'>
                    Email address
                  </label>
                  <div className='mt-2'>
                    <InputField
                      id='email'
                      name='email'
                      type='email'
                      autoComplete='email'
                      placeholder='Enter your email here...'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-semibold sm:leading-6 ${
                        errors.email && touched.email
                          ? 'ring-red-600 ring-[0.15rem]'
                          : ''
                      }`}
                    />
                  </div>
                </fieldset>
                {errors.email && touched.email && (
                  <small className='text-xl block text-red-600'>
                    {errors.email}
                  </small>
                )}
              </div>

              <div className='col-span-full'>
                <fieldset className='mb-2'>
                  <label
                    htmlFor='password'
                    className='block text-xl font-semibold  leading-6 text-gray-900'>
                    Password
                  </label>
                  <div className='mt-2 relative'>
                    <InputField
                      id='password'
                      name='password'
                      type={showPassword ? 'text' : 'password'}
                      autoComplete='password'
                      placeholder='Enter your password here...'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-semibold sm:leading-6 ${
                        errors.password && touched.password
                          ? 'ring-red-600 ring-[0.15rem]'
                          : ''
                      }`}
                    />
                    <IconType
                      iconType={showPassword ? faEyeSlash : faEye}
                      onClick={handleTogglePassword}
                      className={`eye-icon absolute top-[50%] translate-y-[-50%] right-4 cursor-pointer text-xl ${
                        showPassword ? 'text-gray-700' : 'text-gray-500'
                      } `}
                    />
                  </div>
                  {errors.password && touched.password && (
                    <small className='text-xl block text-red-600'>
                      {errors.password}
                    </small>
                  )}
                </fieldset>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6'>
          <button
            type='submit'
            disabled={isSubmitting}
            className='rounded-md w-full bg-indigo-600 px-3 py-3 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
            {isSubmitting ? <span>Signing up...</span> : <span>Sign up</span>}
          </button>
        </div>
        <p className='mt-4 text-xl font-semibold'>
          Already have an account ?
          <Link to='/auth/signin' className='text-[#167ece] ml-2'>
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
