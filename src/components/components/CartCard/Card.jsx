/** @format */

import React, { Fragment } from 'react';
import CardList from './CardList';

const Card = ({ isLoading, products }) => {
  return (
    <Fragment>
      <section id='products' className='mt-20 mb-48'>
        <div className='mx-auto max-w-4xl px-4 py-8 sm:px-3 sm:py-18 md:max-w-6xl lg:max-w-[86.25rem] xl:max-w-[92.5rem] 2xl:max-w-[104.5rem]' id='container'>
          {isLoading ? (
              <p className='text-xl font-semibold text-gray-800'>Loading.....</p>
          ) : (
            <div className='product-container mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 xl:gap-x-8'>
              {products.map(({ _id, ...rest }) => (
                <CardList key={_id} _id={_id} {...rest} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default Card;
