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

getRandomInteger(5, 8);

/**
 * Получение случайного числа из диапазона с несколькими занками после запятой
 * @param {number} min  - Минимальное значение диапазона (включительно)
 * @param {number} max - Максимальное значение диапазона (включительно)
 * @param {number} digits - Количество знаков после запятой (по умолчанию - 0)
 * @returns {number} число с плавающей точкой из заданного диапазона
 */
const getRundomFloat = function (min, max, digits = 0) {
  if (min < 0 || max < 0 || digits < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  return parseFloat((Math.random() * (max - min) + min).toFixed(digits));
};
getRundomFloat(4.499, 4.5, 3);
