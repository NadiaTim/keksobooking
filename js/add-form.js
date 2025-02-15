import './validation.js'
import {
  map,
  mainPinMarker,
  CENTER_TOKYO,
  latLngObjToString
} from './map.js'
import { sendData } from './fetch.js';
import { isEscEvent } from './util-element.js';

const showSuccessBlock = () => {
  const SuccessBlock = document
    .querySelector('#success')
    .content
    .querySelector('.success');
  document.querySelector('body').appendChild(SuccessBlock);
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent) {
      evt.preventDefault();
      SuccessBlock.remove();
    }
  });
  document.addEventListener('click', () => {
    SuccessBlock.remove();
  });
};

const showErrorBlock = () => {
  const ErrorBlock = document
    .querySelector('#error')
    .content
    .querySelector('.error');
  document.querySelector('body').appendChild(ErrorBlock);
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent) {
      evt.preventDefault();
      ErrorBlock.remove();
    }
  });
  const closeButton = ErrorBlock.querySelector('button');
  closeButton.addEventListener('click', () => {
    ErrorBlock.remove();
  });
  document.addEventListener('click', () => {
    ErrorBlock.remove();
  });
};




const addForm = document.querySelector('.ad-form');

// функция возвращения формы к начальному состоянию
const getEmptyAddForm = () => {
  addForm.reset();
  map.setView(CENTER_TOKYO, 13);
  mainPinMarker.setLatLng(CENTER_TOKYO);
  document.querySelector('#address').value = latLngObjToString(CENTER_TOKYO);
};


//обработка нажатие кнопки Очистить
const clearButton = document.querySelector('.ad-form__reset');
clearButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  getEmptyAddForm();
})



//обработка загрузки данных на сервер
addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(() => {
    showSuccessBlock();
    getEmptyAddForm();
  }, showErrorBlock, formData);
})
