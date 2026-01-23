import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  FileText,
  ChevronDown,
  X,
  HelpCircle,
  CheckCircle,
  Lightbulb,
  Monitor,
} from 'lucide-react';

const dummyQuestions = [
  {
    id: 1,
    question: 'What is the capital of India?',
    category: 'General Knowledge',
    options: ['Mumbai', 'Delhi', 'Kolkata', 'Chennai'],
    correctAnswer: 1,
    solution: 'Delhi is the capital of India since 1911.',
    difficulty: 'Easy',
  },
  {
    id: 2,
    question: 'Which planet is known as the Red Planet?',
    category: 'Science',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 1,
    solution: 'Mars appears red due to iron oxide on its surface.',
    difficulty: 'Easy',
  },
  {
    id: 3,
    question: 'What is H2O commonly known as?',
    category: 'Science',
    options: ['Salt', 'Sugar', 'Water', 'Acid'],
    correctAnswer: 2,
    solution: 'H2O is the chemical formula for water.',
    difficulty: 'Easy',
  },
];

const categories = ['Computer', 'Science', 'General Knowledge', 'Mathematics', 'History'];

const Questions = () => {
  const [questions, setQuestions] = useState(dummyQuestions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for new question
  const [newQuestion, setNewQuestion] = useState({
    category: 'Computer',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    solution: '',
    difficulty: 'Easy',
  });

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All Categories' || q.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const updateOption = (index, value) => {
    const newOptions = [...newQuestion.options];
    newOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: newOptions });
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
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
          <h1 className="text-2xl font-bold text-gray-800">Questions Management</h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={18} />
            Add Question
          </motion.button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            />
          </div>
          <div className="relative w-52">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none bg-white px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none cursor-pointer"
            >
              <option>All Categories</option>
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>
        </div>
      </motion.div>

      <div className="p-8">
        {/* Questions List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredQuestions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                        {question.category}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          question.difficulty === 'Easy'
                            ? 'bg-green-100 text-green-700'
                            : question.difficulty === 'Medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {question.difficulty}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">{question.question}</h3>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={18} className="text-blue-500" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteQuestion(question.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </motion.button>
                  </div>
                </div>

                {/* Options */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {question.options.map((option, i) => (
                    <div
                      key={i}
                      className={`px-4 py-3 rounded-lg text-sm flex items-center gap-2 ${
                        i === question.correctAnswer
                          ? 'bg-green-100 text-green-700 border-2 border-green-300'
                          : 'bg-gray-50 text-gray-600 border border-gray-200'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          i === question.correctAnswer
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      {option}
                      {i === question.correctAnswer && (
                        <CheckCircle size={16} className="ml-auto text-green-500" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Solution */}
                {question.solution && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                    <Lightbulb size={18} className="text-amber-600 mt-0.5" />
                    <div>
                      <span className="text-xs font-medium text-amber-700">Solution:</span>
                      <p className="text-sm text-amber-800">{question.solution}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredQuestions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No questions found</p>
          </motion.div>
        )}
      </div>

      {/* Add New Question Modal */}
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
              className="bg-white rounded-2xl w-full max-w-[700px] max-h-[90vh] overflow-hidden shadow-2xl"
            >
              {/* Modal Header - Purple */}
              <div className="bg-purple-600 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Plus size={24} className="text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Add New Question</h2>
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
                {/* Category Dropdown */}
                <div className="mb-5">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Monitor size={16} className="text-purple-500" />
                    Category *
                  </label>
                  <div className="relative">
                    <select
                      value={newQuestion.category}
                      onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                      className="w-full appearance-none px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none cursor-pointer"
                    >
                      {categories.map((cat) => (
                        <option key={cat}>{cat}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  </div>
                </div>

                {/* Question Input */}
                <div className="mb-5">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <HelpCircle size={16} className="text-purple-500" />
                    Question *
                  </label>
                  <textarea
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none"
                    placeholder="Enter question text"
                  />
                </div>

                {/* Options Section */}
                <div className="mb-5">
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Options *</label>
                  <div className="space-y-3">
                    {['A', 'B', 'C', 'D'].map((letter, index) => (
                      <div key={letter} className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-bold">
                          {letter}
                        </span>
                        <input
                          type="text"
                          value={newQuestion.options[index]}
                          onChange={(e) => updateOption(index, e.target.value)}
                          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                          placeholder={`Option ${letter}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Correct Answer Dropdown */}
                <div className="mb-5">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <CheckCircle size={16} className="text-green-500" />
                    Correct Answer *
                  </label>
                  <div className="relative">
                    <select
                      value={newQuestion.correctAnswer}
                      onChange={(e) =>
                        setNewQuestion({ ...newQuestion, correctAnswer: parseInt(e.target.value) })
                      }
                      className="w-full appearance-none px-4 py-3 bg-green-50 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none cursor-pointer"
                    >
                      <option value={0}>Option A</option>
                      <option value={1}>Option B</option>
                      <option value={2}>Option C</option>
                      <option value={3}>Option D</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none" size={18} />
                  </div>
                </div>

                {/* Solution/Explanation */}
                <div className="mb-5">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Lightbulb size={16} className="text-amber-500" />
                    Solution / Explanation *
                  </label>
                  <textarea
                    value={newQuestion.solution}
                    onChange={(e) => setNewQuestion({ ...newQuestion, solution: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none"
                    placeholder="Enter solution or explanation"
                  />
                </div>

                {/* Difficulty Level */}
                <div className="mb-5">
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Difficulty: {newQuestion.difficulty}
                  </label>
                  <div className="flex gap-3">
                    {['Easy', 'Medium', 'Hard'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setNewQuestion({ ...newQuestion, difficulty: level })}
                        className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                          newQuestion.difficulty === level
                            ? level === 'Easy'
                              ? 'bg-green-500 text-white'
                              : level === 'Medium'
                              ? 'bg-yellow-500 text-white'
                              : 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Save
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Questions;
