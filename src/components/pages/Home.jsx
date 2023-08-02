/** @format */

import React, { Fragment } from 'react';
import Button from '../components/icon/Button';
const Home = () => {
  return (
    <Fragment>
      <section className='h-[85vh] md:h-[calc(100vh-12rem)] relative top-24'>
        <div className='h-full mx-auto max-w-5xl md:max-w-7xl lg:max-w-[90rem] xl:max-w-[95rem] grid sm:grid-cols-2 gap-8 place-items-center md:place-content-center px-6'>
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

      <section className='bg-gray-300 py-8'>
        <header className='w-full text-center'>
          <h2 className='text-gray-700 font-bold italic text-4xl'>Featured Products</h2>
        </header>
        <div className='mx-auto max-w-5xl md:max-w-7xl lg:max-w-[90rem] xl:max-w-[95rem] grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 px-10 lg:px-0'>
          <article className='col-span-full bg-blue-gray-900 h-[26rem] md:col-span-1 rounded-md'></article>
          <article className='col-span-full bg-blue-gray-900 h-[26rem] md:col-span-1 rounded-md'></article>
          <article className='col-span-full bg-blue-gray-900 h-[26rem] md:col-span-1 rounded-md'></article>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
