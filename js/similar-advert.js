
//модуль отчечающий за генерацию разметки похожих элементов
import { adverts, offerCatalog } from './data.js';

//выбираем отображаемое объявление из созданного массива объявлений
const advert = adverts[1];
const offer = advert.offer;

//находим блок вставки
const advertBlock = document.querySelector('#map-canvas');

//из шаблона #card создать DOM-элементы по объявлениям и внести данные
//если данных нет то блок скрывается
//находим блок шаблона и переводим его в режим редактирования
const similarAdvertTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

//создаем элемент по шаблону
const advertElement = similarAdvertTemplate.cloneNode(true);

// заголовок объявления
let offerTitle = advertElement.querySelector('.popup__title')
offer.title
  ? (offerTitle.textContent = offer.title)
  : offerTitle.remove();


// адрес объявления
let offerAddress = advertElement.querySelector('.popup__text--address');
offer.address
  ? (offerAddress.textContent = offer.address)
  : offerAddress.remove();

// цена объявления
let offerPrice = advertElement.querySelector('.popup__text--price');
offer.price
  ? (offerPrice.textContent = offer.price + ' ₽/ночь')
  : offerPrice.remove();


// тип жилья
advertElement.querySelector('.popup__type').textContent = offerCatalog[offer.type];
let offerRoomType = advertElement.querySelector('.popup__type');
offer.type
  ? (offerRoomType.textContent = offerCatalog[offer.type])
  : offerRoomType.remove();




// гости и комнаты - блок
// элемент разметки с классом: .popup__text--capacity
// данные: {{offer.rooms}} комнаты для {{offer.guests}} гостей
advertElement.querySelector('.popup__text--capacity').textContent
  = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';

// Время заезда и выезда - блок
// элемент разметки с классом: .popup__text--time
// Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}
advertElement.querySelector('.popup__text--time').textContent
  = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

// доступные удобства - блок
// элемент разметки с классом: .popup__features
// данные: offer.features
const featuresBlock = advertElement.querySelector('.popup__features');
const featuresList = document.createDocumentFragment();
offer.features.forEach (feature => {
  const featureElement = featuresBlock
    .querySelector('.popup__feature')
    .cloneNode(true);
  featureElement.classList.add('popup__feature--' + feature);
  featuresList.appendChild(featureElement);
});
featuresBlock.innerHTML='';
featuresBlock.appendChild(featuresList);

// описание объекта - блок
// элемент разметки с классом: .popup__description
// данные: offer.description
advertElement.querySelector('.popup__description').textContent = offer.description;

// все фотографии - блок с элементами img src
// элемент разметки с классом: .popup__photos
// данные: offer.photos
const imgBlock = advertElement.querySelector('.popup__photos');
const imgList = document.createDocumentFragment();
offer.photos.forEach (photo => {
  const imgElement = imgBlock
    .querySelector('.popup__photo')
    .cloneNode(true);
  imgElement.src = photo;
  imgList.appendChild(imgElement);
});
imgBlock.innerHTML='';
imgBlock.appendChild(imgList);

// аватарки пользователя - блок
// элемент разметки с классом: .popup__avatar
// данные: author.avatar
advertElement.querySelector('.popup__avatar').src = advert.author.avatar;




//отрисовать элемент в блок #map-canvas
advertBlock.appendChild(advertElement);
