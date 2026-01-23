import React from 'react';
import { motion } from 'framer-motion';

const ToggleSwitch = ({
  isOn,
  onToggle,
  size = 'md',
  activeColor = 'bg-purple-600',
  inactiveColor = 'bg-gray-300',
}) => {
  const sizes = {
    sm: { width: 'w-10', height: 'h-5', thumb: 'w-3 h-3', translate: 18 },
    md: { width: 'w-12', height: 'h-6', thumb: 'w-4 h-4', translate: 24 },
    lg: { width: 'w-14', height: 'h-7', thumb: 'w-5 h-5', translate: 28 },
  };

  const currentSize = sizes[size];

  return (
    <button
      onClick={onToggle}
      className={`relative ${currentSize.width} ${currentSize.height} rounded-full transition-colors ${
        isOn ? activeColor : inactiveColor
      }`}
    >
      <motion.div
        animate={{ x: isOn ? currentSize.translate : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`absolute top-1 ${currentSize.thumb} bg-white rounded-full shadow`}
      />
    </button>
  );
};

export default ToggleSwitch;
