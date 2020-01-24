let money = 60000,
income = '10000',
addExpenses = 'Коммуналка, Электроэнергия, Интернет, Мобильная связь',
deposit = true,
mission = 100000,
period = 4,
budgetDay; // новая переменная

// Вывод типов данных
console.log('Тип данных money: '+ typeof money);
console.log('Тип данных income: '+ typeof income);
console.log('Тип данных deposit: '+ typeof deposit);

// Вывод длина строки addExpenses
console.log('Длина строки addExpenses: ' + addExpenses.length);

// Вывод периода и цели
console.log('Период равен ' + period + ' месяца(ев) \nЦель заработать ' + mission + ' рублей');

// Приведение строки addExpenses
addExpenses = addExpenses.toLowerCase();

// Разбивка строки на массив
console.log(addExpenses.split(', '));

// Дневной бюджет
budgetDay = money / 30;
console.log('Дневной бюджет ' + budgetDay + ' рублей');