import React, { Fragment } from 'react'
import CheckOutForm from '../components/check-out/CheckOutForm'
import MainNav from '../components/Navbar/MainNav'
import Cart from '../components/check-out/Cart'
import Footer from '../components/footer/Footer'

const CheckOut = () => {
  return (
    <Fragment>
      <MainNav />
      <main className="mt-14 pt-8">
        <div className="container mx-auto px-12 max-w-[86rem] lg:max-w-[87rem] xl:max-w-[95rem] 2xl:max-w-[110rem] mb-12">
          <h2 className="text-center my-7 text-3xl font-semibold text-gray-700">
            Check Out Form
          </h2>
          <div className="md:grid md:grid-cols-3 lg:grid-cols-3 md:space-x-8">
            <CheckOutForm className="md:col-span-2 xmd:col-span-2 bg-white rounded-lg shadow-md mb-12" />
            <Cart className="mt-10 md:mt-0" />
          </div>
        </div>
      </main>
      <Footer />
    </Fragment>
  )
}

export default CheckOut
