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

