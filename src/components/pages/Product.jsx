/** @format */

import React, { Fragment, useEffect } from 'react';
import ProductCard from '../components/CartCard/ProductCard';
import { useParams } from 'react-router-dom';
import useProduct from '../context/product/ProductContext';
import { Spinner } from '@material-tailwind/react';
import Modal from '../components/modal/Modal';
import { useAuth } from '../util/AuthContext';

const Product = () => {
  const { product, product_isLoading, fetchSingleProduct } = useProduct();
  const { isTokenExpired } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    fetchSingleProduct(`/products/${id}`);
  });

  return (
    <Fragment>
      <Modal isExpired={isTokenExpired} />
      <section id='product' className='top-24 min-h-[calc(100%-8rem)] max-w-[105rem] relative mb-5 '>
        <div className='px-12 grid lg:grid-cols-2gap-16 py-12 mx-auto h-full'>
          {product_isLoading ? (
            <Spinner width={60} height={60} className='absolute left-[50%] top-[50%] translate-[-50%]' />
          ) : (
            <ProductCard product={product} loading={product_isLoading} />
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default Product;
