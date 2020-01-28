'use strict';

function output (data) {
    
    // проверка на строку
    if (typeof(data) === 'string') {
        let str = data.trim();
        if (str.length > 30) {
            return str.replace(str.slice(30), '...');
        }
    } else {
        return 'Введена не строка';
    }
}

console.log(output('       абвгдеёжзийклмнопрстуфхцчшщъыьэюя          '));
console.log(output(5235452354));
console.log(output(true));