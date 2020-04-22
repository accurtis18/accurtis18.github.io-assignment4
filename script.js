var score = localStorage.getItem("score");
var timer = 90;


$('.correct').on("click", function(){
    score++;  
    localStorage.setItem("score", score);
    $('.prompt').html("Correct");
});

$('.incorrect').on("click", function(){
    timer -= 4;
});

//Look up setInterval how to subtract from it
function startTimer(){
    setInterval(function(){
        $('#timer').html(timer);
        $('#timer').css("padding-bottom", "16px");
        if(--timer < 0){
            $('#timer').html("Times Up!");
        }
    }, 1000);
}

$('#start').on("click", function(){
    startTimer();
    $('.startPage').hide();
    $('.question1').show();
});

