'use strict';

// Функция проверки на число
const isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
},

    // Функция определения типа данных
showTypeOf = function(data) {
    return typeof (data);
};

let money,
expenses = [];

let start = function() {

    do {
        money = prompt('Ваш месячный доход');
    } while (!isNumber(money));

};

// Начало
start();

// Пока константы
const mission = 100000,
    period = 4,
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
        'Коммуналка, бензин, электроэнергия'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    income = 'стипендия';


    // Сумма обязательных расходов
const getExpensesMonth = function() {

    let sum = 0, amount;

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов');

        // Проверка на число
        do {
            amount = prompt('Во сколько это обойдется');
        } while (!isNumber(amount));

        sum += Number(amount);
    }

    console.log(sum);
    return sum;
},

// Накопления за месяц
getAccumulatedMonth = function(gain, costs) {
    return gain - costs;
},

// Функция расчета периода
getTargetMonth = function(budgetMonth) {
    return Math.ceil(mission / budgetMonth);
},

// Функция определения статуса 
getStatusIncome = function(budget) {

    if (budget >= 1200) {
        return 'У вас высокий уровень дохода';
    } else if (budget >= 600 && budget < 1200) {
        return 'У вас средний уровень дохода';
    } else if (budget < 600 && budget >= 0) {
        return 'К сожалению, у вас уровень дохода ниже среднего';
    } else if (budget < 0) {
        return 'Что-то пошло не так';
    }
};





// Выводы введенных значений
// Вывод типов данных
console.log(`Тип данных money: ${showTypeOf(money)}`);
console.log(`Тип данных income: ${showTypeOf(income)}`);
console.log(`Тип данных deposit: ${showTypeOf(deposit)}`);

// Вывод длины строки addExpenses
console.log(`Длина строки addExpenses: ${addExpenses.length}`);

// Разбивка строки на массив
console.log(addExpenses.toLowerCase().split(', '));

// Вывод заданного периода и цели
console.log(`Период равен ${period} месяца(ев) \nЦель заработать ${mission} рублей`);

//Расчеты
// Расходы и месячные накопления
const amounts = getExpensesMonth(),
    accumulatedMonth = getAccumulatedMonth(Number(money), amounts);
console.log(`Сумма расходов: ${amounts}\nМесячные накопления: ${accumulatedMonth}`);

// Вывод периода и цели
let targetMonth = getTargetMonth(accumulatedMonth);
if (targetMonth >= 0 ) {
      console.log(`Цель будет достигнута за: ${targetMonth} месяца(ев)`);
} else {
    console.log(`Цель не будет достигнута`);
}

// Дневной бюджет
const budgetDay = Math.floor(accumulatedMonth / 30);
console.log(`Дневной бюджет ${budgetDay} рублей\n${getStatusIncome(budgetDay)}`);