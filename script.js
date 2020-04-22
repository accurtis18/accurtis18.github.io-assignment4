function startTimer(display){
    var timer = 90;
    setInterval(function(){
        display.textContent = timer;
        if(--timer < 0){
            display.textContent = "Times Up!";
        }
    }, 1000);

}

window.onload = function () {
    display = document.querySelector('#timer');
    startTimer(display);
};