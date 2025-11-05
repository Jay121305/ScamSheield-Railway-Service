import React from 'react';
import PropTypes from 'prop-types';

const variantClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-slate-400',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
};

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses =
    'font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out';

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  className: PropTypes.string,
};
