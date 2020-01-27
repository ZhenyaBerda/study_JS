'use strict';

const mission = 100000, period = 4;
let money, addExpenses, deposit, budgetMonth, budgetDay, expenses1, expenses2, amount1, amount2,
income = 'стипендия'; 

// Запросы пользователю
money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

expenses1 = prompt('Введите обязательную статью расходов?');
amount1 = prompt('Во сколько это обойдется?');
expenses2 = prompt('Введите обязательную статью расходов?');
amount2 = prompt('Во сколько это обойдется?');

// Вывод типов данных
console.log(`Тип данных money: ${typeof money}`);
console.log(`Тип данных income: ${typeof income}`);
console.log(`Тип данных deposit: ${typeof deposit}`);

// Вывод длины строки addExpenses
console.log(`Длина строки addExpenses: ${addExpenses.length}`);

// Разбивка строки на массив
console.log(addExpenses.toLowerCase().split(', '));

// Вывод периода и цели
console.log(`Период равен ${period} месяца(ев) \nЦель заработать ${mission} рублей`);

// Бюджет на месяц
budgetMonth = Number(money - amount1 - amount2);
console.log(`Бюджет на месяц: ${budgetMonth}`);

// Вывод периода и цели
console.log(`Цель будет достигнута за: ${Math.ceil(mission / budgetMonth)} месяцев`);

// Дневной бюджет
budgetDay = Math.floor(budgetMonth / 30);
console.log(`Дневной бюджет ${budgetDay} рублей`);

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 & budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay >= 0) {
    console.log('К сожалению, у вас уровень дохода ниже среднего');
} else if (budgetDay < 0 ) {
    console.log('Что-то пошло не так');
}

