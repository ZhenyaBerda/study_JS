'use strict';

// Задание 1
const arr = ["111111111", "22222222", "333333333", "444444444", "5555555", "666666666", "7777777777"];

const filtredArr = arr.filter( item => item[0] === '2' || item[0] === '4');
console.log(filtredArr);

// Задание 2
outer: for (let i = 2; i <= 100; i++) {
    for (let j = 2; j < i; j++) {
        if (i % j === 0) {
            continue outer;
        }
    }
    console.log(`${i} делится на 1 и ${i}`);
}