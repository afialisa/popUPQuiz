const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let userAttempts = {}; // To track user quiz attempts

// Endpoint to check if user has already attempted the quiz
app.post('/check-attempt', (req, res) => {
  const { userId } = req.body;
  if (userAttempts[userId]) {
    res.status(403).json({ message: 'You have already attempted the quiz.' });
  } else {
    res.status(200).json({ message: 'You can take the quiz.' });
  }
});

// Endpoint to save quiz result and mark user as having attempted the quiz
app.post('/submit-quiz', (req, res) => {
  const { userId, score } = req.body;
  
  // Prevent multiple attempts
  if (userAttempts[userId]) {
    return res.status(403).json({ message: 'You cannot retake the quiz.' });
  }

  userAttempts[userId] = score;
  res.status(200).json({ message: 'Quiz completed successfully!', score });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
