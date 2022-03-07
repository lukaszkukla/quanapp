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
const message = document.querySelector('.message');
const questionRef = document.querySelector('.question');
const answersRef = document.querySelector('.answers');
const nextQuestionRef = document.querySelector('.next-question');
const restartRef = document.querySelector('.restart');
const endGameRef = document.querySelector('.end-game');

nextQuestionRef.addEventListener('click', createQuestion); // advance to the next quetion
restartRef.addEventListener('click', restartQuiz); // restart the quiz


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

getQuestions(APIURL);



// determine behaviour based on the current question number
function createQuestion() {
    nextQuestionRef.style.display = 'none';
    endGameRef.style.display = 'none';   

    if(quiz.questionNumber + 1 > quiz.totalQuestions) { 
        gameOver();
    } else {
        console.log(`question # ${quiz.questionNumber + 1} out of ${quiz.totalQuestions}`); // test log to console
        
        let q = quiz.questionBank[quiz.questionNumber];
        let answerOptions = [q.correct_answer, ...q.incorrect_answers]; // combine correct and incorrect answers into one array  
        shuffleAnswers(answerOptions);
        // let shuffleAnswers = answerOptions.sort(() => Math.random - 0.5); // randomise answer order
        
        console.log(shuffleAnswers); // test log to console     
        
        // create div with current question and append to DOM
        const createQuestion = document.createElement('div');
        
        // clear previous question and answers
        questionRef.innerHTML = '';
        answersRef.innerHTML = ''; 

        createQuestion.textContent = q.question;
        questionRef.appendChild(createQuestion);
        
        // display all avilable answer options
        answerOptions.forEach(function(element){
            console.log(element); //test log to console

            // create div for each answer option and append to document
            let createAnswers = document.createElement('div');
            createAnswers.classList.add('answer');
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
    if(selectedAnswer.textContent === selectedAnswer.answer) {
        console.log('correct answer selected');
        quiz.score++; // add 1 to score
    } else {
        console.log('wrong answer selected');
    }
    console.log(selectedAnswer.textContent);
    quiz.questionNumber++; // increase question number index
    displayNextQuestionBtn();
}

// enables next question button
function displayNextQuestionBtn() {
    nextQuestionRef.style.display = 'block';
}


function disableSelection() {
    const selectedAnswer = document.querySelectorAll('.answer');
    selectedAnswer.forEach(function(domElement) {
        domElement.removeEventListener('click', newQuestion);
    })
}

function shuffleAnswers(data) {
    const test = data => data.sort(() => 0.5 - Math.random());
    return test;
}

function gameOverCheck () {
    quiz.questionNumber + 1 > quiz.totalQuestions ? true : false; // add 1 to question number so it starts from number 1 not 0
}

function gameOver() {
    questionRef.innerHTML = '';
    answersRef.innerHTML = ''; 
    message.textContent = `you answered ${quiz.score} out of ${quiz.totalQuestions} questions correctly`;
    questionRef.textContent = 'game over';
    restartRef.textContent = 'restart';
}

function restartQuiz() {
    
    location.reload();
}