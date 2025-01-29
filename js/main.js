//Необходимое количество объявлений
const ADVERTS_COUNT = 10;

/** Получение целого случайного числа в заданном диапозоне
 * @param {number} min - Минимальное значение диапазона (включительно)
 * @param {number} max - Максимальное значение диапазона (включительно)
 * @returns {number} Случайное целое число
 */
const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1))+ min;
};

/**Получение случайного числа из диапазона с несколькими занками после запятой
 * @param {number} min  - Минимальное значение диапазона (включительно)
 * @param {number} max - Максимальное значение диапазона (включительно)
 * @param {number} digits - Количество знаков после запятой (по умолчанию - 0)
 * @returns {number} число с плавающей точкой из заданного диапазона
 */
const getRundomFloat = (min, max, digits = 0) => {
  if (min < 0 || max < 0 || digits < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  return parseFloat((Math.random() * (max - min) + min).toFixed(digits));
};

//объект-словарь типов мест
const offerCatalog = {
  'palace': 'замок',
  'flat': 'квартира',
  'house': 'дом',
  'hotel': 'отель',
  'bungalow': 'бунгало',
};

//массив-словарь вариантов времени заезда/выезда
const timesCatalog = ['12:00','13:00','14:00'];

//объект-словарь предоставляемых услуг
const featuresCatalog = {
  'wifi':'wifi',
  'dishwasher':'посудомоечная машина',
  'parking':'парковка',
  'washer':'стиральная машина',
  'elevator':'лифт',
  'conditioner':'кондиционер',
};


//функция формирования массива строк с уникальными индексами
/**
 * Функция формирования массива строк случайной длинны с уникальными значениями, но одинаковой основной строкой
 * @param {string} stringStart  Начальный текст строки
 * @param {string} stringFin  Текст строки после изменяемого параметра
 * @param {number} maxId  Максимальное значение изменяемого элемента
 * @param {number} minId  Минимальное значение изменяемого элемента
 * @param {number} maxArrayLength Максимально допустимая длинна массива (минимальное значение по умолчанию 1)
 * @returns
 */
const getRundomSrtingArray = (stringStart, stringFin = '', maxId, minId = 0, maxArrayLength) => {


  let arrayLength = getRandomInteger(1, maxArrayLength);
  let stringArray = [];
  let indexes = [];

  while (stringArray.length < arrayLength) {

    let index = getRandomInteger(Math.floor(minId), Math.floor(maxId));
    let isInArray = indexes.some(element => element==index);

    if (!isInArray) {
      stringArray.push(stringStart + index + stringFin);
    }

  }

  return stringArray;

};

//Функция формирования массива случайной длинны с значеними их объекта-справочника (без повторов)
const getRandomElements = (catalog) => {
  let elements = Object.entries(catalog);
  elements = elements.map(element => {
    element[1] = getRandomInteger(0,1);
    return (element[1] == 1)?element[0]:null;
  }).filter(Boolean);
  return elements;
};

//функция вывода случайного элемента из справочника
const getRandomArrayElement = (catalog) => {
  if (!Array.isArray(catalog)) {
    catalog = Object.keys(catalog);
  }
  return catalog[getRandomInteger(0, catalog.length - 1)];
};


//функция создания объекта - автора
const createAuthor = () => {
  let userImgId = getRandomInteger(1,10);
  userImgId = (userImgId < 10)?('0' + userImgId):userImgId;
  return {
    avatar: 'img/avatars/user' + userImgId + '.png',
  };
};


//функция создания объекта - координат
const createLocation = () => {
  return {
    x: getRundomFloat(35.65000, 35.70000, 5),
    y: getRundomFloat(139.70000, 139.80000, 5),
  }
};

//функция создания объекта - информации об объявлении
const createOffer = function () {
  const offer = {
    address: '',
    rooms: getRandomInteger(1,5),
    checkin: getRandomArrayElement(timesCatalog),
    checkout: getRandomArrayElement(timesCatalog),
    price: getRandomInteger(500,100000),
    type: getRandomArrayElement(offerCatalog),
    features: getRandomElements(featuresCatalog),
    photos: getRundomSrtingArray('http://o0.github.io/assets/images/tokyo/hotel', '.jpg', 55, 1, 3),
  };

  let offerType = offerCatalog[offer.type];
  offer.guests = offer.rooms * getRandomInteger(1,3);
  offer.title = offerType + ' c ' + offer.rooms + ' комнатами для ' + offer.guests +' гостей';
  offer.description = 'Выгодное предложение. Рассчитано для семей, пар или компаний до '
    + offer.guests + ' человек. В ' + offerType
    + ' имеется ' + offer.rooms + ' комфортных комнаты.'
    + ' Дополнительно для гостей предлагаются: '
    + offer.features.map((feature) => featuresCatalog[feature]).join(', ');
  return offer;
};


//функция создания общего объекта объявления
const createAdvert = () => {
  const advert = {
    author: createAuthor(),
    offer: createOffer(),
    location: createLocation(),
  };
  advert.offer.address = Object.values(advert.location).join(', ');
  return advert
};

//Определяем пустой массив объектов-объявлений с количеством элементов заявенных в константе ADVERTS_COUNT
// заполняем массив нулями
//перезаписываем в каждый элемент объявление, создаваемое функцией createAdvert
const adverts = new Array(ADVERTS_COUNT)
  .fill(null)
  .map(() => createAdvert());

//проверяем полученнный массив
console.log(adverts);
