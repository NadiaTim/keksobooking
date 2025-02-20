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
