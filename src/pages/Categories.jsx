import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Tag,
  FileText,
  Monitor,
  Users,
  Lightbulb,
  User,
  Calculator,
  BookOpen,
  Globe,
  Smartphone,
  HelpCircle,
  Snowflake,
  Music,
  Triangle,
  Atom,
  Brain,
  Palette,
  Camera,
  Heart,
  Star,
  Zap,
} from 'lucide-react';

const iconOptions = [
  { id: 'users', icon: Users, label: 'Users' },
  { id: 'lightbulb', icon: Lightbulb, label: 'Lightbulb' },
  { id: 'user', icon: User, label: 'User' },
  { id: 'calculator', icon: Calculator, label: 'Calculator' },
  { id: 'book', icon: BookOpen, label: 'Book' },
  { id: 'globe', icon: Globe, label: 'Globe' },
  { id: 'monitor', icon: Monitor, label: 'Computer' },
  { id: 'smartphone', icon: Smartphone, label: 'Mobile' },
  { id: 'help', icon: HelpCircle, label: 'Question' },
  { id: 'snowflake', icon: Snowflake, label: 'Snowflake' },
  { id: 'music', icon: Music, label: 'Music' },
  { id: 'triangle', icon: Triangle, label: 'Triangle' },
  { id: 'atom', icon: Atom, label: 'Science' },
  { id: 'brain', icon: Brain, label: 'Brain' },
  { id: 'palette', icon: Palette, label: 'Art' },
  { id: 'camera', icon: Camera, label: 'Camera' },
  { id: 'heart', icon: Heart, label: 'Heart' },
  { id: 'star', icon: Star, label: 'Star' },
  { id: 'zap', icon: Zap, label: 'Energy' },
];

const dummyCategories = [
  {
    id: 1,
    name: 'Computer',
    description: '',
    questionsCount: 0,
    icon: 'monitor',
    priority: 1,
    isActive: true,
    createdAt: '9 Jan',
  },
  {
    id: 2,
    name: 'Resoning',
    description:
      'Reasoning Questions help students improve their logical thinking, problem-solving skills, and decision making ability. These questions test how well a person can understand patterns, relationships, and sequences.',
    questionsCount: 1,
    icon: 'triangle',
    priority: 1,
    isActive: true,
    createdAt: '13 Jan',
  },
];

