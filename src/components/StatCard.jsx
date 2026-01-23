import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, iconBg, value, label, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
      className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center`}>
          <Icon size={24} className="text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
