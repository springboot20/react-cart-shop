/** @format */

import React, { Fragment, useEffect } from 'react';
import ProductCard from '../components/CartCard/ProductCard';
import { useParams } from 'react-router-dom';
import useProduct from '../context/product/ProductContext';
import { Spinner } from '@material-tailwind/react';

const Product = () => {
  const { product, product_isLoading, fetchSingleProduct } = useProduct();
  const { id } = useParams();

  useEffect(() => {
    fetchSingleProduct(`/products/${id}`);
  }, [id]);

  return (
    <Fragment>
      <section
        id='product'
        className='mx-auto mt-32 min-h-[calc(100%-8rem)] max-w-[105rem] px-12 grid lg:grid-cols-2 relative mb-5 gap-16 py-24'>
        {product_isLoading ? (
          <Spinner width={60} height={60} className='absolute left-[50%] top-[50%] translate-[-50%]' />
        ) : (
          <ProductCard product={product} loading={product_isLoading} />
        )}
      </section>
    </Fragment>
  );
};

export default Product;