const Categories = () => {
  const [categories, setCategories] = useState(dummyCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    priority: 1,
    isActive: true,
    icon: 'users',
  });

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIconComponent = (iconId) => {
    const iconOption = iconOptions.find((opt) => opt.id === iconId);
    return iconOption ? iconOption.icon : Monitor;
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const addCategory = () => {
    const newId = Math.max(...categories.map((c) => c.id), 0) + 1;
    setCategories([
      ...categories,
      {
        id: newId,
        name: newCategory.name || 'New Category',
        description: newCategory.description,
        questionsCount: 0,
        icon: newCategory.icon,
        priority: newCategory.priority,
        isActive: newCategory.isActive,
        createdAt: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
      },
    ]);
    setShowAddModal(false);
    resetForm();
  };

  const resetForm = () => {
    setNewCategory({
      name: '',
      description: '',
      priority: 1,
      isActive: true,
      icon: 'users',
    });
    setEditingCategory(null);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description,
      priority: category.priority,
      isActive: category.isActive,
      icon: category.icon,
    });
    setShowAddModal(true);
  };

  const updateCategory = () => {
    setCategories(
      categories.map((cat) =>
        cat.id === editingCategory.id
          ? {
              ...cat,
              name: newCategory.name,
              description: newCategory.description,
              priority: newCategory.priority,
              isActive: newCategory.isActive,
              icon: newCategory.icon,
            }
          : cat
      )
    );
    setShowAddModal(false);
    resetForm();
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
          <h1 className="text-2xl font-bold text-gray-800">Categories Management</h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={18} />
            Add Category
          </motion.button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
          />
        </div>
      </motion.div>

      <div className="p-8">
        {/* Category Cards */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredCategories.map((category, index) => {
              const IconComponent = getIconComponent(category.icon);
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    {/* Left Section */}
                    <div className="flex items-start gap-4 flex-1">
                      {/* Icon */}
                      <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent size={28} className="text-purple-600" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-gray-800 text-lg">{category.name}</h3>
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium ${
                              category.isActive
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {category.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>

                        {category.description && (
                          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                            {category.description}
                          </p>
                        )}

                        <div className="flex items-center gap-2">
                          <FileText size={14} className="text-gray-400" />
                          <span
                            className={`text-sm px-2 py-0.5 rounded ${
                              category.questionsCount > 0
                                ? 'bg-green-100 text-green-700'
                                : 'text-gray-500'
                            }`}
                          >
                            {category.questionsCount} Q{category.questionsCount !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-col items-end gap-3 ml-4">
                      {/* Priority Badge */}
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                        P{category.priority}
                      </span>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openEditModal(category)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} className="text-blue-500" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteCategory(category.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} className="text-red-500" />
                        </motion.button>
                      </div>

                      {/* Date */}
                      <span className="text-xs text-gray-400">{category.createdAt}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Triangle size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No categories found</p>
          </motion.div>
        )}
      </div>

      {/* Add/Edit Category Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowAddModal(false);
              resetForm();
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-[700px] max-h-[90vh] overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="bg-purple-600 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Plus size={24} className="text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    {editingCategory ? 'Edit Category' : 'Add New Category'}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                {/* Category Name */}
                <div className="mb-5">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Tag size={16} className="text-purple-500" />
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                    placeholder="Enter category name"
                  />
                </div>

                {/* Description */}
                <div className="mb-5">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FileText size={16} className="text-gray-400" />
                    Description (Optional)
                  </label>
                  <textarea
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none"
                    placeholder="Enter category description"
                  />
                </div>

                {/* Priority Slider */}
                <div className="mb-5">
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Priority: <span className="text-purple-600 font-bold">{newCategory.priority}</span>
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={newCategory.priority}
                      onChange={(e) =>
                        setNewCategory({ ...newCategory, priority: parseInt(e.target.value) })
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-purple"
                      style={{
                        background: `linear-gradient(to right, #7C3AED 0%, #7C3AED ${
                          ((newCategory.priority - 1) / 9) * 100
                        }%, #E5E7EB ${((newCategory.priority - 1) / 9) * 100}%, #E5E7EB 100%)`,
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>1</span>
                      <span>5</span>
                      <span>10</span>
                    </div>
                  </div>
                </div>

                {/* Active Status */}
                <div className="mb-5 flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Active Status</label>
                    <p className="text-xs text-gray-500">Category is active</p>
                  </div>
                  <button
                    onClick={() => setNewCategory({ ...newCategory, isActive: !newCategory.isActive })}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      newCategory.isActive ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  >
                    <motion.div
                      animate={{ x: newCategory.isActive ? 28 : 2 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="absolute top-1 w-5 h-5 bg-white rounded-full shadow"
                    />
                  </button>
                </div>

                {/* Icon Selector */}
                <div className="mb-5">
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Select Icon:</label>
                  <div className="grid grid-cols-9 gap-2">
                    {iconOptions.map((option) => {
                      const IconComp = option.icon;
                      const isSelected = newCategory.icon === option.id;
                      return (
                        <motion.button
                          key={option.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setNewCategory({ ...newCategory, icon: option.id })}
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                          title={option.label}
                        >
                          <IconComp size={22} />
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={editingCategory ? updateCategory : addCategory}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {editingCategory ? 'Update Category' : 'Add Category'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Slider Styles */}
      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #7C3AED;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(124, 58, 237, 0.4);
        }
        input[type='range']::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #7C3AED;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(124, 58, 237, 0.4);
        }
      `}</style>
    </div>
  );
};

export default Categories;
