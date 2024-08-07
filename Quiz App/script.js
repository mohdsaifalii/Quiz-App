const questions = [
    {
        text: "Which language is primarily used for web app development?",
        options: ["C#", "Python", "JavaScript", "Swift"],
        correct: 2
    },
    {
        text: "Which of the following is a relational database management system?",
        options: ["Oracle", "Scala", "Perl", "Java"],
        correct: 0
    },
    {
        text: "What does HTML stand for?",
        options: ["Hyperlink and Text Markup Language", "High Technology Modern Language", "Hyper Text Markup Language", "Home Tool Markup Language"],
        correct: 2
    },
    {
        text: "What does CSS stand for?",
        options: ["Cascading Stylesheets", "Cascading Styling Styles", "Cascading Sheets for Stylings", "Cascaded Stylesheets"],
        correct: 0
    },
    {
        text: "Which of the following is not an object-oriented programming language?",
        options: ["Java", "C#", "Scala", "C"],
        correct: 3
    },
    {
        text: "Which tool is used to ensure code quality in JavaScript?",
        options: ["JSLint", "TypeScript", "Babel", "Webpack"],
        correct: 0
    },
    {
        text: "What is the primary use of the Git command 'clone'?",
        options: ["To stage changes", "To copy a repository", "To switch to a different branch", "To list all the files in a repository"],
        correct: 1
    },
    {
        text: "What does API stand for in the context of programming?",
        options: ["Apple Pie Interface", "Application Programming Interface", "Advanced Peripheral Integration", "Application Process Integration"],
        correct: 1
    },
    {
        text: "Javascript is a single threaded programming language",
        options: ["True", "False"],
        correct: 0
    },
    {
        text: "API calls in Javascript can be done using the following method",
        options: ["setTimeout()", "setInterval()", "fetch()", "get()"],
        correct: 2
    },
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const submitButton = document.getElementById('submit');
const nextButton = document.getElementById('next');

function loadQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.text;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
    submitButton.style.display = 'block';
    nextButton.style.display = 'none';
}

function selectOption(index) {
    const selectedOption = optionsContainer.children[index];
    const correctOption = optionsContainer.children[questions[currentQuestionIndex].correct];

    if (index === questions[currentQuestionIndex].correct) {
        selectedOption.classList.add('correct');
        score++;
    } else {
        selectedOption.classList.add('incorrect');
        correctOption.classList.add('correct');
    }

    Array.from(optionsContainer.children).forEach(button => {
        button.disabled = true;
    });

    submitButton.style.display = 'none';
    nextButton.style.display = 'block';
}

submitButton.addEventListener('click', () => {
    const selectedOption = Array.from(optionsContainer.children).find(button => button.classList.contains('correct') || button.classList.contains('incorrect'));

    if (!selectedOption) {
        alert('Please select an option!');
    } else {
        loadNextQuestion();
    }
});

nextButton.addEventListener('click', () => {
    loadNextQuestion();
});

function loadNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    resetState();
    questionElement.innerText = `Quiz completed! Your score is ${score} out of ${questions.length}.`;
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
});
