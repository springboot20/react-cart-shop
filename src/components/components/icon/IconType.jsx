import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconType = ({ iconType, className, onClick, ...rest }) => {
  return <FontAwesomeIcon icon={iconType} className={className} onClick={onClick} {...rest} />;
};

export default IconType;
