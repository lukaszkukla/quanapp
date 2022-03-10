/** 

1. fetch question bank from url
2. return data in json format
3. pull first question from question bank
4. pull answers related to question
5. shuffle answers order
6. click on of the answer options
7. check if correct or not correct
8. increse score if correct
9. advance to the next question
10. show total score on last question
11. show restart button

 */


const APIURL = 'https://opentdb.com/api.php?amount=10';
const startRef = document.querySelector('.homepage-game-container');
const gameRef = document.querySelector('.game-container');
const messageRef = document.querySelector('.message');
const questionRef = document.querySelector('.question');
const answersRef = document.querySelector('.answers');
const nextQuestionRef = document.querySelector('.next-question');
const restartRef = document.querySelector('.restart');
const endGameRef = document.querySelector('.end-game');
const startGameRef = document.querySelector('.start-game');
const sloganRef = document.getElementById('slogan');
const quiz = {
    questionNumber: 0,
    score: 0,
    questionBank: []
};

nextQuestionRef.addEventListener('click', checkIfLastQuestion); // advance to the next quetion
restartRef.addEventListener('click', restartQuiz); // restart the quiz
startGameRef.addEventListener('click', gameStart);

/** 
 * fetch questions from opentdb.com
 */
function getQuestions(APIURL) {
    fetch(APIURL)
        .then(response => response.json())
        .then((data) => {
            quiz.totalQuestions = data.results.length;
            quiz.questionBank = data.results;
        })
        .then(() => checkIfLastQuestion());
}

/**
 * show main game screen and question
 */
function gameStart() {
    gameRef.classList.remove('hide');
    startRef.classList.add('hide');
    restartRef.classList.add('hide');
    sloganRef.classList.add('hide');
    getQuestions(APIURL);
}

// determine behaviour based on the current question number
function checkIfLastQuestion() {
    nextQuestionRef.style.display = 'none';
    endGameRef.style.display = 'none';
    console.log('question number ', quiz.questionNumber + 1);

    (quiz.questionNumber + 1 > quiz.totalQuestions) ? gameOver(): createQuestion();
}

function shuffle(answers) {
    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
}


/**
 * 
 */
function createQuestion() {
    const question = quiz.questionBank[quiz.questionNumber];
    let answerOptions = [question.correct_answer, ...question.incorrect_answers]; // combine correct and incorrect answers into one array  
    let shuffleAnswers = shuffle(answerOptions)

    // create div with current question and append to DOM
    const createQuestionRef = document.createElement('div');
    createQuestionRef.classList.add('question');

    // clear previous question and answers
    questionRef.innerHTML = '';
    answersRef.innerHTML = '';

    displayAnswers(shuffleAnswers, question);

    displayScore();
    createQuestionRef.textContent = question.question;
    questionRef.appendChild(createQuestionRef);
}

function displayScore() {
    messageRef.textContent = `your score: ${quiz.score * 10} of ${quiz.totalQuestions * 10}`;
}

function displayAnswers(answers, question) {
    // display available answer opitons in the DOM
    answers.forEach((answer) => {

        // create div for each answer option and append to document
        let createAnswers = document.createElement('div');
        createAnswers.classList.add('answer-option');
        createAnswers.answer = question.correct_answer;
        createAnswers.textContent = answer;
        answersRef.appendChild(createAnswers);
        createAnswers.addEventListener('click', newQuestion);
    })

}

/**
 * check if correct answer selected, display next question button
 */
function newQuestion(element) {
    disableSelection();
    let selectedAnswer = element.target;
    if (selectedAnswer.textContent === selectedAnswer.answer) {
        ++quiz.score; // add 1 to score
        messageRef.textContent = `your score: ${quiz.score * 10} of ${quiz.totalQuestions * 10}`;
        selectedAnswer.classList.add('correct-answer-selected');
    } else {
        selectedAnswer.classList.add('incorrect-answer-selected');
    }
    quiz.questionNumber++; // increase question number index
    displayNextQuestionBtn();
}

/**
 * display next question button
 */
function displayNextQuestionBtn() {
    nextQuestionRef.style.display = 'block';
}

/**
 * disable all other answer options upon selection
 */
function disableSelection() {
    const selectedAnswer = document.querySelectorAll('.answer-option');
    selectedAnswer.forEach(function (answerOption) {
        answerOption.removeEventListener('click', newQuestion);
        answerOption.classList.add('answer-option-clicked');
        this.disabled = true;
    })
}

/**
 * shuffle answer options
 */
function shuffleAnswers(data) {
    let shuffleAnswers = data.sort(() => 0.5 - Math.random()); // randomise answer order
    return shuffleAnswers;
}

/**
 * check if last question answered
 */
function gameOverCheck() {
    quiz.questionNumber + 1 > quiz.totalQuestions ? true : false; // add 1 to question number so it starts from number 1 not 0
}

/**
 * show score and restart button at game end
 */
function gameOver() {
    questionRef.innerHTML = '';
    answersRef.innerHTML = '';
    messageRef.textContent = `you scored ${quiz.score * 10}`;
    questionRef.textContent = 'game over';
    restartRef.classList.remove('hide');
}

/**
 * restart game
 */
function restartQuiz() {
    location.reload();
}