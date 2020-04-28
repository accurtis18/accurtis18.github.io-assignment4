var time = 0;
//Setting global variables to be used across functions
var setTimer = null;
var questionNumber = 0;
var footerNote = "";
var localHighScore = localStorage.getItem("highScoresac");
var highScores = [];
if(localHighScore !== null && localHighScore !== ""){
    highScores = JSON.parse(localHighScore);
} 

//Home button returns back to start page from show High Scores page.
$(document).on("click", '.home', function(){
    $('.highScores').hide();
    $('.startPage').show();
    $('.codeTitle').html('<h1>Coding Challenge</h1>');
    clearInterval(setTimer);
});

//Shows High scores, hides all other details, sorts the scores array from local stoarge.
function showHighScores(){
    clearInterval(setTimer);
    $('.startPage').hide();
    $('.question').hide();
    $('.scores').hide();
    $('.codeTitle').html('<h1>High Scores</h1>');
    $('.highScores').show();
    $('.highScores').html("");
    highScores.sort((a,b) => b.score - a.score);
    for(scores of highScores){
        $(".highScores").append(`<div class="col-md-12">
        <input type="text" class="form-control" id="listItem" value="${scores.user}: ${scores.score}" readonly>
        </div></div>`)
    }
    $(".highScores").append(`<div class="col-md-12 toHome">
    <button class="btn home">Home</button>
    </div>`);
}

//Allows text of High Scores to Show High Scores, calls show high scores function when clicked
$('#highScore').on("click", function(){
    showHighScores();
});

//Add high score page, called from Submit button. Adds score to array, sorts array, then cuts so only five show, sets to local storage
function addHighScore(){
    var newScore = {
        score: time,
        user: $('#name').val()
    }
    highScores.push(newScore);
    highScores.sort((a,b) => b.score - a.score);
    highScores.splice(5); 
    localStorage.setItem("highScoresac", JSON.stringify(highScores));
    showHighScores();
}

//Enters high score on click
$(document).on("click", '#submit', function(){
    addHighScore();
})

//Allows high score to be entered with enter key
$(document).keypress('#submit', function (e) {
    if (e.which == 13) {
        addHighScore();
      return false;
    }
  });


//Record Score page, called from setQuestion, give entery field and shows score, submit button.
function recordScore(){
    $('.question').hide();
    $(".scores").html("");
    $(".scores").show();
    $(".scores").append(`<div class="col-md-12 inputScore"><h3> Your Score: ${time}</h3></div>
    <div class="row">
        <div class="col-md-12">
            <div class="input-group mb-3 yourScore">
                <input type="text" class="form-control" placeholder="Your name" aria-label="Your name for high score" aria-describedby="button-addon2" id="name">
                <div class="input-group-append">
                    <button class="btn submit" type="button" id="submit">Submit</button>
                </div>
            </div>
        </div>`);
}

//Correct button function, looks at class set on anser, sets footnote, advances question
$(document).on("click", '.correct', function(){ 
    footerNote = "Correct!"
    questionNumber += 1;
    setQuestion();
});

//Incorrect button function, looks at class set on answer, revokes 10 seconds from timer, sets footnote, advances question
$(document).on("click", '.incorrect', function(){
    time -= 10;
    footerNote = "Wrong!"
    questionNumber += 1;
    setQuestion();
});

//Sets question in to page, randomly orders responses, if no more questions, calls record time function
function setQuestion(){
    if(questionNumber === question.length){
        recordScore();
        clearInterval(setTimer);
        $('#timer').html(`Timer`);
    } else{
        var randAnswer = [0,1,2,3];
        var rA1 = randAnswer[Math.floor(Math.random() * 4)];
        var arrayIndex = randAnswer.indexOf(rA1)
        randAnswer.splice(arrayIndex, 1);
        var rA2 = randAnswer[Math.floor(Math.random() * 3)];
        arrayIndex = randAnswer.indexOf(rA2);
        randAnswer.splice(arrayIndex, 1);
        var rA3 = randAnswer[Math.floor(Math.random() * 2)];
        arrayIndex = randAnswer.indexOf(rA3);
        randAnswer.splice(arrayIndex, 1);
        var rA4 = randAnswer[0];
        $('.identifier').html(`<h2>Question ${questionNumber + 1}</h2>`)
        $('.questions').html(`${question[questionNumber].question}
        <div class="answers">
        <button class="btn answer ${question[questionNumber].answer[rA1].correct}">${question[questionNumber].answer[rA1].text}</button>
        <button class="btn answer ${question[questionNumber].answer[rA2].correct}">${question[questionNumber].answer[rA2].text}</button>
        <button class="btn answer ${question[questionNumber].answer[rA3].correct}">${question[questionNumber].answer[rA3].text}</button>
        <button class="btn answer ${question[questionNumber].answer[rA4].correct}">${question[questionNumber].answer[rA4].text}</button>
        </div>
        <div class="card-footer prompt questionFooter">
        ${footerNote}
        </div>`);
    }
}

//Create function to change question number, incorrect and correct will call it
function startTimer(){
    setTimer = setInterval(function(){
        $('#timer').html(`Time: ${time}`);
        $('#timer').css("padding-bottom", "16px");
        if(--time < 0){
            clearInterval(setTimer);
            $('#timer').html("Times up!");
            recordScore();
        }
    }, 1000);
}

//Start button click, sets timer to 60, starts time, resets question progress, calls first question
$('#start').on("click", function(){
    time = 60;
    questionNumber = 0;
    startTimer();
    footerNote = "";
    $('.startPage').hide();
    $('.question').show();
    setQuestion();
});

//This is the list of questions and answers in the form of an array
var question = [
    {
        question: "Which of these is not a javascript primitave?",
        answer: [
            {text: 'boolean', correct: 'incorrect'},
            {text: 'string', correct: 'incorrect'},
            {text: 'character', correct: 'correct'},
            {text: 'integer', correct: 'incorrect'}
        ]
    },
    {
        question: 'Which of these is used to intialize a variable?',
        answer: [
            {text: 'var', correct: 'correct'},
            {text: 'int', correct: 'incorrect'},
            {text: 'str', correct: 'incorrect'},
            {text: 'bool', correct: 'incorrect'}
        ]
    },
    {
        question: 'Which of these is not a default False value',
        answer: [
            {text: '0', correct: 'incorrect'},
            {text: '""', correct: 'incorrect'},
            {text: 'false', correct: 'incorrect'},
            {text: '-1', correct: 'correct'}
        ]
    },
    {
        question: "How many columns does bootstrap divide a webpage into?",
        answer: [
            {text: '7', correct: 'incorrect'},
            {text: '10', correct: 'incorrect'},
            {text: '8', correct: 'incorrect'},
            {text: '12', correct: 'correct'}
        ]
    },
    {
        question: "Which of these is used to show information in the console?",
        answer: [
            {text: 'print screen', correct: 'incorrect'},
            {text: 'console.log()', correct: 'correct'},
            {text: 'alert', correct: 'incorrect'},
            {text: 'prompt', correct: 'incorrect'}
        ]
    },
    {
        question: "Given this array var tigerKingCast = ['Carole Baskin', 'Joe Exotic', 'Doc Antle', 'Jeff Lowe']. What number would I put in the following code to return 'Joe Exotic'? tigerKingCast[x]",
        answer: [
            {text: '0', correct: 'incorrect'},
            {text: '1', correct: 'correct'},
            {text: '2', correct: 'incorrect'},
            {text: '3', correct: 'incorrect'}
        ]
    },
]
