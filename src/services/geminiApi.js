const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const generateQuestions = async (topic, numberOfQuestions = 5) => {
  try {
    const response = await fetch(`${API_URL}/api/generate-questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic, numberOfQuestions })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate questions');
    }

    const data = await response.json();
    return data.questions;
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
};

// Save questions to localStorage
export const saveQuestions = (questions) => {
  const existingQuestions = getQuestions();
  const updatedQuestions = [...existingQuestions, ...questions];
  localStorage.setItem('stemite_questions', JSON.stringify(updatedQuestions));
};

// Get questions from localStorage
export const getQuestions = () => {
  const questions = localStorage.getItem('stemite_questions');
  return questions ? JSON.parse(questions) : [];
};

// Clear all questions
export const clearQuestions = () => {
  localStorage.removeItem('stemite_questions');
};

// Delete a single question
export const deleteQuestion = (id) => {
  const questions = getQuestions();
  const updatedQuestions = questions.filter(q => q.id !== id);
  localStorage.setItem('stemite_questions', JSON.stringify(updatedQuestions));
};
