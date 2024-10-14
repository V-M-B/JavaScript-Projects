document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let answerSelected = false; // Prevent multiple selections

  // Event listener for the start button
  startBtn.addEventListener("click", startQuiz);

  // Event listener for the next button
  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  // Event listener for the restart button
  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  });

  // Function to start the quiz
  function startQuiz() {
    startBtn.classList.add("hidden"); // Hide start button
    resultContainer.classList.add("hidden"); // Hide result container
    questionContainer.classList.remove("hidden"); // Show questions
    showQuestion();
  }

  // Function to display a question
  function showQuestion() {
    nextBtn.classList.add("hidden"); // Hide the next button initially
    answerSelected = false; // Reset the flag for the new question

    questionText.textContent = questions[currentQuestionIndex].question; // Set question text
    choicesList.innerHTML = ""; // Clear previous choices

    // Loop through choices and display them as list items
    questions[currentQuestionIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => selectAnswer(choice)); // Handle choice selection
      choicesList.appendChild(li);
    });
  }

  // Function to handle answer selection
  function selectAnswer(choice) {
    if (!answerSelected) { // Ensure answer can only be selected once
      const correctAnswer = questions[currentQuestionIndex].answer;
      if (choice === correctAnswer) {
        score++; // Increment score only once per question
      }
      answerSelected = true; // Mark answer as selected
      nextBtn.classList.remove("hidden"); // Show next button
    }
  }

  // Function to display the result at the end
  function showResult() {
    questionContainer.classList.add("hidden"); // Hide question container
    resultContainer.classList.remove("hidden"); // Show result container

    scoreDisplay.textContent = `${score} out of ${questions.length}`; // Display the score
  }
});
