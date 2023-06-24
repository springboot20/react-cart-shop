/** @format */

import React from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Star = (props) => {
  return <FontAwesomeIcon icon={faStar} {...props} />;

};

export default Star;