var workHoursInput = document.querySelector('.hours-input-work');
var workMinutesInput = document.querySelector('.minutes-input-work');

// var restHoursInput = document.querySelector('.hours-input-rest');
// var restMinutesInput = document.querySelector('.minutes-input-rest');

document.querySelector('form').addEventListener('submit', function () {
    var workHours = workHoursInput.value;
    var workMinutes = workMinutesInput.value;

    // var restHours = restHoursInput.value;
    // var restMinutes = restMinutesInput.value;

    document.querySelector('#hours-input-hidden-work').value = workHours;
    document.querySelector('#minutes-input-hidden-work').value = workMinutes;

    // document.querySelector('#hours-input-hidden-rest').value = restHours;
    // document.querySelector('#minutes-input-hidden-rest').value = restMinutes;
});