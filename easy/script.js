'use strict';

// Функция проверки на число
const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = function (str) {
    return isNaN(str) && typeof (str) === 'string';
};

let money;
const start = function () {

    do {
        money = prompt('Ваш месячный доход');
    } while (!isNumber(money));

};
// Начало
start();

const expenses = [],
    // объект
    appData = {
        budget: money, //прибыль
        income: {},
        addIncome: [],
        expenses: {}, //обязательные расходы
        addExpenses: [], // возможные расходы
        deposit: false, // депозит
        percentDeposit: 0,
        moneyDeposit: 0,
        mission: 50000, //цель
        period: 3,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0, // расходы за месяц

        // Методы
        asking: function () {

            if (confirm('Есть у вас дополнительный источник заработка?')) {
                let itemIncome, cashIncome;

                do {
                    itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
                } while (!isString(itemIncome));

                do {
                    cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
                } while (!isNumber(cashIncome));

                appData.income[itemIncome] = cashIncome;
            }

            let addExpenses; 
            do {
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
                'Коммуналка, бензин, электроэнергия');
            } while (!isString(addExpenses));

            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

            let key, amount;
            for (let i = 0; i < 2; i++) {

                do {
                    key = prompt('Введите обязательную статью расходов');
                } while (!isString(key));

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
            appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        },

        // Функция расчета периода
        getTargetMonth: function () {
            return Math.ceil(appData.mission / appData.budgetMonth);
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

        // информация о депозите
        getInfoDeposit: function () {
            if (appData.deposit) {
                do {
                    appData.percentDeposit = prompt('Какой годовой процент?', 10);
                } while (!isNumber(appData.percentDeposit));
                do {
                    appData.moneyDeposit = prompt('Какая сумма заложена', 10000);
                } while (!isNumber(appData.moneyDeposit));
            }
        },

        calcSavedMoney: function () {
            return appData.budgetMonth * appData.period;
        }

    };


appData.asking();
appData.getExpensesMonth();
appData.getBudget();

if (appData.getTargetMonth() >= 0) {
    console.log(`Цель будет достигнута за: ${appData.getTargetMonth()} месяца(ев)`);
} else {
    console.log(`Цель не будет достигнута`);
}

appData.getStatusIncome();
appData.getInfoDeposit();

console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
    console.log(key + ':' + appData[key]);
}

console.log(appData.addExpenses.map(item => item[0].toUpperCase() + item.substring(1)).join(', '));