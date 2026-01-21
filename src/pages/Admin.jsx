import React, { useState, useEffect } from 'react';
import { saveQuestions, getQuestions, clearQuestions, deleteQuestion } from '../services/geminiApi';

const Admin = () => {
  const [topic, setTopic] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [savedQuestions, setSavedQuestions] = useState([]);
  
  // Progress tracking states
  const [progress, setProgress] = useState(0);
  const [generatedCount, setGeneratedCount] = useState(0);
  const [totalToGenerate, setTotalToGenerate] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);

  // Email modal - SIMPLE VERSION (only recipient email)
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    setSavedQuestions(getQuestions());
  }, []);

  // Function to generate questions in batches with progress
  const generateQuestionsWithProgress = async (topic, totalQuestions) => {
    const BATCH_SIZE = 10;
    const numBatches = Math.ceil(totalQuestions / BATCH_SIZE);
    let allGeneratedQuestions = [];
    
    setTotalToGenerate(totalQuestions);
    setGeneratedCount(0);
    setProgress(0);
    
    const estimatedSeconds = numBatches * 4;
    setEstimatedTime(estimatedSeconds);

    for (let batch = 0; batch < numBatches; batch++) {
      const questionsInBatch = Math.min(BATCH_SIZE, totalQuestions - (batch * BATCH_SIZE));
      
      try {
        const response = await fetch('http://localhost:5000/api/generate-questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            topic, 
            numberOfQuestions: questionsInBatch 
          })
        });

        if (!response.ok) {
          throw new Error('Failed to generate batch');
        }

        const data = await response.json();
        allGeneratedQuestions = [...allGeneratedQuestions, ...data.questions];
        
        const newCount = allGeneratedQuestions.length;
        setGeneratedCount(newCount);
        setProgress(Math.round((newCount / totalQuestions) * 100));
        
        if (batch < numBatches - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
      } catch (err) {
        console.error(`Error in batch ${batch + 1}:`, err);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    return allGeneratedQuestions;
  };

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
      const startTimeMs = Date.now();
      const questions = await generateQuestionsWithProgress(topic, numberOfQuestions);
      
      if (questions.length > 0) {
        saveQuestions(questions);
        setSavedQuestions(getQuestions());
        
        const timeTakenMs = Date.now() - startTimeMs;
        const timeTakenSeconds = Math.round(timeTakenMs / 1000);
        
        setSuccess(`🎉 ${questions.length} questions generated successfully in ${timeTakenSeconds} seconds!`);
        setTopic('');
      } else {
        setError('No questions generated. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
      setProgress(0);
      setGeneratedCount(0);
      setTotalToGenerate(0);
    }
  };

  // Download as Excel (CSV format)
  const handleDownloadExcel = () => {
    if (savedQuestions.length === 0) {
      setError('No questions to download!');
      return;
    }

    // Create CSV content
    let csvContent = "No.,Topic,Question,Option A,Option B,Option C,Option D,Correct Answer\n";
    
    savedQuestions.forEach((q, index) => {
      const row = [
        index + 1,
        `"${q.topic || ''}"`,
        `"${q.question || ''}"`,
        `"${q.options?.[0] || ''}"`,
        `"${q.options?.[1] || ''}"`,
        `"${q.options?.[2] || ''}"`,
        `"${q.options?.[3] || ''}"`,
        `"${q.correctAnswer || ''}"`
      ].join(',');
      csvContent += row + "\n";
    });

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `MCQ_Questions_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setSuccess('✅ Excel file downloaded successfully!');
  };

  // Send via Email - SIMPLE VERSION
  const handleSendEmail = async () => {
    if (savedQuestions.length === 0) {
      setError('No questions to send!');
      return;
    }

    if (!recipientEmail || !recipientEmail.includes('@')) {
      setError('Please enter a valid email address!');
      return;
    }

    setSendingEmail(true);
    setError('');

    try {
      // Create CSV content
      let csvContent = "No.,Topic,Question,Option A,Option B,Option C,Option D,Correct Answer\n";
      
      savedQuestions.forEach((q, index) => {
        const row = [
          index + 1,
          `"${q.topic || ''}"`,
          `"${q.question || ''}"`,
          `"${q.options?.[0] || ''}"`,
          `"${q.options?.[1] || ''}"`,
          `"${q.options?.[2] || ''}"`,
          `"${q.options?.[3] || ''}"`,
          `"${q.correctAnswer || ''}"`
        ].join(',');
        csvContent += row + "\n";
      });

      // Send to backend
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientEmail: recipientEmail,
          csvContent: csvContent,
          questionCount: savedQuestions.length
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }

      setSuccess(`✅ Email sent successfully to ${recipientEmail}!`);
      setShowEmailModal(false);
      setRecipientEmail('');
    } catch (err) {
      setError(`❌ Email error: ${err.message}`);
    } finally {
      setSendingEmail(false);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all questions?')) {
      clearQuestions();
      setSavedQuestions([]);
      setSuccess('All questions cleared!');
    }
  };

  const handleDeleteQuestion = (id) => {
    if (window.confirm('Delete this question?')) {
      deleteQuestion(id);
      setSavedQuestions(getQuestions());
      setSuccess('Question deleted!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎓 Admin Panel - Question Generator
          </h1>
          <p className="text-gray-600">Generate, Download & Email MCQ Questions</p>
        </div>

        {/* Generate Questions Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
            <span className="text-3xl">✨</span>
            Generate New Questions
          </h2>

          <form onSubmit={handleGenerateQuestions} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  📚 Topic
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Science, Math, History..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  🔢 Number of Questions
                </label>
                <select
                  value={numberOfQuestions}
                  onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={loading}
                >
                  <option value={1}>1 Question</option>
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                  <option value={20}>20 Questions</option>
                  <option value={50}>50 Questions</option>
                  <option value={100}>100 Questions</option>
                  <option value={200}>200 Questions 🔥</option>
                </select>
              </div>
            </div>

            {loading && (
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Generating questions...</span>
                  <span className="font-semibold">{generatedCount} / {totalToGenerate}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-500 flex items-center justify-center text-white text-sm font-semibold"
                    style={{ width: `${progress}%` }}
                  >
                    {progress}%
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>⏱️ Estimated time: ~{estimatedTime} seconds</span>
                  <span>🚀 Processing in batches of 10...</span>
                </div>

                <div className="text-center py-2 bg-blue-50 rounded-lg">
                  <p className="text-blue-700 font-medium">
                    🔄 Auto-requesting in background... Please wait!
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-semibold text-lg shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating... {generatedCount}/{totalToGenerate}
                </span>
              ) : (
                '🚀 Generate Questions with AI'
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
              <strong>❌ Error:</strong> {error}
            </div>
          )}

          {success && (
            <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-lg">
              <strong>✅ Success:</strong> {success}
            </div>
          )}
        </div>

        {/* Saved Questions Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 flex items-center gap-2">
              <span className="text-3xl">📝</span>
              Saved Questions ({savedQuestions.length})
            </h2>
            
            <div className="flex gap-3">
              {savedQuestions.length > 0 && (
                <>
                  <button
                    onClick={handleDownloadExcel}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    📥 Download Excel
                  </button>
                  
                  <button
                    onClick={() => setShowEmailModal(true)}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    📧 Send via Email
                  </button>
                  
                  <button
                    onClick={handleClearAll}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium shadow-md hover:shadow-lg"
                  >
                    🗑️ Clear All
                  </button>
                </>
              )}
            </div>
          </div>

          {savedQuestions.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-500 text-lg">
                No questions yet. Generate some questions above!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">#</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Topic</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Question</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Options</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Correct Answer</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {savedQuestions.map((q, index) => (
                    <tr key={`${q.id}-${index}`} className="hover:bg-blue-50 transition-colors">
                      <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-700">{index + 1}</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                          {q.topic}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">{q.question}</td>
                      <td className="border border-gray-300 px-4 py-3">
                        {q.options && q.options.length > 0 ? (
                          <ol className="list-none space-y-1">
                            {q.options.map((option, idx) => (
                              <li 
                                key={idx}
                                className={`text-sm px-2 py-1 rounded ${
                                  option === q.correctAnswer 
                                    ? 'bg-green-100 text-green-800 font-semibold' 
                                    : 'text-gray-700'
                                }`}
                              >
                                <strong>{String.fromCharCode(65 + idx)}.</strong> {option}
                              </li>
                            ))}
                          </ol>
                        ) : (
                          <span className="text-gray-400 italic">No options</span>
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg font-semibold text-sm">
                          ✓ {q.correctAnswer || 'Not specified'}
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center">
                        <button
                          onClick={() => handleDeleteQuestion(q.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* SIMPLE Email Modal - Only Recipient Email */}
        {showEmailModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                📧 Send Questions via Email
              </h3>
              
              <p className="text-gray-600 mb-4">
                Enter the recipient's email address to receive {savedQuestions.length} questions.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    📨 Recipient Email Address
                  </label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSendEmail}
                  disabled={sendingEmail}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
                >
                  {sendingEmail ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    '📧 Send Email'
                  )}
                </button>
                <button
                  onClick={() => {
                    setShowEmailModal(false);
                    setRecipientEmail('');
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 font-medium"
                  disabled={sendingEmail}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 underline font-medium text-lg"
          >
            🏠 Go to Home Page
          </a>
        </div>
      </div>
    </div>
  );
};

export default Admin;