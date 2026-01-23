import React from 'react';
import { motion } from 'framer-motion';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import {
  Users,
  Triangle,
  HelpCircle,
  ClipboardList,
  Clock,
  IndianRupee,
  TrendingUp,
  Building2,
  Cloud,
  Play,
  Trash2,
  Image,
  Zap,
} from 'lucide-react';
import StatCard from '../components/StatCard';

// Dummy data for charts
const withdrawalData = [
  { day: 'Sat', amount: 120 },
  { day: 'Sun', amount: 80 },
  { day: 'Mon', amount: 200 },
  { day: 'Tue', amount: 150 },
  { day: 'Wed', amount: 280 },
  { day: 'Thu', amount: 220 },
  { day: 'Fri', amount: 350 },
];

const userGrowthData = [
  { day: 'Sat', users: 14 },
  { day: 'Sun', users: 15 },
  { day: 'Mon', users: 16 },
  { day: 'Tue', users: 17 },
  { day: 'Wed', users: 18 },
  { day: 'Thu', users: 19 },
  { day: 'Fri', users: 21 },
];

// Dummy activities
const recentActivities = [
  { id: 1, type: 'delete', text: 'Slider deleted: SLD_8x7k2m', time: '10h ago' },
  { id: 2, type: 'add', text: 'New slider added: banner_promo.jpg', time: '12h ago' },
  { id: 3, type: 'delete', text: 'Slider deleted: SLD_9p3n1q', time: '1d ago' },
  { id: 4, type: 'add', text: 'New slider added: quiz_banner.png', time: '2d ago' },
  { id: 5, type: 'delete', text: 'Slider deleted: SLD_2k5m8r', time: '3d ago' },
];

const Dashboard = () => {
  const stats = [
    {
      icon: Users,
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      value: '27',
      label: 'Total Users',
      trend: 'up',
      trendValue: '+12%',
    },
    {
      icon: Triangle,
      iconBg: 'bg-gradient-to-br from-pink-500 to-rose-500',
      value: '2',
      label: 'Categories',
      trend: 'up',
      trendValue: '+1',
    },
    {
      icon: HelpCircle,
      iconBg: 'bg-gradient-to-br from-orange-500 to-amber-500',
      value: '35',
      label: 'Questions',
      trend: 'up',
      trendValue: '+5',
    },
    {
      icon: ClipboardList,
      iconBg: 'bg-gradient-to-br from-green-500 to-emerald-500',
      value: '2',
      label: 'Tasks',
    },
  ];

  const stats2 = [
    {
      icon: Clock,
      iconBg: 'bg-gradient-to-br from-yellow-500 to-amber-500',
      value: '0',
      label: 'Pending Withdrawals',
    },
    {
      icon: IndianRupee,
      iconBg: 'bg-gradient-to-br from-teal-500 to-cyan-500',
      value: '0.00',
      label: 'Total Withdrawal Requests',
      prefix: '₹',
    },
    {
      icon: TrendingUp,
      iconBg: 'bg-gradient-to-br from-indigo-500 to-blue-500',
      value: '5',
      label: 'Active Today',
      trend: 'up',
      trendValue: '+3',
    },
    {
      icon: Building2,
      iconBg: 'bg-gradient-to-br from-purple-500 to-violet-500',
      value: '1096.07',
      label: 'Total User Balance',
      prefix: '₹',
      trend: 'up',
      trendValue: '+₹50',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white px-4 md:px-8 py-4 md:py-6 border-b border-gray-100 sticky top-0 z-10"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="ml-12 md:ml-0">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-xs md:text-sm text-gray-500 mt-1">Welcome back, Admin!</p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-xs md:text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </motion.div>

      <div className="p-4 md:p-8 space-y-4 md:space-y-6">
        {/* AI Question Generator Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 rounded-xl md:rounded-2xl p-4 md:p-6 text-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-24 md:w-48 h-24 md:h-48 bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex items-start gap-3 md:gap-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0"
              >
                <Zap size={24} className="text-yellow-300 md:w-8 md:h-8" />
              </motion.div>
              <div>
                <h2 className="text-lg md:text-2xl font-bold mb-2">AI Question Generator</h2>
                <div className="space-y-1 md:space-y-2">
                  <div className="flex items-center gap-2">
                    <Cloud size={14} className="text-green-300" />
                    <span className="text-xs md:text-sm text-white/90">Cloud Functions: Active</span>
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-blue-300" />
                    <span className="text-xs md:text-sm text-white/90">Auto-Run: Daily at 12:00 AM IST</span>
                  </div>
                </div>
                <div className="mt-3 md:mt-4 flex flex-wrap gap-1 md:gap-2">
                  {['Cloud Functions', 'Auto Delete', '30 MCQ/Category', 'Gemini AI'].map((feature) => (
                    <span
                      key={feature}
                      className="px-2 md:px-3 py-0.5 md:py-1 bg-white/10 backdrop-blur-sm rounded-full text-[10px] md:text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-600 font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg md:rounded-xl flex items-center justify-center gap-2 shadow-lg text-sm md:text-base w-full md:w-auto"
            >
              <Play size={16} fill="currentColor" />
              Generate Now
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Row 1 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index} />
          ))}
        </div>

        {/* Stats Row 2 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {stats2.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index + 4} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Withdrawal Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <h3 className="text-base md:text-lg font-bold text-gray-800">Withdrawal Requests</h3>
                <p className="text-xs md:text-sm text-gray-500">Last 7 Days</p>
              </div>
              <div className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-teal-100 rounded-full">
                <TrendingUp size={12} className="text-teal-600" />
                <span className="text-xs md:text-sm font-medium text-teal-600">+24%</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={withdrawalData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={10} />
                <YAxis stroke="#9ca3af" fontSize={10} tickFormatter={(v) => `₹${v}`} />
                <Tooltip
                  formatter={(value) => [`₹${value}`, 'Amount']}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#14b8a6"
                  strokeWidth={2}
                  fill="url(#colorAmount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* User Growth Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <h3 className="text-base md:text-lg font-bold text-gray-800">User Growth</h3>
                <p className="text-xs md:text-sm text-gray-500">Weekly Trend</p>
              </div>
              <div className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-blue-100 rounded-full">
                <TrendingUp size={12} className="text-blue-600" />
                <span className="text-xs md:text-sm font-medium text-blue-600">+50%</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={10} />
                <YAxis stroke="#9ca3af" fontSize={10} domain={[12, 24]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#colorUsers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-bold text-gray-800">Recent Activities</h3>
            <button className="text-xs md:text-sm text-purple-600 font-medium hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-1">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 hover:bg-gray-50 rounded-lg md:rounded-xl transition-colors"
              >
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'delete'
                      ? 'bg-red-100'
                      : 'bg-gradient-to-br from-purple-500 to-violet-500'
                  }`}
                >
                  {activity.type === 'delete' ? (
                    <Trash2 size={14} className="text-red-500" />
                  ) : (
                    <Image size={14} className="text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm text-gray-700 font-medium truncate">{activity.text}</p>
                </div>
                <span className="text-[10px] md:text-xs text-gray-400 bg-gray-100 px-2 md:px-3 py-1 rounded-full flex-shrink-0">
                  {activity.time}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
