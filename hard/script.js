// Усложненное задание

const num = 266219,
numArr = num.toString().split(''); //массив из цифр числа num


// Вывод массива
console.log(numArr);

const multNum = numArr.reduce(function(mult, current) {
    return mult * current;
}, 1);

// Вывод в консоль результата перемножения цифр
console.log(`Произведение цифр числа 266219: ${multNum}`);

// Возведение в степень
console.log(`Возведение в степень: ${multNum**3}`);

// Вывод первых 2х цифр
console.log(`Первые две цифры: ${multNum.toString().substr(0, 2)}`);