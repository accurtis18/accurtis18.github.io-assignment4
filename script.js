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
    $('.highScores').show();
    $('.highScores').html("");
    highScores.sort((a,b) => b.score - a.score);
    for(scores of highScores){
        $(".highScores").append(`<div class="input-group mb-3">
      </div>
        <input type="text" class="form-control" id="listItem" value="${scores.user}: ${scores.score}" readonly>
        </div>`)
    }
    $(".highScores").append(`<div class="toHome">
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
    $(".scores").append(`<div class="col-md-12 inputScore"><div class"urScore"> Your Score: ${score}</div></div>
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

$(document).on("click", '#submit', function(){
    var newScore = {
        score: score,
        user: $('#name').val()
    }
    highScores.push(newScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    console.log(highScores);
    showHighScores();
})


function setQuestion(){
    if(questionNumber === question.length){
        recordScore();
        clearInterval(setTimer);
    } else{
        $('.identifier').html(`<h2>Question ${questionNumber + 1}</h2>`)
        $('.questions').html(`${question[questionNumber].question}
        <div class="answers">
        <button class="btn answer ${question[questionNumber].answer[0].correct}">${question[questionNumber].answer[0].text}</button>
        <button class="btn answer ${question[questionNumber].answer[1].correct}">${question[questionNumber].answer[1].text}</button>
        <button class="btn answer ${question[questionNumber].answer[2].correct}">${question[questionNumber].answer[2].text}</button>
        <button class="btn answer ${question[questionNumber].answer[3].correct}">${question[questionNumber].answer[3].text}</button>
        </div>
        <div class="card-footer">
        <p class="prompt">${footerNote}</p>
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
    time -= 40;
    footerNote = "Wrong!"
    questionNumber += 1;
    setQuestion();
});

$(document).on("click", '.home', function(){
    $('.highScores').hide();
    $('.startPage').show();
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
    time = 90;
    questionNumber = 0;
    startTimer();
    footerNote = "";
    $('.startPage').hide();
    $('.question').show();
    setQuestion();
});

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
    }
]
