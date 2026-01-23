import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Clock,
  Calendar,
  IndianRupee,
  Store,
  Edit2,
  Trash2,
  X,
  FileText,
  AlertCircle,
  Info,
  CheckCircle,
  ClipboardList,
  ChevronDown,
} from 'lucide-react';

const dummyTasks = [
  {
    id: 1,
    title: 'Task 1',
    label: 'Task',
    reward: 0.0,
    date: '17/1/2026',
    status: 'active',
    isActive: true,
  },
  {
    id: 2,
    title: 'task 2',
    label: 'Task',
    reward: 0.0,
    date: '22/1/2026',
    status: 'active',
    isActive: true,
  },
];

const Tasks = () => {
  const [tasks, setTasks] = useState(dummyTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showScheduledModal, setShowScheduledModal] = useState(false);

  // Form state for new task
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    pointsPerCorrect: 2,
    pointsPerWrong: 1,
    adAfterQuestions: 2,
    taskToTaskGap: 24,
    taskToTaskGapUnit: 'Hours',
    sameTaskReopenGap: 72,
    sameTaskReopenGapUnit: 'Hours',
  });

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isActive: !task.isActive } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
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
          <h1 className="text-2xl font-bold text-gray-800">Tasks Management</h1>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowScheduledModal(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Clock size={18} />
              View Scheduled
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddModal(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={18} />
              Add Task
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
          />
        </div>
      </motion.div>

      <div className="p-8">
        {/* Task Cards */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  {/* Left Section - Task Icon & Title */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center">
                      <ClipboardList size={28} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{task.title}</h3>
                    </div>
                  </div>

                  {/* Middle Section - Info */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FileText size={16} className="text-gray-400" />
                      <span className="text-sm">{task.label}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <IndianRupee size={16} className="text-gray-400" />
                      <span className="text-sm">₹{task.reward.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-sm">{task.date}</span>
                    </div>
                  </div>

                  {/* Right Section - Status & Toggle */}
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        task.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {task.isActive ? 'Active' : 'Inactive'}
                    </span>

                    {/* Toggle Switch */}
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        task.isActive ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}
                    >
                      <motion.div
                        animate={{ x: task.isActive ? 24 : 2 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                      />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 border-2 border-amber-500 text-amber-500 rounded-lg flex items-center gap-2 hover:bg-amber-50 transition-colors"
                  >
                    <Store size={16} />
                    Store
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-lg flex items-center gap-2 hover:bg-blue-50 transition-colors"
                  >
                    <Edit2 size={16} />
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => deleteTask(task.id)}
                    className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg flex items-center gap-2 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <ClipboardList size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No tasks found</p>
          </motion.div>
        )}
      </div>

      {/* Add New Quiz Task Modal */}
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
              className="bg-white rounded-2xl w-full max-w-[800px] max-h-[90vh] overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="bg-emerald-500 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle size={24} className="text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Add New Quiz Task</h2>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                {/* Task Title */}
                <div className="mb-5">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <span className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center text-gray-500 text-xs font-bold">T</span>
                    Task Title *
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="Enter task title"
                  />
                </div>

                {/* Description */}
                <div className="mb-5">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FileText size={16} className="text-gray-500" />
                    Description
                  </label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                    placeholder="Enter task description"
                  />
                </div>

                {/* Quiz Settings */}
                <div className="mb-5">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Quiz Settings</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Points per Correct</label>
                      <input
                        type="number"
                        value={newTask.pointsPerCorrect}
                        onChange={(e) => setNewTask({ ...newTask, pointsPerCorrect: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Points per Wrong</label>
                      <input
                        type="number"
                        value={newTask.pointsPerWrong}
                        onChange={(e) => setNewTask({ ...newTask, pointsPerWrong: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Ad after N questions</label>
                      <input
                        type="number"
                        value={newTask.adAfterQuestions}
                        onChange={(e) => setNewTask({ ...newTask, adAfterQuestions: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Time Gap Settings */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-5">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle size={20} className="text-amber-600" />
                    <h3 className="font-medium text-amber-800">Time Gap Settings</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-700 mb-2 block">Task-to-Task Gap</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={newTask.taskToTaskGap}
                          onChange={(e) => setNewTask({ ...newTask, taskToTaskGap: parseInt(e.target.value) })}
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                          placeholder="Value *"
                        />
                        <div className="relative">
                          <select
                            value={newTask.taskToTaskGapUnit}
                            onChange={(e) => setNewTask({ ...newTask, taskToTaskGapUnit: e.target.value })}
                            className="appearance-none bg-white px-4 py-2 pr-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none cursor-pointer"
                          >
                            <option>Seconds</option>
                            <option>Minutes</option>
                            <option>Hours</option>
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-700 mb-2 block">Same Task Reopen Gap</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={newTask.sameTaskReopenGap}
                          onChange={(e) => setNewTask({ ...newTask, sameTaskReopenGap: parseInt(e.target.value) })}
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                          placeholder="Value *"
                        />
                        <div className="relative">
                          <select
                            value={newTask.sameTaskReopenGapUnit}
                            onChange={(e) => setNewTask({ ...newTask, sameTaskReopenGapUnit: e.target.value })}
                            className="appearance-none bg-white px-4 py-2 pr-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none cursor-pointer"
                          >
                            <option>Seconds</option>
                            <option>Minutes</option>
                            <option>Hours</option>
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Examples Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <Info size={18} className="text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-700">
                      <p className="mb-1">• 30 seconds = User waits 30s between tasks</p>
                      <p>• 5 minutes = User waits 5min</p>
                    </div>
                  </div>
                </div>
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
                  className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Add Task
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scheduled Tasks Modal */}
      <AnimatePresence>
        {showScheduledModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowScheduledModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-[600px] overflow-hidden shadow-2xl"
            >
              <div className="bg-amber-500 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock size={24} className="text-white" />
                  <h2 className="text-xl font-bold text-white">Scheduled Tasks</h2>
                </div>
                <button
                  onClick={() => setShowScheduledModal(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6">
                <div className="text-center py-8 text-gray-500">
                  <Clock size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No scheduled tasks at the moment</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tasks;
