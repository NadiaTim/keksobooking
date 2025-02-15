
//Создайте новый модуль
// и опишите в нём функции
// взаимодействия удалённым сервером
// с помощью fetch
// для получения
//https://23.javascript.htmlacademy.pro/keksobooking/data
//
// и отправки данных
//https://23.javascript.htmlacademy.pro/keksobooking (post)

const SERVER = 'https://23.javascript.htmlacademy.pro/keksobooking';
const DATA = 'https://23.javascript.htmlacademy.pro/keksobooking/data';

const getData = (onSuccess, onFail) => {
  fetch(DATA)
    .then((response) => response.json())
    .then((adverts) => {
      onSuccess(adverts)
    })
    .catch(() => {
      onFail('Не удалось получить данные');
    });
};

const sendData = (onSuccess, onFail) => {
  fetch(
    SERVER, {
      method: 'POST',
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте еще раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз.');
    });
};

export { getData, sendData };
