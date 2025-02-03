import { offerCatalog } from './data.js';
//Модуль работы с формой

//Тип жилья
const typeRoom = document.querySelector('#type');
//цена за сутки
const price = document.querySelector('#price');

//добавляем обработчик на изменение
typeRoom.addEventListener('change', function () {
  price.placeholder = offerCatalog[typeRoom.value].minPrice ;
});

//время заезда
const checkIn = document.querySelector('#timein');
//Время выезда
const checkOut = document.querySelector('#timeout');

//обработчик на изменение времени выезда, при корректировке времени заезда
checkIn.addEventListener('change', function () {
  checkOut.value = checkIn.value;
});

//обработчик на изменение времени заезда, при корректировке времени выезда
checkOut.addEventListener('change', function () {
  checkIn.value = checkOut.value;
});
