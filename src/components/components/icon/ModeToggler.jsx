import React from 'react';
import PropTypes from 'prop-types';
import Button from '../icon/Button';

const ModeToggler = (props) => {
  const { icon, active, setTheme, activate } = props;
  const toggleTheme = () => {
    if (active) {
      activate('light');
      setTheme('light');
    } else {
      activate('dark');
      setTheme('dark');
    }
  };
  return (
    <Button
      type='button'
      className='p-4 h-18 w-18 dark:bg-gray-700 flex items-center ring-2 dark:ring-gray-700/50 dark:text-white text-gray-900 shadow-md rounded-md'
      onClick={toggleTheme}>
      {icon}
    </Button>
  );
};

ModeToggler.propTypes = {
  active: PropTypes.bool,
};

export default ModeToggler;
