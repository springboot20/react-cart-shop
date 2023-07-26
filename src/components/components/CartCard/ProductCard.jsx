/** @format */

import { StarIcon as RatedIcon } from '@heroicons/react/24/outline';
import { StarIcon as UnRatedIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import Button from '../icon/Button';
import IconType from '../icon/IconType';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../context/product/CartContext';
import { Rating } from '@material-tailwind/react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const cartItemObject = {
    name: product.name,
    quantity: quantity,
    price: product.priceTag,
    imageUrl: product.imageUrl,
  };

  const handleAddToCart = async () => {
    await addToCart(cartItemObject, product._id);
  };

  return (
    <>
      <div className='col-span-full md:col-span-1'>
        <img
          src={`${product.imageSrc}`}
          alt=''
          className='object-cover object-center aspect-w-4 rounded-lg h-[38rem] lg:h-[40rem] w-full'
        />
      </div>
      <div className='col-span-full md:col-span-1'>
        <div className='flex flex-col container'>
          <div className='mt-4'>
            <div>
              <h1 className='text-2xl font-extralbold tracking-tight text-gray-900 dark:text-white sm:text-3xl uppercase italic'>
                {product.name}
              </h1>
            </div>
          </div>
          <Rating
            value={product.ratings}
            readonly
            ratedColor='yellow'
            ratedIcon={<RatedIcon className='h-5 w-5' />}
            unratedIcon={<UnRatedIcon className='h-8 w-8' />}
            className='mt-4'
          />
          <div className='mt-5'>
            <p className='mt-4 text-sm text-gray-500 dark:text-white'>{product.description}</p>
          </div>
          <div className='mt-3 col-span-full'>
            <form className='grid grid-cols-2 space-y-4 '>
              <fieldset className='col-span-full md:col-span-3 relative flex space-x-4 items-center'>
                <Button
                  type='button'
                  id='minus-btn'
                  onClick={() => setQuantity((prevQuantity) => prevQuantity - 1)}
                  className='p-3 text-gray-800 focus:ring-offset-2 transition-all flex items-center dark:text-white'>
                  <IconType iconType={faMinus} id='minus-icon' className='h-5 w-5' />
                </Button>
                <span className='text-2xl text-gray-800 dark:text-white font-semibold'>{quantity}</span>
                <Button
                  type='button'
                  id='plus-btn'
                  className='p-3 text-gray-800 focus:ring-offset-2 transition-all flex items-center dark:text-white'
                  onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}>
                  <IconType iconType={faPlus} id='plus-icon' className='h-5 w-5' />
                </Button>
              </fieldset>

              <div className='flex items-center space-x-6'>
                <Button
                  type='button'
                  className='col-span-full md:col-span-3 w-full bg-gray-800 shrink-0 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all focus:ring-offset-gray-50 focus:ring-gray-500'
                  onClick={handleAddToCart}>
                  <span className='text-md font-semibold'>Add to cart</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
