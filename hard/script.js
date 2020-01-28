'use strict';

function output(data) {
    // проверка на строку
    if (typeof (data) === 'string') {
        let str = data.trim();

        // Проверка наличия цифр и букв в одной строке ???
        if (/\d/.test(data) && !/^\d+$/.test(data)) {
            return 'Введена не строка';
        }

        // длина строки
        if (str.length > 30) {
            return str.replace(str.slice(30), '...');
        } else {
            return str;
        }
    } else {
        return 'Введена не строка';
    }
}

console.log(output('       абвгдеё         '));
console.log(output('   а  а а  а а  а а   '));
console.log(output('456646'));
console.log(output('154dasd5454'));
console.log(output('       абвгдеёжзийклмнопрстуфхцчшщъыьэюя          '));
console.log(output(5235452354));
console.log(output(true));