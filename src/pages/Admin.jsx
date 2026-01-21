import React, { useState, useEffect } from 'react';
import { generateQuestions, saveQuestions, getQuestions, clearQuestions, deleteQuestion } from '../services/geminiApi';

const Admin = () => {
  const [topic, setTopic] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [savedQuestions, setSavedQuestions] = useState([]);

  useEffect(() => {
    setSavedQuestions(getQuestions());
  }, []);

  const handleGenerateQuestions = async (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const questions = await generateQuestions(topic, numberOfQuestions);
      saveQuestions(questions);
      setSavedQuestions(getQuestions());
      setSuccess(`${questions.length} questions generated successfully!`);
      setTopic('');
    } catch (err) {
      setError(err.message || 'Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = () => {
    clearQuestions();
    setSavedQuestions([]);
    setSuccess('All questions cleared!');
  };

  const handleDeleteQuestion = (id) => {
    deleteQuestion(id);
    setSavedQuestions(getQuestions());
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Admin Panel - Question Generator
        </h1>

        {/* Generate Questions Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Generate New Questions</h2>

          <form onSubmit={handleGenerateQuestions} className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-2">Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Science, Math, History..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">Number of Questions</label>
              <select
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={3}>3 Questions</option>
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating... (may take 30 sec)' : 'Generate Questions with AI'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
              {success}
            </div>
          )}
        </div>

        {/* Saved Questions List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Saved Questions ({savedQuestions.length})
            </h2>
            {savedQuestions.length > 0 && (
              <button
                onClick={handleClearAll}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {savedQuestions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No questions yet. Generate some questions above!
            </p>
          ) : (
            <div className="space-y-3">
              {savedQuestions.map((q, index) => (
                <div
                  key={`${q.id}-${index}`}
                  className="flex justify-between items-start p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex-1">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded mb-2">
                      {q.topic}
                    </span>
                    <p className="text-gray-800">{q.question}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Go to Home Page to see questions
          </a>
        </div>
      </div>
    </div>
  );
};

export default Admin;
