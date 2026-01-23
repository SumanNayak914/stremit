import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet,
  Check,
  X,
  Clock,
  IndianRupee,
  Coins,
  CheckCircle,
  XCircle,
} from 'lucide-react';

const dummyWithdrawals = [
  {
    id: 1,
    user: 'Ashish',
    email: 'ashishkumargouda789@gmail.com',
    amount: 100,
    points: 0,
    charges: 0,
    total: 0,
    status: 'completed',
    voucherCode: 'JASDVJHA DMA DJABDJ',
    timestamp: 'Jan 23, 2026 • 07:53 PM',
  },
  {
    id: 2,
    user: 'Ashish',
    email: 'kumarashishgouda5@gmail.com',
    amount: 300,
    points: 3000,
    charges: 450,
    total: 3450,
    status: 'pending',
    timestamp: 'Jan 11, 2026 • 08:27 PM',
  },
  {
    id: 3,
    user: 'Rahul Kumar',
    email: 'rahul.kumar@gmail.com',
    amount: 200,
    points: 2000,
    charges: 320,
    total: 2320,
    status: 'rejected',
    reason: 'Insufficient balance',
    timestamp: 'Jan 10, 2026 • 03:15 PM',
  },
  {
    id: 4,
    user: 'Priya Singh',
    email: 'priya.singh@gmail.com',
    amount: 400,
    points: 4000,
    charges: 550,
    total: 4550,
    status: 'pending',
    timestamp: 'Jan 09, 2026 • 11:30 AM',
  },
];

const Wallets = () => {
  const [withdrawals, setWithdrawals] = useState(dummyWithdrawals);
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' },
    { id: 'rejected', label: 'Rejected' },
  ];

  const filteredWithdrawals = withdrawals.filter((w) => {
    if (activeTab === 'all') return true;
    return w.status === activeTab;
  });

  const updateStatus = (id, newStatus, voucherCode = '') => {
    setWithdrawals(
      withdrawals.map((w) =>
        w.id === id
          ? {
              ...w,
              status: newStatus,
              ...(voucherCode && { voucherCode }),
            }
          : w
      )
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <CheckCircle size={14} />
            Completed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
            <Clock size={14} />
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            <XCircle size={14} />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Purple Gradient */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6"
      >
        <h1 className="text-2xl font-bold text-white mb-4">Withdrawal Requests</h1>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-purple-700'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="p-8">
        {/* Withdrawal Cards */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredWithdrawals.map((withdrawal, index) => (
              <motion.div
                key={withdrawal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
              >
                {/* Top Section */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {withdrawal.user.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{withdrawal.user}</h3>
                      <p className="text-sm text-gray-500">{withdrawal.email}</p>
                    </div>
                  </div>
                  <span className="px-4 py-2 border-2 border-green-500 text-green-600 rounded-lg font-bold text-lg">
                    ₹{withdrawal.amount}
                  </span>
                </div>

                {/* Details Row */}
                <div className="flex items-center gap-6 mb-4 py-3 border-y border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Coins size={16} className="text-amber-500" />
                    <span className="text-sm">Amount: {withdrawal.points} pts</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <IndianRupee size={16} className="text-red-500" />
                    <span className="text-sm">Charges: {withdrawal.charges} pts</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-800 font-semibold ml-auto">
                    <span className="text-sm">Total: {withdrawal.total} pts</span>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusBadge(withdrawal.status)}

                    {/* Voucher Code for completed */}
                    {withdrawal.status === 'completed' && withdrawal.voucherCode && (
                      <div className="bg-green-50 border border-green-200 px-3 py-1 rounded-lg">
                        <span className="text-xs text-green-600">
                          Voucher: <span className="font-mono font-semibold">{withdrawal.voucherCode}</span>
                        </span>
                      </div>
                    )}

                    {/* Rejection reason */}
                    {withdrawal.status === 'rejected' && withdrawal.reason && (
                      <span className="text-xs text-red-500">Reason: {withdrawal.reason}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">{withdrawal.timestamp}</span>

                    {/* Action buttons for pending */}
                    {withdrawal.status === 'pending' && (
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            updateStatus(
                              withdrawal.id,
                              'completed',
                              `VCH${Math.random().toString(36).substring(2, 10).toUpperCase()}`
                            )
                          }
                          className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                          title="Approve"
                        >
                          <Check size={18} className="text-green-600" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateStatus(withdrawal.id, 'rejected')}
                          className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
                          title="Reject"
                        >
                          <X size={18} className="text-red-600" />
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredWithdrawals.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Wallet size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No withdrawal requests found</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Wallets;
