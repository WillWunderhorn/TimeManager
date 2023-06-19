let workTimerElement = null;
let workIntervalId = null;
let restTimerElement = null;
let restIntervalId = null;

document.querySelector('.go').addEventListener('click', function () {
    let workHoursElement = document.querySelector('.p_work span:first-child');
    let workMinutesElement = document.querySelector('.p_work span:last-child');
    let restHoursElement = document.querySelector('.p_rest span:first-child');
    let restMinutesElement = document.querySelector('.p_rest span:last-child');

    let workHours = workHoursElement.innerText.replace('h', '');
    let workMinutes = workMinutesElement.innerText.replace('m', '');
    let restHours = restHoursElement.innerText.replace('h', '');
    let restMinutes = restMinutesElement.innerText.replace('m', '');

    let workTotalTimeInSeconds;
    let restTotalTimeInSeconds;

    if (workMinutes == 0) {
        workTotalTimeInSeconds = workHours * 3600;
    }
    if (workHours == 0) {
        workTotalTimeInSeconds = workMinutes * 60;
    }
    else {
        workTotalTimeInSeconds = (workHours * 60 * 60) + (workMinutes * 60);
    }

    if (restMinutes == 0) {
        restTotalTimeInSeconds = restHours * 3600;
    }
    if (restHours == 0) {
        restTotalTimeInSeconds = restMinutes * 60;
    }
    else {
        restTotalTimeInSeconds = (restHours * 60 * 60) + (restMinutes * 60);
    }

    if (!workTimerElement && !restTimerElement) {
        startTimer(workTotalTimeInSeconds, restTotalTimeInSeconds);
    }
});

function startTimer(workTotalTimeInSeconds, restTotalTimeInSeconds) {
    workTimerElement = createTimerElement(workTotalTimeInSeconds);
    restTimerElement = createTimerElement(restTotalTimeInSeconds);

    let workTimerText = workTimerElement.querySelector('.timer-text');
    let restTimerText = restTimerElement.querySelector('.timer-text');

    let workTimerToggleBtn = workTimerElement.querySelector('.start-stop-button');
    let restTimerToggleBtn = restTimerElement.querySelector('.start-stop-button');

    let isWorkTimerRunning = false;
    let isRestTimerRunning = false;

    workTimerToggleBtn.textContent = 'start';
    restTimerToggleBtn.textContent = 'start';

    function toggleWorkTimer() {
        if (isWorkTimerRunning) {
            clearInterval(workIntervalId);
            workTimerToggleBtn.textContent = 'start';
        } else {
            workIntervalId = setInterval(function () {
                workTotalTimeInSeconds--;

                if (workTotalTimeInSeconds < 0) {
                    clearInterval(workIntervalId);
                    workTimerElement.remove();
                    workTimerElement = null;
                    // Work timer expired
                    return;
                }

                workTimerText.innerText = formatTime(workTotalTimeInSeconds);
            }, 1000);
            workTimerToggleBtn.textContent = 'stop';
        }

        isWorkTimerRunning = !isWorkTimerRunning;
    }

    function toggleRestTimer() {
        if (isRestTimerRunning) {
            clearInterval(restIntervalId);
            restTimerToggleBtn.textContent = 'start';
        } else {
            restIntervalId = setInterval(function () {
                restTotalTimeInSeconds--;

                if (restTotalTimeInSeconds < 0) {
                    clearInterval(restIntervalId);
                    restTimerElement.remove();
                    restTimerElement = null;
                    // Rest timer expired
                    return;
                }

                restTimerText.innerText = formatTime(restTotalTimeInSeconds);
            }, 1000);
            restTimerToggleBtn.textContent = 'stop';
        }

        isRestTimerRunning = !isRestTimerRunning;
    }

    workTimerToggleBtn.addEventListener('click', toggleWorkTimer);
    restTimerToggleBtn.addEventListener('click', toggleRestTimer);

    let parentElement = document.querySelector('.content');
    parentElement.appendChild(workTimerElement);
    parentElement.appendChild(restTimerElement);
}

function createTimerElement(totalSeconds) {
    let timerElement = document.createElement('div');
    timerElement.classList.add('timer-container');

    let timerText = document.createElement('span');
    timerText.classList.add('timer-text');
    timerText.innerText = formatTime(totalSeconds);
    timerElement.appendChild(timerText);

    let timerToggleBtn = document.createElement('button');
    timerToggleBtn.classList.add('start-stop-button');

    timerElement.appendChild(timerToggleBtn);

    return timerElement;
}

function formatTime(totalSeconds) {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    let formattedTime = '';

    if (hours != 0) {
        formattedTime += hours + 'h ';
    }

    if (minutes != 0) {
        formattedTime += minutes + 'm ';
    }

    if (seconds != 0) {
        formattedTime += seconds + 's';
    }

    if (formattedTime === '') {
        formattedTime = '0s';
    }

    return formattedTime;
}

