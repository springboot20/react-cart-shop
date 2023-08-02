/** @format */

import React, { Fragment } from 'react';
import Button from '../components/icon/Button';
const Home = () => {
  return (
    <Fragment>
      <section className='h-[60vh] lg:h-[calc(100vh-12rem)] relative top-24 mb-14'>
        <div className='h-full mx-auto max-w-5xl md:max-w-7xl lg:max-w-[90rem] xl:max-w-[95rem] grid grid-cols-1 sm:grid-cols-2 gap-24 place-items-center place-content-center px-6'>
          <article className='col-span-full sm:col-span-1'>
            <h1 className='text-gray-900 dark:text-white text-5xl font-extrabold mb-7'>
              Design Your <br /> Comfort Zone
            </h1>
            <p className='text-gray-600 dark:text-white text-lg font-medium mb-7'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at sed omnis corporis doloremque possimus
              velit! Repudiandae nisi odit, aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis alias?
            </p>
            <Button
              className='uppercase px-7 py-2 rounded-md bg-gray-900 hover:bg-gray-700 dark:bg-white dark:text-gray-800 text-xl font-bold text-white'
              type='button'>
              shop now
            </Button>
          </article>
          <article className='col-span-full sm:col-span-1'>
            <h1 className='text-gray-900 dark:text-white text-5xl font-extrabold mb-7'>
              Design Your <br /> Comfort Zone
            </h1>
            <p className='text-gray-600 dark:text-white text-lg font-medium mb-7'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at sed omnis corporis doloremque possimus
              velit! Repudiandae nisi odit, aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis alias?
            </p>
          </article>
        </div>
      </section>

      <section className='bg-gray-300 py-20 mx-auto'>
        <header className='w-full text-center'>
          <h2 className='text-gray-700 font-bold italic text-4xl'>Featured Products</h2>
        </header>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-12 w-[90vw] mx-auto mt-12'>
          <article className='col-span-full bg-blue-gray-900 h-[26rem] md:col-span-1 rounded-md'></article>
          <article className='col-span-full bg-blue-gray-900 h-[26rem] md:col-span-1 rounded-md'></article>
          <article className='col-span-full bg-blue-gray-900 h-[26rem] md:col-span-1 rounded-md'></article>
          <article className='col-span-full bg-blue-gray-900 h-[26rem] md:col-span-1 rounded-md'></article>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
