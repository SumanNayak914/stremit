import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid,
  Triangle,
  FileText,
  ClipboardList,
  Users,
  SlidersHorizontal,
  Wallet,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', icon: LayoutGrid, path: '/dashboard', color: 'from-blue-500 to-blue-600' },
  { name: 'Categories', icon: Triangle, path: '/categories', color: 'from-pink-500 to-rose-500' },
  { name: 'Questions', icon: FileText, path: '/questions', color: 'from-orange-500 to-amber-500' },
  { name: 'Tasks', icon: ClipboardList, path: '/tasks', color: 'from-green-500 to-emerald-500' },
  { name: 'Users', icon: Users, path: '/users', color: 'from-cyan-500 to-teal-500' },
  { name: 'Sliders', icon: SlidersHorizontal, path: '/sliders', color: 'from-violet-500 to-purple-500' },
  { name: 'Wallets', icon: Wallet, path: '/wallets', color: 'from-indigo-500 to-blue-500' },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpen]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile, setIsOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-[60] p-2 bg-purple-600 text-white rounded-xl shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="md:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`fixed left-0 top-0 h-screen w-[250px] md:w-[250px] bg-gradient-to-b from-violet-700 via-purple-700 to-indigo-800 text-white flex flex-col z-50 overflow-hidden`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            </div>

            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative flex flex-col items-center py-6 border-b border-white/10"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-white to-purple-100 rounded-2xl flex items-center justify-center mb-3 shadow-lg shadow-purple-900/30"
              >
                <span className="bg-gradient-to-br from-purple-600 to-indigo-600 bg-clip-text text-transparent text-2xl md:text-3xl font-black">
                  A
                </span>
              </motion.div>
              <h1 className="text-lg md:text-xl font-bold tracking-wide">Adhyayan</h1>
              <span className="text-xs text-purple-200 mt-1">Admin Panel</span>
            </motion.div>

            {/* Navigation Menu */}
            <nav className="flex-1 py-4 px-3 overflow-y-auto relative">
              <p className="text-xs text-purple-300 uppercase tracking-wider px-4 mb-3 font-semibold">
                Main Menu
              </p>
              <ul className="space-y-1">
                {menuItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index + 0.4, duration: 0.3 }}
                    >
                      <NavLink
                        to={item.path}
                        className={`group flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl transition-all duration-300 relative ${
                          isActive
                            ? 'bg-white text-purple-700 shadow-lg shadow-purple-900/20'
                            : 'text-white/80 hover:bg-white/10'
                        }`}
                      >
                        {/* Active Indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 md:h-8 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-r-full"
                          />
                        )}

                        {/* Icon Container */}
                        <div
                          className={`w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center transition-all ${
                            isActive
                              ? `bg-gradient-to-br ${item.color} shadow-md`
                              : 'bg-white/10 group-hover:bg-white/20'
                          }`}
                        >
                          <item.icon
                            size={16}
                            className={isActive ? 'text-white' : 'text-white/90'}
                          />
                        </div>

                        <span className="font-medium flex-1 text-sm md:text-base">{item.name}</span>

                        {/* Arrow for active */}
                        {isActive && (
                          <ChevronRight size={16} className="text-purple-400 hidden md:block" />
                        )}
                      </NavLink>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* User Profile Section */}
            <div className="relative p-3 md:p-4 border-t border-white/10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-white/10 rounded-xl backdrop-blur-sm"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-white shadow-lg text-sm md:text-base">
                  A
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-semibold truncate">Admin User</p>
                  <p className="text-[10px] md:text-xs text-purple-200 truncate">admin@adhyayan.com</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 md:p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut size={16} className="text-purple-200" />
                </motion.button>
              </motion.div>

              {/* Version */}
              <p className="text-[10px] text-purple-300/60 text-center mt-2 md:mt-3">
                Version 1.0.0
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
