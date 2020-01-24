// Усложненное задание

const num = 266219;
let numArr = num.toString().split(''); //массив из цифр числа num


// Вывод массива
console.log(numArr);

let result = numArr.reduce(function(mult, current) {
    return mult * current;
}, 1);

// Вывод в консоль результата перемножения цифр
console.log(`Произведение цифр числа 266219: ${result}`);

// Возведение в степень
console.log(`Возведение в степень: ${result**3}`);

// Вывод первых 2х цифр
console.log(`Первые две цифры: ${result.toString().substr(0, 2)}`);