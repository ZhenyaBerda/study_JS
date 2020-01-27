'use strict';

// Задание 1

let lang = 'en',
daysRu = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресение'],
daysEn = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
days = [
    ['ru','понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресение'],
    ['en','monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
];

// Вариант через if
if (lang === 'ru') {
    console.log(daysRu);
} else if (lang === 'en') {
    console.log(daysEn);
} else { 
    console.log('Error');
}

// Вариант через switch
switch (lang) {
    case 'ru':
        console.log(daysRu);
        break;
    case 'en':
        console.log(daysEn);
        break;
    default:
        console.log('Error');
}

// Вариант через массив (???)
let checkLang = (lang === days[0][0]) ? console.log(days[0]) : 
    (lang === days[1][0]) ? console.log(days[1]) : console.log('Error');

// Задание 2
let namePerson = 'Максим';

let position = (namePerson === 'Артем') ? 'директор' : 
    (namePerson === 'Максим') ? 'преподаватель' : 'студент';
console.log(`${namePerson} ${position}`);
