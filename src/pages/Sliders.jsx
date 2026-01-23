import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  SlidersHorizontal,
  X,
  Type,
  Image,
  FileImage,
  Layers,
  MessageSquare,
} from 'lucide-react';

const dummySliders = [
  {
    id: 1,
    title: 'Adhyayan',
    subtitle: 'Welcome',
    type: 'TEXT',
    gradient: 'from-purple-500 to-purple-700',
    order: 1,
    isActive: true,
  },
  {
    id: 2,
    title: 'Adhyayan',
    subtitle: 'Study & Earn',
    type: 'TEXT',
    gradient: 'from-rose-500 to-pink-600',
    order: 1,
    isActive: true,
  },
  {
    id: 3,
    title: 'Daily Quiz',
    subtitle: 'Win Prizes',
    type: 'TEXT',
    gradient: 'from-amber-400 to-orange-500',
    order: 2,
    isActive: true,
  },
];

const sliderTypes = [
  { id: 'TEXT', label: 'TEXT', icon: Type },
  { id: 'IMAGE', label: 'IMAGE', icon: Image },
  { id: 'GIF', label: 'GIF', icon: FileImage },
  { id: 'COMBINED', label: 'COMBINED', icon: Layers },
];

const gradientOptions = [
  'from-purple-500 to-purple-700',
  'from-rose-500 to-pink-600',
  'from-amber-400 to-orange-500',
  'from-blue-500 to-cyan-500',
  'from-green-500 to-emerald-600',
  'from-indigo-500 to-violet-600',
];

const Sliders = () => {
  const [sliders, setSliders] = useState(dummySliders);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSlider, setNewSlider] = useState({
    title: '',
    subtitle: '',
    message: '',
    type: 'TEXT',
    gradient: gradientOptions[0],
  });

  const toggleSliderStatus = (id) => {
    setSliders(
      sliders.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const deleteSlider = (id) => {
    setSliders(sliders.filter((s) => s.id !== id));
  };

  const addSlider = () => {
    const newId = Math.max(...sliders.map((s) => s.id), 0) + 1;
    setSliders([
      ...sliders,
      {
        id: newId,
        title: newSlider.title || 'New Slider',
        subtitle: newSlider.subtitle || 'Subtitle',
        type: newSlider.type,
        gradient: newSlider.gradient,
        order: sliders.length + 1,
        isActive: true,
      },
    ]);
    setShowAddModal(false);
    setNewSlider({
      title: '',
      subtitle: '',
      message: '',
      type: 'TEXT',
      gradient: gradientOptions[0],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Gradient */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6"
      >
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="text-white" size={28} />
          <h1 className="text-2xl font-bold text-white">Manage Home Sliders</h1>
        </div>
      </motion.div>

      <div className="p-8 pb-24">
        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {sliders.map((slider, index) => (
              <motion.div
                key={slider.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                className="relative rounded-2xl overflow-hidden shadow-lg"
              >
                {/* Slider Card Background */}
                <div
                  className={`bg-gradient-to-br ${slider.gradient} h-64 relative p-6 flex flex-col justify-between`}
                >
                  {/* Type Badge */}
                  <div className="flex justify-end">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                      {slider.type}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="text-white">
                    <h3 className="text-3xl font-bold mb-1">{slider.title}</h3>
                    <p className="text-white/80 text-lg">{slider.subtitle}</p>
                  </div>

                  {/* Decorative circles */}
                  <div className="absolute top-4 left-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                  <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                </div>

                {/* Bottom Controls */}
                <div className="bg-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">Order: {slider.order}</span>

                    {/* Toggle Switch */}
                    <button
                      onClick={() => toggleSliderStatus(slider.id)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        slider.isActive ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}
                    >
                      <motion.div
                        animate={{ x: slider.isActive ? 24 : 2 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                      />
                    </button>

                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        slider.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {slider.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Delete Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteSlider(slider.id)}
                    className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {sliders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <SlidersHorizontal size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No sliders added yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Click "Add Slider" to create your first banner
            </p>
          </motion.div>
        )}
      </div>

      {/* Fixed Add Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-purple-500/30 transition-colors"
      >
        <Plus size={20} />
        Add Slider
      </motion.button>

      {/* Add Slider Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-[600px] max-h-[90vh] overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Add Home Slider</h2>
                <div className="flex items-center gap-3">
                  {/* Type Selector */}
                  <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                    {sliderTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setNewSlider({ ...newSlider, type: type.id })}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${
                          newSlider.type === type.id
                            ? 'bg-white text-purple-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <type.icon size={14} />
                        {type.label}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Preview */}
                <div
                  className={`bg-gradient-to-br ${newSlider.gradient} h-40 rounded-xl p-5 mb-6 relative overflow-hidden`}
                >
                  <div className="text-white relative z-10">
                    <h3 className="text-2xl font-bold">
                      {newSlider.title || 'Slider Title'}
                    </h3>
                    <p className="text-white/80">
                      {newSlider.subtitle || 'Subtitle text'}
                    </p>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="bg-white/20 text-white px-2 py-1 rounded text-xs">
                      {newSlider.type}
                    </span>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                </div>

                {/* Gradient Selection */}
                <div className="mb-5">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Background Style
                  </label>
                  <div className="flex gap-2">
                    {gradientOptions.map((gradient, index) => (
                      <button
                        key={index}
                        onClick={() => setNewSlider({ ...newSlider, gradient })}
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} transition-transform ${
                          newSlider.gradient === gradient
                            ? 'ring-2 ring-purple-500 ring-offset-2 scale-110'
                            : 'hover:scale-105'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Title Input */}
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newSlider.title}
                    onChange={(e) => setNewSlider({ ...newSlider, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    placeholder="Enter slider title"
                  />
                </div>

                {/* Subtitle Input */}
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={newSlider.subtitle}
                    onChange={(e) => setNewSlider({ ...newSlider, subtitle: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    placeholder="Enter subtitle"
                  />
                </div>

                {/* Message Input (Optional) */}
                <div className="mb-4">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare size={16} className="text-gray-400" />
                    Message (Optional)
                  </label>
                  <textarea
                    value={newSlider.message}
                    onChange={(e) => setNewSlider({ ...newSlider, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none"
                    placeholder="Enter additional message"
                  />
                </div>

                {/* Image Upload for IMAGE/GIF type */}
                {(newSlider.type === 'IMAGE' || newSlider.type === 'GIF' || newSlider.type === 'COMBINED') && (
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Upload {newSlider.type}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
                      <Image size={32} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addSlider}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add Slider
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sliders;
