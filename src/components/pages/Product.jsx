/** @format */

import React, { Fragment, useEffect, useState } from 'react';
import MainNav from '../components/Navbar/MainNav';
import ProductCard from '../components/CartCard/ProductCard';
import { Axios } from '../Api/Axios';
import { useAuth } from '../util/AuthContext';
import { useLocation } from 'react-router-dom';
import Footer from '../components/footer/Footer';

const Product = () => {
  const { token } = useAuth();
  const location = useLocation();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const id = location.pathname.split('/')[2];

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        if (!id) {
          setError('Invalid product ID');
          setIsLoading(false);
          return;
        } else {
          const response = await Axios.get(`/products/${id}`, {
            headers: { Authorization: `Bearer ${token?.accessToken}` },
          });
          setProduct(response.data);
        }
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    fetchProduct();
  }, [token?.accessToken, id]);

  return (
    <Fragment>
      <MainNav />
      <section id='product' className='mx-auto mt-32 px-12 md:max-w-7xl md:px-8'>
        <div className='md:grid md:grid-cols-7 md:gap-x-8 md:gap-y-10 xl:gap-x-16 mb-48' id='container'>
          {isLoading ? <p className='text-xl font-semibold text-gray-800'>Loading....</p> : <ProductCard product={product} error={error} />}
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default Product;
