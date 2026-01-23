import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = true,
  animate = true,
  delay = 0,
  onClick,
}) => {
  const baseClasses = 'bg-white rounded-xl border border-gray-200 shadow-sm';

  if (!animate) {
    return (
      <div
        onClick={onClick}
        className={`${baseClasses} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ delay }}
      whileHover={hover ? { boxShadow: '0 4px 20px rgba(0,0,0,0.08)' } : {}}
      onClick={onClick}
      className={`${baseClasses} ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
