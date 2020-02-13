'use strict';

const start = document.getElementById('start'),
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
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    salaryAmount = document.querySelector('.salary-amount'),
    targetAmount = document.querySelector('.target-amount'),
    cancelButton = document.querySelector('#cancel');
let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');


// Функция проверки на число
const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

// Фукнция проверки на строку
const isString = function (str) {
    return isNaN(str) && typeof (str) === 'string';
};

const textCheck = function (input) {
    input.value = input.value.replace(/[^а-я А-Я,]/g, '');

};

const amountCheck = function (input) {
    input.value = input.value.replace(/[^\d,]/g, '');
};

class AppData {
    constructor() {
        this.budget = 0; //прибыль
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {}; //обязательные расходы
        this.addExpenses = []; // возможные расходы
        this.deposit = false; // депозит
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0; // расходы за месяц
    }

    start() {
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getAddIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getBudget();
        this.showResult();
    }

    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.join(', ');
        addIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();

        incomePeriodValue.value = this.calcPeriod();

        periodSelect.addEventListener('input', () =>
            incomePeriodValue.value = this.calcPeriod()
        );
    }

    addExpensesBlock() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';

        const itemText = cloneExpensesItem.querySelector('input[placeholder="Наименование"');
        itemText.addEventListener('input', () => textCheck(itemText));

        const itemAmount = cloneExpensesItem.querySelector('input[placeholder="Сумма"');
        itemAmount.addEventListener('input', () => amountCheck(itemAmount));

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlusBtn);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlusBtn.style.display = 'none';
        }
    }

    addIncomeBlock() {
        const cloneImcomeItem = incomeItems[0].cloneNode(true);
        cloneImcomeItem.querySelector('.income-title').value = '';
        cloneImcomeItem.querySelector('.income-amount').value = '';

        const itemText = cloneImcomeItem.querySelector('input[placeholder="Наименование"');
        itemText.addEventListener('input', () => textCheck(itemText));

        const itemAmount = cloneImcomeItem.querySelector('input[placeholder="Сумма"');
        itemAmount.addEventListener('input', () => amountCheck(itemAmount));

        incomeItems[0].parentNode.insertBefore(cloneImcomeItem, incomePlusBtn);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlusBtn.style.display = 'none';
        }
    }



    getExpenses() {
        expensesItems.forEach((item) => {

            const itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        });

    }

    getIncome() {
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;

            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = +cashIncome;
            }
        });

        for (let key in this.income) {
            this.incomeMonth += this.income[key];
        }
    }

    getAddExpenses() {
        const addExpenses = addExpensesItem.value.toLowerCase().split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }

    getAddIncome() {
        addIncomeItems.forEach((item) => {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }

    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    }

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    getStatusIncome() {
        if (this.budgetDay >= 1200) {
            console.log('У вас высокий уровень дохода');
        } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
            console.log('У вас средний уровень дохода');
        } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
            console.log('К сожалению, у вас уровень дохода ниже среднего');
        } else if (this.budgetDay < 0) {
            console.log('Что-то пошло не так');
        }
    }

    getInfoDeposit() {
        if (this.deposit) {
            let percentDeposit, moneyDeposit;
            do {
                percentDeposit = prompt('Какой годовой процент?', 10);
            } while (!isNumber(this.percentDeposit));
            this.percentDeposit = Number(percentDeposit);
            do {
                moneyDeposit = prompt('Какая сумма заложена', 10000);
            } while (!isNumber(this.moneyDeposit));
            this.moneyDeposit = Number(moneyDeposit);
        }
    }

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }

    reset() {
        const inputItems = document.querySelectorAll('input[type=text] ');
        inputItems.forEach((elem) => {
            elem.disabled = false;
            elem.value = '';
        });

        cancelButton.style.display = 'none';
        start.style.display = 'block';

        for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].remove();
        }
        expensesPlusBtn.style.display = 'block';

        for (let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].remove();
        }
        incomePlusBtn.style.display = 'block';


        // сброс данных
        this.budget = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {}; //обязательные расходы
        this.addExpenses = []; // возможные расходы
        this.deposit = false; // депозит
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0; // расходы за месяц


        periodSelect.value = 1;
        let rangeValue = document.querySelector('.period-amount');
        rangeValue.textContent = periodSelect.value;
    }

    eventsListeners() {

        // добавление блоков расходов/доходов
        expensesPlusBtn.addEventListener('click', this.addExpensesBlock);
        incomePlusBtn.addEventListener('click', this.addIncomeBlock);

        // автоматическое изменение периода при изменении range
        periodSelect.addEventListener('input', () => {
            let rangeValue = document.querySelector('.period-amount');
            rangeValue.textContent = periodSelect.value;
        });

        // получение всех input "Наименование"
        let collectName = document.querySelectorAll('input[placeholder="Наименование"]');

        // ограничение ввода: только русские буквы и знаки препинания
        collectName.forEach((elem) => {
            elem.addEventListener('input', () => textCheck(elem));
        });


        // получение всех input "Сумма"
        let collectAmount = document.querySelectorAll('input[placeholder="Сумма"]');
        // ограничение ввода: только цифры
        collectAmount.forEach((elem) => {
            elem.addEventListener('input', () => amountCheck(elem));
        });

        // обработчик события для кнопки старт
        start.addEventListener('click', (event) => {
            // проверка ввода бюджета
            if (salaryAmount.value !== '') {
                this.start.apply(this);
                let inputText = document.querySelectorAll('input[type=text] ');

                // блокировка ввода во все input
                inputText.forEach((elem) => {
                    elem.disabled = true;
                });

                // открываем кнопку cancel и закрываем start
                start.style.display = 'none';
                cancelButton.style.display = 'block';

                // на cancel навешиваем обработчик события click
                cancelButton.addEventListener('click', () => {
                    this.reset.apply(this);
                });

            } else {
                event.preventDefault();
            }
        });

    }

}

const appData = new AppData();
appData.eventsListeners();