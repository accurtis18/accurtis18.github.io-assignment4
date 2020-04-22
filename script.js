function startTimer(display){
    var timer = 90, seconds;
    setInterval(function(){
        display.textContent = timer;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        if(--timer < 0){
            display.textContent = "Times Up!";
        }
    }, 1000);

}

window.onload = function () {
    display = document.querySelector('#timer');
    startTimer(display);
};