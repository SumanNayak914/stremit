import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  className = '',
  type = 'button',
}) => {
  const variants = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white',
    secondary: 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50',
    success: 'bg-emerald-500 hover:bg-emerald-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    warning: 'bg-amber-500 hover:bg-amber-600 text-white',
    outline: 'bg-transparent border-2 border-purple-600 text-purple-600 hover:bg-purple-50',
    outlineBlue: 'bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-50',
    outlineRed: 'bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-50',
    outlineOrange: 'bg-transparent border-2 border-amber-500 text-amber-500 hover:bg-amber-50',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-lg flex items-center justify-center gap-2 font-medium transition-colors
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {Icon && iconPosition === 'left' && <Icon size={18} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={18} />}
    </motion.button>
  );
};

export default Button;
