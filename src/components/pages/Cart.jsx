/** @format */

import React, { Fragment } from 'react';
import MainNav from '../components/Navbar/MainNav';
import cartImage from '../assets/cart-image.jpg';
import { Link } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import { useCart } from '../context/product/CartContext';
import CartCard from '../components/CartCard/CartCard';

const Cart = () => {
  const { cartItems } = useCart();
  return (
    <Fragment>
      <MainNav />
      <section className='mt-32 mx-auto'>
        <div className='container mx-auto max-w-5xl px-4 py-8 sm:px-3 sm:py-18 md:max-w-6xl lg:max-w-[86.25rem] xl:max-w-[92.5rem] 2xl:max-w-[104.5rem]'>
          <div className='flex'>
            <h1 className='font-bold text-4xl text-gray-800 leading-5'>Shopping Cart</h1>
          </div>
          <div className='mt-9 flex'>
            <div className='flex-1'>
              <h3 className='text-xl font-semibold text-gray-700 my-4'>
                <span>{`{${cartItems.length}}`}</span> Products in Cart
              </h3>
              <div className='rounded-md border bg-white shadow border-gray-300 mb-12 p-10'>
                {cartItems.length === 0 ? (
                  <div className='flex flex-col justify-center items-center text-center'>
                    <div className='mb-6'>
                      <img src={cartImage} alt='' className='max-w-full h-auto align-middle object-contain object-center block' />
                    </div>
                    <p className='text-xl font-semibold text-gray-800 mb-6'>Your cart is empty. Keep shopping to find a product!</p>
                    <Link to='/products' className='bg-gray-800 hover:bg-gray-600 rounded-md px-5 py-4 text-xl font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:opacity-20'>
                      Keep Shopping
                    </Link>
                  </div>
                ) : (
                  <div className='mt-8'>
                    <div className='flow-root'>
                    <CartCard cartItems={cartItems}/>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default Cart;
