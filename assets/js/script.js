/* 

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


fetch(url) // fetch url from opentdb.com
    .then(function (response) {
        console.log('success');
        return response.json(); // return data in json format    
    })
    .then(function (data) {
        console.log(data.results); // display fetched data
        quiz.totalQuestions = data.results.length; // total number of question fetched from opentdb.com
        console.log(quiz.totalQuestions); // display
        quiz.questionNumber = 0; // starting question / questions we are on
        console.log(quiz.questionNumber);
        quiz.array = data.results;
        quiz.array.forEach(function(element) {
            console.log(element);
        });
    })

function createQuestion() {

}

function shuffleAnswers() {

}

function gameOver() {
    
}

function restartQuiz() {

}