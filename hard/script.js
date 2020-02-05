'use strict';
let element = document.getElementById('text'),
    // склонение
    getDeclination = function (number, titles) {
        let cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    },
    // день недели
    getCurDay = function (curDate) {
        let days = ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        return days[curDate.getDay()];
    },
    // месяц
    getCurMonth = function (curDate) {
        let month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        return month[curDate.getMonth()];
    },

    // получение текущей даты и времени в текстовом виде
    getTextDate = function () {
        let curDate = new Date();
        let day = `${curDate.getDate()} ${getCurMonth(curDate)} ${curDate.getFullYear()}`,
            hour = curDate.getHours(),
            minute = curDate.getMinutes(),
            seconds = curDate.getSeconds(),
            time = `${hour} ${getDeclination(hour, ['час', 'часа', 'часов'])}
        ${minute} ${getDeclination(minute, ['минута', 'минуты', 'минут'])}
        ${seconds} ${getDeclination(seconds, ['секунда', 'секунды', 'секунд'])}`;

        return (`Сегодня ${getCurDay(curDate)}, ${day}, ${time}`);
    },
    // добавление нулей
    addZero = function (number) {
        let strNumber = number.toString();

        if (strNumber.length === 1) {
            return `0` + strNumber;
        } else {
            return strNumber;
        }
    },
    // сокращенная версия
    getShortDate = function () {
        let curDate = new Date();
        let day = addZero(curDate.getDate()),
            month = addZero(curDate.getMonth() + 1),
            hour = addZero(curDate.getHours()),
            minute = addZero(curDate.getMinutes()),
            seconds = addZero(curDate.getSeconds());

        return `${day}.${month}.${curDate.getFullYear()} - ${hour}:${minute}:${seconds}'`;
    },
    // вывод

    output = function () {
        document.getElementById('text-time').textContent = getTextDate();
        document.getElementById('short').textContent = getShortDate();
    };

setInterval(output, 1000);