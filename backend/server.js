import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - CORS for production
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL,
    /\.vercel\.app$/
  ].filter(Boolean),
  credentials: true
}));
app.use(express.json());

// Gemini AI Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate Questions API with OPTIONS and ANSWER
app.post('/api/generate-questions', async (req, res) => {
  try {
    const { topic, numberOfQuestions = 5 } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    // For large batches, generate in chunks to avoid timeout
    const BATCH_SIZE = 10; // Generate 10 questions at a time (SAFE LIMIT)
    const numBatches = Math.ceil(numberOfQuestions / BATCH_SIZE);
    let allQuestions = [];

    console.log(`Generating ${numberOfQuestions} questions in ${numBatches} batches...`);

    for (let batch = 0; batch < numBatches; batch++) {
      const questionsInThisBatch = Math.min(BATCH_SIZE, numberOfQuestions - (batch * BATCH_SIZE));
      
      console.log(`Batch ${batch + 1}/${numBatches}: Generating ${questionsInThisBatch} questions...`);

      const prompt = `Generate ${questionsInThisBatch} multiple choice questions about "${topic}" for students.
      Return ONLY a valid JSON array with this EXACT format, no additional text or markdown:
      [
        {
          "question": "What is the capital of France?",
          "options": ["London", "Paris", "Berlin", "Madrid"],
          "correctAnswer": "Paris",
          "topic": "${topic}"
        }
      ]
      
      IMPORTANT:
      - Each question must have exactly 4 options
      - correctAnswer must match one of the options EXACTLY
      - Make questions diverse and educational
      - Return ONLY the JSON array, no explanation`;

      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse JSON from response
        const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const jsonMatch = cleanedText.match(/\[[\s\S]*\]/);
        const questions = JSON.parse(jsonMatch ? jsonMatch[0] : cleanedText);
        
        allQuestions = allQuestions.concat(questions);
        console.log(`✓ Batch ${batch + 1}/${numBatches} complete. Generated: ${questions.length}, Total: ${allQuestions.length}`);
        
      } catch (batchError) {
        console.error(`❌ Error in batch ${batch + 1}/${numBatches}:`, batchError.message);
        
        // Retry this batch once after delay
        console.log('⏳ Waiting 3 seconds before retry...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        try {
          console.log(`🔄 Retrying batch ${batch + 1}...`);
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = response.text();
          const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
          const jsonMatch = cleanedText.match(/\[[\s\S]*\]/);
          const questions = JSON.parse(jsonMatch ? jsonMatch[0] : cleanedText);
          allQuestions = allQuestions.concat(questions);
          console.log(`✓ Retry successful! Generated: ${questions.length}, Total: ${allQuestions.length}`);
        } catch (retryError) {
          console.error(`❌ Retry failed for batch ${batch + 1}`);
        }
      }

      // IMPORTANT: Delay between batches to avoid rate limiting
      // Gemini API has rate limits, so we wait between requests
      if (batch < numBatches - 1) {
        console.log('⏳ Waiting 2 seconds before next batch...');
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
      }
    }

    // Add unique IDs to questions
    const questionsWithIds = allQuestions.map((q, index) => ({
      ...q,
      id: Date.now() + index
    }));

    console.log(`✅ Total questions generated: ${questionsWithIds.length}/${numberOfQuestions}`);
    res.json({ questions: questionsWithIds });

  } catch (error) {
    console.error('Error generating questions:', error);

    // FALLBACK: Return sample questions with options
    const { topic, numberOfQuestions = 5 } = req.body;
    
    const sampleQuestionTemplates = [
      {
        question: `${topic} ke basic concepts kya hain?`,
        options: [
          'Fundamental principles aur definitions',
          'Advanced mathematical formulas',
          'Historical events only',
          'None of the above'
        ],
        correctAnswer: 'Fundamental principles aur definitions',
      },
      {
        question: `${topic} mein sabse important theory kaun si hai?`,
        options: [
          'Newton ka theory',
          'Einstein ka theory', 
          'Core foundational theory',
          'No specific theory'
        ],
        correctAnswer: 'Core foundational theory',
      },
      {
        question: `${topic} ka real life mein kya use hota hai?`,
        options: [
          'Gaming mein',
          'Daily problem solving aur applications',
          'Sirf research mein',
          'Koi use nahi'
        ],
        correctAnswer: 'Daily problem solving aur applications',
      },
      {
        question: `${topic} ke main components kya hain?`,
        options: [
          'Basic elements aur principles',
          'Sirf formulas',
          'Random concepts',
          'Koi components nahi'
        ],
        correctAnswer: 'Basic elements aur principles',
      },
      {
        question: `${topic} mein common mistakes kya hoti hain?`,
        options: [
          'Calculation errors',
          'Conceptual misunderstanding aur wrong application',
          'Bahut speed mein karna',
          'Koi mistakes nahi'
        ],
        correctAnswer: 'Conceptual misunderstanding aur wrong application',
      }
    ];

    // Repeat templates to fill the requested number
    const fallbackQuestions = [];
    for (let i = 0; i < numberOfQuestions; i++) {
      const template = sampleQuestionTemplates[i % sampleQuestionTemplates.length];
      fallbackQuestions.push({
        id: Date.now() + i,
        question: `${template.question} (Q${i + 1})`,
        options: template.options,
        correctAnswer: template.correctAnswer,
        topic: topic
      });
    }

    res.json({
      questions: fallbackQuestions,
      note: 'Using fallback questions (API limit exceeded or key invalid)'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

// Send Email API
app.post('/api/send-email', async (req, res) => {
  console.log('\n📧 ========== EMAIL REQUEST RECEIVED ==========');
  
  try {
    const { recipientEmail, csvContent, questionCount } = req.body;

    console.log('📥 Request body:', {
      recipientEmail,
      questionCount,
      csvContentLength: csvContent ? csvContent.length : 0
    });

    if (!recipientEmail || !csvContent) {
      console.error('❌ Missing required fields');
      return res.status(400).json({ error: 'Recipient email and content are required' });
    }

    // Check if admin email is configured in .env
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_APP_PASSWORD = process.env.ADMIN_APP_PASSWORD;

    console.log('🔑 Checking environment variables...');
    console.log('   ADMIN_EMAIL:', ADMIN_EMAIL ? '✅ Set' : '❌ Missing');
    console.log('   ADMIN_APP_PASSWORD:', ADMIN_APP_PASSWORD ? '✅ Set' : '❌ Missing');

    if (!ADMIN_EMAIL || !ADMIN_APP_PASSWORD) {
      console.error('❌ Admin email not configured in .env file!');
      console.error('   Please add these lines to backend/.env:');
      console.error('   ADMIN_EMAIL=your-email@gmail.com');
      console.error('   ADMIN_APP_PASSWORD=your-16-char-password');
      return res.status(500).json({ 
        error: 'Admin email not configured. Please add ADMIN_EMAIL and ADMIN_APP_PASSWORD to backend/.env file' 
      });
    }

    console.log(`📧 Preparing to send email...`);
    console.log(`   From: ${ADMIN_EMAIL}`);
    console.log(`   To: ${recipientEmail}`);
    console.log(`   Questions: ${questionCount}`);

    // Create transporter using admin credentials
    console.log('🔧 Creating email transporter...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: ADMIN_EMAIL,
        pass: ADMIN_APP_PASSWORD
      }
    });

    // Verify transporter configuration
    console.log('🔍 Verifying transporter...');
    await transporter.verify();
    console.log('✅ Transporter verified successfully!');

    // Email options
    const mailOptions = {
      from: `Question Generator <${ADMIN_EMAIL}>`,
      to: recipientEmail,
      subject: `📚 MCQ Questions Export - ${questionCount} Questions`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #2563eb;">📚 Your MCQ Questions are Ready!</h2>
          
          <p>Hi there,</p>
          
          <p>Your requested <strong>${questionCount} MCQ questions</strong> have been generated and are attached to this email.</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">📎 What's included:</h3>
            <ul style="color: #4b5563;">
              <li>Question numbers</li>
              <li>Topics</li>
              <li>Questions with 4 multiple choice options</li>
              <li>Correct answers</li>
            </ul>
          </div>
          
          <p style="color: #6b7280; font-size: 14px;">
            <strong>Note:</strong> The attached file is in CSV format which can be opened with Microsoft Excel, Google Sheets, or any spreadsheet application.
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          
          <p style="color: #9ca3af; font-size: 12px;">
            This email was sent from the Question Generator System.<br>
            If you didn't request this, please ignore this email.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: `MCQ_Questions_${Date.now()}.csv`,
          content: csvContent
        }
      ]
    };

    // Send email
    console.log('📤 Sending email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('   Message ID:', info.messageId);
    console.log('========================================\n');

    res.json({ 
      success: true, 
      message: `Email sent successfully to ${recipientEmail}` 
    });

  } catch (error) {
    console.error('\n❌ ========== EMAIL ERROR ==========');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Full error:', error);
    console.error('=====================================\n');
    
    res.status(500).json({ 
      error: `Failed to send email: ${error.message}` 
    });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 ========================================`);
  console.log(`   Server running on http://localhost:${PORT}`);
  console.log(`   API endpoint: http://localhost:${PORT}/api/generate-questions`);
  console.log(`   Email endpoint: http://localhost:${PORT}/api/send-email`);
  console.log(`========================================\n`);
  
  // Check email configuration on startup
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_APP_PASSWORD = process.env.ADMIN_APP_PASSWORD;
  
  if (!ADMIN_EMAIL || !ADMIN_APP_PASSWORD) {
    console.log('⚠️  WARNING: Email not configured!');
    console.log('   Add these to backend/.env file:');
    console.log('   ADMIN_EMAIL=your-email@gmail.com');
    console.log('   ADMIN_APP_PASSWORD=your-16-char-password\n');
  } else {
    console.log('✅ Email configured:');
    console.log(`   From: ${ADMIN_EMAIL}\n`);
  }
});