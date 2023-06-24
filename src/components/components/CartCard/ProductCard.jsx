/** @format */

import { StarIcon as RatedIcon } from '@heroicons/react/24/outline';
import { StarIcon as UnRatedIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import Button from '../icon/Button';
import InputField from '../inputField/InputField';
import IconType from '../icon/IconType';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../context/product/CartContext';
import { Rating } from '@material-tailwind/react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const cartItemObject = {
    productName: product.productName,
    quantity: quantity,
    price: product.priceTag,
    imageUrl:product.imageUrl
  };

  const handleAddToCart = async () => {
    await addToCart(cartItemObject, product._id);
  };

  return (
    <>
      <div className='md:col-span-4'>
        <div className='aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden'>
          <img src={`${product.imageUrl}`} alt='' className='object-cover object-center rounded-lg' />
        </div>
        {product.ratings ? <Rating value={product.ratings} readonly ratedColor='red' ratedIcon={<RatedIcon className='h-12 w-12' />} unratedIcon={<UnRatedIcon className='h-12 w-12' />} className='mt-6' /> : <Rating value={3} readonly ratedColor='red' ratedIcon={<RatedIcon className='h-12 w-12' />} unratedIcon={<UnRatedIcon className='h-12 w-12' />} className='mt-6' />}
      </div>
      <div className='mt-14 sm:mt-16 md:max-w-none md:mt-0 col-span-3'>
        <div className='flex flex-col container'>
          <div className='mt-4'>
            <div>
              <h1 className='text-2xl font-extralbold tracking-tight text-gray-900 sm:text-3xl'>{product.productName}</h1>
              <h2 id='inforamtion-heading' className='sr-only'>
                Product inforamtion
              </h2>
            </div>
          </div>

          <p className='text-gray-500 mt-6'>{product.description}</p>

          <div className='border-t border-gray-400 mt-10 pt-10'>
            <h3 className='text-sm font-medium text-gray-900'>License</h3>
            <p className='mt-4 text-sm text-gray-500'>
              {product.description ? (
                product.description
              ) : (
                <>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt placeat voluptates eligendi provident harum assumenda!.{' '}
                  <a href='/#' className='font-medium  text-gray-600 hover:text-gray-500'>
                    Read full license
                  </a>
                </>
              )}
            </p>
          </div>

          <div className='mt-8 col-span-full'>
            <form className='grid grid-cols-2 space-y-4 '>
              <fieldset className='col-span-full md:col-span-3 relative flex space-x-4 items-center'>
                <Button type='button' id='minus-btn' onClick={() => setQuantity((prevQuantity) => prevQuantity - 1)} className='p-3 bg-gray-800 focus:ring-offset-2 transition-all focus:ring-2 focus:ring-gray-600 flex items-center text-white rounded-full hover:bg-gray-700'>
                  <IconType iconType={faMinus} id='minus-icon' className='h-5 w-5' />
                </Button>
                <InputField type='number' id='quantity' value={quantity} onChange={(event) => setQuantity(event.target.value)} readOnly className='block rounded-md text-center tex-md relative border-0 py-3 px-3 w-24 appearance-none text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 outline-0 transition-all sm:text-sm sm:leading-6' />
                <Button type='button' id='plus-btn' className='p-3 bg-gray-800 focus:ring-offset-2 focus:ring-2 transition-all focus:ring-gray-600 flex items-center text-white rounded-full hover:bg-gray-700' onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}>
                  <IconType iconType={faPlus} id='plus-icon' className='h-5 w-5' />
                </Button>
              </fieldset>
              <div className='flex items-center space-x-6'>
                <Button type='button' className='col-span-full md:col-span-3 w-full bg-gray-800 shrink-0 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all focus:ring-offset-gray-50 focus:ring-gray-500' onClick={handleAddToCart}>
                  <span className='text-md font-semibold'>Add to cart</span>
                </Button>
                <Button type='button' className='col-span-full md:col-span-3 w-full shrink-0 bg-white border rounded-md py-3 px-8 flex items-center justify-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all focus:ring-offset-gray-50 focus:ring-gray-500 hover:bg-gray-100'>
                  <span className='text-md font-semibold'>Buy product</span>
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
