const container = document.getElementById('container');
const lapsContainer = document.getElementById('laps-container');

const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');

stopBtn.disable = true;
lapBtn.disable = true;
resetBtn.disable = true;


const hourContainer = document.getElementById('hours');
const minuteContainer = document.getElementById('minutes');
const secondContainer = document.getElementById('seconds');

const circle = document.getElementById('circle2');
const length = circle.getTotalLength();
circle.style.strokeDasharray = length;
circle.style.strokeDashoffset = length;


let hours = 0;
let minutes = 0;
let seconds = 0;


let lapTime = 0;



function start(){
    startBtn.disabled = true;
    stopBtn.disable = false;
    lapBtn.disable = false;
    resetBtn.disable = true;

    startBtn.classList.add('hidden-btn');
    stopBtn.classList.remove('hidden-btn');
    lapBtn.classList.remove('hidden-btn');
    resetBtn.classList.add('hidden-btn');



    stopwatch = setInterval(function(){
        seconds++;

        if(seconds > 59){
            seconds = 00;
            minutes++;
        }

        if(minutes > 59){
            minutes = 00;
            hours++;
        }

        if(hours > 0){
            hourContainer.innerHTML = (hours < 10 ? '0' + hours : hours) + ":";
        }
        minuteContainer.innerHTML = (minutes < 10 ? '0' + minutes : minutes);
        secondContainer.innerHTML = (seconds < 10 ? '0' + seconds : seconds);

        circle.style.strokeDashoffset = length - (seconds / 59) * length;
    }, 1000);
}

function stop(){
    clearInterval(stopwatch);

    startBtn.disabled = false;
    stopBtn.disable = true;
    lapBtn.disable = true;
    resetBtn.disable = false;

    startBtn.classList.remove('hidden-btn');
    stopBtn.classList.add('hidden-btn');
    lapBtn.classList.add('hidden-btn');
    resetBtn.classList.remove('hidden-btn');
}

function reset(){
    clearInterval(stopwatch);

    hourContainer.innerHTML = '';
    minuteContainer.innerHTML = '00';
    secondContainer.innerHTML = '00';
    lapsContainer.innerHTML = '';

    circle.style.strokeDashoffset = length;

    hours = 0;
    minutes = 0;
    seconds = 0;
    lapTime = 0;

    startBtn.disabled = false;
    stopBtn.disable = true;
    lapBtn.disable = true;
    resetBtn.disable = true;

    startBtn.classList.remove('hidden-btn');
    stopBtn.classList.add('hidden-btn');
    lapBtn.classList.add('hidden-btn');
    resetBtn.classList.add('hidden-btn');
}


function lap(){

    let time = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
    lapTime = time - lapTime;
    
    let lapHours = Math.floor(lapTime / (60 * 60 * 1000));
    let lapHours_ms = Math.floor(lapHours * 60 * 60 * 1000);
    
    let lapMinutes = Math.floor((lapTime - lapHours_ms) / (60 * 1000));
    let lapMinutes_ms = Math.floor(lapMinutes * 60 * 1000);

    let lapSeconds = Math.floor((lapTime - lapHours_ms - lapMinutes_ms) / 1000);
    let lapSeconds_ms = Math.floor(lapSeconds *1000);

    lapTime = lapHours_ms + lapMinutes_ms + lapSeconds_ms;
    console.log(lapHours, lapMinutes, lapSeconds)

    const lapContainer = document.createElement('div');
    lapContainer.classList.add("lap-container", "new-box");
    lapsContainer.prepend(lapContainer);

    lapTime = time;

    let fullTime = hours > 0 ? ((hours < 10 ? '0' + hours : hours)  + ":") : '' + (minutes < 10 ? '0' + minutes : minutes) + ":" + (seconds < 10 ? '0' + seconds : seconds);
    let timeLap = lapHours > 0 ? ((lapHours < 10 ? '0' + lapHours : lapHours)  + ":") : '' + (lapMinutes < 10 ? '0' + lapMinutes : lapMinutes) + ":" + (lapSeconds < 10 ? '0' + lapSeconds : lapSeconds);

    lapContainer.innerHTML = fullTime + "   -   " + timeLap ;
}
