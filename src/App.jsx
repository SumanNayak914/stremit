import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import Questions from './pages/Questions';
import Tasks from './pages/Tasks';
import Users from './pages/Users';
import Sliders from './pages/Sliders';
import Wallets from './pages/Wallets';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Main Content Area */}
        <main className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'md:ml-[250px]' : 'ml-0'
        }`}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/users" element={<Users />} />
            <Route path="/sliders" element={<Sliders />} />
            <Route path="/wallets" element={<Wallets />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
