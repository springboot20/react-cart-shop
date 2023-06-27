/**
 * eslint-disable jsx-a11y/no-redundant-roles
 *
 * @format
 */

/** @format */

import React from 'react';
import IconType from '../icon/IconType';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { formatPrice } from './CardList';
import Button from '../icon/Button';

const CartCard = ({ cartItems }) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <ul role='list' className='-my-6 divide-y divide-gray-200'>
      {cartItems.map(({ productName, quantity, price, imageUrl, _id }) => (
        <li key={_id} className='flex py-6'>
          <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
            <img src={imageUrl} alt={''} className='h-full w-full object-cover object-center' />
          </div>

          <div className='ml-4 flex flex-1 flex-col'>
            <div>
              <div className='flex justify-between text-base font-medium text-gray-900'>
                <h3 className='text-gray-800 font-semibold text-xl'>{productName}</h3>
                <p className='ml-4'>{formatPrice(price)}</p>
              </div>
            </div>
            <div className='flex flex-1 items-end justify-between text-sm'>
              <p className='text-gray-500'>Qty {quantity}</p>

              <div className='flex'>
                <Button type='button' className='font-medium text-indigo-600 hover:text-indigo-500'>
                  <IconType iconType={faTrashAlt} />
                </Button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CartCard;
