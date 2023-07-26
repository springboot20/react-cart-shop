import React, { Fragment } from 'react';
import Card from '../components/CartCard/Card';
import useProduct from '../context/product/ProductContext';

const Products = () => {
  const { products_isLoading, products } = useProduct();
  return (
    <Fragment>
      <Card isLoading={products_isLoading} products={products} />
    </Fragment>
  );
};

export default Products;
