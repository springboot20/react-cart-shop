/** @format */

import { useState } from 'react';
import { useFormik } from 'formik';
import { basicSchema } from '../schema/Schema';
import { useAuth } from '../../util/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../inputField/InputField';
import IconType from '../icon/IconType';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { CountriesData } from '../data/countriesStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  country: '',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
};
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState('');

  const handleFileChange = (event) => {
    const files = event.target.files[0];
    setFile(files);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const { signUp, signUpError } = useAuth();
  const { values, handleSubmit, handleBlur, handleChange, touched, errors, isSubmitting } = useFormik({
    initialValues,
    validationSchema: basicSchema,
    onSubmit: async (values) => {
      console.log(values);
      if (values) {
        const { streetAddress, city, state, zipCode, ...rest } = values;
        await signUp({
          ...rest,
          address: {
            streetAddress,
            city,
            state,
            zipCode,
          },
        });
        toast.success('You have successfully signed in...');

        await new Promise((resolve) => setTimeout(resolve, 1500));
        navigate('/signin', { replace: true });
      } else {
        toast.error(signUpError);
      }
    },
  });
  return (
    <div className='container mx-auto px-12 max-w-[86rem] lg:max-w-7xl xl:max-w-[95rem] 2xl:max-w-[110rem] mb-16'>
      <form onSubmit={handleSubmit} className='flex-shrink-0 max-w-6xl mx-auto bg-white rounded-lg mt-32'>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <legend className='my-5 text-center font-semibold text-3xl text-violet-700'>Sign Up</legend>
            <h2 className='text-2xl font-bold leading-7 text-gray-900'>Personal Information</h2>
            <p className='mt-1 text-md leading-6 text-gray-600'>Use a permanent address where you can receive mail.</p>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <fieldset className='mb-2'>
                  <label htmlFor='firstName' className='block text-lg font-semibold  leading-6 text-gray-900'>
                    First name
                  </label>
                  <div className='mt-2'>
                    <InputField type='text' name='firstName' id='firstName' autoComplete='given-name' placeholder='Enter your first name here...' onChange={handleChange} onBlur={handleBlur} value={values.firstName} className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-semibold sm:leading-6 ${errors.firstName && touched.firstName ? 'ring-red-600 ring-[0.15rem]' : ''}`} />
                  </div>
                </fieldset>
                {errors.firstName && touched.firstName && <small className='text-xl block text-red-600'>{errors.firstName}</small>}
              </div>

              <div className='sm:col-span-3'>
                <fieldset className='mb-2'>
                  <label htmlFor='lastName' className='block text-lg font-semibold  leading-6 text-gray-900'>
                    Last name
                  </label>
                  <div className='mt-2'>
                    <InputField type='text' name='lastName' id='lastName' autoComplete='family-name' placeholder='Enter your last name here...' onChange={handleChange} onBlur={handleBlur} value={values.lastName} className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-semibold sm:leading-6 ${errors.lastName && touched.lastName ? 'ring-red-600 ring-[0.15rem]' : ''}`} />
                  </div>
                </fieldset>
                {errors.lastName && touched.lastName && <small className='text-xl block text-red-600'>{errors.lastName}</small>}
              </div>

              <div className='sm:col-span-3'>
                <fieldset className='mb-2'>
                  <label htmlFor='email' className='block text-lg font-semibold  leading-6 text-gray-900'>
                    Email address
                  </label>
                  <div className='mt-2'>
                    <InputField id='email' name='email' type='email' autoComplete='email' onChange={handleChange} onBlur={handleBlur} value={values.email} className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-semibold sm:leading-6 ${errors.email && touched.email ? 'ring-red-600 ring-[0.15rem]' : ''}`} />
                  </div>
                </fieldset>
                {errors.email && touched.email && <small className='text-xl block text-red-600'>{errors.email}</small>}
              </div>

              <div className='sm:col-span-3'>
                <fieldset className='mb-2'>
                  <label htmlFor='password' className='block text-lg font-semibold  leading-6 text-gray-900'>
                    Password
                  </label>
                  <div className='mt-2 relative'>
                    <InputField id='password' name='password' type={showPassword ? 'text' : 'password'} autoComplete='password' onChange={handleChange} onBlur={handleBlur} value={values.password} className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-semibold sm:leading-6 ${errors.password && touched.password ? 'ring-red-600 ring-[0.15rem]' : ''}`} />
                    <IconType iconType={showPassword ? faEyeSlash : faEye} onClick={handleTogglePassword} className={`eye-icon absolute top-[50%] translate-y-[-50%] right-4 cursor-pointer text-xl ${showPassword ? 'text-gray-500' : 'text-gray-700'} `} />
                  </div>
                  {errors.password && touched.password && <small className='text-xl block text-red-600'>{errors.password}</small>}
                </fieldset>
              </div>

              <div className='col-span-full'>
                <label htmlFor='country' className='block text-lg font-semibold  leading-6 text-gray-900'>
                  Country
                </label>
                <div className='mt-2'>
                  <select id='country' name='country' autoComplete='country-name' value={values.country} onChange={handleChange} className='block rounded-md border-0 py-3 w-full text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-semibold sm:leading-6'>
                    <option>Select your country</option>
                    {CountriesData.map(({ name, code }) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='col-span-full'>
                <label htmlFor='streetAddress' className='block text-lg font-semibold  leading-6 text-gray-900'>
                  Street address
                </label>
                <div className='mt-2'>
                  <InputField type='text' name='streetAddress' id='streetAddress' autoComplete='street-address' value={values.streetAddress} onChange={handleChange} className='block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-semibold sm:leading-6' />
                </div>
              </div>

              <div className='sm:col-span-2 sm:col-start-1'>
                <label htmlFor='city' className='block text-lg font-semibold  leading-6 text-gray-900'>
                  City
                </label>
                <div className='mt-2'>
                  <InputField type='text' name='city' id='city' value={values.city} onChange={handleChange} autoComplete='address-level2' className='block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-semibold sm:leading-6' />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label htmlFor='state' className='block text-lg font-semibold  leading-6 text-gray-900'>
                  State / Province
                </label>
                <div className='mt-2'>
                  <InputField type='text' name='state' id='state' value={values.state} onChange={handleChange} autoComplete='address-level1' className='block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-semibold sm:leading-6' />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label htmlFor='zipCode' className='block text-lg font-semibold  leading-6 text-gray-900'>
                  ZIP / Postal code
                </label>
                <div className='mt-2'>
                  <InputField type='text' name='zipCode' id='zipCode' autoComplete='zipCode' value={values.zipCode} onChange={handleChange} className='block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-semibold sm:leading-6' />
                </div>
              </div>

              <div className='col-span-full'>
                <label htmlFor='cover-photo' className='block text-sm font-medium leading-6 text-gray-900'>
                  Cover photo
                </label>
                <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                  <div className='text-center'>
                    {file ? (
                      <img src={URL.createObjectURL(file)} alt='' className='rounded-full h-28 w-28 object-cover mx-auto' />
                    ) : (
                      <svg className='mx-auto h-12 w-12 text-gray-300' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
                        <path fillRule='evenodd' d='M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z' clipRule='evenodd'></path>
                      </svg>
                    )}
                    <div className='mt-4 flex items-end leading-6 text-gray-600'>
                      <label htmlFor='file-upload' className='relative cursor-pointer bg-white font-semibold text-indigo-600 hover:underline hover:text-indigo-500'>
                        <span className='block text-lg'>Upload a file</span>
                        <input id='file-upload' name='file-upload' type='file' accept='image/*' className='sr-only' onChange={handleFileChange} />
                      </label>
                      <p className='pl-1'>or drag and drop</p>
                    </div>
                    <p className='text-xs leading-5 text-gray-600'>PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6'>
          <button type='submit' disabled={isSubmitting} className='rounded-md w-full bg-indigo-600 px-3 py-3 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
            {isSubmitting ? <span>Signing up...</span> : <span>Sign up</span>}
          </button>
        </div>
        <p className='mt-4 text-xl font-semibold'>
          Already have an account ?
          <Link to='/signin' className='text-[#167ece] ml-2'>
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
