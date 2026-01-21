import React, { useState, useEffect } from 'react'
import HeroCarousel from '../Components/HeroCarousel '
import { getQuestions } from '../services/geminiApi'

const Home = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions(getQuestions());
  }, []);

  return (
    <div>
      <HeroCarousel />

      {/* Questions Section */}
      {questions.length > 0 && (
        <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Practice Questions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {questions.map((q, index) => (
                <div
                  key={`${q.id}-${index}`}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-3">
                    {q.topic}
                  </span>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {q.question}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home
