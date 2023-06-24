/** @format */

import React from 'react';

const CustomInput = ({ label, cls, value, ...props }) => {
  console.log(props);
  const { handleChange, handleBlur } = props;
  return (
    <>
      <div className={cls}>
        <label className='block text-xl font-semibold leading-6 text-gray-900'>{label}</label>
        <input value={value} onChange={handleChange} onBlur={handleBlur} />
      </div>
    </>
  );
};

export default CustomInput;
