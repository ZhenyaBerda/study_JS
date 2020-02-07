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
    incomeItems = document.querySelectorAll('.income-items'),
    cancelButton = document.querySelector('#cancel');



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

            this.budget = +salaryAmount.value;
            this.getExpenses();
            this.getIncome();
            this.getAddIncome();
            this.getExpensesMonth();
            this.getAddExpenses();
            this.getBudget();
            this.showResult();

        },
        // показать результаты
        showResult: function () {
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = this.budgetDay;
            expensesMonthValue.value = this.expensesMonth;
            addExpensesValue.value = this.addExpenses.join(', ');
            addIncomeValue.value = this.addIncome.join(', ');
            targetMonthValue.value = this.getTargetMonth();

            incomePeriodValue.value = this.calcPeriod();

            periodSelect.addEventListener('input', function () {
                incomePeriodValue.value = appData.calcPeriod();
            });

        },

        // добавление блока расходов
        addExpensesBlock: function () {
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            cloneExpensesItem.querySelector('.expenses-title').value = '';
            cloneExpensesItem.querySelector('.expenses-amount').value = '';

            cloneExpensesItem.querySelector('input[placeholder="Наименование"').addEventListener('input', function () {
                this.value = this.value.replace(/[^а-я А-Я,]/g, '');
            });
            cloneExpensesItem.querySelector('input[placeholder="Сумма"').addEventListener('input', function () {
                this.value = this.value.replace(/[^\d,]/g, '');
            });

            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlusBtn);
            expensesItems = document.querySelectorAll('.expenses-items');
            if (expensesItems.length === 3) {
                expensesPlusBtn.style.display = 'none';
            }
        },

        // добавление блока доходов
        addIncomeBlock: function () {
            let cloneImcomeItem = incomeItems[0].cloneNode(true);
            cloneImcomeItem.querySelector('.income-title').value = '';
            cloneImcomeItem.querySelector('.income-amount').value = '';

            cloneImcomeItem.querySelector('input[placeholder="Наименование"').addEventListener('input', function () {
                this.value = this.value.replace(/[^а-я А-Я,]/g, '');
            });
            cloneImcomeItem.querySelector('input[placeholder="Сумма"').addEventListener('input', function () {
                this.value = this.value.replace(/[^\d,]/g, '');
            });

            incomeItems[0].parentNode.insertBefore(cloneImcomeItem, incomePlusBtn);
            incomeItems = document.querySelectorAll('.income-items');
            if (incomeItems.length === 3) {
                incomePlusBtn.style.display = 'none';
            }
        },

        // получение расходов
        getExpenses: function () {

            expensesItems.forEach(function (item) {

                let itemExpenses = item.querySelector('.expenses-title').value,
                    cashExpenses = item.querySelector('.expenses-amount').value;
                if (itemExpenses !== '' && cashExpenses !== '') {
                    appData.expenses[itemExpenses] = +cashExpenses;
                }
            });

        },

        // получение доходов
        getIncome: function () {
            incomeItems.forEach(function (item) {
                let itemIncome = item.querySelector('.income-title').value,
                    cashIncome = item.querySelector('.income-amount').value;

                if (itemIncome !== '' && cashIncome !== '') {
                    appData.income[itemIncome] = +cashIncome;
                }
            });

            for (let key in this.income) {
                this.incomeMonth += this.income[key];
            }
        },

        // возможные расходы
        getAddExpenses: function () {
            let addExpenses = addExpensesItem.value.toLowerCase().split(',');
            addExpenses.forEach(function (item) {
                item = item.trim();
                if (item !== '') {
                    appData.addExpenses.push(item);
                }
            });
        },

        // возможные доходы
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
            for (let key in this.expenses) {
                this.expensesMonth += this.expenses[key];
            }
        },

        // Накопления за месяц
        getBudget: function () {
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
            this.budgetDay = Math.floor(this.budgetMonth / 30);
        },

        // Функция расчета периода
        getTargetMonth: function () {
            return Math.ceil(targetAmount.value / this.budgetMonth);
        },

        // Функция определения статуса 
        getStatusIncome: function () {
            if (this.budgetDay >= 1200) {
                console.log('У вас высокий уровень дохода');
            } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
                console.log('У вас средний уровень дохода');
            } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
                console.log('К сожалению, у вас уровень дохода ниже среднего');
            } else if (this.budgetDay < 0) {
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

        //вычисление накоплений за месяц
        calcPeriod: function () {
            return this.budgetMonth * periodSelect.value;
        },

        // сброс
        reset: function () {
            let inputItems = document.querySelectorAll('input[type=text] ');
            inputItems.forEach((elem) => {
                elem.readOnly = false;
                elem.value = '';
            });

            cancelButton.style.display = 'none';
            start.style.display = 'block';
        }
    };


// добавление блоков расходов/доходов
expensesPlusBtn.addEventListener('click', appData.addExpensesBlock);
incomePlusBtn.addEventListener('click', appData.addIncomeBlock);

// автоматическое изменение периода при изменении range
periodSelect.addEventListener('input', function () {
    let rangeValue = document.querySelector('.period-amount');
    rangeValue.textContent = periodSelect.value;
});

// получение всех input "Наименование"
let collectName = document.querySelectorAll('input[placeholder="Наименование"]');

// ограничение ввода: только русские буквы и знаки препинания
collectName.forEach((elem) => {
    elem.addEventListener('input', function () {
        this.value = this.value.replace(/[^а-я А-Я,]/g, '');
    });
});


// получение всех input "Сумма"
let collectAmount = document.querySelectorAll('input[placeholder="Сумма"]');
// ограничение ввода: только цифры
collectAmount.forEach((elem) => {
    elem.addEventListener('input', function () {
        this.value = this.value.replace(/[^\d,]/g, '');
    });
});

// обработчик события для кнопки старт
start.addEventListener('click', function (event) {
    // проверка ввода бюджета
    if (salaryAmount.value !== '') {
        appData.start.apply(appData);
        let inputText = document.querySelectorAll('input[type=text] ');

        // блокировка ввода во все input
        inputText.forEach(function (elem) {
            elem.readOnly = true;
        });

        // открываем кнопку cancel и закрываем start
        start.style.display = 'none';
        cancelButton.style.display = 'block';

        // на cancel навешиваем обработчик события click
        cancelButton.addEventListener('click', function () {
            appData.reset();
        });

    } else {
        event.preventDefault();
    }
});