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

const url = 'https://opentdb.com/api.php?amount=3';


fetch(url) // fetch url from opentdb.com
.then (function (response) {
    return response.json(); // return data in json format
    console.log('success');
})
.then (function (data) {
    console.log(data.results); // display fetched data
})