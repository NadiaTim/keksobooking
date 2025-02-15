
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

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SERVER,
    {
      method: 'POST',
      body: body,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
