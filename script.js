var score = 0;
var time = 0;
var setTimer = null;
var questionNumber = 0;
var footerNote = "";
var localHighScore = localStorage.getItem("highScores");
var highScores = [];
if(localHighScore !== null && localHighScore !== ""){
    highScores = JSON.parse(localHighScore);
} 

function showHighScores(){
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

$('#highScore').on("click", function(){
    showHighScores();
});

function recordScore(){
    $('.question').hide();
    $(".scores").html("");
    $(".scores").show();
    $(".scores").append(`<div class="col-md-12 inputScore"><h3> Your Score: ${score}</h3></div>
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

function addHighScore(){
    var newScore = {
        score: score,
        user: $('#name').val()
    }
    highScores.push(newScore);
    highScores.sort((a,b) => b.score - a.score);
    highScores.splice(5); 
    localStorage.setItem("highScores", JSON.stringify(highScores));
    showHighScores();
}

$(document).on("click", '#submit', function(){
    addHighScore();
})

$(document).keypress('#submit', function (e) {
    if (e.which == 13) {
        addHighScore();
      return false;
    }
  });

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


$(document).on("click", '.correct', function(){
    score += 5;  
    footerNote = "Correct!"
    questionNumber += 1;
    setQuestion();
});

$(document).on("click", '.incorrect', function(){
    time -= 10;
    footerNote = "Wrong!"
    questionNumber += 1;
    setQuestion();
});

$(document).on("click", '.home', function(){
    $('.highScores').hide();
    $('.startPage').show();
    $('.codeTitle').html('<h1>Coding Challenge</h1>');
    clearInterval(setTimer);
});

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


$('#start').on("click", function(){
    time = 60;
    questionNumber = 0;
    startTimer();
    footerNote = "";
    score = 0;
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
