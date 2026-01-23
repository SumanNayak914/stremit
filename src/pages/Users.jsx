import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users as UsersIcon,
  Search,
  Settings,
  Download,
  Eye,
  Edit2,
  Ban,
  Trash2,
  X,
  Coins,
  Wallet,
  IndianRupee,
  Calendar,
  Bell,
  Info,
} from 'lucide-react';

const dummyUsers = [
  {
    id: 1,
    name: 'suman',
    email: 'sumankumargouda789@gmail.com',
    points: 0,
    balance: 0.01,
    totalEarned: 1.0,
    joinDate: '25/12/2025',
    status: 'active',
    avatar: 'S',
    avatarBg: 'bg-blue-500',
  },
  {
    id: 2,
    name: 'Subham Rauta',
    email: 'subhamrauta39@gmail.com',
    points: 2,
    balance: 2.0,
    totalEarned: 2.0,
    joinDate: '20/12/2025',
    status: 'active',
    avatar: 'S',
    avatarBg: 'bg-purple-500',
  },
  {
    id: 3,
    name: 'suman',
    email: 'sumann@gmail.com',
    points: 0,
    balance: 0.0,
    totalEarned: 0.0,
    joinDate: '12/12/2025',
    status: 'active',
    avatar: 'S',
    avatarBg: 'bg-green-500',
  },
];

const Users = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Admin settings state
  const [settings, setSettings] = useState({
    pointsPerRupee: 100,
    withdrawalCharges: {
      100: 500,
      200: 320,
      300: 450,
      400: 550,
    },
  });

  const tabs = [
    { id: 'all', label: 'All Users' },
    { id: 'active', label: 'Active' },
    { id: 'blocked', label: 'Blocked' },
    { id: 'requests', label: 'Requests', hasNotification: true },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'active' && user.status === 'active') ||
      (activeTab === 'blocked' && user.status === 'blocked');
    return matchesSearch && matchesTab;
  });

  const maskEmail = (email) => {
    const [name, domain] = email.split('@');
    if (name.length > 4) {
      return `${name.slice(0, 4)}****@${domain}`;
    }
    return email;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white px-8 py-6 border-b border-gray-100"
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowSettingsModal(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings size={22} className="text-gray-600" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Download size={18} />
              Export Data
            </motion.button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium text-sm transition-colors relative ${
                activeTab === tab.id
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="flex items-center gap-2">
                {tab.label}
                {tab.hasNotification && (
                  <Bell size={14} className="text-amber-500" />
                )}
              </span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by email or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
          />
        </div>
      </motion.div>

      <div className="p-8">
        {/* User Cards */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  {/* Left Section - Avatar & Info */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 ${user.avatarBg} rounded-full flex items-center justify-center text-white font-bold text-lg`}
                    >
                      {user.avatar}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        <span className="text-red-500">{maskEmail(user.email)}</span>
                      </p>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                    </div>
                  </div>

                  {/* Middle Section - Stats */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Coins size={16} className="text-amber-500" />
                      <span className="text-sm">Points: {user.points}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Wallet size={16} className="text-blue-500" />
                      <span className="text-sm">Balance: ₹{user.balance.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <IndianRupee size={16} />
                      <span className="text-sm">Total Earned: ₹{user.totalEarned.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-sm">Joined: {user.joinDate}</span>
                    </div>
                  </div>

                  {/* Right Section - Status & Actions */}
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {user.status === 'active' ? 'Active' : 'Blocked'}
                    </span>

                    {/* Action Icons */}
                    <div className="flex gap-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye size={18} className="text-blue-500" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} className="text-amber-500" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Block"
                      >
                        <Ban size={18} className="text-red-500" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} className="text-red-500" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredUsers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <UsersIcon size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No users found</p>
          </motion.div>
        )}
      </div>

      {/* Admin Settings Modal */}
      <AnimatePresence>
        {showSettingsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSettingsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-[600px] max-h-[90vh] overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="bg-purple-600 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings size={24} className="text-white" />
                  <h2 className="text-xl font-bold text-white">Admin Settings</h2>
                </div>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                {/* Point Conversion Rate */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Point Conversion Rate</h3>
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Coins size={16} className="text-amber-500" />
                      Points per Rupee
                    </label>
                    <input
                      type="number"
                      value={settings.pointsPerRupee}
                      onChange={(e) =>
                        setSettings({ ...settings, pointsPerRupee: parseInt(e.target.value) })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                    <p className="text-xs text-gray-400 mt-2">
                      Example: 10 means 10 points = ₹1
                    </p>
                  </div>

                  {/* Current Rate Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-3">
                    <div className="flex items-start gap-2">
                      <Info size={18} className="text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-700">
                          Current: {settings.pointsPerRupee} points = ₹1
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          This affects all user balances in real-time
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Withdrawal Charges */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Withdrawal Charges</h3>
                  <div className="space-y-3">
                    {Object.entries(settings.withdrawalCharges).map(([amount, charge]) => (
                      <div
                        key={amount}
                        className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4"
                      >
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg font-semibold text-sm">
                          ₹{amount}
                        </span>
                        <div className="flex-1">
                          <label className="text-xs text-gray-500 block mb-1">
                            Charge (points)
                          </label>
                          <input
                            type="number"
                            value={charge}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                withdrawalCharges: {
                                  ...settings.withdrawalCharges,
                                  [amount]: parseInt(e.target.value),
                                },
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                          />
                          <p className="text-xs text-gray-400 mt-1">
                            Service charge for ₹{amount} withdrawal
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Save Settings
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Users;
