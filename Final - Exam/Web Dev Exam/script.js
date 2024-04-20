const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hypertext Markup Language", correct: true },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hypertext Markdown Language", correct: false },
    ],
  },
  {
    question: "Which of the following is used for styling web pages?",
    answers: [
      { text: "CSS", correct: true },
      { text: "JavaScript", correct: false },
      { text: "HTML", correct: false },
      { text: "Python", correct: false },
    ],
  },
  {
    question: "What is the purpose of the 'alt' attribute in HTML image tags?",
    answers: [
      { text: "To specify an alternate text for the image", correct: true },
      { text: "To define the alignment of the image", correct: false },
      { text: "To set the size of the image", correct: false },
      { text: "To link the image to another web page", correct: false },
    ].sort(() => Math.random() - 0.5),
  },
  {
    question: "Which symbol is used to select an ID in CSS?",
    answers: [
      { text: "#", correct: true },
      { text: ".", correct: false },
      { text: "*", correct: false },
      { text: "@", correct: false },
    ],
  },
  {
    question: "What is the purpose of the 'href' attribute in HTML anchor tags?",
    answers: [
      { text: "To specify the URL of the link", correct: true },
      { text: "To set the color of the link", correct: false },
      { text: "To define the heading of the link", correct: false },
      { text: "To hide the link from the page", correct: false },
    ].sort(() => Math.random() - 0.5),
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Creative Style Sheets", correct: false },
      { text: "Computer Style Sheets", correct: false },
      { text: "Colorful Style Sheets", correct: false },
    ],
  },
  {
    question: "Which of the following is NOT a valid CSS unit of measurement?",
    answers: [
      { text: "em", correct: false },
      { text: "px", correct: false },
      { text: "pt", correct: true },
      { text: "%", correct: false },
    ],
  },
  {
    question: "Which of the following CSS selectors targets elements based on their class?",
    answers: [
      { text: ".classname", correct: true },
      { text: "#idname", correct: false },
      { text: "elementname", correct: false },
      { text: "[attribute]", correct: false },
    ].sort(() => Math.random() - 0.5),
  },
  {
    question: "Which CSS property is used to change the text color of an element?",
    answers: [
      { text: "color", correct: true },
      { text: "background-color", correct: false },
      { text: "text-color", correct: false },
      { text: "font-color", correct: false },
    ],
  },
  {
    question: "What is the purpose of the 'border' property in CSS?",
    answers: [
      { text: "To specify the border around an element", correct: true },
      { text: "To set the background color of an element", correct: false },
      { text: "To define the font style of an element", correct: false },
      { text: "To adjust the spacing between elements", correct: false },
    ].sort(() => Math.random() - 0.5),
  }
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
