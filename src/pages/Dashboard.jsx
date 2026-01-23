import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
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
  Settings,
  Cloud,
  Sparkles,
  Play,
  Trash2,
  Image
} from 'lucide-react';
import StatCard from '../components/StatCard';

// Dummy data for charts
const withdrawalData = [
  { day: 'Sat', amount: 0 },
  { day: 'Sun', amount: 0 },
  { day: 'Mon', amount: 0 },
  { day: 'Tue', amount: 0 },
  { day: 'Wed', amount: 0 },
  { day: 'Thu', amount: 0 },
  { day: 'Fri', amount: 0 },
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
    { icon: Users, iconBg: 'bg-blue-500', value: '27', label: 'Total Users' },
    { icon: Triangle, iconBg: 'bg-pink-500', value: '2', label: 'Categories' },
    { icon: HelpCircle, iconBg: 'bg-orange-500', value: '35', label: 'Questions' },
    { icon: ClipboardList, iconBg: 'bg-green-500', value: '2', label: 'Tasks' },
  ];

  const stats2 = [
    { icon: Clock, iconBg: 'bg-yellow-500', value: '0', label: 'Pending Withdrawals' },
    { icon: IndianRupee, iconBg: 'bg-teal-500', value: '₹0.00', label: 'Total Withdrawal Requests' },
    { icon: TrendingUp, iconBg: 'bg-blue-600', value: '0', label: 'Active Today' },
    { icon: Building2, iconBg: 'bg-purple-500', value: '₹1096.07', label: 'Total User Balance' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white px-8 py-6 border-b border-gray-100"
      >
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      </motion.div>

      <div className="p-8 space-y-6">
        {/* AI Question Generator Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl p-6 border border-purple-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center relative">
                <Settings size={28} className="text-white" />
                <Sparkles size={14} className="text-yellow-300 absolute -top-1 -right-1" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">AI Question Generator</h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Cloud size={16} className="text-purple-600" />
                    <span className="text-sm">Cloud Functions: Active</span>
                    <span className="text-green-500">✓</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} className="text-purple-600" />
                    <span className="text-sm">Auto-Run: Daily at 12:00 AM IST</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-gray-500">
                  <span>• Cloud Functions (Firebase)</span>
                  <span>• Deletes old questions</span>
                  <span>• Runs automatically at 12 AM IST</span>
                  <span>• Generates 30 MCQ per category</span>
                  <span>• Works when admin app is closed</span>
                  <span>• Uses Gemini AI v1xbeta</span>
                </div>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <Play size={18} fill="white" />
            Generate Questions Now (Test)
          </motion.button>
        </motion.div>

        {/* Stats Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index} />
          ))}
        </div>

        {/* Stats Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats2.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index + 4} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Withdrawal Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Withdrawal Requests (Last 7 Days)
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={withdrawalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `₹${v}`} />
                <Tooltip
                  formatter={(value) => [`₹${value}`, 'Amount']}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#14b8a6"
                  strokeWidth={2}
                  dot={{ fill: '#14b8a6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* User Growth Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">User Growth</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} domain={[12, 24]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
          <div className="space-y-1">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.type === 'delete' ? 'bg-red-100' : 'bg-purple-100'
                  }`}
                >
                  {activity.type === 'delete' ? (
                    <Trash2 size={18} className="text-red-500" />
                  ) : (
                    <Image size={18} className="text-purple-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{activity.text}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
