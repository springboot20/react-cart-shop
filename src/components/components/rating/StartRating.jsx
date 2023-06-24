/** @format */

import React, { useState } from 'react';
import Star from './Star';

const createArray = (len) => [...Array(len)];

const StarRating = ({ totalStars = 5 }) => {
  const [rate, setRate] = useState(0);
  return createArray(totalStars).map((n, i) => <Star className={`h-12 ${rate ? 'text-yellow-600' : 'text-gray-400'}`} key={i} onClick={() => setRate(i + 1)} selected={rate > i} />);
};

export default StarRating;
