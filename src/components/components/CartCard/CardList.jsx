/** @format */

import { Rating } from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router-dom';

const CardList = ({ _id, productName, priceTag, imageUrl, description, ratings }) => {
  return (
    <>
      <div key={_id} className='group relative'>
        <div className='aspect-h-3 aspect-w-4 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80'>
          <img src={imageUrl} alt={`img alt`} className='h-full w-full object-cover object-center lg:h-full lg:w-full hover:scale-105 transition-all overflow-hidden' />
        </div>
        <div className='flex justify-between items-center'>
          <Link to={`/products/${_id}`} className='mt-3 flex items-center text-2xl font-semibold justify-between text-gray-900 hover:underline'>
            <h3>{productName}</h3>
          </Link>
          <p className='text-xl font-bold'> {formatPrice(priceTag)}</p>
        </div>
        <div className='flex justify-between items-center'>
          <p className='mt-1 text-sm italic text-gray-500 font-semibold'>{description}</p>
          <Rating value={ratings} readonly/>
        </div>
      </div>
    </>
  );
};

export default CardList;

export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
    minimumFractionDigits: 0,
  }).format(price);
}
