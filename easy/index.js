'use strict';

let startButton = document.getElementById('start'),
    incomePlusBtn = document.getElementsByTagName('button')[0],
    expensesPlusBtn = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    addIncomeItems = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesValue = document.querySelector('.expenses_month-value'),
    addIncomeValue = document.querySelector('.additional_income-value'),
    addExpensesValue = document.querySelector('.additional_expenses-value'),
    periodValue = document.querySelector('.income_period-value'),
    tergetMonthValue = document.querySelector('.target_month-value'),
    range = document.querySelector('.period-select'),
    incomeItem = document.querySelector('input.income-title '),
    incomeAmount = document.querySelector('.income-amount'),
    expensesItem = document.querySelector('input.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    addExpensesItems = document.querySelector('.additional_expenses-item');