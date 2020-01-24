const money = 60000,
mission = 100000,
period = 4;
let income = 'стипендия',
addExpenses = 'Коммуналка, Электроэнергия, Интернет, Мобильная связь',
deposit = true,
budgetDay = money / 30; // новая переменная

// Вывод типов данных
console.log(`Тип данных money: ${typeof money}`);
console.log(`Тип данных income: ${typeof income}`);
console.log(`Тип данных deposit: ${typeof deposit}`);

// Вывод длина строки addExpenses
console.log(`Длина строки addExpenses: ${addExpenses.length}`);

// Вывод периода и цели
console.log(`Период равен ${period} месяца(ев) \nЦель заработать ${mission} рублей`);

// Разбивка строки на массив
console.log(addExpenses.toLowerCase().split(', '));

// Дневной бюджет
console.log(`Дневной бюджет ${budgetDay} рублей`);