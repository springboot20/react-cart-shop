import React, { Fragment } from 'react'
import Card from '../components/CartCard/Card'
import MainNav from '../components/Navbar/MainNav'
import { useCart } from '../context/product/CartContext'
import Footer from '../components/footer/Footer'

const Products = () => {
  const { isLoading, products, getProduct } = useCart()
  return (
    <Fragment>
      <MainNav />
      <Card isLoading={isLoading} products={products} getProduct={getProduct} />
      <Footer />
    </Fragment>
  )
}

export default Products
