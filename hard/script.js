'use strict';

let week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    date = new Date(),
    element = document.getElementById('text');

week.forEach(function (item, i) {
    let curDate;
    if (date.getDay() !== 0) {
        curDate = date.getDay() - 1;
    } else {
        curDate = 6;
    }

    if ((i === curDate && i === 5) || (i === curDate && i === 6)) {
        element.innerHTML += '<b><i>' + item + '</i></b><br>';
    } else if (i === curDate) {
        element.innerHTML += '<b>' + item + '</b><br>';
    } else if (i === 5 || i === 6) {
        element.innerHTML += '<i>' + item + '</i><br>';
    } else {
        element.innerHTML += item + '<br>';
    }
});