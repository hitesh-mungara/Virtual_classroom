const questions = [
  {
    question: "What does JDK stand for?",
    answers: [
      { text: "Java Development Kit", correct: true },
      { text: "Java Development Language", correct: false },
      { text: "Java Deployment Kit", correct: false },
      { text: "Java Design Kit", correct: false },
    ],
  },
  {
    question: "What is the output of the following code snippet?\n\n```java\nSystem.out.println(5 + 3 + \"Java\");```",
    answers: [
      { text: "8Java", correct: true },
      { text: "53Java", correct: false },
      { text: "Java8", correct: false },
      { text: "The code will not compile", correct: false },
    ],
  },
  {
    question: "Which keyword is used to define a class in Java?",
    answers: [
      { text: "class", correct: true },
      { text: "Class", correct: false },
      { text: "struct", correct: false },
      { text: "interface", correct: false },
    ],
  },
  {
    question: "What is the default value of the local variables?",
    answers: [
      { text: "Depends on the data type", correct: true },
      { text: "0", correct: false },
      { text: "null", correct: false },
      { text: "The default value cannot be determined", correct: false },
    ],
  },
  {
    question: "Which one of the following is a single-threaded environment?",
    answers: [
      { text: "AWT", correct: true },
      { text: "Swing", correct: false },
      { text: "Servlets", correct: false },
      { text: "JavaFX", correct: false },
    ],
  },
  {
    question: "What is the parent class of all classes in Java?",
    answers: [
      { text: "Object", correct: true },
      { text: "Parent", correct: false },
      { text: "Base", correct: false },
      { text: "Root", correct: false },
    ],
  },
  {
    question: "Which one of these operators is used to allocate memory to an array?",
    answers: [
      { text: "new", correct: true },
      { text: "alloc", correct: false },
      { text: "malloc", correct: false },
      { text: "alloc()", correct: false },
    ],
  },
  {
    question: "What does JVM stand for?",
    answers: [
      { text: "Java Virtual Machine", correct: true },
      { text: "Java Virtual Memory", correct: false },
      { text: "Java Virtual Monitor", correct: false },
      { text: "Java Visual Machine", correct: false },
    ],
  },
  {
    question: "Which keyword is used to prevent method overriding?",
    answers: [
      { text: "final", correct: true },
      { text: "abstract", correct: false },
      { text: "static", correct: false },
      { text: "private", correct: false },
    ],
  },
  {
    question: "Which collection class allows you to associate a key with a value, and allows duplicate keys?",
    answers: [
      { text: "HashMap", correct: true },
      { text: "HashSet", correct: false },
      { text: "TreeMap", correct: false },
      { text: "LinkedHashMap", correct: false },
    ],
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
