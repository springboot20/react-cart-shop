import React from 'react';
import PropTypes from 'prop-types';
import Button from '../icon/Button';

const ModeToggler = (props) => {
  const { icon, active, setTheme, activate, className } = props;
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
    <Button type='button' className={className} onClick={toggleTheme}>
      {icon}
    </Button>
  );
};

ModeToggler.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
};

export default ModeToggler;
