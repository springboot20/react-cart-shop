/** @format */

import React, { Fragment } from 'react';
import CardList from './CardList';
import { Spinner } from '@material-tailwind/react';

const Card = ({ isLoading, products }) => {
  return (
    <Fragment>
      <section id='products' className='h-[60vh] lg:h-[calc(100vh-12rem)] relative top-24'>
        <div className='mx-auto h-full max-w-[105rem] grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 gap-16 relative'>
          {isLoading ? (
            <Spinner width={60} height={60} className='absolute left-[50%] top-[50%] translate-[-50%]' />
          ) : (
            products.map(({ _id, ...rest }) => <CardList key={_id} _id={_id} {...rest} />)
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default Card;
