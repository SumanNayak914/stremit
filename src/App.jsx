import React from 'react';
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
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 ml-[250px]">
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
