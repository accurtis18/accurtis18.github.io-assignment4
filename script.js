function startTimer(){
    var timer = 90;
    setInterval(function(){
        $('#timer').html(timer);
        if(--timer < 0){
            $('#timer').html("Times Up!");
        }
    }, 1000);

}

// window.onload = function () {
//     display = document.querySelector('#timer');
//     startTimer(display);
// };



$('#start').on("click", function(){
    startTimer();
    $('.startPage').hide();
    $('.question1').show();
})
