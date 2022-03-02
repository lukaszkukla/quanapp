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

const quiz = {}; // main game object
const url = 'https://opentdb.com/api.php?amount=3';
const message = document.querySelector('.message');
const question = document.querySelector('.question');
const answers = document.querySelector('.answers');
const nextQuestion = document.querySelector('.next-question');
const restart = document.querySelector('.restart');

nextQuestion.addEventListener('click', createQuestion); // advance to the next quetion
restart.addEventListener('click', restartQuiz); // restart the quiz

fetch(url) // fetch url from opentdb.com
    .then(function (response) {
        console.log('success');
        return response.json(); // return data in json format    
    })
    .then(function (data) {
        console.log(data.results); // test log to console 
        quiz.totalQuestions = data.results.length; // total number of question fetched from opentdb.com
        console.log(quiz.totalQuestions); // test log to console 
        quiz.questionNumber = 0; // starting question / questions we are on
        console.log(quiz.questionNumber); // test log to console 
        quiz.array = data.results;
        quiz.array.forEach(function(element) {
            console.log(element); // test log to console 
        });

        createQuestion();
    })

// determine behaviour based on the current question number
function createQuestion() {
    nextQuestion.style.display = 'none';
    if(quiz.questionNumber + 1 > quiz.totalQuestions) { // add 1 to questoin number so it starts from number 1 not 0
        gameOver();
    } else {
        console.log(`question # ${quiz.questionNumber + 1} out of ${quiz.totalQuestions}`); // test log to console
        
        let q = quiz.array[quiz.questionNumber];
        let answerOptions = [q.correct_answer, ...q.incorrect_answers]; // combine correct and incorrect answers into one array        
        let shuffleAnswers = answerOptions.sort(() => Math.random - 0.5); // randomise answer order
        
        console.log(shuffleAnswers); // test log to console     
        
        // create div with current question and append to DOM
        const createQuestion = document.createElement('div');
        
        // clear previous question and answers
        question.innerHTML = '';
        answers.innerHTML = ''; 

        createQuestion.textContent = q.question;
        question.appendChild(createQuestion);
        
        // display all avilable answer options
        answerOptions.forEach(function(element){
            console.log(element); //test log to console

            // create div for each answer option and append to document
            let createAnswers = document.createElement('div');
            createAnswers.answer = q.correct_answer;
            createAnswers.textContent = element;
            answers.appendChild(createAnswers);
            createAnswers.addEventListener('click', newQuestion);
        })
    }
}

// allow to select one of the available answers
function newQuestion(element) {
    let selectedAnswer = element.target;
    if(selectedAnswer.textContent === selectedAnswer.answer) {
        console.log('correct answer selected');
    } else {
        console.log('wrong answer selected');
    }
    console.log(selectedAnswer.textContent);
    quiz.questionNumber++; // increase question number index
    displayNextQuestionBtn();
}

// enables next question button
function displayNextQuestionBtn() {
    nextQuestion.style.display = 'block';
}


function disableSelection() {
    const selectedAnswer = document.querySelector('.answers');
    selectedAnswer.forEach(function(domElement) {
        domElement.removeEventListener('click', newQuestion);
    })
}

function shuffleAnswers() {
    
}

function gameOver() {
    question.textContent = 'game over';
    restart.textContent = 'restart';

}

function restartQuiz() {
    location.reload();
}