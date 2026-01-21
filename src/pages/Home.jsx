import React, { useState, useEffect } from 'react';
import HeroCarousel from '../Components/HeroCarousel ';
import { getQuestions } from '../services/geminiApi';

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState({});

  useEffect(() => {
    setQuestions(getQuestions());
  }, []);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer
    });
  };

  const handleSubmitAnswer = (questionId, correctAnswer) => {
    setShowResults({
      ...showResults,
      [questionId]: true
    });
  };

  const isCorrect = (questionId, correctAnswer) => {
    return selectedAnswers[questionId] === correctAnswer;
  };

  return (
    <div>
      <HeroCarousel />

      {/* Questions Section */}
      {questions.length > 0 && (
        <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
              📚 Practice Questions
            </h2>
            <p className="text-center text-gray-600 mb-10">
              Test your knowledge with these MCQ questions
            </p>

            <div className="space-y-6">
              {questions.map((q, index) => (
                <div
                  key={`${q.id}-${index}`}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-100"
                >
                  {/* Question Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-2">
                        {q.topic}
                      </span>
                      <h3 className="text-xl font-semibold text-gray-800 leading-relaxed">
                        {q.question}
                      </h3>
                    </div>
                  </div>

                  {/* Options */}
                  {q.options && q.options.length > 0 && (
                    <div className="ml-14 space-y-3">
                      {q.options.map((option, optionIndex) => {
                        const isSelected = selectedAnswers[q.id] === option;
                        const isAnswerShown = showResults[q.id];
                        const isCorrectOption = option === q.correctAnswer;
                        
                        let optionClass = "border-2 border-gray-300 hover:border-blue-500 bg-white";
                        
                        if (isAnswerShown) {
                          if (isCorrectOption) {
                            optionClass = "border-2 border-green-500 bg-green-50";
                          } else if (isSelected && !isCorrectOption) {
                            optionClass = "border-2 border-red-500 bg-red-50";
                          }
                        } else if (isSelected) {
                          optionClass = "border-2 border-blue-500 bg-blue-50";
                        }

                        return (
                          <button
                            key={optionIndex}
                            onClick={() => !showResults[q.id] && handleAnswerSelect(q.id, option)}
                            disabled={showResults[q.id]}
                            className={`w-full text-left p-4 rounded-lg transition-all ${optionClass} ${
                              showResults[q.id] ? 'cursor-not-allowed' : 'cursor-pointer'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                isAnswerShown && isCorrectOption
                                  ? 'bg-green-500 text-white'
                                  : isAnswerShown && isSelected && !isCorrectOption
                                  ? 'bg-red-500 text-white'
                                  : isSelected
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-200 text-gray-700'
                              }`}>
                                {String.fromCharCode(65 + optionIndex)}
                              </div>
                              <span className="flex-1 text-gray-800">
                                {option}
                              </span>
                              {isAnswerShown && isCorrectOption && (
                                <span className="text-green-600 font-bold text-xl">✓</span>
                              )}
                              {isAnswerShown && isSelected && !isCorrectOption && (
                                <span className="text-red-600 font-bold text-xl">✗</span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Submit/Result */}
                  <div className="ml-14 mt-4">
                    {!showResults[q.id] ? (
                      <button
                        onClick={() => handleSubmitAnswer(q.id, q.correctAnswer)}
                        disabled={!selectedAnswers[q.id]}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all font-medium"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <div className={`p-4 rounded-lg ${
                        isCorrect(q.id, q.correctAnswer)
                          ? 'bg-green-100 border-2 border-green-500'
                          : 'bg-red-100 border-2 border-red-500'
                      }`}>
                        {isCorrect(q.id, q.correctAnswer) ? (
                          <div className="flex items-center gap-2 text-green-800">
                            <span className="text-2xl">🎉</span>
                            <span className="font-semibold">Correct! Well done!</span>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center gap-2 text-red-800 mb-2">
                              <span className="text-2xl">😔</span>
                              <span className="font-semibold">Incorrect!</span>
                            </div>
                            <div className="text-sm text-gray-700">
                              <strong>Correct Answer:</strong> {q.correctAnswer}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {questions.length === 0 && (
        <section className="py-20 px-4 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No Questions Available
          </h3>
          <p className="text-gray-600 mb-6">
            Go to Admin Panel to generate some questions!
          </p>
          <a
            href="/admin"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Go to Admin Panel
          </a>
        </section>
      )}
    </div>
  );
};

export default Home;