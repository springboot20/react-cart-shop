import React from 'react';
import { formatPrice } from '../../helper/formatPrice';
import Button from '../icon/Button';
import { useAuth } from '../../util/AuthContext';
import { Link } from 'react-router-dom';

const CartTotal = () => {
  const { auth } = useAuth();

  return (
    <div className='max-w-xl self-end w-full'>
      <div className='p-6 bg-white rounded-md shadow-md'>
        <div className='container border-b border-b-blue-gray-700 pb-8 space-y-4'>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-bold text-gray-800'>Subtotal : </h2>
            <p className='text-lg font-semibold text-gray-700'>
              {formatPrice(233.3)}
            </p>
          </div>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-medium text-gray-800'>
              Shipping fee :
            </h2>
            <p className='text-lg font-semibold text-gray-700'>
              {formatPrice(1.55)}
            </p>
          </div>
        </div>
        <div className='container flex justify-between items-center mt-3'>
          <h1 className='text-2xl font-bold'>Order Total : </h1>
          <p className='text-lg font-semibold text-gray-700'>
            {formatPrice(399)}
          </p>
        </div>
      </div>
      {!auth ? (
        <Link
          to='/auth/signin'
          className='px-6 py-3 rounded-md bg-gray-800 text-white w-full text-xl font-semibold dark:bg-white dark:text-gray-800'>
          Log In
        </Link>
      ) : (
        <Button
          type='button'
          className='px-6 py-3 rounded-md bg-gray-800 text-white mt-3 w-full text-xl font-semibold dark:bg-white dark:text-gray-800'>
          Check Out
        </Button>
      )}
    </div>
  );
};

export default CartTotal;
