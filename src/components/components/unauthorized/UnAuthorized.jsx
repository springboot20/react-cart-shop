import React from 'react';
import { Link } from 'react-router-dom';

const UnAuthorized = () => {
  return (
    <React.Fragment>
      <section className='flex justify-center items-center flex-col p-4 min-h-screen'>
        <div className='hero-container'>
          <p className='text-blue-500 text-center mb-10 text-6xl font-bold'>
            409
          </p>
          <h2 className='text-4xl text-red-500 font-bold mb-5 text-center'>
            Unauthorized Message
          </h2>
          <p className='text-2xl font-semibold text-gray-700 dark:text-white'>
            You are Unauthorized Please try to
            <Link to='/auth/signup' className='underline text-red-500 mx-2'>
              Signup
            </Link>
            /
            <Link to='/auth/signin' className='underline text-red-500 mx-2'>
              Signin
            </Link>
            to be authorized
          </p>
        </div>
      </section>
    </React.Fragment>
  );
};

export default UnAuthorized;
