/** @format */

import React, { Fragment } from 'react';
import CardList from './CardList';
import { Spinner } from '@material-tailwind/react';

const Card = ({ isLoading, products }) => {
  return (
    <Fragment>
      <section
        id='products'
        className='mx-auto min-h-[calc(100%-8rem)] max-w-[105rem] grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 relative sm:px-8 gap-16 py-32'>
        {isLoading ? (
          <Spinner width={60} height={60} className='absolute left-[50%] top-[50%] translate-[-50%]' />
        ) : (
          products.map(({ _id, ...rest }) => <CardList key={_id} _id={_id} {...rest} />)
        )}
      </section>
    </Fragment>
  );
};

export default Card;
// <div className='py-10 mt-24 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>