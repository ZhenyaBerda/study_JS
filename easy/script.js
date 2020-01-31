'use strict';

// Функция проверки на число
const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let start = function () {

    do {
        money = prompt('Ваш месячный доход');
    } while (!isNumber(money));

};
// Начало
start();

let expenses = [],
    // объект
    appData = {
        budget: money, //прибыль
        income: {},
        addIncome: [],
        expenses: {}, //обязательные расходы
        addExpenses: [],  // возможные расходы
        deposit: false, // депозит
        mission: 50000, //цель
        period: 3,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0, // расходы за месяц

        // Методы
        asking: function () {
            let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
                'Коммуналка, бензин, электроэнергия');
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

            let key, amount;
            for (let i = 0; i < 2; i++) {
                key = prompt('Введите обязательную статью расходов');

                // Проверка на число
                do {
                    amount = prompt('Во сколько это обойдется');
                } while (!isNumber(amount));

                appData.expenses[key] = Number(amount);

            }
        },

        // сумма расходов
        getExpensesMonth: function () {

            for (let key in appData.expenses) {
                appData.expensesMonth += appData.expenses[key];
            }

            console.log(`Сумма расходов: ${appData.expensesMonth}`);
        },

        // Накопления за месяц
        getBudget: function () {
            appData.budgetMonth = appData.budget - appData.expensesMonth;
            appData.budgetDay = Math.floor( appData.budgetMonth / 30);
        },

        // Функция расчета периода
        getTargetMonth: function () {
            let targetMonth = Math.ceil(appData.mission / appData.budgetMonth);
            if (targetMonth >= 0) {
                console.log(`Цель будет достигнута за: ${targetMonth} месяца(ев)`);
            } else {
                console.log(`Цель не будет достигнута`);
            }
        },

        // Функция определения статуса 
        getStatusIncome: function () {

            if (appData.budgetDay >= 1200) {
                console.log('У вас высокий уровень дохода');
            } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
                console.log('У вас средний уровень дохода');
            } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
                console.log('К сожалению, у вас уровень дохода ниже среднего');
            } else if (appData.budgetDay < 0) {
                console.log('Что-то пошло не так');
            }
        },

    };


appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
    console.log(`${key}: ${appData[key]}`);
}

