/** @format */

import React from 'react';

const CustomSelect = ({ cls, children, value, ...props }) => {
  const { handleChange, handleBlur, ...rest } = props;
  return (
    <fieldset className={cls}>
      <select onChange={handleChange} onBlur={handleBlur} value={value} {...rest}>
        {children}
      </select>
    </fieldset>
  );
};

export default CustomSelect;
