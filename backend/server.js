import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Gemini AI Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate Questions API
app.post('/api/generate-questions', async (req, res) => {
  try {
    const { topic, numberOfQuestions = 5 } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Generate ${numberOfQuestions} educational questions about "${topic}" for students.
    Return ONLY a valid JSON array with this exact format, no additional text:
    [
      {
        "id": 1,
        "question": "question text here",
        "topic": "${topic}"
      }
    ]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse JSON from response
    let questions;
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      questions = JSON.parse(jsonMatch ? jsonMatch[0] : text);
    } catch (parseError) {
      console.error('Parse error:', parseError);
      questions = Array(numberOfQuestions).fill(null).map((_, i) => ({
        id: Date.now() + i,
        question: `Sample question ${i + 1} about ${topic}`,
        topic: topic
      }));
    }

    // Add unique IDs to questions
    const questionsWithIds = questions.map((q, index) => ({
      ...q,
      id: Date.now() + index
    }));

    res.json({ questions: questionsWithIds });
  } catch (error) {
    console.error('Error generating questions:', error);

    // Fallback: Return sample questions when API fails
    const { topic, numberOfQuestions = 5 } = req.body;
    const sampleQuestions = [
      `${topic} ke basic concepts kya hain?`,
      `${topic} mein sabse important theory kaun si hai?`,
      `${topic} ka real life mein kya use hota hai?`,
      `${topic} ke main components kya hain?`,
      `${topic} mein common mistakes kya hoti hain?`,
      `${topic} ko better samajhne ke liye kya karna chahiye?`,
      `${topic} ka history kya hai?`,
      `${topic} mein latest developments kya hain?`,
      `${topic} related careers kya hain?`,
      `${topic} ke famous scientists/experts kaun hain?`
    ];

    const fallbackQuestions = sampleQuestions.slice(0, numberOfQuestions).map((q, i) => ({
      id: Date.now() + i,
      question: q,
      topic: topic
    }));

    res.json({
      questions: fallbackQuestions,
      note: 'Sample questions (API quota exceeded - using fallback)'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
