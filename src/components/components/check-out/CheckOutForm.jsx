import React from 'react';
import { CountriesData } from '../data/countriesStore';
import { useFormik } from 'formik';
import InputField from '../inputField/InputField';
import { orderSchema } from '../schema/Schema';

const CheckOutForm = ({ className }) => {
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      _shippingAddressSame: false,
      _saveInfo: false,
      _creditCard: false,
      _debitCard: false,
      _payPal: false,
      cardName: '',
      cardNumber: '',
      expireDate: '',
      cvv: '',
    },
    validationSchema: orderSchema,
    onSubmit: onSubmit,
  });

  async function onSubmit() {
    if (values) {
      const btn = document.querySelector('button');
      btn.innerHTML = 'checking out....';
      btn.disabled = true;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <div className='space-y-8'>
          <div className='border-b border-gray-900/10 pb-12'>
            <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label htmlFor='first-name' className='block text-sm font-medium leading-6 text-gray-900'>
                  First name
                </label>
                <div className='mt-2'>
                  <InputField className='block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-0 transition-all sm:text-sm sm:leading-6' type='text' id='firstName' name='firstName' autoComplete='given-name' value={values.firstName} placeholder='enter first name' onChange={handleChange} />
                </div>
              </div>
              <div className='sm:col-span-3'>
                <label htmlFor='lastName' className='block text-sm font-medium leading-6 text-gray-900'>
                  Last name
                </label>
                <div className='mt-2'>
                  <InputField className='block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-0 transition-all sm:text-sm sm:leading-6' type='text' id='lastName' name='lastName' autoComplete='family-name' value={values.lastName} placeholder='enter last name' onChange={handleChange} />
                </div>
              </div>
              <div className='sm:col-span-4'>
                <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                  Email streetAddress
                </label>
                <div className='mt-2'>
                  <InputField className='block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-0 transition-all sm:text-sm sm:leading-6 ' type='email' id='email' name='email' autoComplete='email' value={values.email} placeholder='enter email streetAddress' onChange={handleChange} />
                </div>
              </div>
              <div className='sm:col-span-3'>
                <label htmlFor='country' className='block text-sm font-medium leading-6 text-gray-900'>
                  Country
                </label>
                <div className='mt-2'>
                  <select id='country' name='country' autoComplete='country-name' value={values.country} onChange={handleChange} className='block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-0 transition-all sm:max-w-xs sm:text-sm sm:leading-6'>
                    <option value=''>Select a country</option>
                    {CountriesData.map(({ name, code }) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='col-span-full'>
                <label htmlFor='streetAddress' className='block text-sm font-medium leading-6 text-gray-900'>
                  Address
                </label>
                <div className='mt-2'>
                  <InputField className='block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-0 transition-all sm:text-sm sm:leading-6' type='text' id='streetAddress' name='streetAddress' autoComplete='street-streetAddress' value={values.streetAddress} onChange={handleChange} />
                </div>
              </div>
              <div className='sm:col-span-2 sm:col-start-1'>
                <label htmlFor='city' className='block text-sm font-medium leading-6 text-gray-900'>
                  City
                </label>
                <div className='mt-2'>
                  <InputField className='block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-0 transition-all sm:text-sm sm:leading-6' type='text' id='city' name='city' autoComplete='streetAddress-level2' value={values.city} onChange={handleChange} />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <label htmlFor='state' className='block text-sm font-medium leading-6 text-gray-900'>
                  State / Province
                </label>
                <div className='mt-2'>
                  <InputField className='block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-0 transition-all sm:text-sm sm:leading-6' type='text' id='state' name='state' autoComplete='streetAddress-level1' value={values.state} onChange={handleChange} />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <label htmlFor='zipCode' className='block text-sm font-medium leading-6 text-gray-900'>
                  ZIP / Postal code
                </label>
                <div className='mt-2'>
                  <InputField className='block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-0 transition-all sm:text-sm sm:leading-6' type='text' id='zipCode' name='zipCode' autoComplete='postal-code' value={values.zipCode} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>
          <div className='border-b border-gray-900/10 pb-10'>
            <div className='space-y-5'>
              <fieldset className='border-b border-gray-900/10 pb-8'>
                <div className='space-y-6'>
                  <div className='relative flex gap-x-3'>
                    <div className='flex h-6 items-center'>
                      <InputField className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 outline-0 transition-all' value={values._shippingAddressSame} type='checkbox' id='_shippingAddressSame' name='comments' onChange={handleChange} />
                    </div>
                    <div className='text-sm leading-6'>
                      <label htmlFor='_shippingAddressSame' className='font-medium text-gray-900'>
                        Shipping streetAddress is the same as my billing streetAddress
                      </label>
                    </div>
                  </div>
                  <div className='relative flex gap-x-3'>
                    <div className='flex h-6 items-center'>
                      <InputField className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 outline-0 transition-all' value={values._saveInfo} type='checkbox' id='_saveInfo' name='candidates' onChange={handleChange} />
                    </div>
                    <div className='text-sm leading-6'>
                      <label htmlFor='_saveInfo' className='font-medium text-gray-900'>
                        Save this information for next time
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <div className='mt-3 space-y-6'>
                  <div className='flex items-center gap-x-3'>
                    <InputField className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 outline-0 transition-all' value={values._creditCard} type='radio' id='push-everything' name='push-notifications' onChange={handleChange} />
                    <label htmlFor='push-everything' className='block text-sm font-medium leading-6 text-gray-900'>
                      Credit card
                    </label>
                  </div>
                  <div className='flex items-center gap-x-3'>
                    <InputField className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 outline-0 transition-all' value={values._debitCard} type='radio' id='push-email' name='push-notifications' onChange={handleChange} />
                    <label htmlFor='push-email' className='block text-sm font-medium leading-6 text-gray-900'>
                      Debit card
                    </label>
                  </div>
                  <div className='flex items-center gap-x-3'>
                    <InputField className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 outline-0 transition-all' value={values._payPal} type='radio' id='push-nothing' name='push-notifications' onChange={handleChange} />
                    <label htmlFor='push-nothing' className='block text-sm font-medium leading-6 text-gray-900'>
                      Paypal
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label htmlFor='cardName' className='block text-sm font-medium leading-6 text-gray-900'>
                  Name on Card
                </label>
                <div className='mt-2'>
                  <InputField className='block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-0 transition-all sm:text-sm sm:leading-6' type='text' id='cardName' name='cardName' placeholder='springboot opeyemi...' value={values.cardName} onChange={handleChange} />
                </div>
              </div>
              <div className='sm:col-span-3'>
                <label htmlFor='cardNumber' className='block text-sm font-medium leading-6 text-gray-900'>
                  Credit card number
                </label>
                <div className='mt-2'>
                  <InputField className='block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-0 transition-all sm:text-sm sm:leading-6' type='text' id='cardNumber' name='cardNumber' placeholder='5199 1679 5133 5313' value={values.cardNumber} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-2'>
                <label htmlFor='expire' className='block text-sm font-medium leading-6 text-gray-900'>
                  Expiration
                </label>
                <div className='mt-2'>
                  <InputField className='block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-0 transition-all sm:text-sm sm:leading-6' type='date' id='expire' name='expire' placeholder='dd/mm/yyyy' value={values.expireDate} onChange={handleChange} />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <label htmlFor='cvv' className='block text-sm font-medium leading-6 text-gray-900'>
                  CVV
                </label>
                <div className='mt-2'>
                  <InputField className='block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-0 transition-all sm:text-sm sm:leading-6' type='text' id='cvv' name='cvv' placeholder='---' value={values.cvv} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-6'>
          <button type='submit' className='rounded-md bg-indigo-600 px-3 py-4 transition-all w-full text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
            Continue to checkout
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOutForm;
