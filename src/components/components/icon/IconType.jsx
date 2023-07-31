import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconType = ({ iconType, className, ...rest }) => {
  return <FontAwesomeIcon icon={iconType} className={className} {...rest} />;
};

export default IconType;
