import React, { Fragment } from 'react';
import Card from '../components/CartCard/Card';
import useProduct from '../context/product/ProductContext';
import { useAuth } from '../util/AuthContext';
import Modal from '../components/modal/Modal';

const Products = () => {
  const { isTokenExpired } = useAuth();
  const { products_isLoading, products } = useProduct();

  return (
    <Fragment>
      <Modal isExpired={isTokenExpired} />
      <Card isLoading={products_isLoading} products={products} />
    </Fragment>
  );
};

export default Products;
