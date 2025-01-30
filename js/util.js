/**
 * Получение целого случайного числа в заданном диапозоне
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

/**
 * Получение случайного числа из диапазона с несколькими занками после запятой
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

  let arrayLength = getRandomInteger(0, maxArrayLength);
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


/**
 * Формирование массива случайной длинны из значений ключей объекта из параметра
 * @param {object} catalog объект, из ключей которого составляется массив
 * @returns массив из уникальных элементов - ключей объекта object
 */
const getRandomElements = (catalog) => {

  let elements = Object.entries(catalog);
  elements = elements.map(element => {
    element[1] = getRandomInteger(0,1);
    return (element[1] == 1)?element[0]:null;
  }).filter(Boolean);

  return elements;
};

/**
 * Выбор случайного элемента из справочника
 * @param {object} catalog Объект-(справочник/каталог/словарь) с возможными значениями
 * @returns ключ случайного элемента калатога
 */
const getRandomArrayElement = (catalog) => {
  if (!Array.isArray(catalog)) {
    catalog = Object.keys(catalog);
  }
  return catalog[getRandomInteger(0, catalog.length - 1)];
};

/**
 * Вывод случайного значения с учетом ограничений из справочника (limitsCatalog.objectName)
 * @param {string} objectName наименование ключа проверяемого объекта-значения
 * @param {object} limitsCatalog объект-справочник ограничений для
 * @returns {number} Случайное число из вычисленного диапазона
 */
const getRundomOfLimits = (objectName, limitsCatalog) => {
  let selectedObject = limitsCatalog[objectName];
  if (!limitsCatalog[objectName].digitCount) {
    return getRandomInteger(selectedObject.min, selectedObject.max);
  } else {
    return getRundomFloat(selectedObject.min, selectedObject.max, selectedObject.digitCount);
  }
};


export {
  getRandomInteger,
  getRundomFloat,
  getRundomSrtingArray,
  getRandomElements,
  getRandomArrayElement,
  getRundomOfLimits
};
