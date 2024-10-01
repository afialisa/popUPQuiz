// Questions and answers array
const quiz = [
    {
      question: 'How can an insurance company leverage social media for marketing?',
      choices: [
        'A) By running targeted ads and educating customers on insurance options', 
        'B) Only by offering customer service', 
        'C) By sharing technical insurance reports'
    ],
      correct: 'A) By running targeted ads and educating customers on insurance options'
    },
    {
      question: 'What is the best way to build trust with potential customers?',
      choices: [
        'A) Offering transparent pricing and clear terms', 
        'B) Providing limited-time discounts', 
        'C) Sending frequent email promotions'
    ],
      correct: 'A) Offering transparent pricing and clear terms'
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let quizCompleted = false;
  
  window.onload = function () {
    // Prevent the user from closing the window until quiz is completed
    window.onbeforeunload = function () {
      if (!quizCompleted) {
        return 'You cannot leave until the quiz is completed.';
      }
    };
    
    loadQuestion();
  };
  
  function loadQuestion() {
    const questionObj = quiz[currentQuestion];
    document.getElementById('question').innerText = questionObj.question;
    document.getElementById('choices').innerHTML = questionObj.choices
      .map((choice, index) => `<input type="radio" name="choice" value="${choice}" id="choice${index}">
      <label for="choice${index}">${choice}</label><br>`).join('');
  }
  
  function submitAnswer() {
    const selectedChoice = document.querySelector('input[name="choice"]:checked');
    if (!selectedChoice) {
      alert('Please select an answer');
      return;
    }
    if (selectedChoice.value === quiz[currentQuestion].correct) {
      score++;
    }
    currentQuestion++;
    if (currentQuestion < quiz.length) {
      loadQuestion();
    } else {
      displayScore();
    }
  }
  
  function displayScore() {
    quizCompleted = true;
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('score-container').style.display = 'block';
    document.getElementById('score').innerText = `${score}/${quiz.length}`;
  }
  