'use strict';

let week = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    date = new Date(),
    element = document.getElementById('text');

week.forEach(function (item, i) {
    if ((i === date.getDay() && i === 0) || (i === date.getDay() && i === 6)) {
        element.innerHTML += '<b><i>' + item + '</i></b><br>';
    } else if (i === date.getDay()) {
        element.innerHTML += '<b>' + item + '</b><br>';
    } else if (i === 0 || i === 6) {
        element.innerHTML += '<i>' + item + '</i><br>';
    } else {
        element.innerHTML += item + '<br>';
    }
});