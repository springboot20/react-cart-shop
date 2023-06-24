/** @format */

import React from 'react';

const CustomInput = ({ label, cls, value, ...props }) => {
  return (
    <>
      <fieldset className={cls}>
        <label className='block text-xl font-semibold leading-6 text-gray-900 mb-1'>{label}</label>
        <input value={value} {...props} />
      </fieldset>
    </>
  );
};

export default CustomInput;
