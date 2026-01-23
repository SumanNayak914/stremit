import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({
  icon: Icon,
  iconBg,
  iconColor = 'text-white',
  value,
  label,
  index = 0,
  trend,
  trendValue,
  prefix = '',
  suffix = '',
}) => {
  const isPositiveTrend = trend === 'up';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{
        y: -5,
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      }}
      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm cursor-pointer relative overflow-hidden group"
    >
      {/* Background Gradient on Hover */}
      <div className={`absolute inset-0 ${iconBg} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

      {/* Decorative Circle */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 ${iconBg} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />

      <div className="relative">
        {/* Top Row - Icon and Trend */}
        <div className="flex items-start justify-between mb-4">
          {/* Icon Container */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center shadow-lg`}
            style={{
              boxShadow: `0 8px 20px ${iconBg.includes('blue') ? 'rgba(59,130,246,0.3)' :
                iconBg.includes('pink') ? 'rgba(236,72,153,0.3)' :
                iconBg.includes('orange') ? 'rgba(249,115,22,0.3)' :
                iconBg.includes('green') ? 'rgba(34,197,94,0.3)' :
                iconBg.includes('yellow') ? 'rgba(234,179,8,0.3)' :
                iconBg.includes('teal') ? 'rgba(20,184,166,0.3)' :
                iconBg.includes('purple') ? 'rgba(168,85,247,0.3)' :
                'rgba(0,0,0,0.1)'}`
            }}
          >
            <Icon size={26} className={iconColor} />
          </motion.div>

          {/* Trend Badge */}
          {trend && (
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                isPositiveTrend
                  ? 'bg-green-100 text-green-600'
                  : 'bg-red-100 text-red-600'
              }`}
            >
              {isPositiveTrend ? (
                <TrendingUp size={12} />
              ) : (
                <TrendingDown size={12} />
              )}
              {trendValue}
            </div>
          )}
        </div>

        {/* Value */}
        <div className="mb-1">
          <motion.h3
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
            className="text-3xl font-bold text-gray-800 tracking-tight"
          >
            {prefix}
            <span className="tabular-nums">{value}</span>
            {suffix}
          </motion.h3>
        </div>

        {/* Label */}
        <p className="text-sm text-gray-500 font-medium">{label}</p>

        {/* Bottom Decorative Line */}
        <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '60%' }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
            className={`h-full ${iconBg} rounded-full`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
