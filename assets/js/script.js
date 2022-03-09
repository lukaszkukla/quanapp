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

const quiz = {
    questionNumber: 0,
    score: 0,
    questionBank: []
}; // main game object
const APIURL = 'https://opentdb.com/api.php?amount=3';
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

nextQuestionRef.addEventListener('click', createQuestion); // advance to the next quetion
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
        .then(() => createQuestion());
}

function gameStart() {
    gameRef.classList.remove('hide');
    startRef.classList.add('hide');
    restartRef.classList.add('hide');
    sloganRef.classList.add('hide');
    getQuestions(APIURL);
}

// determine behaviour based on the current question number
function createQuestion() {
    nextQuestionRef.style.display = 'none';
    endGameRef.style.display = 'none';

    if (quiz.questionNumber + 1 > quiz.totalQuestions) {
        gameOver();
    } else {

        let q = quiz.questionBank[quiz.questionNumber];
        let answerOptions = [q.correct_answer, ...q.incorrect_answers]; // combine correct and incorrect answers into one array  
        shuffleAnswers(answerOptions);
        // let shuffleAnswers = answerOptions.sort(() => Math.random - 0.5); // randomise answer order

        // create div with current question and append to DOM
        const createQuestion = document.createElement('div');
        createQuestion.classList.add('question');

        // clear previous question and answers
        questionRef.innerHTML = '';
        answersRef.innerHTML = '';

        messageRef.textContent = `your score: ${quiz.score * 10} of ${quiz.totalQuestions * 10}`;
        createQuestion.textContent = q.question;
        questionRef.appendChild(createQuestion);

        // display all avilable answer options
        answerOptions.forEach(function (element) {

            // create div for each answer option and append to document
            let createAnswers = document.createElement('div');
            createAnswers.classList.add('answer-option');
            createAnswers.answer = q.correct_answer;
            createAnswers.textContent = element;
            answersRef.appendChild(createAnswers);
            createAnswers.addEventListener('click', newQuestion);
        })
    }
}

// allow to select one of the available answers
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

// enables next question button
function displayNextQuestionBtn() {
    nextQuestionRef.style.display = 'block';
}

function disableSelection() {
    const selectedAnswer = document.querySelectorAll('.answer-option');
    selectedAnswer.forEach(function (answerOption) {
        answerOption.removeEventListener('click', newQuestion);
        answerOption.classList.add('answer-option-clicked');
        this.disabled = true;
    })
}

function shuffleAnswers(data) {
    const test = data => data.sort(() => 0.5 - Math.random());
    return test;
}

function gameOverCheck() {
    quiz.questionNumber + 1 > quiz.totalQuestions ? true : false; // add 1 to question number so it starts from number 1 not 0
}

function gameOver() {
    questionRef.innerHTML = '';
    answersRef.innerHTML = '';
    messageRef.textContent = `you scored ${quiz.score * 10}`;
    questionRef.textContent = 'game over';
    // restartRef.textContent = 'restart';
    restartRef.classList.remove('hide');
}

function restartQuiz() {

    location.reload();
}