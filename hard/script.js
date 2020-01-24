// Усложненное задание

let num = 266219,
numArr = String(num).split(''), //массив из цифр числа num
mult = 1; // переменная для произведения цифр num

console.log(numArr);

//цикл for для перемножения цифр
for (let i = 0; i < numArr.length; i++) {
    mult = mult * numArr[i];
}

// Вывод в консоль результата перемножения цифр
console.log('Произведение цифр числа 266219 равно ' + mult);

// Возведение в степень
console.log(mult + ' в степени 3 равен ' + mult**3);

// Вывод первых 2х цифр
console.log('Первые две цифры: ' + String(mult).substr(0, 2));