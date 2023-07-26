/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../helper/formatPrice';

const CardList = ({ _id, name, price, imageSrc }) => {
  return (
    <>
      <div key={_id} className='group relative rounded-md'>
        <div className='aspect-h-3 aspect-w-4 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-[23rem]'>
          <img
            src={imageSrc}
            alt={`img alt`}
            className='h-full w-full object-cover object-center lg:h-full lg:w-full transition-all overflow-hidden'
          />
        </div>
        <div className='flex justify-between items-center'>
          <Link
            to={`/products/${_id}`}
            className='mt-3 flex items-center text-2xl font-semibold justify-between text-gray-900 dark:text-white hover:underline'>
            <h3>{name}</h3>
          </Link>
          <p className='text-xl font-bold text-gray-800 dark:text-white'> {formatPrice(price)}</p>
        </div>
      </div>
    </>
  );
};

export default CardList;
