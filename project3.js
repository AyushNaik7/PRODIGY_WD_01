let timer;
let isRunning = false;
let elapsedTime = 0;
let startTime;
const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

function startStopwatch() {
    if (isRunning) return;
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateDisplay, 1000);
}

function pauseStopwatch() {
    if (!isRunning) return;
    isRunning = false;
    elapsedTime = Date.now() - startTime;
    clearInterval(timer);
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    display.textContent = "00:00:00";
    lapsContainer.innerHTML = '';
}

function lapStopwatch() {
    if (!isRunning) return;
    const lapTime = formatTime(Date.now() - startTime);
    const lapItem = document.createElement('div');
    lapItem.textContent = lapTime;
    lapItem.className = 'lap-item';
    lapsContainer.appendChild(lapItem);
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return number.toString().padStart(2, '0');
}
