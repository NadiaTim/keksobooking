import { offerCatalog } from './data.js';

// 3.1. Заголовок объявления:
// Обязательное текстовое поле;
// Минимальная длина — 30 символов;
// Максимальная длина — 100 символов.
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const titleInput = document.querySelector('#title');

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Необходимо еще ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});


// 3.2. Цена за ночь:
// Обязательное поле;
// Числовое поле;
// Максимальное значение — 1000000.
const MAX_PRICE = 1000000;

const priceInput = document.querySelector('#price');
const typeInput = document.querySelector('#type');

const priceValidate = () => {
  const priceValue = Number(priceInput.value);
  const priceMin = Number(priceInput.placeholder);

  if (priceValue > MAX_PRICE) {
    priceInput.setCustomValidity(`Уменьшите цену предложения до ${MAX_PRICE}`);
  } else if (priceValue < priceMin) {
    priceInput.setCustomValidity(`Увеличьте цену предложения до ${priceMin}`);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
}

//добавляем обработчик на ввод цены за ночь
priceInput.addEventListener('blur', priceValidate);


// 3.3. Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
// «Бунгало» — минимальная цена за ночь 0;
// «Квартира» — минимальная цена за ночь 1 000;
// «Отель» — минимальная цена за ночь 3 000;
// «Дом» — минимальная цена 5 000;
// «Дворец» — минимальная цена 10 000.

//добавляем обработчик на изменение типа жилья
typeInput.addEventListener('change', function () {
  priceInput.placeholder = offerCatalog[typeInput.value].minPrice ;
  priceValidate();
});

// 3.5. Поля «Время заезда» и «Время выезда» синхронизированы:
// при изменении значения одного поля
// во втором выделяется соответствующее ему значение.
// Например, если время заезда указано «после 14»,
// то время выезда будет равно «до 14» и наоборот.

//время заезда
const checkInInput = document.querySelector('#timein');
//Время выезда
const checkOutInput = document.querySelector('#timeout');

//обработчик на изменение времени выезда, при корректировке времени заезда
checkInInput.addEventListener('change', function () {
  checkOutInput.value = checkInInput.value;
});

//обработчик на изменение времени заезда, при корректировке времени выезда
checkOutInput.addEventListener('change', function () {
  checkInInput.value = checkOutInput.value;
});




