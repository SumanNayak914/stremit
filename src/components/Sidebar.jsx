import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutGrid,
  Triangle,
  FileText,
  ClipboardList,
  Users,
  SlidersHorizontal,
  Wallet
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
  { name: 'Categories', icon: Triangle, path: '/categories' },
  { name: 'Questions', icon: FileText, path: '/questions' },
  { name: 'Tasks', icon: ClipboardList, path: '/tasks' },
  { name: 'Users', icon: Users, path: '/users' },
  { name: 'Sliders', icon: SlidersHorizontal, path: '/sliders' },
  { name: 'Wallets', icon: Wallet, path: '/wallets' },
];

const Sidebar = () => {
  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed left-0 top-0 h-screen w-[250px] bg-gradient-to-b from-purple-600 to-purple-800 text-white flex flex-col z-50"
    >
      {/* Logo Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex flex-col items-center py-8 border-b border-purple-500/30"
      >
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-2">
          <span className="text-purple-700 text-2xl font-bold">G</span>
        </div>
        <span className="text-white font-bold text-lg">Admin</span>
      </motion.div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6 px-3">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index + 0.4, duration: 0.3 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-white text-purple-700 shadow-lg'
                      : 'text-white/90 hover:bg-white/10'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      size={20}
                      className={isActive ? 'text-purple-700' : 'text-white/90'}
                    />
                    <span className="font-medium">{item.name}</span>
                  </>
                )}
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-purple-500/30">
        <p className="text-xs text-purple-200 text-center">
          Adhyayan Earn v1.0
        </p>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
