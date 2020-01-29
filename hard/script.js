'use strict';

// Задание 1
let arr = [111111111, 22222222, 333333333, 444444444, 5555555, 666666666, 7777777777];

for (let i = 0; i < arr.length; i++) {

    if (arr[i].toString().slice(0, 1) === '2' || arr[i].toString().slice(0, 1) === '4') {
        console.log(arr[i]);
    }

}

// Задание 2

for (let i = 2; i <= 100; i++) {

    // случай для 2
    if (i === 2) {
        console.log(`${i} делится на 1 и ${i}`);
        continue;
    }

    // случай для 3
    if (i === 3) {
        console.log(`${i} делится на 1 и ${i}`);
        continue;
    }

    // случай для 5
    if (i === 5) {
        console.log(`${i} делится на 1 и ${i}`);
        continue;
    }

    // случай для 7
    if (i === 7) {
        console.log(`${i} делится на 1 и ${i}`);
        continue;
    }

    // проверка чисел
    if( i % 2 !== 0 && i % 3 !== 0 && i % 5 !== 0 && i % 7 !== 0 ) {
        console.log(`${i} делится на 1 и ${i}`);
    }
}