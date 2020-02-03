'use strict';
const week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    element = document.getElementById('text'),
// получение текущего дня недели
    getCurDay = function () {
        const date = new Date(),
            days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        
            return (days[date.getDay()]);
    };


week.forEach(function (item) {
    
   let p = document.createElement('p');

    if (item === 'saturday' || item === 'sunday') {
        p.classList.add('bold');
    }
    if (item === getCurDay()) {
        p.classList.add('italic');
    }

    p.textContent += item;
    document.body.appendChild(p);

});