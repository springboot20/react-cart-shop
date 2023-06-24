/** @format */

import React from 'react';
import IconType from '../icon/IconType';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { formatPrice } from './CardList';
import Button from '../icon/Button';

const CartCard = (props) => {
  const { productName, quantity, price, imageUrl } = props;

  return (
    <div className='px-5 py-4 bg-white border rounded-lg flex space-x-5 items-center justify-between'>
      <div className='space-x-3 flex items-center'>
        <img src={imageUrl} alt='' className='h-24 w-24 rounded-full block object-contain' />
        <div className='space-y-4'>
          <h3 className='text-gray-800 text-3xl font-semibold'>{productName}</h3>
          <p className='font-ubuntu text-xl font-medium italic text-gray-800'>{formatPrice(price)}</p>
          <span className='font-ubuntu text-gray-800 text-xl font-semibold'>{quantity}</span>
        </div>
      </div>
      <div className='flex items-center space-x-2'>
        <Button type="button" className="">
          <IconType iconType={faEdit}  className="h-7 w-7 text-gary-600"/>
        </Button>
        <Button type="button" className="">
          <IconType iconType={faTrashAlt}  className="h-7 w-7 text-red-600"/>
        </Button>
      </div>
    </div>
  );
};

export default CartCard;
