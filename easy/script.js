'use strict';


const mission = 100000, period = 4;
let money = prompt('Ваш месячный доход?', '60000'),
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
    'Коммуналка, бензин, электроэнергия'),
deposit = confirm('Есть ли у вас депозит в банке?'),
expenses1 = prompt('Введите обязательную статью расходов?', 'Коммуналка'),
amount1 = prompt('Во сколько это обойдется?', '2000'),
expenses2 = prompt('Введите обязательную статью расходов?', 'Обучение'),
amount2 = prompt('Во сколько это обойдется?', '2000'),
income = 'стипендия';


// Объявления функций
// Функция определения типа данных
function showTypeOf (data) {
    return typeof(data);
}

// Сумма обязательных расходов
function getExpensesMonth (costs1, costs2) {
    return costs1+costs2;
}

// Накопления за месяц
function getAccumulatedMonth (gain, costs) {
    return gain-costs;
}

// Функция расчета периода
function getTargetMonth (budgetMonth) {
    return Math.ceil(mission / budgetMonth);
}

// Функция определения статуса 
function getStatusIncome (budget) {

    if (budget >= 1200) {
        return 'У вас высокий уровень дохода';
    } else if (budget >= 600 && budget < 1200) {
        return 'У вас средний уровень дохода';
    } else if (budget < 600 && budget >= 0) {
        return 'К сожалению, у вас уровень дохода ниже среднего';
    } else if (budget < 0 ) {
        return 'Что-то пошло не так';
    }
}



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

// Расходы и месячные накопления
const amounts = getExpensesMonth(Number(amount1), Number(amount2)),
accumulatedMonth = getAccumulatedMonth(Number(money), amounts);
console.log(`Сумма расходов: ${amounts}\nМесячные накопления: ${accumulatedMonth}`);

// Вывод периода и цели
console.log(`Цель будет достигнута за: ${getTargetMonth(accumulatedMonth)} месяца(ев)`);

// Дневной бюджет
const budgetDay = Math.floor(accumulatedMonth / 30);
console.log(`Дневной бюджет ${budgetDay} рублей\n${getStatusIncome(budgetDay)}`);



