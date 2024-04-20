const questions = [
  {
    question: "Which of the following is NOT a supervised learning algorithm?",
    answers: [
      { text: "Decision Tree", correct: true },
      { text: "Linear Regression", correct: false },
      { text: "Support Vector Machine", correct: false },
      { text: "K-Nearest Neighbors", correct: false },
    ].sort(() => Math.random() - 0.5),
  },
  {
    question: "What is the goal of clustering algorithms?",
    answers: [
      { text: "To group similar data points together", correct: true },
      { text: "To predict an outcome based on input features", correct: false },
      { text: "To classify data points into predefined categories", correct: false },
      { text: "To optimize a function to find the best fit line", correct: false },
    ].sort(() => Math.random() - 0.5),
  },
  {
    question: "Which algorithm is commonly used for anomaly detection?",
    answers: [
      { text: "Isolation Forest", correct: true },
      { text: "Gradient Boosting", correct: false },
      { text: "Principal Component Analysis", correct: false },
      { text: "K-Means Clustering", correct: false },
    ].sort(() => Math.random() - 0.5),
  },
  {
    question: "Which of the following evaluation metrics is used for classification problems?",
    answers: [
      { text: "Accuracy", correct: true },
      { text: "Mean Squared Error", correct: false },
      { text: "R-squared", correct: false },
      { text: "Mean Absolute Error", correct: false },
    ].sort(() => Math.random() - 0.5),
  },
  {
    question: "In reinforcement learning, what is the agent?",
    answers: [
      { text: "The entity making decisions", correct: true },
      { text: "The environment in which decisions are made", correct: false },
      { text: "The reward received for taking an action", correct: false },
      { text: "The state of the environment", correct: false },
    ].sort(() => Math.random() - 0.5),
  },
  {
    question: "Which of the following is a kernel function used in Support Vector Machines?",
    answers: [
      { text: "Radial Basis Function (RBF)", correct: true },
      { text: "Sigmoid", correct: false },
      { text: "Polynomial", correct: false },
      { text: "Linear", correct: false },
    ].sort(() => Math.random() - 0.5),
  },
  {
    question: "What is the purpose of cross-validation in machine learning?",
    answers: [
      { text: "To assess the model's performance on unseen data", correct: true },
      { text: "To split the dataset into training and testing sets", correct: false },
      { text: "To optimize hyperparameters using grid search", correct: false },
      { text: "To scale the features to have zero mean and unit variance", correct: false },
    ].sort(() => Math.random() - 0.5),
  },
  {
    question: "What is the difference between precision and recall?",
    answers: [
      { text: "Precision measures the fraction of relevant instances among the retrieved instances, while recall measures the fraction of relevant instances that were retrieved", correct: true },
      { text: "Precision measures the fraction of true positives among the predicted positives, while recall measures the fraction of true positives among the actual positives", correct: false },
      { text: "Precision measures the accuracy of the model's predictions, while recall measures the completeness of the model's predictions", correct: false },
      { text: "Precision measures the model's ability to avoid false positives, while recall measures the model's ability to avoid false negatives", correct: false },
    ].sort(() => Math.random() - 0.5),
  },
  {
    question: "Which algorithm is used for feature extraction in natural language processing (NLP)?",
    answers: [
      { text: "Word Embeddings (e.g., Word2Vec, GloVe)", correct: true },
      { text: "K-Means Clustering", correct: false },
      { text: "Decision Trees", correct: false },
      { text: "AdaBoost", correct: false },
    ].sort(() => Math.random() - 0.5),
  },
  {
    question: "What is the purpose of regularization in machine learning?",
    answers: [
      { text: "To prevent overfitting and improve generalization performance", correct: true },
      { text: "To increase the complexity of the model to fit the training data better", correct: false },
      { text: "To reduce the bias of the model and capture more complex patterns", correct: false },
      { text: "To speed up the training process by reducing the number of iterations", correct: false },
    ].sort(() => Math.random() - 0.5),
  },
];



const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    
    let questionNo = currentQuestionIndex + 1;
    
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
          }
      });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
        }
        button.disabled = true;
      });
      
      nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz(); 
    }
});

startQuiz();
