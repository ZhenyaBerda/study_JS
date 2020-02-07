'use strict';

let start = document.getElementById('start'),
    incomePlusBtn = document.getElementsByTagName('button')[0],
    expensesPlusBtn = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    addIncomeItems = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    addIncomeValue = document.querySelector('.additional_income-value'),
    addExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    periodSelect = document.querySelector('.period-select'),
    incomeItemInput = document.querySelector('input.income-title '),
    expensesItemInput = document.querySelector('input.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    salaryAmount = document.querySelector('.salary-amount'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItems = document.querySelectorAll('.income-items');



// Функция проверки на число
const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

// Фукнция проверки на строку
const isString = function (str) {
    return isNaN(str) && typeof (str) === 'string';
};

const expenses = [],
    // объект
    appData = {
        budget: 0, //прибыль
        income: {},
        incomeMonth: 0,
        addIncome: [],
        expenses: {}, //обязательные расходы
        addExpenses: [], // возможные расходы
        deposit: false, // депозит
        percentDeposit: 0,
        moneyDeposit: 0,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0, // расходы за месяц

        start: function () {

            appData.budget = +salaryAmount.value;

            appData.getExpenses();
            appData.getIncome();
            appData.getAddIncome();
            appData.getExpensesMonth();
            appData.getAddExpenses();


            appData.getBudget();

            appData.showResult();

        },

        showResult: function () {


            budgetMonthValue.value = appData.budgetMonth;
            budgetDayValue.value = appData.budgetDay;
            expensesMonthValue.value = appData.expensesMonth;
            addExpensesValue.value = appData.addExpenses.join(', ');
            addIncomeValue.value = appData.addIncome.join(', ');
            incomePeriodValue.value = appData.calcPeriod();

            targetMonthValue.value = appData.getTargetMonth();
            periodSelect.addEventListener('change', function () {
                incomePeriodValue.value = appData.calcPeriod();
            });

        },

        addExpensesBlock: function () {

            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlusBtn);
            expensesItems = document.querySelectorAll('.expenses-items');
            if (expensesItems.length === 3) {
                expensesPlusBtn.style.display = 'none';
            }
        },

        addIncomeBlock: function () {
            let cloneImcomeItem = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneImcomeItem, incomePlusBtn);
            incomeItems = document.querySelectorAll('.income-items');
            if (incomeItems.length === 3) {
                incomePlusBtn.style.display = 'none';
            }
        },

        getExpenses: function () {
            expensesItems.forEach(function (item) {
                let itemExpenses = item.querySelector('.expenses-title').value,
                    cashExpenses = item.querySelector('.expenses-amount').value;

                if (itemExpenses !== '' && cashExpenses !== '') {
                    appData.expenses[itemExpenses] = +cashExpenses;
                }
            });

        },

        getIncome: function () {

            incomeItems.forEach(function (item) {
                let itemIncome = item.querySelector('.income-title').value,
                    cashIncome = item.querySelector('.income-amount').value;

                if (itemIncome !== '' && cashIncome !== '') {
                    appData.income[itemIncome] = +cashIncome;
                }
            });

            for (let key in appData.income) {
                appData.incomeMonth += appData.income[key];
            }
        },

        getAddExpenses: function () {
            let addExpenses = addExpensesItem.value.toLowerCase().split(',');
            addExpenses.forEach(function (item) {
                item = item.trim();
                if (item !== '') {
                    appData.addExpenses.push(item);
                }
            });
        },


        getAddIncome: function () {
            addIncomeItems.forEach(function (item) {
                let itemValue = item.value.trim();
                if (itemValue !== '') {
                    appData.addIncome.push(itemValue);
                }
            });
        },

        // сумма расходов
        getExpensesMonth: function () {
            for (let key in appData.expenses) {
                appData.expensesMonth += appData.expenses[key];
            }
        },

        // Накопления за месяц
        getBudget: function () {
            appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
            appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        },

        // Функция расчета периода
        getTargetMonth: function () {
            return Math.ceil(targetAmount.value / appData.budgetMonth);
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
                let percentDeposit, moneyDeposit;
                do {
                    percentDeposit = prompt('Какой годовой процент?', 10);
                } while (!isNumber(appData.percentDeposit));
                appData.percentDeposit = Number(percentDeposit);
                do {
                    moneyDeposit = prompt('Какая сумма заложена', 10000);
                } while (!isNumber(appData.moneyDeposit));
                appData.moneyDeposit = Number(moneyDeposit);
            }
        },

        calcPeriod: function () {
            return appData.budgetMonth * periodSelect.value;
        }
    };

start.addEventListener('click', function (event) {
    if (salaryAmount.value === '') {
        event.preventDefault();
    }
});

start.addEventListener('click', appData.start);
expensesPlusBtn.addEventListener('click', appData.addExpensesBlock);
incomePlusBtn.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function () {
    let rangeValue = document.querySelector('.period-amount');
    rangeValue.textContent = periodSelect.value;
});



// if (appData.getTargetMonth() >= 0) {
//     console.log(`Цель будет достигнута за: ${appData.getTargetMonth()} месяца(ев)`);
// } else {
//     console.log(`Цель не будет достигнута`);
// }